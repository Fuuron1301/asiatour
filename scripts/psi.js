// Google PageSpeed Insights API — không cần API key cho số lần test thấp
async function runPsi(url, strategy) {
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}`;
  const res = await fetch(apiUrl);
  const data = await res.json();
  if (data.error) { console.log(strategy + ' ERROR:', data.error.message); return; }
  const cat = data.lighthouseResult?.categories?.performance;
  const aud = data.lighthouseResult?.audits;
  console.log('\n--- PageSpeed Insights: ' + strategy.toUpperCase() + ' | Score: ' + Math.round((cat?.score||0)*100) + ' ---');
  ['first-contentful-paint','largest-contentful-paint','total-blocking-time','cumulative-layout-shift','speed-index'].forEach(k=>{
    const a = aud?.[k]; if(a) console.log('  ' + k + ': ' + a.displayValue + ' (' + Math.round((a.score||0)*100) + '%)');
  });
  const cwv = data.loadingExperience;
  if (cwv?.metrics) {
    console.log('  CWV LCP: ' + (cwv.metrics.LARGEST_CONTENTFUL_PAINT_MS?.percentile||'?') + 'ms (' + (cwv.metrics.LARGEST_CONTENTFUL_PAINT_MS?.category||'?') + ')');
    console.log('  CWV INP: ' + (cwv.metrics.INTERACTION_TO_NEXT_PAINT?.category||'?'));
    console.log('  CWV CLS: ' + (cwv.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE?.category||'?'));
  }
}

runPsi('https://asiatour.vercel.app', 'mobile')
  .then(() => runPsi('https://asiatour.vercel.app', 'desktop'))
  .catch(e => console.error(e));
