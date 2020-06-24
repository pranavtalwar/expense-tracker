import { Document, Model } from 'mongoose'

export interface IUserDocument extends Document {
    firstName: string;
    lastName: string;
    email: string; 
    password: string,
    age?: number,
    tokens: {
        token: string
    }[],
}

export interface IUser extends IUserDocument {
    generateToken() : Promise<string>,
    toJSON(): IUserDocument
}

export interface IUserModel extends Model<IUser> {
    findByCredentials(email: string, password: string): Promise<IUserDocument>
}