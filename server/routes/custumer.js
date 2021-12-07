const router = require('express').Router();
const {
createCustumer,

} = require("../Controllers/custumercotroller");


router.post("/new-custumer", createCustumer);

module.exports = router;