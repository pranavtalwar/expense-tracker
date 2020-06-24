import mongoose, { Schema, HookNextFunction } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { UserDocument } from './UserInterface'

const tokenSchema: Schema = new mongoose.Schema({
    token: {
        type: String,
        required: true 
    }
},{ 
    _id : false 
})

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
    },
    tokens: [tokenSchema]
}, {
    timestamps: true
})

UserSchema.pre<UserDocument>('save', async function (next: HookNextFunction): Promise<void> {
   const user: UserDocument = this 
   user.password = await bcrypt.hash(user.password, 8)
   next()
})

UserSchema.method('generateToken', async function (this: UserDocument): Promise<string> {
    const user: UserDocument = this 
    const token = jwt.sign({ _id: user._id.toString() }, 'secret')
    user.tokens = user.tokens.concat({ token })

    await user.save()

    return token
})

export default mongoose.model<UserDocument>('User', UserSchema)