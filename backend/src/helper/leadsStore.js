import fs from 'fs';
import path from 'path';
import axios from 'axios';
import redisClient from '../config/redisConfig.js';

const seen = new Set();

function leadsPath() {
  return process.env.LEADS_FILE
    || path.resolve(process.cwd(), 'backend/data/leads.jsonl');
}

/**
 * Persist a lead in three places, best-effort:
 * 1. JSONL file (works on a long-running host such as Railway, and locally)
 * 2. Redis list `leads:unlock` when Upstash/Redis is configured
 * 3. WEBHOOK_URL (existing Make.com hook) when set
 * A failed webhook never blocks the unlock.
 */
export async function saveLead(lead) {
  const key = `${String(lead.email).toLowerCase()}|${lead.roastId}`;
  if (seen.has(key)) {
    return { duplicate: true };
  }
  seen.add(key);

  const line = JSON.stringify(lead);
  const file = leadsPath();

  await fs.promises.mkdir(path.dirname(file), { recursive: true });
  await fs.promises.appendFile(file, `${line}\n`, 'utf8');

  try {
    if (redisClient?.isReady) {
      await redisClient.rPush('leads:unlock', line);
    }
  } catch (err) {
    console.error('[Leads] Redis write failed:', err.message);
  }

  const webhook = process.env.WEBHOOK_URL;
  if (webhook) {
    try {
      await axios.post(webhook, lead, {
        timeout: 4000,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      console.error('[Leads] Webhook forward failed:', err.message);
    }
  }

  return { duplicate: false, file };
}
