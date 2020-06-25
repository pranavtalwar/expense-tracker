import { Document } from 'mongoose'
import { IUserDocument } from './UserInterfaces'

export interface IExpenseDocument extends Document {
    title: string;
    description: string;
    amount: number; 
    owner: IUserDocument['_id']
}  