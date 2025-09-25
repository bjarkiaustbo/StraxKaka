// Cross-device storage using Firebase Firestore
// Using Firebase REST API with proper authentication

const FIREBASE_PROJECT_ID = 'straxlife-5f3b0';
const FIREBASE_API_KEY = 'AIzaSyDYo2GJKr2q7JUVkKiCM1w-aEc-33QUiQk';
const FIRESTORE_URL = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/submissions`;

export async function GET() {
  try {
    console.log('GET /api/submissions - fetching from Firestore...');
    console.log('Firestore URL:', FIRESTORE_URL);
    
    const response = await fetch(`${FIRESTORE_URL}?key=${FIREBASE_API_KEY}`);
    
    console.log('Firestore response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Firestore response data:', JSON.stringify(data, null, 2));
      
      const submissions = [];
      
      if (data.documents) {
        data.documents.forEach(doc => {
          const fields = doc.fields || {};
          submissions.push({
            id: doc.name.split('/').pop(),
            companyName: fields.companyName?.stringValue || '',
            contactPerson: fields.contactPerson?.stringValue || '',
            email: fields.email?.stringValue || '',
            subscriptionTier: fields.subscriptionTier?.stringValue || '',
            status: fields.status?.stringValue || '',
            dateCreated: fields.dateCreated?.stringValue || '',
            orderId: fields.orderId?.stringValue || '',
            employees: fields.employees?.arrayValue?.values?.map(emp => ({
              name: emp.mapValue?.fields?.name?.stringValue || '',
              birthday: emp.mapValue?.fields?.birthday?.stringValue || '',
              cakePreference: emp.mapValue?.fields?.cakePreference?.stringValue || '',
              specialNotes: emp.mapValue?.fields?.specialNotes?.stringValue || '',
              employmentStatus: emp.mapValue?.fields?.employmentStatus?.stringValue || 'active'
            })) || []
          });
        });
      }
      
      console.log('Retrieved submissions from Firestore:', submissions.length);
      
      return Response.json({ 
        success: true, 
        submissions,
        count: submissions.length,
        source: 'Firebase Firestore',
        message: 'Data retrieved from Firestore successfully'
      });
    } else {
      const errorText = await response.text();
      console.error('Failed to fetch from Firestore:', response.status, errorText);
      return Response.json({ 
        success: false, 
        error: `Failed to fetch from Firestore: ${response.status} - ${errorText}`,
        submissions: [],
        count: 0
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in GET /api/submissions:', error);
    return Response.json({ 
      success: false, 
      error: `Failed to read submissions from Firestore: ${error.message}` 
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { submissions } = await request.json();
    console.log('POST /api/submissions - received', submissions?.length || 0, 'submissions');
    
    if (Array.isArray(submissions)) {
      // Save each submission to Firestore using REST API
      const results = [];
      
      for (const submission of submissions) {
        try {
          const firestoreDoc = {
            fields: {
              companyName: { stringValue: submission.companyName || '' },
              contactPerson: { stringValue: submission.contactPerson || '' },
              email: { stringValue: submission.email || '' },
              subscriptionTier: { stringValue: submission.subscriptionTier || '' },
              status: { stringValue: submission.status || '' },
              dateCreated: { stringValue: submission.dateCreated || new Date().toISOString() },
              orderId: { stringValue: submission.orderId || '' },
              employees: {
                arrayValue: {
                  values: (submission.employees || []).map(emp => ({
                    mapValue: {
                      fields: {
                        name: { stringValue: emp.name || '' },
                        birthday: { stringValue: emp.birthday || '' },
                        cakePreference: { stringValue: emp.cakePreference || '' },
                        specialNotes: { stringValue: emp.specialNotes || '' },
                        employmentStatus: { stringValue: emp.employmentStatus || 'active' }
                      }
                    }
                  }))
                }
              }
            }
          };
          
          const response = await fetch(`${FIRESTORE_URL}?key=${FIREBASE_API_KEY}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(firestoreDoc)
          });
          
          if (response.ok) {
            results.push({ success: true });
          } else {
            const errorText = await response.text();
            console.error('Failed to save to Firestore:', response.status, errorText);
            results.push({ success: false, error: `Failed to save to Firestore: ${response.status} - ${errorText}` });
          }
        } catch (error) {
          results.push({ success: false, error: error.message });
        }
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
