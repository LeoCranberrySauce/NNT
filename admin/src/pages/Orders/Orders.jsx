import React, { useEffect, useState } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from "react-toastify";
import { assets } from '../../assets/assets';


const Orders = ({ url }) => {

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    }
    else {
      toast.error("Error fetching orders");
    }
  }

  const statusHandler = async (event,orderId) => {
    const response = await axios.post(url + "/api/order/status",{
      orderId,
      status:event.target.value
    })
    if (response.data.success) {
      await fetchAllOrders();
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);



  return (
    <div className='orders add'>
      <h1>Order Page</h1>
      <div className='orders-list'>
        {orders.map((order, index) => (
          <div className='orders-item' key={index}>
            <img src={assets.parcel_icon} alt=" " />
            <div className='orders-item-food'>
              {order.items.map((item, index) => (
                <p key={index} className='orders-item-food' ><span>&#x25cf;</span> {item.name} x {item.quantity}</p>
              ))}
            </div>
            <div className='orders-item-details'>
              <p className='orders-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
              <br />
              <div className='orders-item-address'>
                <p>{order.address.street + ", " + order.address.city + ", " + order.address.province + ", " + order.address.zipCode + ", " + order.address.country}</p>
              </div>
              <br />
              <p className='orders-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>Amount : PHP {order.amount}.00</p>
            <select onChange={(event) => statusHandler(event,order._id)} value={order.status}>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Ready for Pickup">Ready for Pickup</option>
              <option value="Delivery in Progress">Delivery in Progress</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
