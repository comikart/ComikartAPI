const userService = require('../services/userService');


const login = (req, res) => {
    res.json("at login endpoint");
};

const register = (req, res) => {
    const { user } = req.body;

    userService.saveUser(user);

}

module.exports = {
    login,
    register
};