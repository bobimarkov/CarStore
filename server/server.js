const express = require("express");
const path = require('path')
const app = express();
const port = 5000;

app.use('/', express.static(path.join(__dirname, "public")))

app.use('/api', require("./routes/api.js"))

app.all('*', (req, res) => {
    if (req.accepts("html")) {
        res.status(404).sendFile(path.join(__dirname, "/public/404.html"));
    } else if (req.accepts("json")) {
        res.status(404).json({message: "404 Not Found!"});
    }
    else {
        res.status(404).send("404 Not Found!");
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
});