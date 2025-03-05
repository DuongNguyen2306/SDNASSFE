import React, { useEffect, useState } from "react";
import axios from "../services/api";
import { Grid, Card, CardContent, Typography } from "@mui/material";

const PerfumeList = () => {
  const [perfumes, setPerfumes] = useState([]);

  useEffect(() => {
    axios.get("/perfumes").then(response => setPerfumes(response.data));
  }, []);

  return (
    <Grid container spacing={3}>
      {perfumes.map(perfume => (
        <Grid item xs={12} sm={6} md={4} key={perfume._id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{perfume.perfumeName}</Typography>
              <Typography variant="body2">Brand: {perfume.brand.brandName}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PerfumeList;
