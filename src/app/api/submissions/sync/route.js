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
    console.log('POST /api/submissions/sync called');
    const { submissions } = await request.json();
    console.log('Received submissions:', submissions?.length || 0);
    
    if (Array.isArray(submissions)) {
      console.log('Writing submissions to database...');
      const success = writeSubmissions(submissions);
      console.log('Write success:', success);
      
      if (success) {
        console.log('Data synced successfully, count:', submissions.length);
        return Response.json({ 
          success: true, 
          message: 'Data synced successfully',
          count: submissions.length
        });
      } else {
        console.error('Failed to write data to database');
        return Response.json({ 
          success: false, 
          error: 'Failed to write data' 
        }, { status: 500 });
      }
    } else {
      console.error('Invalid data format received:', typeof submissions);
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
