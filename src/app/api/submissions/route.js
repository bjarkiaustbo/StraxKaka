// Simple in-memory storage that persists during the function execution
let submissionsData = [];

export async function GET() {
  try {
    console.log('GET /api/submissions - returning', submissionsData.length, 'submissions');
    
    return Response.json({ 
      success: true, 
      submissions: submissionsData,
      count: submissionsData.length
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
      submissionsData = submissions;
      console.log('Successfully stored', submissions.length, 'submissions in memory');
      
      return Response.json({ 
        success: true, 
        message: 'Submissions saved successfully',
        count: submissions.length
      });
    } else {
      console.error('Invalid data format received:', typeof submissions);
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
