param([string]$Root,[int]$Port)
Add-Type -AssemblyName System.Web
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Output "Serving $Root at http://localhost:$Port/"
while ($listener.IsListening) {
  try {
    $context = $listener.GetContext()
    $reqPath = [System.Web.HttpUtility]::UrlDecode($context.Request.Url.AbsolutePath.TrimStart('/'))
    if ([string]::IsNullOrWhiteSpace($reqPath)) { $reqPath = 'index.html' }
    $fullPath = Join-Path $Root $reqPath
    if ((Test-Path $fullPath) -and (Get-Item $fullPath).PSIsContainer) {
      $fullPath = Join-Path $fullPath 'index.html'
    }
    if (-not (Test-Path $fullPath)) {
      $context.Response.StatusCode = 404
      $bytes = [System.Text.Encoding]::UTF8.GetBytes('Not Found')
      $context.Response.OutputStream.Write($bytes,0,$bytes.Length)
      $context.Response.Close()
      continue
    }
    $ext = [IO.Path]::GetExtension($fullPath).ToLowerInvariant()
    $contentType = switch ($ext) {
      '.html' { 'text/html; charset=utf-8' }
      '.css'  { 'text/css; charset=utf-8' }
      '.js'   { 'application/javascript; charset=utf-8' }
      '.json' { 'application/json; charset=utf-8' }
      '.png'  { 'image/png' }
      '.jpg'  { 'image/jpeg' }
      '.jpeg' { 'image/jpeg' }
      '.svg'  { 'image/svg+xml' }
      '.webp' { 'image/webp' }
      default { 'application/octet-stream' }
    }
    $bytes = [IO.File]::ReadAllBytes($fullPath)
    $context.Response.ContentType = $contentType
    $context.Response.ContentLength64 = $bytes.Length
    $context.Response.OutputStream.Write($bytes,0,$bytes.Length)
    $context.Response.Close()
  } catch {
    try { $context.Response.StatusCode = 500; $context.Response.Close() } catch {}
  }
}
