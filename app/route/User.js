const { createUser, login } = require('../controller/User');

const express = require('express');
const Router = express.Router();

Router.post('/', createUser);
Router.post('/login', login);

module.exports = Router;
