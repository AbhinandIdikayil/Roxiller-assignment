import mongoose, { Document, Schema } from 'mongoose'

interface ITransaction extends Document {
    id: string
    title: string,
    description: string,
    category: string,
    image: string,
    sold: boolean,
    dateOfSale: Date
}

const TransactionSchema = new Schema<ITransaction>({
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