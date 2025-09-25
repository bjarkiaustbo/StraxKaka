import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'submissions.json');

// Ensure data directory exists
const ensureDataDir = () => {
  const dataDir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Read submissions from file
export const readSubmissions = () => {
  try {
    ensureDataDir();
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error reading submissions:', error);
    return [];
  }
};

// Write submissions to file
export const writeSubmissions = (submissions) => {
  try {
    ensureDataDir();
    fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2));
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
