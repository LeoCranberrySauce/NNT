import categoryModel from "../models/categoryModel.js"
import foodModel from "../models/foodModel.js"
import fs from 'fs'


// Add category
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

// Edit / update category
const updateCategory = async (req,res) => {
    try {
        console.log('Received update request for category:', {
            id: req.body.id,
            name: req.body.name,
            type: req.body.type,
            hasImage: !!req.body.image
        });

        // First get the category to know its name
        const category = await categoryModel.findById(req.body.id);
        if (!category) {
            console.log('Category not found:', req.body.id);
            return res.json({success:false,message:"Category not found"});
        }

        console.log('Found existing category:', {
            id: category._id,
            name: category.name,
            type: category.type,
            hasImage: !!category.image
        });

        // Edit all food items associated with this category
        const foods = await foodModel.find({ category: category.name });
        console.log(`Found ${foods.length} associated food items`);

        for (const food of foods) {
            // Update the food item from database with new category name
            await foodModel.findByIdAndUpdate(food._id, {
                category: req.body.name
            });
        }

        // Finally Update the category
        const updatedCategory = await categoryModel.findByIdAndUpdate(req.body.id, {
            name: req.body.name,
            type: req.body.type,
            image: req.body.image,
            updatedAt: Date.now()
        }, { new: true });

        console.log('Category updated successfully:', {
            id: updatedCategory._id,
            name: updatedCategory.name,
            type: updatedCategory.type,
            hasImage: !!updatedCategory.image
        });
        
        res.json({success:true,message:"Category and associated foods updated"});
    }
    catch (error) {
        console.error('Error updating category:', error);
        res.json({success:false,message:"Error updating category"});
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

export {addCategory,removeCategory,listCategory,updateCategory};
