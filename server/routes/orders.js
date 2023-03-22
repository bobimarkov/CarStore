const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("All orders")
})

router.get("/:id", (req, res) => {
    res.send(`Order with id ${req.params.id}`)
})



module.exports = router;