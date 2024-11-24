import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import "./MapPage.css";
const MapPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://araonsoft.com:9081/api/Test/GetSampleUserList');
        const data = await response.json();
        console.log('Data returned from API:', data);
        setUsers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error calling API:', err);
        setError('Unable to load data.');
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ height: '500px', width: '100%' }}>
      {error ? (
        <p>{error}</p>
      ) : (
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            mapContainerStyle={{ height: '100%', width: '100%' }}
            center={{ lat: 21.0285, lng: 105.8542 }}
            zoom={12}
          >
            {users
              .filter(user => user.latitude && user.longitude)
              .map((user) => (
                <Marker key={user.id} position={{ lat: user.latitude, lng: user.longitude }} />
              ))}
          </GoogleMap>
        </LoadScript>
      )}
    </div>
  );
};

export default MapPage;
