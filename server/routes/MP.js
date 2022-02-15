const router = require('express').Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const {
createMP,
getAllMP,
getMP
} = require("../Controllers/mpcontrollers");


router.post("/new-mp",isLoggedIn,createMP);
router.get("/get-allmp",isLoggedIn,getAllMP);
router.get("/mp-detail/:id",isLoggedIn,getMP);

module.exports = router;