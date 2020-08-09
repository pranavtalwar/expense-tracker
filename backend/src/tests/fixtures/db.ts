import mongoose from 'mongoose'
import * as jwt from 'jsonwebtoken'
import User from '../../models/User'
import Expense from '../../models/Expense'

interface Token {
    token: string
}

interface SignupUser {
    _id: mongoose.Types.ObjectId
    firstName: string
    lastName: string,
    email: string,
    password: string,
    tokens: Array<Token>
    age?:number
}

const userOneID: mongoose.Types.ObjectId = new mongoose.Types.ObjectId()
const userOne: SignupUser = {
    _id: userOneID,
    firstName: 'James',
    lastName: 'Frank',
    email: 'james.frank@example.com',
    password: 'testing123',
    age: 20,
    tokens: [{
        token: jwt.sign({ _id: userOneID }, process.env.JWT_SECRET as string)
    }]
}

const userTwoID: mongoose.Types.ObjectId = new mongoose.Types.ObjectId()
const userTwo: SignupUser = {
    _id: userTwoID,
    firstName: 'Lily',
    lastName: 'Anderson',
    email: 'lily.anderson@example.com',
    password: 'checking123',
    age: 30,
    tokens: [{
        token: jwt.sign({ _id: userTwoID }, process.env.JWT_SECRET as string)
    }, {
        token: jwt.sign({ _id: userTwoID }, process.env.JWT_SECRET as string)
    }]
}

const setupDatabase = async () => {
    await User.deleteMany({})
    await new User(userOne).save()
    await new User(userTwo).save()
}

const destoryDatabase = async () => {
    await User.deleteMany({})
    await Expense.deleteMany({})
}

export {
    setupDatabase,
    destoryDatabase,
    userOne,
    userOneID,
    userTwo,
    userTwoID,
    SignupUser
}