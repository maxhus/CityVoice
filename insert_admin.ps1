# Script to insert admin user into database
# Run this with: .\insert_admin.ps1

$sqlContent = @"
USE gestion_signalements;

INSERT INTO administrateur (
  nom_admin,
  prenom_admin,
  email_admin,
  mot_de_passe_admin,
  role_admin,
  id_service,
  created_at,
  updated_at
) VALUES (
  'Admin',
  'Test',
  'admin@cityvoice.be',
  '\$2a\$10\$rBsbGrWO45HL.wZfx3JoMuS6vChSZ9S5vD.9FSKuVt5vUwuzdw6FS',
  'admin',
  1,
  NOW(),
  NOW()
)
ON DUPLICATE KEY UPDATE 
  mot_de_passe_admin = '\$2a\$10\$rBsbGrWO45HL.wZfx3JoMuS6vChSZ9S5vD.9FSKuVt5vUwuzdw6FS';

SELECT 'Admin user created/updated successfully!' as Result;
"@

# Save to temp file
$tempFile = Join-Path $env:TEMP "insert_admin.sql"
$sqlContent | Out-File -FilePath $tempFile -Encoding UTF8

Write-Host "SQL script saved to: $tempFile"
Write-Host ""
Write-Host "To execute, run one of these commands:"
Write-Host ""
Write-Host "Option 1 - Using mysql command line:"
Write-Host "  mysql -u root -p < $tempFile"
Write-Host ""
Write-Host "Option 2 - Copy the SQL content from the temp file and paste it into:"
Write-Host "  - MySQL Workbench"
Write-Host "  - phpMyAdmin"
Write-Host "  - HeidiSQL"
Write-Host "  - Any MySQL client"
Write-Host ""
Write-Host "Admin credentials:"
Write-Host "  Email: admin@cityvoice.be"
Write-Host "  Password: admin123"
Write-Host ""
