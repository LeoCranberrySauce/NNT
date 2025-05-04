import React, { useState, useEffect } from 'react'
import './EditCategory.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const EditCategory = ({ setEditCategory, categoryToEdit }) => {
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    type: "Drink"
  });

  const categoryTypes = ["Drink", "Food"];
  const baseURL = 'http://localhost:4000';

  useEffect(() => {
    if (categoryToEdit) {
      console.log('Category to edit:', categoryToEdit);
      setData({
        name: categoryToEdit.name,
        type: categoryToEdit.type
      });
      setImage(categoryToEdit.image);
      setPreviewImage(categoryToEdit.image);
    }
  }, [categoryToEdit]);

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
      let imageBase64 = image;
      if (image && typeof image === 'object') {
        console.log('Processing new image file');
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
        console.log('Image converted to base64');
        
        // Cleanup
        URL.revokeObjectURL(img.src);
      } else {
        console.log('Using existing image:', image);
      }

      console.log('Sending update request with data:', {
        id: categoryToEdit._id,
        name: data.name,
        type: data.type,
        image: imageBase64 ? 'base64 image data present' : 'no image data'
      });

      const response = await axios.post(`${baseURL}/api/category/cat-edit`, {
        id: categoryToEdit._id,
        name: data.name,
        type: data.type,
        image: imageBase64
      });

      console.log('Update response:', response.data);

      if (response.data.success) {
        toast.success("Category Updated Successfully");
        setEditCategory(false);
      } else {
        toast.error("Category Update Failed");
      }
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error(error.response?.data?.message || "Error updating category");
    }
  }

  return (
    <div className='edit-category-popup'>
      <form onSubmit={onUpdate} className="edit-category-popup-container">
        <div className="edit-category-popup-title">
          <h2>Edit Category</h2>
          <img onClick={() => setEditCategory(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="edit-category-popup-inputs">
          <div className='add-img-upload flex-col'>
            <p>Upload Image</p>
            <label htmlFor='edit-category-image'>
              <img 
                src={previewImage || assets.upload_area} 
                alt='' 
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
            </label>
            <input 
              onChange={handleImageChange} 
              type='file' 
              id='edit-category-image' 
              accept="image/*"
              hidden 
            />
          </div>
          <p>Category Name</p>
          <input 
            name='name' 
            onChange={onChangeHandler} 
            value={data.name} 
            type="text" 
            placeholder='Category Name' 
            required 
          />
          <p>Category Type</p>
          <select 
            name='type' 
            onChange={onChangeHandler} 
            value={data.type}
            required
          >
            {categoryTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <button type='submit'>Update Category</button>
      </form>
    </div>
  )
}

export default EditCategory
