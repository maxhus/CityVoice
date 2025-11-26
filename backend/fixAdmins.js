const { Administrateur } = require('./models');
const bcrypt = require('bcryptjs');

async function fixAdmins() {
  try {
    console.log('🔧 Vérification des administrateurs...\n');

    // Récupérer tous les admins
    const admins = await Administrateur.findAll();
    
    console.log(`📊 ${admins.length} administrateur(s) trouvé(s)\n`);

    for (const admin of admins) {
      console.log(`👤 ${admin.prenom_admin} ${admin.nom_admin}`);
      console.log(`   Email: ${admin.email_admin}`);
      console.log(`   Role: ${admin.role || 'Non défini'}`);
      console.log(`   Service ID: ${admin.id_service || 'Aucun'}`);
      
      // Vérifier si l'email se termine par @cityvoice.be
      if (!admin.email_admin.endsWith('@cityvoice.be')) {
        console.log(`   ⚠️  Email ne se termine pas par @cityvoice.be`);
      } else {
        console.log(`   ✅ Email valide`);
      }
      
      console.log('');
    }

    // Créer un admin test si aucun n'existe avec @cityvoice.be
    const validAdmins = admins.filter(a => a.email_admin.endsWith('@cityvoice.be'));
    
    if (validAdmins.length === 0) {
      console.log('❌ Aucun admin avec @cityvoice.be trouvé. Création d\'un admin test...\n');
      
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      await Administrateur.create({
        nom_admin: 'Admin',
        prenom_admin: 'Test',
        email_admin: 'admin@cityvoice.be',
        mot_de_passe_admin: hashedPassword,
        role: 'admin',
        id_service: null
      });
      
      console.log('✅ Admin créé avec succès:');
      console.log('   Email: admin@cityvoice.be');
      console.log('   Mot de passe: admin123\n');
    }

    console.log('✨ Terminé!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

fixAdmins();
