import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
const initializeFirebase = () => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
      })
    });
    console.log('✓ Firebase initialized successfully');
  }
  return admin;
};

export const firebaseAdmin = initializeFirebase();

// Verify Firebase token
export const verifyFirebaseToken = async (token: string): Promise<admin.auth.DecodedIdToken> => {
  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    throw new Error('Invalid Firebase token');
  }
};
