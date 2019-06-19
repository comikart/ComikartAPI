const knext = require('../../db/knex');

const findAllClients = () => knext('user').where({ role_id: 2 });
