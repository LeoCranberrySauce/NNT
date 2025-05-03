import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const formatCurrency1 = (value) => {
  return `PHP ${parseFloat(value).toFixed(2)}`;
};

const FoodItem = ({id,name,size,price,description,image,stock}) => {

    const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext);

    // Add safety check for cartItems and stock
    const itemCount = cartItems ? cartItems[id] || 0 : 0;
    const stockValue = stock || 0; // Ensure stock is a number
    const remainingStock = stockValue - itemCount;

    // Determine if item is out of stock
    const isOutOfStock = remainingStock <= 0;

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img src={url+"/images/"+image} alt="" className="food-item-image" />
        {isOutOfStock ? (
          <div className="out-of-stock-badge">Out of Stock</div>
        ) : !itemCount ? (
          <img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt="" />
        ) : (
          <div className="food-item-counter">
            <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
            <p>{itemCount}</p>
            <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
        </div>
        <p className='food-item-desc'>{description}</p>
        <p className='food-item-price'>{formatCurrency1(price)} {size && `(${size})`}</p>
        <p className={`food-item-stock ${isOutOfStock ? 'out-of-stock' : ''}`}>
          {isOutOfStock ? 'Out of Stock' : `Available: ${remainingStock}`}
        </p>
      </div>
    </div>
  )
}

export default FoodItem
