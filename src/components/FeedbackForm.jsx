import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "../services/api";
import { useAuth } from "../context/AuthContext";

const FeedbackForm = ({ perfumeId, onFeedbackAdded }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const submitFeedback = async () => {
    await axios.post(`/perfumes/${perfumeId}/feedback`, { rating, comment });
    setRating("");
    setComment("");
    onFeedbackAdded();
  };

  return (
    <div>
      <TextField label="Rating (1-3)" value={rating} onChange={(e) => setRating(e.target.value)} fullWidth />
      <TextField label="Comment" value={comment} onChange={(e) => setComment(e.target.value)} fullWidth />
      <Button variant="contained" onClick={submitFeedback}>Submit Feedback</Button>
    </div>
  );
};

export default FeedbackForm;
