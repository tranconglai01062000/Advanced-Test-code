import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">User List</Button>
        <Button color="inherit" component={Link} to="/charts">Analytics</Button>
        <Button color="inherit" component={Link} to="/map">Map</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
