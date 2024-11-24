import axios from 'axios';

// Function to get list of users
export const fetchUsers = async () => {
  try {
    const response = await axios.get('http://araonsoft.com:9081/api/Test/GetSampleUserList');
    if (Array.isArray(response.data)) {
      return response.data; // Returns the list of users if it is an array
    } else {
      console.error('API trả về không phải là mảng:', response.data);
      return []; // Returns empty array if data is invalid
    }
  } catch (error) {
    console.error('An error occurred while calling the API:', error);
    return []; // Returns an empty array if there is an error
  }
};
