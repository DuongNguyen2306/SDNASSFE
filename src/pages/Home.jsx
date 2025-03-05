import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import PerfumeList from "../components/PerfumeList";
import BrandFilter from "../components/BrandFilter";
import axios from "../services/api";

const Home = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");

  useEffect(() => {
    const fetchPerfumes = async () => {
      const response = await axios.get("/perfumes", { params: { brand: selectedBrand } });
      setPerfumes(response.data);
    };
    fetchPerfumes();
  }, [selectedBrand]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Perfume Collection</Typography>
      <BrandFilter onSelectBrand={setSelectedBrand} />
      <PerfumeList perfumes={perfumes} />
    </Container>
  );
};

export default Home;
