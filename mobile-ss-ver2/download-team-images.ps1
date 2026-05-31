$d = "d:\working\Working\Du lich\Du thuyen ha Long\mobile-ss-ver2\luxury-travel-next\public\images\team"
New-Item -Force -ItemType Directory $d | Out-Null

$base = "https://web.archive.org/web/20250827045920if_/https://vietnamtravelers.com/wp-content/uploads/2024/05/"

$files = @(
    @{src="118175268_1670957219737491_5717264662770043215_n.jpg"; dst="cris-le.jpg"},
    @{src="Vietnam-travelers-staff-4.jpg"; dst="hieu-le.jpg"},
    @{src="Vietnam-travelers-staff-2-1.jpg"; dst="tam-pham.jpg"},
    @{src="Vietnam-travelers-staff-3.jpg"; dst="huyen-nguyen.jpg"},
    @{src="Vietnam-travelers-staff-2.jpg"; dst="sang-le.jpg"},
    @{src="Vietnam-travelers-staff-1.jpg"; dst="phuong-nguyen.jpg"}
)

foreach ($f in $files) {
    $url = $base + $f.src
    $out = "$d\$($f.dst)"
    Write-Host "Downloading $($f.dst)..."
    curl.exe -k -L -s -o $out $url
    $size = (Get-Item $out -ErrorAction SilentlyContinue).Length
    $bytes = if ($size) { [System.IO.File]::ReadAllBytes($out)[0..1] } else { @(0,0) }
    $isJpeg = $bytes[0] -eq 0xFF -and $bytes[1] -eq 0xD8
    Write-Host "$($f.dst): $size bytes $(if($isJpeg){'[JPEG OK]'}else{'[NOT JPEG]'})"
}
