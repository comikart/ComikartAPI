const userService = require('../services/userService');


const login = (req, res) => {
    const { token } = req.body;
    token && res.json({token});
};

const register = (req, res) => {
    const { user } = req.body;
    userService.saveUser(user)
    .then(() => res.status(201).json({})) // on success reroute user to login.
    .catch(err => res.status(400).json({error: err.message}));
}

module.exports = {
    login,
    register
};