const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./themepark.db", (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Connected to SQLite");
  }
});

/*
 USERS
*/

db.run(`

CREATE TABLE IF NOT EXISTS users(

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT NOT NULL,

    email TEXT UNIQUE NOT NULL,

    password TEXT NOT NULL

)

`);

/*
 RIDES
*/

db.run(`

CREATE TABLE IF NOT EXISTS rides(

    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ride_name TEXT NOT NULL,
    description TEXT,
    duration TEXT,
    min_height TEXT,
    image TEXT

)
`);

/* RIDE TIMES*/
db.run(`
CREATE TABLE IF NOT EXISTS ride_times(

    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ride_id INTEGER,
    ride_time TEXT,
    FOREIGN KEY(ride_id) REFERENCES rides(id)

)

`);

/*
 BOOKINGS
*/

db.run(`

CREATE TABLE IF NOT EXISTS bookings(

    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    ride_id INTEGER,
    booking_date TEXT,
    booking_time TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(ride_id) REFERENCES rides(id)

)

`);

module.exports = db;
