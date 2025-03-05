import React, { useEffect, useState } from "react";
import axios from "../services/api";
import { Container, Typography, List, ListItem, Button, TextField } from "@mui/material";

const BrandManagement = () => {
  const [brands, setBrands] = useState([]);
  const [newBrand, setNewBrand] = useState("");
  const [editingBrand, setEditingBrand] = useState(null);

  // 📌 Lấy danh sách brands
  const fetchBrands = () => {
    axios.get("/brands")
      .then(response => setBrands(response.data))
      .catch(error => console.error("Error fetching brands:", error));
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // 📌 Xử lý thêm brand
  const handleAddBrand = () => {
    if (!newBrand) return;
    axios.post("/brands", { brandName: newBrand })
      .then(() => {
        fetchBrands(); // Cập nhật danh sách
        setNewBrand(""); // Reset input
      })
      .catch(error => console.error("Error adding brand:", error));
  };

  // 📌 Xử lý cập nhật brand
  const handleUpdateBrand = () => {
    if (!editingBrand) return;
    axios.put(`/brands/${editingBrand._id}`, { brandName: editingBrand.brandName })
      .then(() => {
        fetchBrands(); // Cập nhật danh sách
        setEditingBrand(null); // Hủy chế độ chỉnh sửa
      })
      .catch(error => console.error("Error updating brand:", error));
  };

  return (
    <Container>
      <Typography variant="h4">Manage Brands</Typography>

      {/* 🟢 Form Thêm Brand */}
      <TextField
        label="New Brand Name"
        fullWidth
        value={newBrand}
        onChange={(e) => setNewBrand(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleAddBrand}>ADD BRAND</Button>

      {/* 🟡 Form Cập nhật Brand */}
      {editingBrand && (
        <>
          <TextField
            label="Edit Brand Name"
            fullWidth
            value={editingBrand.brandName}
            onChange={(e) => setEditingBrand({ ...editingBrand, brandName: e.target.value })}
          />
          <Button variant="contained" color="secondary" onClick={handleUpdateBrand}>UPDATE BRAND</Button>
        </>
      )}

      {/* 🔴 Danh sách brands */}
      <List>
        {brands.map((brand) => (
          <ListItem key={brand._id}>
            {brand.brandName}
            <Button variant="contained" color="error" onClick={() => axios.delete(`/brands/${brand._id}`).then(fetchBrands)}>Delete</Button>
            <Button variant="contained" color="primary" onClick={() => setEditingBrand(brand)}>Edit</Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default BrandManagement;
