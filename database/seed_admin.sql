-- Insert test admin account
-- Login: admin@cityvoice.be / admin123

INSERT INTO `administrateur` (
  `nom_admin`,
  `prenom_admin`,
  `email_admin`,
  `mot_de_passe_admin`,
  `role`,
  `id_service`
) VALUES (
  'Admin',
  'Test',
  'admin@cityvoice.be',
  '$2a$10$rBsbGrWO45HL.wZfx3JoMuS6vChSZ9S5vD.9FSKuVt5vUwuzdw6FS',
  'admin',
  1
);
