import categoryModel from "../models/categoryModel.js"
import foodModel from "../models/foodModel.js"
import fs from 'fs'


// Add to cart
const addCategory = async (req,res) => {
    try {
        const newCategory = new categoryModel({
            name:req.body.name,
            type:req.body.type,
            image:req.body.image
        })
        await newCategory.save();
        res.json({success:true,message:"Category added"});        
    } 
    catch (error) {
        console.log(error);
        res.json({success:false,message:"Error adding category"});
    }
}

// Remove from cart
const removeCategory = async (req,res) => {
    try {
        // First get the category to know its name
        const category = await categoryModel.findById(req.body.id);
        if (!category) {
            return res.json({success:false,message:"Category not found"});
        }

        // Delete all food items associated with this category
        const foods = await foodModel.find({ category: category.name });
        for (const food of foods) {
            // Delete the food image file
            fs.unlink(`uploads/${food.image}`, () => {});
            // Delete the food item from database
            await foodModel.findByIdAndDelete(food._id);
        }

        // Finally delete the category
        await categoryModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Category and associated foods removed"});
    }
    catch (error) {
        console.log(error);
        res.json({success:false,message:"Error removing category"});
    }
}

// Get category items
const listCategory = async (req,res) => {
    try {
        const categories = await categoryModel.find();
        res.json({success:true, data: categories});        
    } 
    catch (error) {
        console.log(error);
        res.json({success:false,message:"Error getting categories"});
    }
}

export {addCategory,removeCategory,listCategory};
