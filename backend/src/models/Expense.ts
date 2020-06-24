import mongoose, { Schema, Document, Types } from 'mongoose'
import { UserDocument } from './UserInterface'
import { ExpenseDocument } from './ExpenseInterface'

const ExpenseSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        
    },
    amount: {
        type: Number,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }

}, {
    timestamps: true
})

export default mongoose.model<ExpenseDocument>('Expense', ExpenseSchema)