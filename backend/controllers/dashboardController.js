import userModel from '../models/userModel.js';
import orderModel from '../models/orderModel.js';
import foodModel from '../models/foodModel.js';
import categoryModel from '../models/categoryModel.js';

export const getDashboardStats = async (req, res) => {
    try {
        // Get total no. of foods (all users)
        const totalFoods = await foodModel.countDocuments();
        // Get total no. of categories (all users)
        const totalCategories = await categoryModel.countDocuments();
        // Get total customers (all users)
        const totalCustomers = await userModel.countDocuments();

        // Get total sales and revenue from orders
        const orders = await orderModel.find();
        const totalSales = orders.length;
        const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);

        // For now, we'll set total managers to 1 (admin)
        // In a real application, you would have a role field in the user model
        const totalManagers = 1;

        res.json({
            success: true,
            data: {
                totalFoods,
                totalCategories,
                totalManagers,
                totalCustomers,
                totalSales,
                totalRevenue
            }
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching dashboard statistics'
        });
    }
}; 