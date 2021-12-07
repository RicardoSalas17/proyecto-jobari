const router = require('express').Router();
const {
createMP,
getAllMP,
} = require("../Controllers/mpcontrollers");


router.post("/new-mp", createMP);
router.get("/get-allmp", getAllMP);

module.exports = router;