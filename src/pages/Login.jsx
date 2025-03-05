import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      alert("Login failed!");
    }
  };

  return (
    <Container>
      <Typography variant="h4">Login</Typography>
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
      <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
      <Button variant="contained" onClick={handleLogin}>Login</Button>
    </Container>
  );
};

export default Login;
