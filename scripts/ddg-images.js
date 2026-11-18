async function ddgImages() {
  const q = '3d chrome metallic instagram icon transparent';
  // Step 1: get vqd token
  const tokenRes = await fetch(`https://duckduckgo.com/?q=${encodeURIComponent(q)}`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });
  const html = await tokenRes.text();
  const match = html.match(/vqd=([^&'\"]+)/);
  if (!match) {
    console.log('No vqd token found');
    return;
  }
  const vqd = match[1];
  console.log('VQD:', vqd);

  const imgRes = await fetch(`https://duckduckgo.com/i.js?q=${encodeURIComponent(q)}&vqd=${vqd}&o=json&p=1`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });
  const json = await imgRes.json();
  console.log('Results count:', json.results ? json.results.length : 0);
  if (json.results) {
    for (const r of json.results.slice(0, 8)) {
      console.log('Title:', r.title);
      console.log('Image:', r.image);
      console.log('---');
    }
  }
}
ddgImages();
