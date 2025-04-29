import categoryModel from "../models/categoryModel.js"


// Add to cart
const addCategory = async (req,res) => {
    try {
        const newCategory = new categoryModel({
            name:req.body.name,
            type:req.body.type
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
        await categoryModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Category removed"});
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
        res.json({success:true,categories});        
    } 
    catch (error) {
        console.log(error);
        res.json({success:false,message:"Error getting categories"});
    }
}

export {addCategory,removeCategory,listCategory};
