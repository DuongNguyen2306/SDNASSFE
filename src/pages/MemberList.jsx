import React, { useEffect, useState } from "react";
import axios from "../services/api";
import { Container, Typography, List, ListItem, ListItemText, Button, Card, CardContent } from "@mui/material";

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized: No token found.");
          return;
        }

        const response = await axios.get("/api/members/collectors", { 
          headers: { Authorization: `Bearer ${token}` }, // 🛠️ Sửa header thành Authorization
        });

        setMembers(response.data);
      } catch (err) {
        setError("You do not have permission to access this data.");
      }
    };

    fetchMembers();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Member List</Typography>
      {error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <List>
          {members.map((member) => (
            <Card key={member._id} sx={{ marginBottom: 2 }}>
              <CardContent>
                <ListItem>
                  <ListItemText 
                    primary={member.name} 
                    secondary={`Email: ${member.email} | YOB: ${member.YOB}`} 
                  />
                  <Button 
                    variant="contained" 
                    color={member.isAdmin ? "primary" : "secondary"}
                  >
                    {member.isAdmin ? "Admin" : "Member"}
                  </Button>
                </ListItem>
              </CardContent>
            </Card>
          ))}
        </List>
      )}
    </Container>
  );
};

export default MemberList;
