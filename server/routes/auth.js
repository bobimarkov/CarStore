const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
    res.send("Logged in")
})

router.post("/logout", (req, res) => {
    res.send(`Logged out`)
})

router.get("/refresh", (req, res) => {
    res.send("Token refreshed")
})

module.exports = router;