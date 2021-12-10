const router = require('express').Router();
const {
createCustumer,
getAllCustumers
} = require("../Controllers/custumercotroller");


router.post("/new-custumer", createCustumer);
router.get("/get-allcustumer", getAllCustumers);

module.exports = router;