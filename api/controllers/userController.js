const knex = require('../../db/knex');


const login = (req, res) => {
    res.json("at login endpoint");
};

const register = (req, res) => {
    res.json("at register endpoint");
}

module.exports = {
    login,
    register
};