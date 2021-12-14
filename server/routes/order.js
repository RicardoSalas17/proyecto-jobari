const router = require('express').Router();
const {
createOrder,
getAllOrders,
} = require("../Controllers/ordercontrollers");


router.post("/new-order", createOrder);
router.get("/get-allorders", getAllOrders);

module.exports = router;