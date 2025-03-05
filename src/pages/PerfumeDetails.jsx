import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/api";
import { Typography, Container, Box } from "@mui/material";
import FeedbackForm from "../components/FeedbackForm";

const PerfumeDetails = () => {
  const { id } = useParams();
  const [perfume, setPerfume] = useState(null);

  useEffect(() => {
    axios.get(`/perfumes/${id}`).then(response => setPerfume(response.data));
  }, [id]);

  if (!perfume) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Typography variant="h4">{perfume.perfumeName}</Typography>
      <Typography variant="subtitle1">Brand: {perfume.brand.brandName}</Typography>
      <Typography variant="body1">{perfume.description}</Typography>
      <Box mt={2}>
        <FeedbackForm perfumeId={id} onFeedbackAdded={() => axios.get(`/perfumes/${id}`)} />
      </Box>
    </Container>
  );
};

export default PerfumeDetails;
