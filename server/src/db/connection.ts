import mongoose from "mongoose";
import { CONFIG } from "../constants/env";


export const connectDB = async () => {
    try {
        await mongoose.connect(CONFIG.MONGO_URL);
        console.log('DB connected successfully')
    } catch (error) {
        console.log(error);
        process.exit(0)
    }
}

export const disconnectDB = async () => {
    try {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
            console.log('Disconnected from database');
        }
    } catch (error) {
        console.log(error)
    }
}