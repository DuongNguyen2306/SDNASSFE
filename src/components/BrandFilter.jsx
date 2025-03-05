import React, { useEffect, useState } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import axios from "../services/api";

const BrandFilter = ({ onSelectBrand }) => {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");

  useEffect(() => {
    axios.get("/brands")
      .then(response => setBrands(response.data))
      .catch(error => console.error("Error fetching brands:", error));
  }, []);

  return (
    <FormControl fullWidth>
      <InputLabel>Filter by Brand</InputLabel>
      <Select
        value={selectedBrand || ""} // Đảm bảo giá trị mặc định là ""
        onChange={(e) => {
          setSelectedBrand(e.target.value);
          onSelectBrand(e.target.value);
        }}
      >
        <MenuItem value="">All</MenuItem>
        {brands.map((brand) => (
          <MenuItem key={brand._id} value={brand._id}>
            {brand.brandName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default BrandFilter;
