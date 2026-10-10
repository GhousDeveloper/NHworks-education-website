$dest = "c:\Users\EURO COMPUTERS\Desktop\nhworks-education-website.zip"
if (Test-Path $dest) { Remove-Item $dest -Force }
$source = "c:\Users\EURO COMPUTERS\Desktop\nhworks-education-website"

Compress-Archive -Path "$source\index.html", "$source\css", "$source\js", "$source\assets", "$source\serve.js", "$source\README.md" -DestinationPath $dest -CompressionLevel Optimal
Write-Host "ZIP created successfully at $dest"
Get-Item $dest | Select-Object Name, Length
