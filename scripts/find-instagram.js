async function search() {
  const query = '3d metallic chrome instagram icon png transparent';
  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } });
  const html = await res.text();
  const rawUrls = [...html.matchAll(/uddg=([^&]+)/g)].map(m => decodeURIComponent(m[1]));
  console.log('Results:');
  rawUrls.slice(0, 15).forEach(u => console.log(u));
}
search();
