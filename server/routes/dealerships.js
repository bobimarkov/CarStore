const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("All dealerships")
})

router.get("/:id", (req, res) => {
    res.send(`Dealership with id ${req.params.id}`)
})



module.exports = router;