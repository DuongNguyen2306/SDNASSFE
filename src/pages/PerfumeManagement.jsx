import React, { useEffect, useState } from "react";
import axios from "../services/api";
import { Container, Typography, List, ListItem, Button } from "@mui/material";

const PerfumeManagement = () => {
  const [perfumes, setPerfumes] = useState([]);

  useEffect(() => {
    axios.get("/perfumes").then(response => setPerfumes(response.data));
  }, []);

  return (
    <Container>
      <Typography variant="h4">Manage Perfumes</Typography>
      <List>
        {perfumes.map((perfume) => (
          <ListItem key={perfume._id}>
            {perfume.perfumeName}
            <Button variant="contained" color="error" onClick={() => axios.delete(`/perfumes/${perfume._id}`)}>Delete</Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default PerfumeManagement;
