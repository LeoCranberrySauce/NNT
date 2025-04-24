import React, { useState, useEffect } from 'react'
import { assets } from '../../assets/assets'
import './Add.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Milk Tea",
        size: "16oz"
    });
    
    const drinkCategories = ['Milk Tea', 'Fruit Soda', 'Fruit Tea', 'Frappe', 'Iced Coffee', 'Shakes'];
    const foodCategories = ['Takoyaki', 'Pizza'];
    
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        
        if (name === 'category' && foodCategories.includes(value)) {
            setData(prevData => ({
                ...prevData,
                [name]: value,
                size: ""
            }));
        } else {
            setData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        
        if (!data.name || !data.description || !data.price || !data.category) {
            toast.error("Please fill in all required fields");
            return;
        }

        if (drinkCategories.includes(data.category) && !data.size) {
            toast.error("Please select a size for drinks");
            return;
        }

        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", Number(data.price))
        formData.append("category", data.category)
        if (drinkCategories.includes(data.category)) {
            formData.append("size", data.size)
        } else {
            formData.append("size", "")
        }
        formData.append("image", image)
        const response = await axios.post(`${url}/api/food/add`,formData)
        if(response.data.success){
            setData({
                name: "",
                description: "",
                price: "",
                category: "Milk Tea",
                size: "16oz"
            })
            setImage(false)
            toast.success("Product Added Successfully")
        }else{
            toast.error("Something went wrong")
        }
    }

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-img-upload flex-col'>
                    <p>Upload Image</p>
                    <label htmlFor='image'>    
                        <img src={image?URL.createObjectURL(image):assets.upload_area} alt='' />
                    </label>
                    <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' hidden required />
                </div>
                <div className='add-product-name flex-col'>
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name} type='text' name='name' placeholder='Enter Product Name' />
                </div>
                <div className='add-product-description flex-col'>
                    <p>Product Description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name='description' rows="6" placeholder='Enter Description here...' required />
                </div>
                <div className='add-category-price'>
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select onChange={onChangeHandler} name='category'>
                            {drinkCategories.map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                            {foodCategories.map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={data.price} type='number' name='price' placeholder='Enter Price' required />
                    </div>
                    {drinkCategories.includes(data.category) && (
                        <div className="add-size flex-col">
                            <p>Size</p>
                            <select onChange={onChangeHandler} name='size' value={data.size}>
                                <option value="16oz">16oz</option>
                                <option value="22oz">22oz</option>
                            </select>
                        </div>
                    )}
                </div>
                <button type='submit' className='add-btn'>Add Product</button>
            </form>
        </div>
    )
}

export default Add;