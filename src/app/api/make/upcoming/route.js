import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '7');
    
    const submissions = JSON.parse(process.env.STRAXKAKA_SUBSCRIPTIONS || '[]');
    
    const today = new Date();
    const futureDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);
    
    const upcomingDeliveries = [];
    
    submissions.forEach(submission => {
      if (submission.employees) {
        submission.employees.forEach(employee => {
          if (employee.employmentStatus === 'active') {
            const birthday = new Date(employee.birthday);
            birthday.setFullYear(today.getFullYear());
            
            // Check if birthday is within the specified days
            if (birthday >= today && birthday <= futureDate) {
              const daysUntilBirthday = Math.ceil((birthday - today) / (1000 * 60 * 60 * 24));
              
              upcomingDeliveries.push({
                companyName: submission.companyName,
                contactPerson: submission.contactPersonName,
                contactEmail: submission.contactEmail,
                contactPhone: submission.contactPhone,
                deliveryAddress: submission.deliveryAddress,
                employeeName: employee.name,
                birthday: birthday.toISOString().split('T')[0],
                daysUntilBirthday,
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
    
    // Sort by days until birthday
    upcomingDeliveries.sort((a, b) => a.daysUntilBirthday - b.daysUntilBirthday);
    
    return NextResponse.json({
      success: true,
      days,
      count: upcomingDeliveries.length,
      deliveries: upcomingDeliveries
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
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '7');
    
    const submissions = JSON.parse(process.env.STRAXKAKA_SUBSCRIPTIONS || '[]');
    
    const today = new Date();
    const futureDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);
    
    const upcomingDeliveries = [];
    
    submissions.forEach(submission => {
      if (submission.employees) {
        submission.employees.forEach(employee => {
          if (employee.employmentStatus === 'active') {
            const birthday = new Date(employee.birthday);
            birthday.setFullYear(today.getFullYear());
            
            // Check if birthday is within the specified days
            if (birthday >= today && birthday <= futureDate) {
              const daysUntilBirthday = Math.ceil((birthday - today) / (1000 * 60 * 60 * 24));
              
              upcomingDeliveries.push({
                companyName: submission.companyName,
                contactPerson: submission.contactPersonName,
                contactEmail: submission.contactEmail,
                contactPhone: submission.contactPhone,
                deliveryAddress: submission.deliveryAddress,
                employeeName: employee.name,
                birthday: birthday.toISOString().split('T')[0],
                daysUntilBirthday,
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
    
    // Sort by days until birthday
    upcomingDeliveries.sort((a, b) => a.daysUntilBirthday - b.daysUntilBirthday);
    
    return NextResponse.json({
      success: true,
      days,
      count: upcomingDeliveries.length,
      deliveries: upcomingDeliveries
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
