import axios from 'axios';

// Function to get list of users
export const fetchUsers = async () => {
  try {
    const response = await axios.get('http://araonsoft.com:9081/api/Test/GetSampleUserList');
    
    if (response.data && Array.isArray(response.data.results)) {
      return response.data.results; // Returns a list of users from the `results` field
    } else {
      console.error('The API returned an invalid error:', response.data);
      return []; // If there is no array, return blank
    }
  } catch (error) {
    console.error('error when calling API:', error);
    return []; // If an error occurs, return an empty array
  }
};
