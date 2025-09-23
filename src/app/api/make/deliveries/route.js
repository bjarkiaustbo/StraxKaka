import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Get today's deliveries from localStorage (in production, use database)
    const submissions = JSON.parse(process.env.STRAXKAKA_SUBSCRIPTIONS || '[]');
    
    const today = new Date().toDateString();
    const todaysDeliveries = [];
    
    submissions.forEach(submission => {
      if (submission.employees) {
        submission.employees.forEach(employee => {
          if (employee.employmentStatus === 'active') {
            const birthday = new Date(employee.birthday);
            birthday.setFullYear(new Date().getFullYear());
            
            if (birthday.toDateString() === today) {
              todaysDeliveries.push({
                companyName: submission.companyName,
                contactPerson: submission.contactPersonName,
                contactEmail: submission.contactEmail,
                contactPhone: submission.contactPhone,
                deliveryAddress: submission.deliveryAddress,
                employeeName: employee.name,
                cakeType: employee.cakeType,
                cakeSize: employee.cakeSize,
                dietaryRestrictions: employee.dietaryRestrictions,
                specialNotes: employee.specialNotes,
                deliveryStatus: employee.deliveryStatus || 'pending',
                orderId: submission.orderId,
                monthlyCost: submission.monthlyCost
              });
            }
          }
        });
      }
    });
    
    return NextResponse.json({
      success: true,
      date: today,
      count: todaysDeliveries.length,
      deliveries: todaysDeliveries
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { deliveryId, status, notes } = await request.json();
    
    // Update delivery status in your data store
    // This would update the admin system
    
    return NextResponse.json({
      success: true,
      message: 'Delivery status updated',
      deliveryId,
      status
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


export async function GET(request) {
  try {
    // Get today's deliveries from localStorage (in production, use database)
    const submissions = JSON.parse(process.env.STRAXKAKA_SUBSCRIPTIONS || '[]');
    
    const today = new Date().toDateString();
    const todaysDeliveries = [];
    
    submissions.forEach(submission => {
      if (submission.employees) {
        submission.employees.forEach(employee => {
          if (employee.employmentStatus === 'active') {
            const birthday = new Date(employee.birthday);
            birthday.setFullYear(new Date().getFullYear());
            
            if (birthday.toDateString() === today) {
              todaysDeliveries.push({
                companyName: submission.companyName,
                contactPerson: submission.contactPersonName,
                contactEmail: submission.contactEmail,
                contactPhone: submission.contactPhone,
                deliveryAddress: submission.deliveryAddress,
                employeeName: employee.name,
                cakeType: employee.cakeType,
                cakeSize: employee.cakeSize,
                dietaryRestrictions: employee.dietaryRestrictions,
                specialNotes: employee.specialNotes,
                deliveryStatus: employee.deliveryStatus || 'pending',
                orderId: submission.orderId,
                monthlyCost: submission.monthlyCost
              });
            }
          }
        });
      }
    });
    
    return NextResponse.json({
      success: true,
      date: today,
      count: todaysDeliveries.length,
      deliveries: todaysDeliveries
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { deliveryId, status, notes } = await request.json();
    
    // Update delivery status in your data store
    // This would update the admin system
    
    return NextResponse.json({
      success: true,
      message: 'Delivery status updated',
      deliveryId,
      status
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
