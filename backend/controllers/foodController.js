import { error } from "console";
import foodModel from "../models/foodModel.js";
import fs from 'fs'

// add food item
const addFood = async (req,res) => {
    
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename,
        size:req.body.size,
        stock:req.body.stock
    })
    try {
        await food.save();
        res.json({success:true,message:"Food Added"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


// Edit / update food
const updatingFood = async (req,res) => {
    try {
        console.log('Received update request for food:', {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            size: req.body.size,
            stock: req.body.stock,
            hasNewImage: !!req.file
        });

        // First get the food to know its current image
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            console.log('Food not found:', req.body.id);
            return res.json({success:false,message:"Food not found"});
        }

        // If there's a new image, delete the old one
        if (req.file) {
            // Delete old image file
            if (food.image) {
                fs.unlink(`uploads/${food.image}`, (err) => {
                    if (err) console.error('Error deleting old image:', err);
                });
            }
        }

        // Prepare update data
        const updateData = {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            size: req.body.size,
            stock: req.body.stock,
            updatedAt: Date.now()
        };

        // Add new image filename if a new image was uploaded
        if (req.file) {
            updateData.image = req.file.filename;
        }

        // Update the food
        const updatedFood = await foodModel.findByIdAndUpdate(
            req.body.id,
            updateData,
            { new: true }
        );

        console.log('Food updated successfully:', {
            id: updatedFood._id,
            name: updatedFood.name,
            category: updatedFood.category,
            hasImage: !!updatedFood.image
        });
        
        res.json({success:true,message:"Food updated successfully"});
    }
    catch (error) {
        console.error('Error updating food:', error);
        res.json({success:false,message:"Error updating food"});
    }
}

// remove food item
const removeFood = async (req,res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (food && food.image) {
            fs.unlink(`uploads/${food.image}`, (err) => {
                if (err) console.error('Error deleting image:', err);
            });
        }

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed Successfully!"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// all food list
const listFood = async (req,res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export { addFood,removeFood,listFood,updatingFood }