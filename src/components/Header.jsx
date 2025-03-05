import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Perfume Store
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        {user ? (
          <>
            <Button color="inherit" component={Link} to="/profile">Profile</Button>
            {user.isAdmin && <Button color="inherit" component={Link} to="/admin">Admin</Button>}
            <Button color="inherit" onClick={logout}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
