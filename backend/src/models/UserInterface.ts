import { Document } from 'mongoose'

export interface UserDocument extends Document {
    firstName: string;
    lastName: string;
    email: string; 
    password: string,
    age?: number,
    tokens: {
        token: string
    }[],
    generateToken() : Promise<string>
}