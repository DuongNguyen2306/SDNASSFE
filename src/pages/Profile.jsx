import React, { useEffect, useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import axios from "../services/api";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleUpdate = async () => {
    try {
      await axios.put("/profile", { name });
      alert("Profile updated!");
    } catch (error) {
      alert("Update failed!");
    }
  };

  return (
    <Container>
      <Typography variant="h4">Profile</Typography>
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
      <TextField label="Email" value={email} disabled fullWidth />
      <Button variant="contained" onClick={handleUpdate}>Update</Button>
    </Container>
  );
};

export default Profile;
