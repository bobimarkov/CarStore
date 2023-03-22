const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("All chats")
})

router.get("/:id", (req, res) => {
    res.send(`Chat with user with id ${req.params.id}`)
})



module.exports = router;