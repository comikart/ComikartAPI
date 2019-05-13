jest.mock('../services/userService.js');
const controller = require('./userController');

class Response {
    constructor(body = {}) {
        this.body = body;
    }
    json(json) {
        this.body = json;
        return json;
    }
}

describe('/api/user', () => {

    describe('/login {POST}', () => {
    
        it('should return a user object', () => {
            // given
            const req = {body: {token: '1321beyv1ve76t1qv276e1v2bdand9ah', email: 'john@email.com'}};
            const res = new Response();

            //when
            controller.login(req, res)
            .then(response => {
                //then
                expect(req.body.email).toBe(response.user.email);
            });
        });
    })

    
});