import chai from 'chai'
import chaiHttp from 'chai-http'
import 'mocha'

import { app } from '../app'

const sum = (a: number, b: number): number => a + b

chai.use(chaiHttp)

describe('Hello API Request', () => {
    it('should return response on call', async () => {
        const response = await chai.request(app).get('/hello')
        chai.expect(response.text).to.eql("hello");
    })
})