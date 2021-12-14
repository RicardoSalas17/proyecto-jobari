const router = require("express").Router();
const authRoutes = require("./auth");
const custumerRoutes = require ("./custumer")
const mpRoutes = require ("./MP")
const productRoutes = require ("./product")
const packageRoutes = require ("./package")
const orderRoutes = require ("./order")

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/custumer", custumerRoutes)
router.use("/mp", mpRoutes)
router.use("/product", productRoutes)
router.use("/package", packageRoutes)
router.use("/order", orderRoutes)



module.exports = router;
