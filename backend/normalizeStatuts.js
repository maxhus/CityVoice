// Script pour normaliser les statuts des signalements
// Run with: node normalizeStatuts.js

require('dotenv').config();
const { Signalement, sequelize } = require('./models');

async function normalizeStatuts() {
  try {
    await sequelize.authenticate();
    console.log('✓ Connected to database');

    // Mapper les anciens statuts vers les nouveaux
    const statusMapping = {
      'Nouveau': 'en_attente',
      'nouveau': 'en_attente',
      'En attente': 'en_attente',
      'En cours': 'en_cours',
      'en cours': 'en_cours',
      'Résolu': 'resolu',
      'résolu': 'resolu',
      'Rejeté': 'rejete',
      'rejeté': 'rejete',
      'Rejete': 'rejete'
    };

    console.log('\n📊 Vérification des statuts actuels...');
    const currentStatuts = await Signalement.findAll({
      attributes: ['statut', [sequelize.fn('COUNT', sequelize.col('id_signalement')), 'count']],
      group: ['statut'],
      raw: true
    });

    console.log('\nStatuts actuels:');
    currentStatuts.forEach(item => {
      console.log(`  - ${item.statut}: ${item.count}`);
    });

    console.log('\n🔄 Normalisation en cours...');
    let updated = 0;

    for (const [oldStatus, newStatus] of Object.entries(statusMapping)) {
      const result = await Signalement.update(
        { statut: newStatus },
        { where: { statut: oldStatus } }
      );
      if (result[0] > 0) {
        console.log(`  ✓ ${result[0]} signalement(s): "${oldStatus}" → "${newStatus}"`);
        updated += result[0];
      }
    }

    console.log(`\n✅ ${updated} signalement(s) mis à jour`);

    // Afficher les nouveaux statuts
    console.log('\n📊 Nouveaux statuts:');
    const newStatuts = await Signalement.findAll({
      attributes: ['statut', [sequelize.fn('COUNT', sequelize.col('id_signalement')), 'count']],
      group: ['statut'],
      raw: true
    });

    newStatuts.forEach(item => {
      console.log(`  - ${item.statut}: ${item.count}`);
    });

    console.log('\n✅ Normalisation terminée!');
    console.log('\n📋 Statuts valides:');
    console.log('  - en_attente: En attente de traitement');
    console.log('  - en_cours: En cours de traitement');
    console.log('  - resolu: Problème résolu');
    console.log('  - rejete: Signalement rejeté');

    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    if (error.parent) {
      console.error('Database error:', error.parent.message);
    }
    process.exit(1);
  }
}

normalizeStatuts();
