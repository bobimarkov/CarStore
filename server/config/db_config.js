const mongoose = require('mongoose');
const logger = require('../utils/logger');

const openConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        logger.info("The connection with the database is successful")
    }
    catch (e) {
        logger.error("MONGOOSE Connection - " + e.message)
    }
}

module.exports = openConnection;