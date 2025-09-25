// Cross-device data storage using file-based API
const API_BASE = '/api/data/submissions';

// Read submissions from file-based API
export const readSubmissions = async () => {
  try {
    const response = await fetch(API_BASE);
    if (response.ok) {
      const data = await response.json();
      console.log('Read submissions from API:', data.submissions?.length || 0);
      return data.submissions || [];
    }
    console.error('Failed to read submissions from API:', response.status);
    return [];
  } catch (error) {
    console.error('Error reading submissions from API:', error);
    return [];
  }
};

// Write submissions to file-based API
export const writeSubmissions = async (submissions) => {
  try {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ submissions }),
    });
    
    if (response.ok) {
      console.log('Successfully wrote submissions to API:', submissions.length);
      return true;
    } else {
      console.error('Failed to write submissions to API:', response.status);
      return false;
    }
  } catch (error) {
    console.error('Error writing submissions to API:', error);
    return false;
  }
};

// Add a new submission
export const addSubmission = (submission) => {
  const submissions = readSubmissions();
  submissions.push(submission);
  return writeSubmissions(submissions);
};

// Update a submission
export const updateSubmission = (id, updates) => {
  const submissions = readSubmissions();
  const index = submissions.findIndex(sub => sub.id === id);
  if (index !== -1) {
    submissions[index] = { ...submissions[index], ...updates };
    return writeSubmissions(submissions);
  }
  return false;
};

// Delete a submission
export const deleteSubmission = (id) => {
  const submissions = readSubmissions();
  const filtered = submissions.filter(sub => sub.id !== id);
  return writeSubmissions(filtered);
};
