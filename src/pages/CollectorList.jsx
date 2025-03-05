import React, { useEffect, useState } from "react";
import axios from "../services/api";
import { Container, Typography, List, ListItem } from "@mui/material";

const CollectorList = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios.get("/collectors").then(response => setMembers(response.data));
  }, []);

  return (
    <Container>
      <Typography variant="h4">Member List</Typography>
      <List>
        {members.map((member) => (
          <ListItem key={member._id}>{member.name} ({member.email})</ListItem>
        ))}
      </List>
    </Container>
  );
};

export default CollectorList;
