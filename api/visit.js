// Proxy: reads GH_PAT from Vercel env — token never reaches the browser.
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const token = process.env.GH_PAT;
  if (!token) return res.status(500).json({ error: 'GH_PAT not configured' });

  const api = 'https://api.github.com/repos/georgejocap/capillary-tz-explorer/contents/count.json';
  const headers = {
    Authorization: `token ${token}`,
    'Content-Type': 'application/json',
    'User-Agent': 'capillary-tz-visitor-counter',
  };

  for (let attempt = 0; attempt < 5; attempt++) {
    const r = await fetch(api, { cache: 'no-store', headers });
    if (!r.ok) return res.status(r.status).json({ error: 'read failed' });

    const d = await r.json();
    const current = JSON.parse(Buffer.from(d.content.replace(/\s/g, ''), 'base64').toString()).count || 0;
    const next = current + 1;

    const w = await fetch(api, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        message: `chore: visit ${next} [skip ci]`,
        content: Buffer.from(JSON.stringify({ count: next })).toString('base64'),
        sha: d.sha,
      }),
    });

    if (w.status === 409) continue; // SHA conflict — retry
    if (w.ok) return res.status(200).json({ count: next });
    return res.status(w.status).json({ error: 'write failed' });
  }

  return res.status(409).json({ error: 'conflict after retries' });
};
