import React, { useState, useEffect } from 'react'
import { assets } from '../../assets/assets'
import "./Categories.css"
import axios from 'axios'
import { toast } from 'react-toastify'

const Categories = () => {
  const [image, setImage] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const baseURL = 'http://localhost:4000';

  const [data, setData] = useState({
    name: "",
    type: "Drink"
  })

  const categoryTypes = ["Drink", "Food"];

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let imageBase64 = null;
      if (image) {
        // Create a canvas to resize the image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Create an image element
        const img = new Image();
        img.src = URL.createObjectURL(image);
        
        // Wait for image to load
        await new Promise((resolve) => {
          img.onload = resolve;
        });
        
        // Set maximum dimensions
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        
        // Calculate new dimensions
        let width = img.width;
        let height = img.height;
        
        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }
        
        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress image
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to base64 with reduced quality
        imageBase64 = canvas.toDataURL('image/jpeg', 0.7);
      }

      const response = await axios.post(`${baseURL}/api/category/cat-add`, {
        name: data.name,
        type: data.type,
        image: imageBase64
      });
      if (response.data.success) {
        setData({
          name: "",
          type: "Drink"
        })
        setImage(false)
        toast.success("Category Added Successfully");
        fetchCategories(); // Refresh the list after adding
      } else {
        toast.error("Category Failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding category");
    }
  }

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${baseURL}/api/category/cat-list`);
      if (response.data.success) {
        setCategories(response.data.data || []);
      } else {
        setError(response.data.message || "Failed to fetch categories");
        toast.error(response.data.message || "Failed to fetch categories");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error fetching categories";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  }

  const removeCategories = async (categoryId) => {
    const response = await axios.post(`${baseURL}/api/category/cat-delete`, { id: categoryId });
    await fetchCategories();
    if (response.data.success) {
      toast.success("Category removed successfully");
    }
    else {
      toast.error("Category removal failed");
    }
  }

  useEffect(() => {
    fetchCategories();
  }, [])

  if (error) {
    return (
      <div className="categories add flex-col">
        <h1>Manage Categories</h1>
        <div className="error-message">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className='categories add flex-col'>
      <h1>Manage Categories</h1>

      {/* ADD CATEGORY */}
      <form onSubmit={onSubmitHandler} className='new-categories'>
        <div className='categories-add'>
          <h2>Add Category</h2>
          <div className='add-img-upload flex-col'>
            <p>Upload Image</p>
            <label htmlFor='image'>
              <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt='' />
            </label>
            <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden required />
          </div>
          <div className="categories-add-type">
            <div className='categories-add-name flex-col'>
              <p>Category Name</p>
              <input onChange={onChangeHandler} value={data.name} type='text' name='name' placeholder='Add Category' required />
            </div>
            <div className="categories-select-type flex-col">
              <p>Category Type</p>
              <select onChange={onChangeHandler} name='type' value={data.type}>
                {categoryTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <button type='submit' className='add-cat-btn'>Add Category</button>
          </div>
        </div>
      </form>

      {/* CATEGORY LIST */}
      <div className="categories-table">
        <h2>Category List</h2>
        <div className="categories-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Type</b>
          <b>Action</b>
        </div>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : !categories || categories.length === 0 ? (
          <div className="no-data">No categories found</div>
        ) : (
          categories.map((category, index) => (
            <div className="categories-table-format" key={index}>
              <img src={category.image} alt={category.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
              <p>{category.name}</p>
              <p>{category.type}</p>
              <p onClick={() => removeCategories(category._id)} className='cursor'>X</p>
            </div>
          ))
        )}
      </div>

    </div>
  )
}

export default Categories;
