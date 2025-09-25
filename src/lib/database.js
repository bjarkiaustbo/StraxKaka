// Simple in-memory storage that persists during the function execution
let submissionsData = [];

// Read submissions from memory
export const readSubmissions = () => {
  try {
    console.log('Reading submissions from memory:', submissionsData.length);
    return submissionsData;
  } catch (error) {
    console.error('Error reading submissions:', error);
    return [];
  }
};

// Write submissions to memory
export const writeSubmissions = (submissions) => {
  try {
    submissionsData = submissions;
    console.log('Submissions updated in memory:', submissions.length, 'entries');
    return true;
  } catch (error) {
    console.error('Error writing submissions:', error);
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
