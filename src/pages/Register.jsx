import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import axios from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post("/auth/register", { name, email, password });
      navigate("/login");
    } catch (error) {
      alert("Registration failed!");
    }
  };

  return (
    <Container>
      <Typography variant="h4">Register</Typography>
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
      <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
      <Button variant="contained" onClick={handleRegister}>Register</Button>
    </Container>
  );
};

export default Register;
