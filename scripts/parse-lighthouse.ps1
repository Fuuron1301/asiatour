# Parse Lighthouse JSON output và hiển thị metrics quan trọng
param(
  [Parameter(Mandatory=$true)]
  [string]$JsonFile
)

$data = Get-Content $JsonFile -Raw | ConvertFrom-Json
$perf = $data.categories.performance
$audits = $data.audits

$score = [math]::Round($perf.score * 100)
$lcp = [math]::Round($audits.'largest-contentful-paint'.numericValue / 1000, 2)
$tbt = [math]::Round($audits.'total-blocking-time'.numericValue)
$cls = [math]::Round($audits.'cumulative-layout-shift'.numericValue, 4)
$fcp = [math]::Round($audits.'first-contentful-paint'.numericValue / 1000, 2)
$si = [math]::Round($audits.'speed-index'.numericValue / 1000, 2)
$ttfb = [math]::Round($audits.'server-response-time'.numericValue)

Write-Host ""
Write-Host "=== LIGHTHOUSE RESULTS ===" -ForegroundColor Cyan
Write-Host "Score:  $score/100" -ForegroundColor $(if ($score -ge 90) {"Green"} elseif ($score -ge 80) {"Yellow"} else {"Red"})
Write-Host "LCP:    ${lcp}s" -ForegroundColor $(if ($lcp -le 2.5) {"Green"} elseif ($lcp -le 4) {"Yellow"} else {"Red"})
Write-Host "TBT:    ${tbt}ms" -ForegroundColor $(if ($tbt -le 200) {"Green"} elseif ($tbt -le 600) {"Yellow"} else {"Red"})
Write-Host "CLS:    $cls" -ForegroundColor $(if ($cls -le 0.1) {"Green"} elseif ($cls -le 0.25) {"Yellow"} else {"Red"})
Write-Host "FCP:    ${fcp}s" -ForegroundColor $(if ($fcp -le 1.8) {"Green"} elseif ($fcp -le 3) {"Yellow"} else {"Red"})
Write-Host "SI:     ${si}s" -ForegroundColor $(if ($si -le 3.4) {"Green"} elseif ($si -le 5.8) {"Yellow"} else {"Red"})
Write-Host "TTFB:   ${ttfb}ms" -ForegroundColor $(if ($ttfb -le 600) {"Green"} elseif ($ttfb -le 1800) {"Yellow"} else {"Red"})

# CLS Sources chi tiết
Write-Host ""
Write-Host "=== CLS SOURCES ===" -ForegroundColor Cyan
$clsAudit = $audits.'layout-shifts'
if ($clsAudit -and $clsAudit.details -and $clsAudit.details.items) {
  foreach ($item in $clsAudit.details.items) {
    $itemScore = $item.cumulativeScore ?? $item.score ?? "N/A"
    Write-Host "  Shift score: $itemScore"
    if ($item.sources) {
      foreach ($src in $item.sources) {
        $node = $src.node ?? $src
        $selector = $node.snippet ?? $node.nodeLabel ?? $node.selector ?? "unknown"
        Write-Host "    Node: $selector"
        if ($src.previousRect) {
          Write-Host "    Prev: top=$($src.previousRect.top) h=$($src.previousRect.height)"
          Write-Host "    Curr: top=$($src.currentRect.top) h=$($src.currentRect.height)"
        }
      }
    }
  }
} else {
  Write-Host "  No CLS details available"
}

# LCP element
Write-Host ""
Write-Host "=== LCP ELEMENT ===" -ForegroundColor Cyan
$lcpAudit = $audits.'largest-contentful-paint-element'
if ($lcpAudit -and $lcpAudit.details -and $lcpAudit.details.items) {
  foreach ($item in $lcpAudit.details.items) {
    Write-Host "  $($item | ConvertTo-Json -Depth 3 -Compress)"
  }
}

# Opportunities
Write-Host ""
Write-Host "=== TOP OPPORTUNITIES ===" -ForegroundColor Cyan
$opportunities = $data.categories.performance.auditRefs | Where-Object { $_.group -eq "load-opportunities" }
foreach ($ref in $opportunities) {
  $a = $audits.($ref.id)
  if ($a -and $a.score -ne $null -and $a.score -lt 1) {
    $savings = if ($a.details -and $a.details.overallSavingsMs) { "$([math]::Round($a.details.overallSavingsMs))ms" } else { "" }
    Write-Host "  [$([math]::Round($a.score * 100))] $($a.title) $savings"
  }
}
