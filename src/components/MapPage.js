import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import "./MapPage.css";

const MapPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Used to store selected users
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://araonsoft.com:9081/api/Test/GetSampleUserList');
        const data = await response.json();
        console.log('API data:', data);
        if (data && Array.isArray(data.results)) {
          const validUsers = data.results.filter(user => user.latitude && user.longitude);
          setUsers(validUsers);
          setFilteredUsers(validUsers); // Default display all user
        } else {
          setUsers([]);
          setFilteredUsers([]);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Unable to load data.');
      }
    };
    fetchData();
  }, []);

  const center = filteredUsers.length
    ? {
        lat: filteredUsers.reduce((sum, user) => sum + user.latitude, 0) / filteredUsers.length,
        lng: filteredUsers.reduce((sum, user) => sum + user.longitude, 0) / filteredUsers.length,
      }
    : { lat: 21.0285, lng: 105.8542 };

  const filterUsers = (gender, minAge, maxAge) => {
    const filtered = users.filter(user => {
      const age = user.age;
      const userGender = user.gender.toLowerCase();
      return (
        (gender ? userGender === gender.toLowerCase() : true) &&
        (minAge ? age >= minAge : true) &&
        (maxAge ? age <= maxAge : true)
      );
    });
    setFilteredUsers(filtered);
  };

  return (
    <div>
      <h1>Map of Users</h1>
      <div>
        {/* User filter conditions */}
        <button onClick={() => filterUsers('Male', 20, 30)}>Male, 20-30</button>
        <button onClick={() => filterUsers('Female', 30, 40)}>Female, 30-40</button>
        <button onClick={() => filterUsers('', 0, 100)}>All Users</button>
      </div>

      <div style={{ height: '500px', width: '100%' }}>
        {error ? (
          <p>{error}</p>
        ) : (
          <LoadScript googleMapsApiKey="AIzaSyAOf1uRMVP67IyPgb77TO_RQgqpvux99qU">
            <GoogleMap
              mapContainerStyle={{ height: '100%', width: '100%' }}
              center={center}
              zoom={12}
            >
              {/* Mark users on the map */}
              {filteredUsers.map(user => (
                <Marker
                  key={user.id}
                  position={{ lat: user.latitude, lng: user.longitude }}
                  onClick={() => setSelectedUser(user)} //When clicking on the marker, setSelectedUser
                />
              ))}
              
              {/*Show InfoWindow when clicking on Marker */}
              {selectedUser && (
                <InfoWindow
                  position={{
                    lat: selectedUser.latitude,
                    lng: selectedUser.longitude,
                  }}
                  onCloseClick={() => setSelectedUser(null)} // Close InfoWindow when clicking X
                >
                  <div>
                    <h3>{selectedUser.name}</h3>
                    <p>Age: {selectedUser.age}</p>
                    <p>Gender: {selectedUser.gender}</p>
                    <p>Location: {selectedUser.latitude}, {selectedUser.longitude}</p> {/* Show latitude and experience */}
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
        )}
      </div>
    </div>
  );
};

export default MapPage;
