import React, { useState, useEffect } from 'react'
import './EditFoodList.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const EditFoodList = ({ setEditFoodList, foodsToEdit }) => {
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    category: "",
    description: "",
    size: "16oz",
    price: "",
    stock: ""
  });

  const [categoryList, setCategoryList] = useState([]);
  const baseURL = 'http://localhost:4000';

  // Load categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/category/cat-list`);
        if (response.data.success) {
          setCategoryList(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to load categories');
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (foodsToEdit) {
      console.log('Foods to edit:', foodsToEdit);
      setData({
        name: foodsToEdit.name,
        category: foodsToEdit.category,
        description: foodsToEdit.description,
        size: foodsToEdit.size,
        price: foodsToEdit.price,
        stock: foodsToEdit.stock
      });
      // Set the image URL with the base URL
      if (foodsToEdit.image) {
        setPreviewImage(`${baseURL}/images/${foodsToEdit.image}`);
      }
    }
  }, [foodsToEdit]);

  // Cleanup function to revoke object URLs
  useEffect(() => {
    return () => {
      if (previewImage && previewImage.startsWith('blob:')) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('New image file selected:', file);
      // Revoke previous object URL if it exists
      if (previewImage && previewImage.startsWith('blob:')) {
        URL.revokeObjectURL(previewImage);
      }
      
      setImage(file);
      const newPreviewUrl = URL.createObjectURL(file);
      console.log('New preview URL created:', newPreviewUrl);
      setPreviewImage(newPreviewUrl);
    }
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  }

  const onUpdate = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('id', foodsToEdit._id);
      formData.append('name', data.name);
      formData.append('category', data.category);
      formData.append('description', data.description);
      formData.append('size', data.size);
      formData.append('price', data.price);
      formData.append('stock', data.stock);
      
      if (image) {
        formData.append('image', image);
      }

      const response = await axios.post(`${baseURL}/api/food/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        toast.success("Food Updated Successfully");
        setEditFoodList(false);
      } else {
        toast.error(response.data.message || "Food Update Failed");
      }
    } catch (error) {
      console.error('Error updating food:', error);
      toast.error(error.response?.data?.message || "Error updating food");
    }
  }

  return (
    <div className='edit-foodlist-popup'>
      <form onSubmit={onUpdate} className="edit-foodlist-popup-container">
        <div className="edit-foodlist-popup-title">
          <h2>Edit Food</h2>
          <img onClick={() => setEditFoodList(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="edit-foodlist-popup-inputs">
          <div className='add-img-upload flex-col'>
            <p>Upload Image</p>
            <label htmlFor='edit-item-image'>
              <img 
                src={previewImage || assets.upload_area} 
                alt='' 
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
            </label>
            <input 
              onChange={handleImageChange} 
              type='file' 
              id='edit-item-image' 
              accept="image/*"
              hidden 
            />
          </div>
          <p>Food Name</p>
          <input 
            name='name' 
            onChange={onChangeHandler} 
            value={data.name} 
            type="text" 
            placeholder='Food Name' 
            required 
          />
          <p>Category</p>
          <select 
            name='category' 
            onChange={onChangeHandler} 
            value={data.category}
            required
          >
            <option value="">Select a category</option>
            {categoryList.map((category) => (
              <option key={category._id} value={category.name}>{category.name}</option>
            ))}
          </select>
          <p>Description</p>
          <input 
            name='description' 
            onChange={onChangeHandler} 
            value={data.description} 
            type="text" 
            placeholder='Description' 
            required 
          />
          {categoryList.find(cat => cat.name === data.category)?.type === "Drink" && (
            <div className="add-size flex-col">
              <p>Size</p>
              <select onChange={onChangeHandler} name='size' value={data.size}>
                <option value="16oz">16oz</option>
                <option value="22oz">22oz</option>
              </select>
            </div>
          )}
          <p>Stock</p>
          <input 
            name='stock' 
            onChange={onChangeHandler} 
            value={data.stock} 
            type="number" 
            placeholder='Stock' 
            required 
          />
          <p>Price</p>
          <input 
            name='price' 
            onChange={onChangeHandler} 
            value={data.price} 
            type="number" 
            placeholder='Price' 
            required 
          />
        </div>
        <button type='submit'>Update Food</button>
      </form>
    </div>
  )
}

export default EditFoodList
