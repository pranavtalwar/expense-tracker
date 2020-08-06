import mongoose, { Schema, HookNextFunction } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { IUserDocument, IUser, IUserModel } from './UserInterfaces'
import Expense from './Expense'

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
})

UserSchema.virtual('expenses', {
    ref: 'Expense',
    localField: '_id',
    foreignField: 'owner'
})

UserSchema.pre<IUserDocument>('save', async function (next: HookNextFunction): Promise<void> {
   const user: IUserDocument = this 
   if(user.isModified('password')) {
       user.password = await bcrypt.hash(user.password, 8)
   }
   next()
})

UserSchema.pre<IUserDocument>('remove', async function (next: HookNextFunction): Promise<void> {
    const user: IUserDocument = this 
    const owner = user._id
    await Expense.deleteMany({ owner })
    next()
 })

UserSchema.method('generateToken', async function (this: IUserDocument): Promise<string> {
    const user: IUserDocument = this 
    const token = jwt.sign({ _id: user._id.toString() }, 'secret')
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
})

UserSchema.method('toJSON', function (this: IUserDocument): Object {
    const user: IUserDocument = this
    
    const userObject: Object = user.toObject()
    delete (userObject as IUserDocument).password
    delete (userObject as IUserDocument).tokens
    delete (userObject as IUserDocument).__v
    delete (userObject as IUserDocument)._id
    return userObject
})

UserSchema.statics.findByCredentials =  async function (email: string, password: string): Promise<IUserDocument> {
    const user: IUserDocument | null = await User.findOne({ email })
    if(!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
        throw new Error('Unable to login')
    }

    return user
} 
    
const User : IUserModel = mongoose.model<IUser, IUserModel>('User', UserSchema)

export default User

