const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("All cars")
})

router.get("/:id", (req, res) => {
    res.send(`Car with id ${req.params.id}`)
})



module.exports = router;