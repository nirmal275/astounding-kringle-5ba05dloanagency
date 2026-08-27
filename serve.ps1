# Easy Loan Services - Mini Static HTTP Server (PowerShell)
# Run: powershell -ExecutionPolicy Bypass -File serve.ps1
# Then open: http://localhost:5500

$port = 5500
$root = $PSScriptRoot
$url  = "http://localhost:$port/"

$mime = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css"
  ".js"   = "application/javascript"
  ".json" = "application/json"
  ".png"  = "image/png"
  ".jpg"  = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".gif"  = "image/gif"
  ".svg"  = "image/svg+xml"
  ".ico"  = "image/x-icon"
  ".woff" = "font/woff"
  ".woff2"= "font/woff2"
  ".ttf"  = "font/ttf"
  ".xml"  = "application/xml"
  ".txt"  = "text/plain"
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://+:$port/")

try { $listener.Start() } catch {
  # Fallback to localhost-only if + binding fails
  $listener = New-Object System.Net.HttpListener
  $listener.Prefixes.Add("http://localhost:$port/")
  $listener.Start()
}

Write-Host ""
Write-Host "========================================"
Write-Host "  Easy Loan Services - Local Server"
Write-Host "========================================"
Write-Host ""
Write-Host "  Server running at: $url"
Write-Host "  Press Ctrl+C to stop"
Write-Host ""

# Try to auto-open in browser
Start-Process $url 2>$null

while ($listener.IsListening) {
  $ctx  = $listener.GetContext()
  $req  = $ctx.Request
  $resp = $ctx.Response

  $reqPath = $req.Url.AbsolutePath
  if ($reqPath -eq "/" -or $reqPath -eq "") { $reqPath = "/index.html" }

  # Strip leading slash and decode
  $relPath = [System.Uri]::UnescapeDataString($reqPath.TrimStart("/"))
  $filePath = Join-Path $root $relPath

  # Default to index.html for directory paths
  if (Test-Path $filePath -PathType Container) {
    $filePath = Join-Path $filePath "index.html"
  }

  if (Test-Path $filePath -PathType Leaf) {
    $ext  = [System.IO.Path]::GetExtension($filePath).ToLower()
    $ct   = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { "application/octet-stream" }
    $data = [System.IO.File]::ReadAllBytes($filePath)

    $resp.ContentType   = $ct
    $resp.ContentLength64 = $data.Length
    $resp.StatusCode    = 200
    $resp.OutputStream.Write($data, 0, $data.Length)
    Write-Host "  200  $reqPath"
  } else {
    $body = [System.Text.Encoding]::UTF8.GetBytes("<h1>404 - Not Found</h1><p>$reqPath</p>")
    $resp.ContentType     = "text/html"
    $resp.ContentLength64 = $body.Length
    $resp.StatusCode      = 404
    $resp.OutputStream.Write($body, 0, $body.Length)
    Write-Host "  404  $reqPath"
  }

  $resp.OutputStream.Close()
}
