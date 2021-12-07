const router = require("express").Router();
const authRoutes = require("./auth");
const custumerRoutes = require ("./custumer")
const mpRoutes = require ("./MP")
const productRoutes = require ("./product")

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/custumer", custumerRoutes)
router.use("/mp", mpRoutes)
router.use("/product", productRoutes)

module.exports = router;
