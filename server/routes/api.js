const express = require("express");
const router = express.Router();

router.use("/users", require("./users.js"))
router.use("/cars", require("./cars.js"))
router.use("/dealerships", require("./dealerships.js"))
router.use("/login", require("./login.js"))
router.use("/logout", require("./logout.js"))
router.use("/messages", require("./messages.js"))
router.use("/orders", require("./orders.js"))
router.use("/payments", require("./payments.js"))

module.exports = router;