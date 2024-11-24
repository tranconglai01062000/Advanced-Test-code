import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import './FilterPage.css';

function FilterPage() {
  const [users, setUsers] = useState([]);  // To store the original list of users
  const [filteredUsers, setFilteredUsers] = useState([]);  // To store the filtered and sorted list of users
  const [searchTerm, setSearchTerm] = useState('');  // Store the current search term
  const [sortOrder, setSortOrder] = useState('asc');  // Sort order, default 'asc'
  const [openDialog, setOpenDialog] = useState(false);  // To control the dialog visibility
  const [selectedUser, setSelectedUser] = useState(null);  // To store the selected user details

  // Fetch users from API
  useEffect(() => {
    axios.get('http://araonsoft.com:9081/api/Test/GetSampleUserList')
      .then(response => {
        if (Array.isArray(response.data)) {
          const formattedUsers = response.data.map(user => ({
            id: user.id,  // Assuming `id` exists
            name: user.name,  // The `name` field is available
            age: user.dob.age,  // The `dob` field contains the age
            location: `${user.street.name}, ${user.city}, ${user.state}, ${user.country}`,  // Creating location from various address fields
            phoneNumber: user.phoneNumber || 'Not Available'  // If no phone number, show 'Not Available'
          }));
          setUsers(formattedUsers);
          setFilteredUsers(formattedUsers);  // Initialize filtered list with fetched users
        } else {
          console.error("The returned data is not an array:", response.data);
        }
      })
      .catch(error => console.error("Error loading data:", error));
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    // Filter users based on the search term
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(value) ||
      user.age.toString().includes(value) ||
      user.location.toLowerCase().includes(value) ||  // Filter by location
      user.phoneNumber.toLowerCase().includes(value)  // Filter by phone number
    );

    setFilteredUsers(filtered);
  };

  // Handle sorting by field (name, age, location, or phone number)
  const handleSort = (field) => {
    const order = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(order);
    const sortedData = [...filteredUsers].sort((a, b) => {
      if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredUsers(sortedData);
  };

  // Open dialog to view user details
  const handleOpenDialog = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  return (
    <div>
      <h1>User List with Filter</h1>
      
      {/* Search Input */}
      <TextField
        label="Search by Name, Age, Location, or Phone Number"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: '20px', width: '300px' }}
      />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={true}
                direction={sortOrder}
                onClick={() => handleSort('name')}>
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={true}
                direction={sortOrder}
                onClick={() => handleSort('age')}>
                Age
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={true}
                direction={sortOrder}
                onClick={() => handleSort('location')}>
                Location
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={true}
                direction={sortOrder}
                onClick={() => handleSort('phoneNumber')}>
                Phone Number
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id} onClick={() => handleOpenDialog(user)}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.age}</TableCell>
              <TableCell>{user.location}</TableCell>  {/* Location Column */}
              <TableCell>{user.phoneNumber}</TableCell>  {/* Phone Number Column */}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Dialog to show user details */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <>
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Age:</strong> {selectedUser.age}</p>
              <p><strong>Location:</strong> {selectedUser.location}</p>
              <p><strong>Phone Number:</strong> {selectedUser.phoneNumber}</p>
              <p><strong>Gender:</strong> {selectedUser.gender}</p> {/* Assuming gender exists */}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FilterPage;
