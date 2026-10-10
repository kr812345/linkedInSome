import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { normalizeRoast, parseRoastJson, toTeaser } from '../src/helper/parseRoast.js';
import { PROFILE_LEAK, POSTS_LEAK } from '../src/helper/mockRoast.js';

const TINY_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
);

test('legacy flat profile JSON still becomes a roast', () => {
  const roast = normalizeRoast({
    banner: 'Empty banner.',
    bio: 'Generic headline.',
    about: 'A biography.',
  }, 'profile');

  assert.equal(roast.error, undefined);
  assert.equal(roast.sections.banner, 'Empty banner.');
  assert.equal(roast.highlights[0], 'Empty banner.');
  assert.equal(toTeaser(roast).highlights.length, 2);
});

test('parser strips markdown fences and teaser hides rewrites', () => {
  const raw = parseRoastJson('```json\n{"score":88,"verdict":"Close.","highlights":["A","B","C"],"sections":{"hook":"Weak hook"},"rewrites":[{"label":"Hook","text":"SECRET_LINE"}]}\n```');
  const roast = normalizeRoast(raw, 'posts');
  const teaser = toTeaser(roast);
  assert.equal(teaser.score, 88);
  assert.deepEqual(teaser.highlights, ['A', 'B']);
  assert.equal(JSON.stringify(teaser).includes('SECRET_LINE'), false);
  assert.equal(roast.rewrites[0].text, 'SECRET_LINE');
  assert.equal(teaser.lockedCount > 0, true);
});

test('profile and posts roasts stay behind the email gate', async () => {
  const leadsFile = path.join(os.tmpdir(), `linkroast-leads-${Date.now()}.jsonl`);
  process.env.MOCK_LLM = 'true';
  process.env.VERCEL = '1';
  process.env.REDIS_URL = 'redis://127.0.0.1:1';
  process.env.LEADS_FILE = leadsFile;
  process.env.PORT = '0';

  const { default: app } = await import('../server.js');
  const server = await new Promise((resolve) => {
    const listening = app.listen(0, '127.0.0.1', () => resolve(listening));
  });
  const { port } = server.address();
  const base = `http://127.0.0.1:${port}`;

  try {
    const profileForm = new FormData();
    profileForm.append('file', new File([TINY_PNG], 'profile.png', { type: 'image/png' }));
    const profileRes = await fetch(`${base}/v1/api/roast`, { method: 'POST', body: profileForm });
    const profile = await profileRes.json();

    assert.equal(profileRes.status, 200);
    assert.equal(profile.gated, true);
    assert.equal(profile.teaser.score, 34);
    assert.equal(profile.teaser.highlights.length, 2);
    assert.equal(JSON.stringify(profile).includes(PROFILE_LEAK), false);
    assert.equal(profile.teaser.sections, undefined);

    const blocked = await fetch(`${base}/v1/api/unlock`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        roastId: profile.roastId,
        name: 'Ada',
        email: 'ada@example.com',
        consent: false,
      }),
    });
    assert.equal(blocked.status, 400);

    const unlockedRes = await fetch(`${base}/v1/api/unlock`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        roastId: profile.roastId,
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        consent: true,
      }),
    });
    const unlocked = await unlockedRes.json();
    assert.equal(unlockedRes.status, 200);
    assert.equal(unlocked.data.rewrites.some((item) => item.text.includes(PROFILE_LEAK)), true);
    assert.equal(unlocked.data.sections.clientMagnet.includes('book'), true);

    const again = await fetch(`${base}/v1/api/unlock`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        roastId: profile.roastId,
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        consent: true,
      }),
    });
    assert.equal(again.status, 200);

    const postsForm = new FormData();
    postsForm.append('postsText', 'Most founders post about their week.\n\nNobody can tell who the post is for, and it ends on thoughts?');
    postsForm.append('files', new File([TINY_PNG], 'post.png', { type: 'image/png' }));
    const postsRes = await fetch(`${base}/v1/api/roast-posts`, { method: 'POST', body: postsForm });
    const posts = await postsRes.json();
    assert.equal(postsRes.status, 200);
    assert.equal(posts.mode, 'posts');
    assert.equal(JSON.stringify(posts).includes(POSTS_LEAK), false);

    const postsUnlock = await fetch(`${base}/v1/api/unlock`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        roastId: posts.roastId,
        name: 'Grace Hopper',
        email: 'grace@example.com',
        consent: true,
      }),
    });
    const postsFull = await postsUnlock.json();
    assert.equal(postsFull.data.sections.hook.length > 10, true);
    assert.equal(postsFull.data.rewrites.some((item) => item.text.includes(POSTS_LEAK)), true);

    const textOnly = new FormData();
    textOnly.append('postsText', 'A second post about shipping, with no buyer, no proof, and no ask at the end.');
    const textRes = await fetch(`${base}/v1/api/roast-posts`, { method: 'POST', body: textOnly });
    assert.equal(textRes.status, 200);

    const empty = await fetch(`${base}/v1/api/roast`, { method: 'POST' });
    assert.equal(empty.status, 400);

    const lines = fs.readFileSync(leadsFile, 'utf8').trim().split('\n').map((line) => JSON.parse(line));
    assert.equal(lines.length, 2);
    assert.deepEqual(lines.map((lead) => lead.email).sort(), ['ada@example.com', 'grace@example.com']);
    assert.equal(JSON.stringify(lines).includes(PROFILE_LEAK), false);
    assert.equal(JSON.stringify(lines).includes('sections'), false);
    assert.equal(lines.every((lead) => lead.consent === true), true);
  } finally {
    await new Promise((resolve) => server.close(resolve));
    try {
      const redisClient = (await import('../src/config/redisConfig.js')).default;
      await redisClient.disconnect();
    } catch {
      // Redis is optional in this test.
    }
    fs.rmSync(leadsFile, { force: true });
  }
});
