require('dotenv').config();
const mysql = require('mysql2/promise');

async function addRoleColumn() {
  const dbName = process.env.DB_NAME || 'gestion_signalements';
  console.log(`📡 Connexion à la base de données: ${dbName}`);
  
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: dbName
  });

  try {
    console.log('🔧 Ajout de la colonne role à la table administrateur...\n');

    // Vérifier si la colonne existe déjà
    const dbName = process.env.DB_NAME || 'gestion_signalements';
    const [columns] = await connection.execute(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = ? 
      AND TABLE_NAME = 'administrateur' 
      AND COLUMN_NAME = 'role'
    `, [dbName]);

    if (columns.length > 0) {
      console.log('✅ La colonne role existe déjà\n');
    } else {
      // Ajouter la colonne
      await connection.execute(`
        ALTER TABLE administrateur 
        ADD COLUMN role VARCHAR(20) DEFAULT 'moderateur' AFTER id_service
      `);
      console.log('✅ Colonne role ajoutée avec succès\n');
    }

    // Mettre à jour les admins existants sans role
    await connection.execute(`
      UPDATE administrateur 
      SET role = 'admin' 
      WHERE role IS NULL OR role = ''
    `);
    console.log('✅ Admins existants mis à jour\n');

    // Afficher les admins
    const [admins] = await connection.execute(`
      SELECT id_admin, nom_admin, prenom_admin, email_admin, role, id_service 
      FROM administrateur
    `);

    console.log('📊 Liste des administrateurs:\n');
    admins.forEach(admin => {
      console.log(`👤 ${admin.prenom_admin} ${admin.nom_admin}`);
      console.log(`   Email: ${admin.email_admin}`);
      console.log(`   Role: ${admin.role || 'Non défini'}`);
      console.log(`   Service ID: ${admin.id_service || 'Aucun'}`);
      
      if (!admin.email_admin.endsWith('@cityvoice.be')) {
        console.log(`   ⚠️  Email ne se termine pas par @cityvoice.be - Non autorisé à se connecter`);
      } else {
        console.log(`   ✅ Email valide - Peut se connecter`);
      }
      console.log('');
    });

    console.log('✨ Migration terminée avec succès!');
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    throw error;
  } finally {
    await connection.end();
  }
}

addRoleColumn()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
