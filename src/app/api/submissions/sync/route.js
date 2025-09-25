import { readSubmissions, writeSubmissions } from '@/lib/database';

export async function GET() {
  try {
    const submissions = readSubmissions();
    return Response.json({ 
      success: true, 
      message: 'Data retrieved successfully',
      submissions
    });
  } catch (error) {
    console.error('Data sync error:', error);
    return Response.json({ 
      success: false, 
      error: 'Failed to retrieve data' 
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { submissions } = await request.json();
    
    if (Array.isArray(submissions)) {
      const success = writeSubmissions(submissions);
      if (success) {
        return Response.json({ 
          success: true, 
          message: 'Data synced successfully',
          count: submissions.length
        });
      } else {
        return Response.json({ 
          success: false, 
          error: 'Failed to write data' 
        }, { status: 500 });
      }
    } else {
      return Response.json({ 
        success: false, 
        error: 'Invalid data format' 
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Data sync error:', error);
    return Response.json({ 
      success: false, 
      error: 'Failed to sync data' 
    }, { status: 500 });
  }
}
