const bcrypt = require('bcryptjs');

async function generateHash() {
  const password = 'password123';
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  
  console.log('Mot de passe:', password);
  console.log('Hash bcrypt:', hash);
  console.log('\nSQL pour mettre à jour:');
  console.log(`UPDATE \`citoyen\` SET \`mot_de_passe_citoyen\` = '${hash}';`);
  console.log(`UPDATE \`administrateur\` SET \`mot_de_passe_admin\` = '${hash}';`);
}

generateHash();
