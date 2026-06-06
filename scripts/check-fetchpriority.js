const https = require('https');

https.get('https://asiatour-jet.vercel.app/', { headers: { 'Accept-Encoding': 'identity' } }, res => {
  let html = '';
  res.on('data', c => { html += c; });
  res.on('end', () => {
    const preloads = html.match(/<link[^>]*rel="preload"[^>]*as="image"[^>]*>/g) || [];
    console.log('=== Preload image tags (' + preloads.length + ') ===');
    preloads.forEach(function(p, i) {
      const hasFp = /fetchpriority/i.test(p);
      const isHero = /vietnam-hanoi/.test(p);
      const hrefMatch = p.match(/href="([^"]*)"/);
      const href = hrefMatch ? hrefMatch[1].slice(0, 50) : '';
      console.log(i + ': fp=' + hasFp + ' hero=' + isHero + ' href=' + href);
    });
    // Kiểm tra hero img
    const heroMatch = html.match(/<img[^>]*vietnam-hanoi[^>]{0,400}>/);
    if (heroMatch) {
      const hasFp = /fetchpriority/i.test(heroMatch[0]);
      console.log('\nhero-img fp=' + hasFp);
      // In 200 chars đầu tiên
      const snippet = heroMatch[0].slice(0, 200);
      console.log('snippet:', snippet);
    }
    // Tổng số preload
    const allPreloads = html.match(/<link[^>]*rel="preload"[^>]*>/g) || [];
    console.log('\nTotal preload tags: ' + allPreloads.length);
  });
}).on('error', function(e) { console.error('Error:', e.message); });

