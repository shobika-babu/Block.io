var express = require('express');
var Router = express.Router();
const controller = require('../../../controller/index')

Router.get('/address', controller.getAddress);
Router.post('/balance', controller.getBalance);
Router.post('/payment', controller.payment);
Router.get('/sentTransactions', controller.sentTransaction);
Router.get('/receivedTransactions', controller.receiveTransaction);

module.exports = Router;