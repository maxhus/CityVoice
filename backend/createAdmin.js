// Script to create admin user in database
// Run with: node createAdmin.js

require('dotenv').config();
const { Administrateur, ServiceMunicipal, sequelize } = require('./models');
const bcrypt = require('bcryptjs');

async function createAdmin() {
  try {
    await sequelize.authenticate();
    console.log('✓ Connected to database');

    // Check if admin already exists
    const existing = await Administrateur.findOne({
      where: { email_admin: 'admin@cityvoice.be' }
    });

    if (existing) {
      console.log('⚠ Admin already exists, updating password...');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      existing.mot_de_passe_admin = hashedPassword;
      await existing.save();
      console.log('✓ Admin password updated');
    } else {
      console.log('Creating new admin user...');
      
      // Ensure there's a service_municipal
      let service = await ServiceMunicipal.findOne();
      if (!service) {
        console.log('Creating default service municipal...');
        service = await ServiceMunicipal.create({
          nom_service: 'Service Général',
          description_service: 'Service municipal par défaut',
          email_service: 'service@cityvoice.be',
          telephone_service: '+32 2 123 45 67'
        });
        console.log('✓ Service created');
      }

      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      const admin = await Administrateur.create({
        nom_admin: 'Admin',
        prenom_admin: 'Test',
        email_admin: 'admin@cityvoice.be',
        mot_de_passe_admin: hashedPassword,
        role_admin: 'admin',
        id_service: service.id_service
      });

      console.log('✓ Admin user created successfully!');
    }

    console.log('\n📧 Login credentials:');
    console.log('   Email: admin@cityvoice.be');
    console.log('   Password: admin123');
    console.log('\n🌐 Access the admin panel at:');
    console.log('   http://localhost:3000/admin/login');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.parent) {
      console.error('Database error:', error.parent.message);
    }
    process.exit(1);
  }
}

createAdmin();
