import React, { useEffect, useState } from "react";
import axios from "../services/api";
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  const [perfumes, setPerfumes] = useState([]);

  useEffect(() => {
    axios.get("/perfumes")
      .then(response => {
        // Ưu tiên sản phẩm Extrait lên đầu
        const sortedPerfumes = response.data.sort((a, b) => (b.concentration === "Extrait") - (a.concentration === "Extrait"));
        setPerfumes(sortedPerfumes);
      })
      .catch(error => console.error("Error fetching perfumes:", error));
  }, []);

  return (
    <Container>
      <Typography variant="h4" align="center" sx={{ mb: 3, fontWeight: "bold", color: "#6A1B9A" }}>
        ✨ Perfume Collection ✨
      </Typography>
      <Grid container spacing={3}>
        {perfumes.map(perfume => (
          <Grid item xs={12} sm={6} md={4} key={perfume._id}>
            <Card 
              sx={{ 
                border: perfume.concentration === "Extrait" ? "4px solid gold" : "1px solid #ddd",
                boxShadow: perfume.concentration === "Extrait" ? "0px 0px 15px 3px rgba(255,215,0,0.7)" : "none",
                transform: perfume.concentration === "Extrait" ? "scale(1.05)" : "scale(1)",
                transition: "transform 0.3s ease-in-out",
                background: perfume.concentration === "Extrait"
                  ? "linear-gradient(135deg, #FFD700 30%, #FFEC8B 100%)"
                  : "white"
              }}
            >
              <CardMedia 
                component="img"
                height="200"
                image={perfume.uri || "https://via.placeholder.com/200"} 
                alt={perfume.perfumeName}
              />
              <CardContent>
                {/* Badge nổi bật cho sản phẩm Extrait */}
                {perfume.concentration === "Extrait" && (
                  <Box sx={{
                    backgroundColor: "#FFD700",
                    color: "black",
                    fontWeight: "bold",
                    padding: "5px 10px",
                    display: "inline-block",
                    borderRadius: "10px",
                    boxShadow: "0px 0px 8px rgba(255,215,0,0.7)"
                  }}>
                    ⭐ PREMIUM EXTRACT ⭐
                  </Box>
                )}
                
                <Typography variant="h6" sx={{ mt: 1 }}>{perfume.perfumeName}</Typography>
                <Typography variant="subtitle1">
                  Brand: {perfume.brand && typeof perfume.brand === "object" ? perfume.brand.brandName : "Unknown"}
                </Typography>
                <Typography variant="body2">Price: ${perfume.price}</Typography>
                <Typography variant="body2">Concentration: {perfume.concentration}</Typography>

                <Button 
                  variant="contained" 
                  color="primary"
                  component={Link}
                  to={`/perfume/${perfume._id}`}
                  sx={{ mt: 1 }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
