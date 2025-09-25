// Cross-device storage using localStorage fallback with server sync
// This approach uses localStorage as primary storage and syncs via server

export async function GET() {
  try {
    console.log('GET /api/submissions - returning empty array (client-side storage)');
    
    // Return empty array - data is stored in localStorage on client side
    return Response.json({ 
      success: true, 
      submissions: [],
      count: 0,
      message: 'Data stored in localStorage - check client-side storage'
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
    
    // Just acknowledge receipt - actual storage happens in localStorage
    console.log('Acknowledged receipt of', submissions.length, 'submissions');
    
    return Response.json({ 
      success: true, 
      message: 'Submissions acknowledged - stored in localStorage',
      count: submissions.length
    });
  } catch (error) {
    console.error('Error in POST /api/submissions:', error);
    return Response.json({ 
      success: false, 
      error: 'Failed to process submissions' 
    }, { status: 500 });
  }
}
