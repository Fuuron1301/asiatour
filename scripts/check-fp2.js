const https = require('https');

https.get('https://asiatour-jet.vercel.app/', { headers: { 'Accept-Encoding': 'identity' } }, function(res) {
  var html = '';
  res.on('data', function(c) { html += c; });
  res.on('end', function() {
    var preloads = html.match(/<link[^>]*rel="preload"[^>]*as="image"[^>]*>/g) || [];
    console.log('Total preload image tags:', preloads.length);
    preloads.forEach(function(p, i) {
      var hasFp = /fetchpriority/i.test(p);
      var isHero = /vietnam-hanoi/.test(p);
      var hasHref = /href="[^"]+&w=/.test(p);
      console.log('Tag ' + i + ': fp=' + hasFp + ' hero=' + isHero + ' href=' + hasHref);
      if (isHero || hasFp) {
        console.log('  ' + p.slice(0, 600));
      }
    });

    // Tim hero img
    var heroMatch = html.match(/<img[^>]{0,50}vietnam-hanoi[^>]{0,400}>/);
    if (heroMatch) {
      console.log('\n--- hero img ---');
      console.log(heroMatch[0].slice(0, 300));
    }
  });
}).on('error', function(e) { console.error('Error:', e.message); });
