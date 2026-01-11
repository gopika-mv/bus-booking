const db = require("../config/db");

exports.getAllBuses = (callback) => {
  db.query("SELECT * FROM buses", callback);
};
