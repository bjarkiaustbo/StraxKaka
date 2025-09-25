// Firebase Admin SDK for server-side operations
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin
let adminApp;
let adminDb;

if (getApps().length === 0) {
  // Initialize with service account (for production)
  // For now, we'll use the project ID and let Firebase handle auth
  adminApp = initializeApp({
    projectId: 'straxlife-5f3b0',
    // In production, you would use a service account key
    // credential: cert(serviceAccount)
  });
} else {
  adminApp = getApps()[0];
}

adminDb = getFirestore(adminApp);

// Helper functions for submissions using Admin SDK
export const saveSubmissionAdmin = async (submissionData) => {
  try {
    const docRef = await adminDb.collection('submissions').add({
      ...submissionData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log("Document written with ID: ", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false, error: error.message };
  }
};

export const getAllSubmissionsAdmin = async () => {
  try {
    const snapshot = await adminDb.collection('submissions').get();
    const submissions = [];
    snapshot.forEach((doc) => {
      submissions.push({
        id: doc.id,
        ...doc.data()
      });
    });
    console.log("Retrieved submissions: ", submissions.length);
    return { success: true, submissions };
  } catch (error) {
    console.error("Error getting documents: ", error);
    return { success: false, error: error.message, submissions: [] };
  }
};

export const updateSubmissionAdmin = async (submissionId, updateData) => {
  try {
    await adminDb.collection('submissions').doc(submissionId).update({
      ...updateData,
      updatedAt: new Date()
    });
    console.log("Document updated with ID: ", submissionId);
    return { success: true };
  } catch (error) {
    console.error("Error updating document: ", error);
    return { success: false, error: error.message };
  }
};

export const deleteSubmissionAdmin = async (submissionId) => {
  try {
    await adminDb.collection('submissions').doc(submissionId).delete();
    console.log("Document deleted with ID: ", submissionId);
    return { success: true };
  } catch (error) {
    console.error("Error deleting document: ", error);
    return { success: false, error: error.message };
  }
};

export { adminDb };
