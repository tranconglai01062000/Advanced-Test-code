import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

function UserCard({ user, onClick }) {
  return (
    <Card sx={{ maxWidth: 345, marginBottom: '16px', cursor: 'pointer' }} onClick={onClick}>
      <CardContent>
        <Typography variant="h6" component="div">
          {user.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Age: {user.age}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Region: {user.region}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Gender: {user.gender}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default UserCard;