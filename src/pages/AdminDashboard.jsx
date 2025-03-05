import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <Container>
      <Typography variant="h4">Admin Dashboard</Typography>
      <Button component={Link} to="/admin/brands" variant="contained">Manage Brands</Button>
      <Button component={Link} to="/admin/perfumes" variant="contained">Manage Perfumes</Button>
      <Button component={Link} to="/collectors" variant="contained">View Members</Button>
    </Container>
  );
};

export default AdminDashboard;
