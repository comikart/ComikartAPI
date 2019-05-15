jest.mock('../services/userService.js');
const controller = require('./userController');
const { USERID } = require('../services/__mocks__/userService');

class Response {
    constructor(body = {}) {
        this.body = body;
    }
    json(body) {
        this.body = body;
        return this;
    }

    status(code) {
        this.status = code;
        return this;
    }
}

class User {
    constructor(first_name = 'John', 
                last_name = 'Doe', 
                email = 'john@email.com', 
                password = 'password') {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
    }
}

class Request {
    constructor(header = {}, body = {}) {
        this.header = header;
        this.body = body;
    }
}

describe('/api/user', () => {

    describe('/login {POST}', () => {
    
        it('should return a user object', (done) => {
            // given
            const req = {body: {token: '1321beyv1ve76t1qv276e1v2bdand9ah', email: 'john@email.com'}};
            const res = new Response();

            //when
            controller.login(req, res)
            .then(response => {
                //then
                expect(req.body.email).toBe(response.body.user.email);

                expect(req.body.token).toBe(response.body.token);
                
                done();
            });
        });
    });

    describe('/register {POST}', () => {
        it('should accept a user object, and return a saved user', (done) => {
            const req = new Request({}, {user: new User()});
            const res = new Response();

            controller.register(req, res)
            .then(response => {
                expect(response.status).toBe(201);

                done();
            });
        });
    })
});