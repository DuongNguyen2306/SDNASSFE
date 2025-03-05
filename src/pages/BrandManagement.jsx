import React, { useEffect, useState } from "react";
import axios from "../services/api";
import { Container, Typography, List, ListItem, Button } from "@mui/material";

const BrandManagement = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    axios.get("/brands").then(response => setBrands(response.data));
  }, []);

  return (
    <Container>
      <Typography variant="h4">Manage Brands</Typography>
      <List>
        {brands.map((brand) => (
          <ListItem key={brand._id}>
            {brand.brandName}
            <Button variant="contained" color="error" onClick={() => axios.delete(`/brands/${brand._id}`)}>Delete</Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default BrandManagement;
