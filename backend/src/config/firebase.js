const admin = require('firebase-admin');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

// Initialize Firebase Admin SDK
const serviceAccount = require(process.env.FIREBASE_CREDENTIALS_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = { db };