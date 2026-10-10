/**
 * Turns raw model text into a roast object, then a public teaser
 * that does not include section copy or rewrites.
 */

export function parseRoastJson(text) {
  if (typeof text !== 'string' || !text.trim()) {
    throw new Error('The model returned an empty response.');
  }

  const trimmed = text
    .trim()
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```$/i, '')
    .trim();

  const match = trimmed.match(/\{[\s\S]*\}/);
  if (!match) {
    throw new Error('The model did not return JSON.');
  }

  return JSON.parse(match[0]);
}

function clampScore(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return null;
  return Math.max(0, Math.min(100, Math.round(n)));
}

function asText(value) {
  if (typeof value === 'string') return value.trim();
  if (typeof value === 'number') return String(value);
  return '';
}

export function normalizeRoast(raw, mode) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    throw new Error('Invalid roast payload.');
  }

  if (raw.error) {
    const message = asText(raw.error) || 'That does not look like a LinkedIn screenshot.';
    return { error: message };
  }

  const sections = {};
  if (raw.sections && typeof raw.sections === 'object' && !Array.isArray(raw.sections)) {
    for (const [key, value] of Object.entries(raw.sections)) {
      const text = asText(value);
      if (text) sections[key] = text;
    }
  } else {
    const reserved = new Set(['score', 'verdict', 'summary', 'highlights', 'rewrites', 'error', 'mode']);
    for (const [key, value] of Object.entries(raw)) {
      if (reserved.has(key)) continue;
      const text = asText(value);
      if (text) sections[key] = text;
    }
  }

  let highlights = Array.isArray(raw.highlights)
    ? raw.highlights.map(asText).filter(Boolean)
    : [];

  if (highlights.length === 0) {
    highlights = Object.values(sections).slice(0, 3);
  }

  const rewrites = [];
  if (Array.isArray(raw.rewrites)) {
    raw.rewrites.forEach((item, index) => {
      if (typeof item === 'string' && item.trim()) {
        rewrites.push({ label: `Rewrite ${index + 1}`, text: item.trim() });
        return;
      }
      if (item && typeof item === 'object') {
        const text = asText(item.text || item.after || item.rewrite);
        if (!text) return;
        rewrites.push({
          label: asText(item.label) || `Rewrite ${index + 1}`,
          text,
        });
      }
    });
  }

  const verdict = asText(raw.verdict || raw.summary) || highlights[0] || 'Here is the honest read.';

  return {
    mode,
    score: clampScore(raw.score),
    verdict,
    highlights: highlights.slice(0, 6),
    sections,
    rewrites,
  };
}

export function toTeaser(roast) {
  const extraHighlights = Math.max(0, roast.highlights.length - 2);
  const lockedCount = extraHighlights + Object.keys(roast.sections || {}).length + (roast.rewrites || []).length;

  return {
    score: roast.score,
    verdict: roast.verdict,
    highlights: (roast.highlights || []).slice(0, 2),
    lockedCount,
  };
}
