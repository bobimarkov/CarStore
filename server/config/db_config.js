const mongoose = require('mongoose')

const openConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
    }
    catch (e) {
        console.log(e.message)
    }
}

module.exports = openConnection;