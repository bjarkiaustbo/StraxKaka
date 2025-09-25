// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYo2GJKr2q7JUVkKiCM1w-aEc-33QUiQk",
  authDomain: "straxlife-5f3b0.firebaseapp.com",
  projectId: "straxlife-5f3b0",
  storageBucket: "straxlife-5f3b0.firebasestorage.app",
  messagingSenderId: "914641362495",
  appId: "1:914641362495:web:41ff83f8ede9e3e798228a",
  measurementId: "G-43V9MYP0M3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Export Firestore functions
export { db, collection, addDoc, getDocs, doc, setDoc, updateDoc, deleteDoc };

// Helper functions for submissions
export const saveSubmission = async (submissionData) => {
  try {
    const docRef = await addDoc(collection(db, "submissions"), {
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

export const getAllSubmissions = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "submissions"));
    const submissions = [];
    querySnapshot.forEach((doc) => {
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

export const updateSubmission = async (submissionId, updateData) => {
  try {
    const docRef = doc(db, "submissions", submissionId);
    await updateDoc(docRef, {
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

export const deleteSubmission = async (submissionId) => {
  try {
    await deleteDoc(doc(db, "submissions", submissionId));
    console.log("Document deleted with ID: ", submissionId);
    return { success: true };
  } catch (error) {
    console.error("Error deleting document: ", error);
    return { success: false, error: error.message };
  }
};
