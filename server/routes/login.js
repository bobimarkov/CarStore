const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
    res.send("Logged in")
})

module.exports = router;