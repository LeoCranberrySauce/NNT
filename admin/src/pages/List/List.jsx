import React, { useState, useEffect } from 'react'
import { assets } from '../../assets/assets'
import './List.css'
import axios from "axios"
import { toast } from 'react-toastify'


const List = () => {

  //ADD MORE FOODS
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const baseURL = 'http://localhost:4000';
  const [data, setData] = useState({
    name: "",
    category: "",
    description: "",
    size: "16oz",
    price: "",
    stock: ""
  });

  const [categoryList, setCategoryList] = useState([]);

  const fetchCategoryList = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/category/cat-list`);
      if (response.data.success) {
        setCategoryList(response.data.data);
        // Set default category if available
        if (response.data.data.length > 0) {
          setData(prev => ({
            ...prev,
            category: response.data.data[0].name
          }));
        }
      } else {
        toast.error("Failed to fetch categories");
      }
    } catch (error) {
      toast.error("Error fetching categories");
      console.error(error);
    }
  }

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === 'category') {
      const selectedCategory = categoryList.find(cat => cat.name === value);
      setData(prevData => ({
        ...prevData,
        [name]: value,
        // Reset size if category type is not Drink
        size: selectedCategory?.type === "Drink" ? prevData.size : ""
      }));
    } else {
      setData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  }

  const formatCurrency2 = (value) => {
    return `PHP ${parseFloat(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!data.name || !data.description || !data.price || !data.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    const selectedCategory = categoryList.find(cat => cat.name === data.category);
    if (selectedCategory?.type === "Drink" && !data.size) {
      toast.error("Please select a size for drinks");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("stock", Number(data.stock));
    formData.append("size", selectedCategory?.type === "Drink" ? data.size : "");
    formData.append("image", image);

    try {
      const response = await axios.post(`${baseURL}/api/food/add`, formData);
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: categoryList[0]?.name || "",
          size: "16oz",
          stock: ""
        });
        setImage(false);
        toast.success("Product added successfully");
      } else {
        toast.error("Failed to add product");
      }
    } catch (error) {
      toast.error("Error adding product");
      console.error(error);
    }
  }

  // LIST OF FOODS
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${baseURL}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data || []);
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

  const removeFood = async (foodId) => {
    const response = await axios.post(`${baseURL}/api/food/remove`, { id: foodId });
    await fetchList();
    if (response.data.success) {
      toast.success("Food removed successfully");
    }
    else {
      toast.error("Food removal failed");
    }
  }

  useEffect(() => {
    fetchList();
    fetchCategoryList();
  }, [])

  if (error) {
    return (
      <div className="categories add flex-col">
        <h1>Manage Food List</h1>
        <div className="error-message">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className='list add flex-col'>

      <h1>Manage Food List</h1>

      {/*ADD MORE FOODS*/}
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-list">
          <h2>Add List</h2>
          <div className='add-img-upload flex-col'>
            <p>Upload Image</p>
            <label htmlFor='image'>
              <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt='' />
            </label>
            <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden required />
          </div>
          <div className='add-product-name flex-col'>
            <p>Product Name</p>
            <input onChange={onChangeHandler} value={data.name} type='text' name='name' placeholder='Enter Product Name' required />
          </div>
          <div className='add-product-description flex-col'>
            <p>Product Description</p>
            <textarea onChange={onChangeHandler} value={data.description} name='description' rows="6" placeholder='Enter Description here...' required />
          </div>
          <div className='add-category-price'>
            <div className="add-category flex-col">
              <p>Product Category</p>
              <select onChange={onChangeHandler} name='category' value={data.category}>
                {categoryList.map((category) => (
                  <option key={category._id} value={category.name}>{category.name}</option>
                ))}
              </select>
            {categoryList.find(cat => cat.name === data.category)?.type === "Drink" && (
              <div className="add-size flex-col">
                <p>Size</p>
                <select onChange={onChangeHandler} name='size' value={data.size}>
                  <option value="16oz">16oz</option>
                  <option value="22oz">22oz</option>
                </select>
              </div>
            )}
            </div>
            <div className="add-price flex-col">
              <p>Product Price</p>
              <input onChange={onChangeHandler} value={data.price} type='number' name='price' placeholder='Enter Price' required />
              <p>In Stock</p>
              <input onChange={onChangeHandler} value={data.stock} type='number' name='stock' placeholder='Enter Stock' required />
            </div>
          </div>
        </div>
        <button type='submit' className='add-btn'>Add Product</button>
      </form>

      {/*LIST OF FOODS*/}
      <div className="list-table">
        <h2>Product List</h2>
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Size</b>
          <b>Price</b>
          <b>Description</b>
          <b>No. of Stock</b>
          <b>Action</b>
        </div>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : !list || list.length === 0 ? (
          <div className="no-data">No Food List found</div>
        ) : (
          list.map((item, index) => (
            <div className="list-table-format" key={index}>
              <img src={`${baseURL}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.size}</p>
              <p>{formatCurrency2(item.price)}</p>
              <p>{item.description}</p>
              <p>{item.stock}</p>
              <p onClick={() => removeFood(item._id)} className='cursor'>X</p>

            </div>
          ))
        )}
      </div>

    </div>
  )
}

export default List
