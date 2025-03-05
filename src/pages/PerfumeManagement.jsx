import React, { useEffect, useState } from "react";
import axios from "../services/api";
import { Container, Typography, List, ListItem, Button, TextField } from "@mui/material";

const PerfumeManagement = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [newPerfume, setNewPerfume] = useState({
    perfumeName: '',
    uri: '',
    price: '',
    concentration: '',
    description: '',
    ingredients: '',
    volume: '',
    targetAudience: '',
    brand: ''
  });
  const [editingPerfume, setEditingPerfume] = useState(null);

  // Fetch perfumes when the component loads
  useEffect(() => {
    axios.get("/perfumes").then(response => setPerfumes(response.data));
  }, []);

  // Handle adding a new perfume
  const handleAdd = () => {
    axios.post("/perfumes", newPerfume)
      .then(() => {
        setNewPerfume({
          perfumeName: '',
          uri: '',
          price: '',
          concentration: '',
          description: '',
          ingredients: '',
          volume: '',
          targetAudience: '',
          brand: ''
        }); // Reset form
        axios.get("/perfumes").then(response => setPerfumes(response.data)); // Re-fetch list
      })
      .catch(error => console.error("Error adding perfume:", error));
  };

  // Handle updating an existing perfume
  const handleUpdate = () => {
    axios.put(`/perfumes/${editingPerfume._id}`, editingPerfume)
      .then(() => {
        setEditingPerfume(null); // Reset editing state
        axios.get("/perfumes").then(response => setPerfumes(response.data)); // Re-fetch list
      })
      .catch(error => console.error("Error updating perfume:", error));
  };

  // Handle deleting a perfume
  const handleDelete = (id) => {
    axios.delete(`/perfumes/${id}`)
      .then(() => axios.get("/perfumes").then(response => setPerfumes(response.data))) // Re-fetch list
      .catch(error => console.error("Error deleting perfume:", error));
  };

  return (
    <Container>
      <Typography variant="h4">Manage Perfumes</Typography>

      {/* Form to add a new perfume */}
      <div>
        <h3>Add New Perfume</h3>
        <TextField
          label="Perfume Name"
          variant="outlined"
          value={newPerfume.perfumeName}
          onChange={(e) => setNewPerfume({ ...newPerfume, perfumeName: e.target.value })}
          fullWidth
        />
        <TextField
          label="URI"
          variant="outlined"
          value={newPerfume.uri}
          onChange={(e) => setNewPerfume({ ...newPerfume, uri: e.target.value })}
          fullWidth
        />
        <TextField
          label="Price"
          variant="outlined"
          value={newPerfume.price}
          onChange={(e) => setNewPerfume({ ...newPerfume, price: e.target.value })}
          fullWidth
        />
        <TextField
          label="Concentration"
          variant="outlined"
          value={newPerfume.concentration}
          onChange={(e) => setNewPerfume({ ...newPerfume, concentration: e.target.value })}
          fullWidth
        />
        <TextField
          label="Description"
          variant="outlined"
          value={newPerfume.description}
          onChange={(e) => setNewPerfume({ ...newPerfume, description: e.target.value })}
          fullWidth
        />
        <TextField
          label="Ingredients"
          variant="outlined"
          value={newPerfume.ingredients}
          onChange={(e) => setNewPerfume({ ...newPerfume, ingredients: e.target.value })}
          fullWidth
        />
        <TextField
          label="Volume"
          variant="outlined"
          value={newPerfume.volume}
          onChange={(e) => setNewPerfume({ ...newPerfume, volume: e.target.value })}
          fullWidth
        />
        <TextField
          label="Target Audience"
          variant="outlined"
          value={newPerfume.targetAudience}
          onChange={(e) => setNewPerfume({ ...newPerfume, targetAudience: e.target.value })}
          fullWidth
        />
        <TextField
          label="Brand"
          variant="outlined"
          value={newPerfume.brand}
          onChange={(e) => setNewPerfume({ ...newPerfume, brand: e.target.value })}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleAdd}>Add Perfume</Button>
      </div>

      {/* Form to update an existing perfume */}
      {editingPerfume && (
        <div>
          <h3>Edit Perfume</h3>
          <TextField
            label="Perfume Name"
            variant="outlined"
            value={editingPerfume.perfumeName}
            onChange={(e) => setEditingPerfume({ ...editingPerfume, perfumeName: e.target.value })}
            fullWidth
          />
          <TextField
            label="URI"
            variant="outlined"
            value={editingPerfume.uri}
            onChange={(e) => setEditingPerfume({ ...editingPerfume, uri: e.target.value })}
            fullWidth
          />
          <TextField
            label="Price"
            variant="outlined"
            value={editingPerfume.price}
            onChange={(e) => setEditingPerfume({ ...editingPerfume, price: e.target.value })}
            fullWidth
          />
          <TextField
            label="Concentration"
            variant="outlined"
            value={editingPerfume.concentration}
            onChange={(e) => setEditingPerfume({ ...editingPerfume, concentration: e.target.value })}
            fullWidth
          />
          <TextField
            label="Description"
            variant="outlined"
            value={editingPerfume.description}
            onChange={(e) => setEditingPerfume({ ...editingPerfume, description: e.target.value })}
            fullWidth
          />
          <TextField
            label="Ingredients"
            variant="outlined"
            value={editingPerfume.ingredients}
            onChange={(e) => setEditingPerfume({ ...editingPerfume, ingredients: e.target.value })}
            fullWidth
          />
          <TextField
            label="Volume"
            variant="outlined"
            value={editingPerfume.volume}
            onChange={(e) => setEditingPerfume({ ...editingPerfume, volume: e.target.value })}
            fullWidth
          />
          <TextField
            label="Target Audience"
            variant="outlined"
            value={editingPerfume.targetAudience}
            onChange={(e) => setEditingPerfume({ ...editingPerfume, targetAudience: e.target.value })}
            fullWidth
          />
          <TextField
            label="Brand"
            variant="outlined"
            value={editingPerfume.brand}
            onChange={(e) => setEditingPerfume({ ...editingPerfume, brand: e.target.value })}
            fullWidth
          />
          <Button variant="contained" color="secondary" onClick={handleUpdate}>Update</Button>
        </div>
      )}

      {/* List of perfumes */}
      <List>
        {perfumes.map((perfume) => (
          <ListItem key={perfume._id}>
            {perfume.perfumeName}
            <Button variant="contained" color="error" onClick={() => handleDelete(perfume._id)}>Delete</Button>
            <Button variant="contained" color="primary" onClick={() => setEditingPerfume(perfume)}>Edit</Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default PerfumeManagement;
