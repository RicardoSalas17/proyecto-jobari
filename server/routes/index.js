const router = require("express").Router();
const authRoutes = require("./auth");
const custumerRoutes = require ("./custumer")

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/custumer", custumerRoutes)

module.exports = router;
