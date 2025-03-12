import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/api";
import { Typography, Container, Box, List, ListItem, ListItemText } from "@mui/material";
import FeedbackForm from "../components/FeedbackForm";
import { useAuth } from "../context/AuthContext";

const PerfumeDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [perfume, setPerfume] = useState(null);
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const fetchPerfumeDetails = async () => {
      try {
        const response = await axios.get(`/perfumes/${id}`);
        setPerfume(response.data);
        setFeedbackList(response.data.feedback || []);
      } catch (err) {
        console.error("Error fetching perfume details:", err);
      }
    };

    fetchPerfumeDetails();
  }, [id]);

  const handleFeedbackAdded = async () => {
    try {
      const response = await axios.get(`/perfumes/${id}`);
      setFeedbackList(response.data.feedback || []);
    } catch (err) {
      console.error("Error fetching feedback:", err);
    }
  };

  if (!perfume) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Typography variant="h4">{perfume.perfumeName}</Typography>
      <img 
        src={perfume.uri || "https://via.placeholder.com/300"} 
        alt={perfume.perfumeName}
        style={{ width: "300px", height: "auto", marginBottom: "10px" }}
      />
      <Typography variant="subtitle1">
        Brand: {perfume.brand?.brandName || "Unknown"}
      </Typography>
      <Typography variant="body1">{perfume.description}</Typography>

      {/* Hiển thị danh sách feedback */}
      <Box mt={2}>
        <Typography variant="h6">Feedback</Typography>
        {feedbackList.length > 0 ? (
          <List>
            {feedbackList.map((fb, index) => (
              <ListItem key={index}>
                <ListItemText primary={`⭐ ${fb.rating} - ${fb.comment}`} secondary={`By: ${fb.user?.name || "Anonymous"}`} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No feedback yet.</Typography>
        )}
      </Box>

      {/* 🛑 Chỉ User mới được gửi feedback */}
      {!user?.isAdmin && (
        <Box mt={2}>
          <FeedbackForm perfumeId={id} onFeedbackAdded={handleFeedbackAdded} />
        </Box>
      )}
    </Container>
  );
};

export default PerfumeDetails;
