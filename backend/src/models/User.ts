import mongoose, { Schema, Document } from 'mongoose'
import validator from 'validator'

const UserSchema: Schema = new mongoose.Schema ({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(value: string): any  {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trime: true,
        minlength: 6,
        validate(value: string): any {
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain the word password')
            }
        }
    },
    age: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string; 
    password: string,
    age: number 
}   

export default mongoose.model<IUser>('User', UserSchema)