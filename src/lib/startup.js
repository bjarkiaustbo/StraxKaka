import recurringBilling from './recurringBilling';

// Start recurring billing service when the application starts
// This should be called from your main application file

export function startServices() {
  console.log('Starting StraxKaka services...');
  
  // Start recurring billing
  recurringBilling.start();
  
  console.log('All services started successfully');
}

export function stopServices() {
  console.log('Stopping StraxKaka services...');
  
  // Stop recurring billing
  recurringBilling.stop();
  
  console.log('All services stopped');
}

// Auto-start in production
if (process.env.NODE_ENV === 'production') {
  startServices();
}


