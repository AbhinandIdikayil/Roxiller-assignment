import mongoose, { Document, Schema } from 'mongoose'

export interface ITransactionDoc extends Document {
    id: string
    title: string,
    description: string,
    category: string,
    price: number,
    image: string,
    sold: boolean,
    dateOfSale: Date
}

const TransactionSchema = new Schema<ITransactionDoc>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    sold: {
        type: Boolean,
        required: true
    },
    dateOfSale: {
        type: Date,
        required: true
    }
}, { timestamps: true });

export const TransactionModel = mongoose.model('Transactions', TransactionSchema);