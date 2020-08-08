import chai from 'chai'
import chaiHttp from 'chai-http'
import 'mocha'
import {
    setupDatabase,
    userOne
} from './fixtures/db'

import { app } from '../app'

chai.use(chaiHttp)

describe('Testing users', (): void => {

    beforeEach(async () => {
        await setupDatabase()
    })

    it('Should send an email to the person', async (): Promise<void> => {
        const response = await chai
            .request(app).post('/signup')
            .send({
                email: 'mike.jones@example.com',
                firstName: 'Mike',
                lastName: 'Jones',
                password: 'testing123'
            })
        chai.expect(response.status).to.eql(200);
    })

    it('Should not send an email to the person', async (): Promise<void> => {
        const response = await chai
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

    
})