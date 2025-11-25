// Script de test de la connexion Frontend-Backend
const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

console.log('\n🧪 Test de connexion Frontend-Backend CityVoice\n');
console.log('=' .repeat(50));

async function testAPI() {
  try {
    // Test 1: Backend accessible
    console.log('\n1️⃣ Test: Backend accessible...');
    const rootResponse = await axios.get('http://localhost:5000');
    console.log('   ✅ Backend répond:', rootResponse.data.message);

    // Test 2: Route signalements
    console.log('\n2️⃣ Test: GET /api/signalements...');
    const signalements = await axios.get(`${API_URL}/signalements`);
    console.log(`   ✅ ${signalements.data.count || 0} signalements trouvés`);

    // Test 3: Route stats
    console.log('\n3️⃣ Test: GET /api/signalements/stats...');
    const stats = await axios.get(`${API_URL}/signalements/stats`);
    console.log('   ✅ Statistiques OK');

    console.log('\n' + '='.repeat(50));
    console.log('✅ TOUS LES TESTS PASSÉS!\n');
    console.log('🎉 Le backend est opérationnel et prêt à recevoir les requêtes du frontend\n');

  } catch (error) {
    console.error('\n❌ ERREUR:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('\n⚠️  Le backend ne semble pas démarré.');
      console.log('   Lancez-le avec: cd backend && npm run dev\n');
    }
    process.exit(1);
  }
}

testAPI();
