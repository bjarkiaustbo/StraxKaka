// Cross-device storage using JSONBin.io for real-time sync
const JSONBIN_API_KEY = '$2a$10$8K1p/a0dL3vF7VQ5VQ5VQe'; // Free public key
const JSONBIN_BIN_ID = '65f8a8c21f5677401f2b8c8a'; // Your bin ID
const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;

// Read submissions from JSONBin
const readFromJSONBin = async () => {
  try {
    const response = await fetch(JSONBIN_URL, {
      headers: {
        'X-Master-Key': JSONBIN_API_KEY,
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('Retrieved data from JSONBin:', data.record?.length || 0, 'submissions');
      return data.record || [];
    } else {
      console.error('Failed to read from JSONBin:', response.status);
      return [];
    }
  } catch (error) {
    console.error('Error reading from JSONBin:', error);
    return [];
  }
};

// Write submissions to JSONBin
const writeToJSONBin = async (submissions) => {
  try {
    const response = await fetch(JSONBIN_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': JSONBIN_API_KEY,
      },
      body: JSON.stringify(submissions),
    });
    
    if (response.ok) {
      console.log('Successfully wrote to JSONBin:', submissions.length, 'submissions');
      return true;
    } else {
      console.error('Failed to write to JSONBin:', response.status);
      return false;
    }
  } catch (error) {
    console.error('Error writing to JSONBin:', error);
    return false;
  }
};

export async function GET() {
  try {
    console.log('GET /api/submissions - reading from JSONBin...');
    const submissions = await readFromJSONBin();
    
    return Response.json({ 
      success: true, 
      submissions,
      count: submissions.length,
      source: 'JSONBin'
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
      const success = await writeToJSONBin(submissions);
      
      if (success) {
        return Response.json({ 
          success: true, 
          message: 'Submissions saved to JSONBin successfully',
          count: submissions.length,
          source: 'JSONBin'
        });
      } else {
        throw new Error('Failed to write to JSONBin');
      }
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
