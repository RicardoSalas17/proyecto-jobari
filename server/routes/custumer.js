const router = require('express').Router();
const {
createCustumer,

} = require("../Controllers/custumer.cotroller");


router.post("/custumer", createCustumer);

module.exports = router;