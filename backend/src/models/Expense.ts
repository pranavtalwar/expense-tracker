import mongoose, { Schema, Document, Types } from 'mongoose'
import { IUser } from './User'

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

export interface IExpense extends Document {
    title: string;
    description: string;
    amount: number; 
    owner: IUser['_id']
}  

export default mongoose.model<IExpense>('Expense', ExpenseSchema)