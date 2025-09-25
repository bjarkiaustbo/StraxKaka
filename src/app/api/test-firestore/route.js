// Test endpoint to verify Firestore access
const FIREBASE_PROJECT_ID = 'straxlife-5f3b0';
const FIREBASE_API_KEY = 'AIzaSyDYo2GJKr2q7JUVkKiCM1w-aEc-33QUiQk';
const FIRESTORE_URL = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/submissions`;

export async function GET() {
  try {
    console.log('Testing Firestore access...');
    console.log('Project ID:', FIREBASE_PROJECT_ID);
    console.log('API Key:', FIREBASE_API_KEY);
    console.log('Firestore URL:', FIRESTORE_URL);
    
    const response = await fetch(`${FIRESTORE_URL}?key=${FIREBASE_API_KEY}`);
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    const responseText = await response.text();
    console.log('Response body:', responseText);
    
    return Response.json({
      success: response.ok,
      status: response.status,
      projectId: FIREBASE_PROJECT_ID,
      apiKey: FIREBASE_API_KEY,
      url: FIRESTORE_URL,
      response: responseText,
      headers: Object.fromEntries(response.headers.entries())
    });
  } catch (error) {
    console.error('Test error:', error);
    return Response.json({
      success: false,
      error: error.message,
      projectId: FIREBASE_PROJECT_ID,
      apiKey: FIREBASE_API_KEY,
      url: FIRESTORE_URL
    });
  }
}
