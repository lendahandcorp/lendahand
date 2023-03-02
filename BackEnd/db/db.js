module.exports = {

    getDb: function (connString) {
        const mongoose = require('mongoose');

        // Set up default mongoose connection

        mongoose.connect(connString, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
            if (!err) {
                console.log('MongoDB has connected successfully.')
            } else {
                console.log('Error connecting to MongoDB.');
            }
            
        });

        // Get the default connection
        return mongoose.connection;

    },

    closeDB: function (db) {
        db.close()
        console.log("Connection to MongoDB closed.")
    }

}