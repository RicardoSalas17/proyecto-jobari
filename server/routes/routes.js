const router = require('express').Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const {
    createRoute,
    getAllRoute,
    getRoute
} = require("../Controllers/routecontroller");


router.post("/new-route",isLoggedIn,createRoute);
router.get("/get-routes",isLoggedIn,getAllRoute);
router.get("/route-detail/:id",isLoggedIn,getRoute);


module.exports = router;