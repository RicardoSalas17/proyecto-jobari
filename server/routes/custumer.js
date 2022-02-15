const router = require('express').Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const {
createCustumer,
getAllCustumers,
getCustumer
} = require("../Controllers/custumercotroller");


router.post("/new-custumer",isLoggedIn ,createCustumer);
router.get("/get-allcustumer",isLoggedIn, getAllCustumers);
router.get("/custumer-detail/:id",isLoggedIn, getCustumer);

module.exports = router;