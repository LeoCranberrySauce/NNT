import React, { useState, useEffect } from 'react'
import "./Categories.css"
import axios from 'axios'
import { toast } from 'react-toastify'

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const baseURL = 'http://localhost:4000';

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${baseURL}/api/category/cat-list`);
      if (response.data.success) {
        setCategories(response.data.categories || []);
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

  const removeCategory = async (categoryId) => {
    const response = await axios.post(`${baseURL}/api/category/cat-remove`, { id: categoryId });
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
        <h1>Category List</h1>
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
      <div className='categories-add'>
        <h2>Add Category</h2>
        <div className="categories-add-type">
          <div className='categories-add-name flex-col'>
            <p>Category Name</p>
            <input type='text' name='price' placeholder='Add Category' required />
          </div>
          <div className="categories-select-type flex-col">
            <p>Category Type</p>
            <select name='category'>
              <option value="Food">Food</option>
              <option value="Drink">Drink</option>
            </select>
          </div>
        <button type='submit' className='add-cat-btn'>Add Category</button>
        </div>
      </div>

      {/* CATEGORY LIST */}
      <div className="categories-table">
        <h2>Category List</h2>
        <div className="categories-table-format title">
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
              <p>{category.name}</p>
              <p>{category.type}</p>
              <p onClick={() => removeCategory(item._id)} className='cursor'>X</p>
            </div>
          ))
        )}
      </div>

    </div>
  )
}

export default Categories;
