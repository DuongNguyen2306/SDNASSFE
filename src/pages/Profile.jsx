import React, { useEffect, useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import axios from "../services/api";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState(""); // Thêm ô nhập mật khẩu mới

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleUpdate = async () => {
    try {
      const updatedData = { name };
      if (password) {
        updatedData.password = password; // Chỉ gửi mật khẩu nếu có thay đổi
      }

      const token = localStorage.getItem("token");
      await axios.put("/members/" + user._id, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Profile updated successfully!");
      setPassword(""); // Reset ô nhập mật khẩu
    } catch (error) {
      alert("Update failed!");
    }
  };

  return (
    <Container>
      <Typography variant="h4">Profile</Typography>
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
      <TextField label="Email" value={email} disabled fullWidth />
      <TextField label="New Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
      <Button variant="contained" onClick={handleUpdate}>Update</Button>
    </Container>
  );
};

export default Profile;
