const express = require ('express');
const router = express.Router();

// require the controllers which are created in the controller folder
// .test method of product.controller module was exported to be used in other modules
const product_controller = require('../controllers/product.controller');

// a smiple test URL. Request controller for route /test will be defied in cotroller
router.get('/healthcheck',product_controller.healthcheck);
router.post('/login',product_controller.login);
router.post('/createaccount',product_controller.createaccount);
router.get('/viewaccounts',product_controller.viewaccounts);
router.get('/viewrequests',product_controller.viewrequests);
//router.post('/date',product_controller.createaccount);

module.exports = router;

