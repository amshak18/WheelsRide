const mongoose = require("mongoose");
const promise = require('bluebird');

/**
 * this method is used to connect to the mongodb
 */
const connect = () => {
    const url = "mongodb+srv://wheelsride:Wheel$rid3@cs602.ordsl2a.mongodb.net/wheelsride?retryWrites=true&w=majority";
    mongoose.promise = promise;

    mongoose.connect(url, {
        promiseLibrary: promise,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    mongoose.connection.once("open", async () => {
        console.log("Connected to database");
    });

    mongoose.connection.on("error", (err) => {
        console.log("Error connecting to database  ", err);
    });

}

/**
 * this method is used to disconnect from the mongodb.
 */
const disconnect = () => {
    if (!mongoose.connection) {
        return;
    }

    mongoose.disconnect();
    mongoose.once("close", async () => {
        console.log("Disconnected from database");
    });
}

module.exports = {
    connect,
    disconnect
}
