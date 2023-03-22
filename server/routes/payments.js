const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("All payments")
})

router.get("/:id", (req, res) => {
    res.send(`Payment with id ${req.params.id}`)
})



module.exports = router;