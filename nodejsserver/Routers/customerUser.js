const CustomerController = require("../Controllers/customerUser");
const express = require("express");

const router = express.Router();

router.post("/customer", CustomerController.customerUserRegister);
router.post("/customer/login", CustomerController.userCustomerLogin);

module.exports = router;