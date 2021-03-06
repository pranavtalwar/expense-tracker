import chai from 'chai'
import chaiHttp from 'chai-http'
import * as jwt from 'jsonwebtoken'
import 'mocha'
import {
    setupDatabase,
    destoryDatabase,
    userOne,
    userOneID,
    userTwo,
    userTwoID
} from './fixtures/db'
import { app } from '../app'
import User from '../models/User'
import { IUser } from '../models/UserInterfaces'

chai.use(chaiHttp)

describe('Testing users', (): void => {

    beforeEach(async () => {
        await setupDatabase()
    })

    after(async () => {
        await destoryDatabase()
    })

    it('Should send an email to the person', async (): Promise<void> => {
        const response: ChaiHttp.Response = await chai
            .request(app).post('/signup')
            .send({
                email: 'mike.jones@example.com',
                firstName: 'Mike',
                lastName: 'Jones',
                password: 'testing123'
            })
        chai.expect(response.status).to.eql(200);
    })

    it('Should not send an email to the person who already is a user', async (): Promise<void> => {
        const response: ChaiHttp.Response = await chai
            .request(app).post('/signup')
            .send({
                email: userOne.email,
                firstName: userOne.firstName,
                lastName: userOne.lastName,
                password: userOne.password,
                age: userOne.age
            })
        chai.expect(response.status).to.eql(403);
    })

    it('Should create an account for person verifying his account through activation', async () : Promise <void> => {
        const user: Object = {
            email: 'mike.jones@example.com',
            firstName: 'Mike',
            lastName: 'Jones',
            password: 'testing123'
        }
        const token = jwt.sign(user, process.env.JWT_SECRET as string, { expiresIn: '20m' })
        const response: ChaiHttp.Response = await chai
            .request(app).post(`/activation/${token}`)
            .send()
        
        chai.expect(response.status).to.eql(201)
        const userSaved: IUser | null = await User.findOne({ email: 'mike.jones@example.com' })
        chai.expect(user).to.not.be.null
    })


    it('Should not create an account for person who has already verified', async () : Promise <void> => {
        const user: Object = {
            email: userOne.email,
            firstName: userOne.firstName,
            lastName: userOne.lastName,
            password: userOne.password,
            age: userOne.age
        }
        const token = jwt.sign(user, process.env.JWT_SECRET as string, { expiresIn: '20m' })
        const response: ChaiHttp.Response = await chai
            .request(app).post(`/activation/${token}`)
            .send()
        
        chai.expect(response.status).to.eql(403)
    })

    it('Should login an exisiting user', async (): Promise<void> => {
        const response: ChaiHttp.Response = await chai
            .request(app).post('/login')
            .send({
                email: userOne.email,
                password: userOne.password
            })
        
        chai.expect(response.status).to.eql(200)
        
        const user: IUser | null = await User.findById(userOneID)
        chai.expect(response.body.token).to.eql(user?.tokens[1].token)
    })

    it('Should not login a non existent user', async (): Promise<void> => {
        const response: ChaiHttp.Response = await chai
            .request(app).post('/login')
            .send({
                email: 'non.existent@example.com',
                password: 'nonExistent'
            })
        
        chai.expect(response.status).to.eql(400)
    })

    it('Should not login an existent user with wrong password', async (): Promise<void> => {
        const response: ChaiHttp.Response = await chai
            .request(app).post('/login')
            .send({
                email: userOne.email,
                password: 'wrongPassword'
            })
        
        chai.expect(response.status).to.eql(400)
    })

    it('Should logout a logged in user', async (): Promise<void> => {
        const response: ChaiHttp.Response = await chai
            .request(app).post('/logout')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send()
        
        chai.expect(response.status).to.eql(200)
        const userSaved: IUser | null = await User.findById(userOneID)
        chai.expect(userSaved?.tokens.length).to.eql(0)
    })

    it('Should return 401 if header is not provided', async (): Promise<void> => {
        const response: ChaiHttp.Response = await chai
            .request(app).post('/logout')
            .send()
        
        chai.expect(response.status).to.eql(401)
    })

    it('Should delete all tokens if logout is used', async (): Promise<void> => {
        const response: ChaiHttp.Response = await chai
            .request(app).post('/logout')
            .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
            .send()
        
        chai.expect(response.status).to.eql(200)
        const userSaved: IUser | null = await User.findById(userTwoID)
        chai.expect(userSaved?.tokens.length).to.eql(0)
    })


    
})