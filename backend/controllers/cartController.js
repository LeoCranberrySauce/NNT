import userModel from "../models/userModel.js";

// Add to cart
const addToCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.userId);
        if (!userData) {
            return res.json({success:false,message:"User not found!"});
        }
        let cartData = userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.userId,{cartData});
        res.json({success:true,message:"Item added to cart"});        
    } 
    catch (error) {
        console.log(error);
        res.json({success:false,message:"Error adding item to cart"});
    }
}

// Remove from cart
const removeFromCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.userId);
        if (!userData) {
            return res.json({success:false,message:"User not found"});
    }
    let cartData = userData.cartData;
    if (cartData[req.body.itemId] > 0) {
        cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.userId,{cartData});
        res.json({success:true,message:"Item removed from cart"});  
    }
    catch (error) {
        console.log(error);
        res.json({success:false,message:"Error removing item from cart"});
    }
}

// Get cart items
const getCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.userId);
        if (!userData) {
            return res.json({success:false,message:"User not found"});
        }
        let cartData = userData.cartData;
        res.json({success:true,cartData});        
    } 
    catch (error) {
        console.log(error);
        res.json({success:false,message:"Error getting cart items"});
    }
}

export {addToCart,removeFromCart,getCart};