import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {

    const {url,token} = useContext(StoreContext);
    const [data,setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.post(url+"/api/order/user-orders",{},{headers:{token}});
        setData(response.data.data);
    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    },[token])
    
    return (
        <div className='my-orders'>
            <h1>My Orders</h1>
            <div className='my-orders-container'>
                {data.map((order,index) => {
                    return (
                        <div className='my-order-card' key={index}>
                            <img src={assets.parcel_icon} alt= "" />
                            <div className='order-items'>
                                {order.items.map((item,index) => (
                                    <p key={index}><span>&#x25cf;</span> {item.name} x {item.quantity}</p>
                                ))}
                            </div>
                            <p>PHP {order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p>Order Date: {order.createdAt}</p>
                            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                            <button>Track Order</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyOrders
