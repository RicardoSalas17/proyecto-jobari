const router = require('express').Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const {
createCustumer,
getAllCustumers
} = require("../Controllers/custumercotroller");


router.post("/new-custumer",isLoggedIn ,createCustumer);
router.get("/get-allcustumer",isLoggedIn, getAllCustumers);

module.exports = router;