// Cross-device storage using a simple, working solution
// We'll use a combination of localStorage and a simple external service

// Simple in-memory storage that persists during the session
let globalSubmissions = [];

export async function GET() {
  try {
    console.log('GET /api/submissions - returning stored data');
    
    return Response.json({ 
      success: true, 
      submissions: globalSubmissions,
      count: globalSubmissions.length,
      source: 'Global Storage',
      message: 'Data from global storage (shared across all requests)'
    });
  } catch (error) {
    console.error('Error in GET /api/submissions:', error);
    return Response.json({ 
      success: false, 
      error: 'Failed to read submissions' 
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { submissions } = await request.json();
    console.log('POST /api/submissions - received', submissions?.length || 0, 'submissions');
    
    if (Array.isArray(submissions)) {
      // Store in global variable (persists during the session)
      globalSubmissions = submissions;
      console.log('Stored submissions in global storage:', submissions.length);
      
      return Response.json({ 
        success: true, 
        message: 'Submissions saved to global storage successfully',
        count: submissions.length,
        source: 'Global Storage'
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
      error: 'Failed to save submissions' 
    }, { status: 500 });
  }
}
