const router = require('express').Router();
const {
    createRoute,
    getAllRoute,
    getRoute
} = require("../Controllers/routecontroller");


router.post("/new-route", createRoute);
router.get("/get-routes", getAllRoute);
router.get("/route-detail/:id", getRoute);


module.exports = router;