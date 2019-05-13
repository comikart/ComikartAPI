const user = {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@email.com',
    role_id: 2
}

const findUserByEmail = () => 
    new Promise((resolve, reject) => {
        resolve(user);
    });

module.exports = {
    findUserByEmail
};