import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'public', 'data', 'submissions.json');

// Read submissions from JSON file
const readSubmissions = () => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error reading submissions file:', error);
    return [];
  }
};

// Write submissions to JSON file
const writeSubmissions = (submissions) => {
  try {
    // Ensure directory exists
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing submissions file:', error);
    return false;
  }
};

export async function GET() {
  try {
    const submissions = readSubmissions();
    console.log('GET /api/data/submissions - returning', submissions.length, 'submissions');
    
    return Response.json({ 
      success: true, 
      submissions,
      count: submissions.length
    });
  } catch (error) {
    console.error('Error in GET /api/data/submissions:', error);
    return Response.json({ 
      success: false, 
      error: 'Failed to read submissions' 
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { submissions } = await request.json();
    console.log('POST /api/data/submissions - received', submissions?.length || 0, 'submissions');
    
    if (Array.isArray(submissions)) {
      const success = writeSubmissions(submissions);
      if (success) {
        console.log('Successfully wrote', submissions.length, 'submissions to file');
        return Response.json({ 
          success: true, 
          message: 'Submissions saved successfully',
          count: submissions.length
        });
      } else {
        console.error('Failed to write submissions to file');
        return Response.json({ 
          success: false, 
          error: 'Failed to save submissions' 
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
    console.error('Error in POST /api/data/submissions:', error);
    return Response.json({ 
      success: false, 
      error: 'Failed to process submissions' 
    }, { status: 500 });
  }
}
