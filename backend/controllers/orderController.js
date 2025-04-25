import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing an order
const placeOrder = async (req,res) => {

    const frontend_url = "http://localhost:5173";

    try {
        const newOrder = new orderModel({
            userId:req.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.userId,{cartData:{}});

        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:"php",
                product_data:{
                    name:item.name  
                },
                unit_amount:item.price*100*1
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:"php",
                product_data:{
                    name:"Delivery Fee",
                },
                unit_amount:2*100*1
            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:"payment",
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({success:true,url:session.url});
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Internal server error"});
    }
}

const verifyOrder = async (req,res) => {
    const {orderId,success} = req.body;
    try {
        if (success=="true") {
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Payment successful"});
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Payment failed"});
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Internal server error"})
    }
}

// Users orders for frontend
const userOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({userId:req.userId});
        res.json({success:true,data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Internal server error"});
    }
}

// List of orders for admin
const listOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Internal server error"});
    }
}


export {placeOrder,verifyOrder,userOrders,listOrders};