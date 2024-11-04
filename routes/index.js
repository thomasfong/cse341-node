const routes = require('express').Router();
const lesson1Controller = require('../controllers/lesson1');

routes.get('/',lesson1Controller.davidRoute);
routes.get('/thomas', lesson1Controller.thomasRoute);
routes.get('/Fion', lesson1Controller.FionRoute);

module.exports = routes