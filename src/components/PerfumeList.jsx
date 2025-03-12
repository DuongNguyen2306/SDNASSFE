import React, { useEffect, useState } from "react";
import axios from "../services/api";
import { Grid, Card, CardContent, Typography, TextField, Button } from "@mui/material";

const PerfumeList = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [userFeedback, setUserFeedback] = useState({});

  useEffect(() => {
    axios.get("/perfumes").then(response => setPerfumes(response.data));
  }, []);

  // ✅ Gửi feedback
  const handleFeedbackSubmit = async (perfumeId) => {
    try {
        const token = localStorage.getItem("token");
        const feedbackData = userFeedback[perfumeId] || {};

        const response = await axios.post(`http://localhost:5000/api/feedback/${perfumeId}`, feedbackData, {
            headers: { Authorization: `Bearer ${token}` }
        });

        alert("Feedback added successfully!");
        window.location.reload();
    } catch (error) {
        console.error("Error adding feedback:", error);
        alert(error.response?.data?.error || "Failed to add feedback");
    }
};




  return (
    <Grid container spacing={3}>
      {perfumes.map(perfume => (
        <Grid item xs={12} sm={6} md={4} key={perfume._id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{perfume.perfumeName}</Typography>
              <Typography variant="body2">Brand: {perfume.brand?.brandName || "Unknown"}</Typography>

              {/* Hiển thị danh sách feedback */}
              <Typography variant="subtitle2">Feedback:</Typography>
              {perfume.feedback.map((fb, index) => (
                <Typography key={index} variant="body2">
                  ⭐ {fb.rating} - {fb.comment} (by {fb.user?.name || "Anonymous"})
                </Typography>
              ))}

              {/* Form gửi feedback */}
              <TextField
                label="Your Rating (1-5)"
                type="number"
                inputProps={{ min: 1, max: 5 }}
                onChange={(e) => setUserFeedback({
                  ...userFeedback,
                  [perfume._id]: { ...userFeedback[perfume._id], rating: e.target.value }
                })}
              />
              <TextField
                label="Your Comment"
                onChange={(e) => setUserFeedback({
                  ...userFeedback,
                  [perfume._id]: { ...userFeedback[perfume._id], comment: e.target.value }
                })}
              />
              <Button variant="contained" onClick={() => handleFeedbackSubmit(perfume._id)}>Submit</Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PerfumeList;
