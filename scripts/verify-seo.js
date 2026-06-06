async function checkUrl(url) {
  const res = await fetch(url, { headers: { 'Accept': 'text/html', 'User-Agent': 'Mozilla/5.0' }, redirect: 'follow' });
  const html = await res.text();
  const links = html.match(/<link[^>]*>/g) || [];
  const preloads = links.filter(l => /rel="preload"/i.test(l));
  console.log('\n=== ' + url + ' preloads ===');
  preloads.forEach(l => console.log(l.slice(0, 160)));
}

checkUrl('https://asiatour-jet.vercel.app/').catch(e => console.error(e));
