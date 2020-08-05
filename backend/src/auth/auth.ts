import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import User from '../models/User'
import { IUserDocument } from '../models/UserInterfaces'

const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {  
        const token: string | undefined= req.headers.authorization?.replace('Bearer ', '')
        let decodedToken: any
        if(typeof token === 'string') {
            decodedToken = jwt.verify(token, 'secret')
        } else {
            throw new Error()
        }
        
        const user: IUserDocument | null = await User.findOne({ _id: decodedToken._id, 'tokens.token': token })
        if(!user) {
            throw new Error()
        }

        res.locals.user = user
        res.locals.token = token
        next()
    } catch(error) {
        res.status(401).send({ error: 'Please authenticate'})
    }
}

export default auth 