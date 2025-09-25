// Cross-device storage using Firebase Firestore
import { getAllSubmissions, saveSubmission } from '../../../lib/firebase.js';

export async function GET() {
  try {
    console.log('GET /api/submissions - fetching from Firestore...');
    
    const result = await getAllSubmissions();
    
    if (result.success) {
      return Response.json({ 
        success: true, 
        submissions: result.submissions,
        count: result.submissions.length,
        source: 'Firebase Firestore',
        message: 'Data retrieved from Firestore successfully'
      });
    } else {
      return Response.json({ 
        success: false, 
        error: result.error,
        submissions: [],
        count: 0
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in GET /api/submissions:', error);
    return Response.json({ 
      success: false, 
      error: 'Failed to read submissions from Firestore' 
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { submissions } = await request.json();
    console.log('POST /api/submissions - received', submissions?.length || 0, 'submissions');
    
    if (Array.isArray(submissions)) {
      // Save each submission to Firestore
      const results = [];
      for (const submission of submissions) {
        const result = await saveSubmission(submission);
        results.push(result);
      }
      
      const successCount = results.filter(r => r.success).length;
      console.log(`Successfully saved ${successCount}/${submissions.length} submissions to Firestore`);
      
      return Response.json({ 
        success: true, 
        message: `Submissions saved to Firestore successfully (${successCount}/${submissions.length})`,
        count: successCount,
        source: 'Firebase Firestore'
      });
    } else {
      return Response.json({ 
        success: false, 
        error: 'Invalid data format' 
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Error in POST /api/submissions:', error);
    return Response.json({ 
      success: false, 
      error: 'Failed to save submissions to Firestore' 
    }, { status: 500 });
  }
}
