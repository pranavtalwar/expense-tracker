import mongoose, { Schema } from 'mongoose'
import { IExpenseDocument } from './ExpenseInterface'

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
    createdAt: {
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

ExpenseSchema.method('toJSON', function (this: IExpenseDocument): Object {
    const user: IExpenseDocument = this
    
    const expenseObject: Object = user.toObject()
    delete (expenseObject as IExpenseDocument).__v
    return expenseObject
})

export default mongoose.model<IExpenseDocument>('Expense', ExpenseSchema)