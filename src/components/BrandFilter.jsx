import React, { useEffect, useState } from 'react';
import API from '../services/api'; // Import API từ file config

const BrandFilter = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    API.get('/brands')
      .then(response => {
        setBrands(response.data); // Lưu dữ liệu vào state
      })
      .catch(error => {
        console.error('Error fetching brands:', error); // Log lỗi nếu có
      });
  }, []);

  return (
    <div>
      <h2>Brands</h2>
      <ul>
        {brands.map(brand => (
          <li key={brand._id}>{brand.brandName}</li> // Hiển thị danh sách brands
        ))}
      </ul>
    </div>
  );
};

export default BrandFilter;
