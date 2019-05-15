const USERID = 1;

const user = {
    id: USERID,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@email.com',
    role_id: 2
}

const findUserByEmail = () => 
    new Promise((resolve, reject) => {
        resolve(user);
    });

const saveUser = (user) => 
    new Promise((resolve, reject) => {
        user.id = USERID;

        resolve(user);
    });

module.exports = {
    findUserByEmail,
    saveUser,
    USERID
};