import { CONFIG } from "../constants/env";
import { TransactionModel } from "../models/TransactionModel";
import axios from 'axios'
export const initializeDatabase = async () => {
    try {
        const existingData = await TransactionModel.countDocuments();
        if (existingData > 0) {
            console.log('Database already initialized');
            return { message: 'Database already initialized' };
        }
        const response = await axios.get(CONFIG.SEED_API_URL);
        const transactions = response.data;
        await TransactionModel.insertMany(transactions);
        return { message: 'Database initialized successfully' };
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
};