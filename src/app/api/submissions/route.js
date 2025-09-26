// Cross-device storage using Firebase Firestore
// Using Firebase REST API with proper authentication

const FIREBASE_PROJECT_ID = 'straxlife-5f3b0';
const FIREBASE_API_KEY = 'AIzaSyDYo2GJKr2q7JUVkKiCM1w-aEc-33QUiQk';
const FIRESTORE_URL = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/submissions`;

export async function GET() {
  try {
    const response = await fetch(`${FIRESTORE_URL}?key=${FIREBASE_API_KEY}`);
    
    if (response.ok) {
      const data = await response.json();
      const submissions = [];
      
      if (data.documents) {
        data.documents.forEach(doc => {
          const fields = doc.fields || {};
          submissions.push({
            id: doc.name.split('/').pop(),
            companyName: fields.companyName?.stringValue || '',
            contactPersonName: fields.contactPersonName?.stringValue || fields.contactPerson?.stringValue || '',
            contactEmail: fields.contactEmail?.stringValue || fields.email?.stringValue || '',
            contactPhone: fields.contactPhone?.stringValue || '',
            deliveryAddress: fields.deliveryAddress?.stringValue || '',
            subscriptionTier: fields.subscriptionTier?.stringValue || '',
            status: fields.status?.stringValue || '',
            subscriptionStatus: fields.subscriptionStatus?.stringValue || '',
            monthlyCost: fields.monthlyCost?.doubleValue || fields.monthlyCost?.integerValue || 0,
            dateCreated: fields.dateCreated?.stringValue || '',
            orderId: fields.orderId?.stringValue || '',
            lastPaymentDate: fields.lastPaymentDate?.stringValue || '',
            nextPaymentDate: fields.nextPaymentDate?.stringValue || '',
            paymentReminderSent: fields.paymentReminderSent?.booleanValue || false,
            notes: fields.notes?.stringValue || '',
            lastContactDate: fields.lastContactDate?.stringValue || '',
            lastContactNotes: fields.lastContactNotes?.stringValue || '',
            employees: fields.employees?.arrayValue?.values?.map(emp => ({
              name: emp.mapValue?.fields?.name?.stringValue || '',
              birthday: emp.mapValue?.fields?.birthday?.stringValue || '',
              cakeType: emp.mapValue?.fields?.cakeType?.stringValue || emp.mapValue?.fields?.cakePreference?.stringValue || '',
              cakeSize: emp.mapValue?.fields?.cakeSize?.stringValue || '',
              dietaryRestrictions: emp.mapValue?.fields?.dietaryRestrictions?.stringValue || '',
              specialNotes: emp.mapValue?.fields?.specialNotes?.stringValue || '',
              employmentStatus: emp.mapValue?.fields?.employmentStatus?.stringValue || 'active',
              deliveryStatus: emp.mapValue?.fields?.deliveryStatus?.stringValue || 'pending',
              deliveryDate: emp.mapValue?.fields?.deliveryDate?.stringValue || '',
              deliveryNotes: emp.mapValue?.fields?.deliveryNotes?.stringValue || ''
            })) || []
          });
        });
      }
      
      return Response.json({ 
        success: true, 
        submissions,
        count: submissions.length
      });
    } else {
      const errorText = await response.text();
      console.error('Failed to fetch from Firestore:', response.status, errorText);
      return Response.json({ 
        success: false, 
        error: 'Failed to fetch from Firestore',
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
    
    if (Array.isArray(submissions)) {
      const results = [];
      
      for (const submission of submissions) {
        try {
          const firestoreDoc = {
            fields: {
              companyName: { stringValue: submission.companyName || '' },
              contactPersonName: { stringValue: submission.contactPersonName || submission.contactPerson || '' },
              contactEmail: { stringValue: submission.contactEmail || submission.email || '' },
              contactPhone: { stringValue: submission.contactPhone || '' },
              deliveryAddress: { stringValue: submission.deliveryAddress || '' },
              subscriptionTier: { stringValue: submission.subscriptionTier || '' },
              status: { stringValue: submission.status || '' },
              subscriptionStatus: { stringValue: submission.subscriptionStatus || '' },
              monthlyCost: { doubleValue: submission.monthlyCost || 0 },
              dateCreated: { stringValue: submission.dateCreated || new Date().toISOString() },
              orderId: { stringValue: submission.orderId || '' },
              lastPaymentDate: { stringValue: submission.lastPaymentDate || '' },
              nextPaymentDate: { stringValue: submission.nextPaymentDate || '' },
              paymentReminderSent: { booleanValue: submission.paymentReminderSent || false },
              notes: { stringValue: submission.notes || '' },
              lastContactDate: { stringValue: submission.lastContactDate || '' },
              lastContactNotes: { stringValue: submission.lastContactNotes || '' },
              employees: {
                arrayValue: {
                  values: (submission.employees || []).map(emp => ({
                    mapValue: {
                      fields: {
                        name: { stringValue: emp.name || '' },
                        birthday: { stringValue: emp.birthday || '' },
                        cakeType: { stringValue: emp.cakeType || emp.cakePreference || '' },
                        cakeSize: { stringValue: emp.cakeSize || '' },
                        dietaryRestrictions: { stringValue: emp.dietaryRestrictions || '' },
                        specialNotes: { stringValue: emp.specialNotes || '' },
                        employmentStatus: { stringValue: emp.employmentStatus || 'active' },
                        deliveryStatus: { stringValue: emp.deliveryStatus || 'pending' },
                        deliveryDate: { stringValue: emp.deliveryDate || '' },
                        deliveryNotes: { stringValue: emp.deliveryNotes || '' }
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
            results.push({ success: false, error: 'Failed to save to Firestore' });
          }
        } catch (error) {
          results.push({ success: false, error: error.message });
        }
      }
      
      const successCount = results.filter(r => r.success).length;
      
      return Response.json({ 
        success: true, 
        message: `Submissions saved successfully (${successCount}/${submissions.length})`,
        count: successCount
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
