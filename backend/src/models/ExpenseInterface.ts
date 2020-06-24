import { Document } from 'mongoose'
import { UserDocument } from './UserInterface'

export interface ExpenseDocument extends Document {
    title: string;
    description: string;
    amount: number; 
    owner: UserDocument['_id']
}  