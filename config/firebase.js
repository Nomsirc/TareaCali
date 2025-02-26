const admin = require('firebase-admin');
const serviceAccount = require('./tareacali-firebase-adminsdk-fbsvc-43c220d696.json'); // Ruta al archivo JSON de credenciales

// Inicializa Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore(); // Obtén una referencia a Firestore

module.exports = db;