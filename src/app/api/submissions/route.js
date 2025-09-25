// Cross-device storage using a working external service
// Using httpbin.org for testing, then we'll implement a proper solution

// For now, let's use a simple approach that works
// We'll store data in a way that all devices can access

export async function GET() {
  try {
    console.log('GET /api/submissions - returning test data for debugging');
    
    // Return test data to verify the system is working
    const testSubmissions = [
      {
        id: 'test-1',
        companyName: 'Test Company',
        contactPerson: 'Test Person',
        email: 'test@example.com',
        subscriptionTier: 'medium',
        status: 'pending_payment',
        dateCreated: new Date().toISOString(),
        orderId: 'test-order-1',
        employees: [
          {
            name: 'John Doe',
            birthday: '1990-05-15',
            cakePreference: 'Chocolate',
            specialNotes: 'No nuts',
            employmentStatus: 'active'
          }
        ]
      }
    ];
    
    return Response.json({ 
      success: true, 
      submissions: testSubmissions,
      count: testSubmissions.length,
      source: 'Test Data',
      message: 'This is test data to verify the system is working'
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
    
    // For now, just acknowledge receipt and log the data
    console.log('Received submissions data:', JSON.stringify(submissions, null, 2));
    
    return Response.json({ 
      success: true, 
      message: 'Submissions received and logged (not yet stored externally)',
      count: submissions.length,
      source: 'API Endpoint',
      note: 'Data is being logged but not stored externally yet'
    });
  } catch (error) {
    console.error('Error in POST /api/submissions:', error);
    return Response.json({ 
      success: false, 
      error: 'Failed to process submissions' 
    }, { status: 500 });
  }
}
