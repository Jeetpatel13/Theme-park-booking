const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs");

const authMiddleware = require("./middleware/authMiddleware");

const db = require("./database/db");

const app = express();

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(
  session({
    secret: "themeparksecret",

    resave: false,

    saveUninitialized: false,
  }),
);

app.use(express.static("public"));

/*
 HOME
*/

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

/*
 GET ALL RIDES
*/

app.get("/api/rides", (req, res) => {
  db.all(
    `SELECT * FROM rides`,

    [],

    (err, rows) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(rows);
    },
  );
});

/*
 SEED DATA
*/

app.get("/seed", (req, res) => {
  db.serialize(() => {
    db.run(`DELETE FROM ride_times`);
    db.run(`DELETE FROM rides`);

    /*
        THUNDER COASTER
        */

    db.run(
      `
            INSERT INTO rides
            (
                ride_name,
                description,
                duration,
                min_height,
                image
            )
            VALUES
            (
                'Thunder Coaster',
                'Fast roller coaster',
                '2 Minutes',
                '120 cm',
                'rollercoaster.jpg'
            )
            `,

      function () {
        const id = this.lastID;

        db.run(`INSERT INTO ride_times(ride_id,ride_time) VALUES(?,?)`, [
          id,
          "10:00 AM",
        ]);
        db.run(`INSERT INTO ride_times(ride_id,ride_time) VALUES(?,?)`, [
          id,
          "11:00 AM",
        ]);
        db.run(`INSERT INTO ride_times(ride_id,ride_time) VALUES(?,?)`, [
          id,
          "12:00 PM",
        ]);
        db.run(`INSERT INTO ride_times(ride_id,ride_time) VALUES(?,?)`, [
          id,
          "1:00 PM",
        ]);
      },
    );

    /*
        SKY WHEEL
        */

    db.run(
      `
            INSERT INTO rides
            (
                ride_name,
                description,
                duration,
                min_height,
                image
            )
            VALUES
            (
                'Sky Wheel',
                'Family Ride',
                '10 Minutes',
                'No Limit',
                'ferriswheel.jpg'
            )
            `,

      function () {
        const id = this.lastID;

        db.run(`INSERT INTO ride_times(ride_id,ride_time) VALUES(?,?)`, [
          id,
          "10:30 AM",
        ]);
        db.run(`INSERT INTO ride_times(ride_id,ride_time) VALUES(?,?)`, [
          id,
          "11:30 AM",
        ]);
        db.run(`INSERT INTO ride_times(ride_id,ride_time) VALUES(?,?)`, [
          id,
          "12:30 PM",
        ]);
      },
    );

    /*
        PIRATE ADVENTURE
        */

    db.run(
      `
            INSERT INTO rides
            (
                ride_name,
                description,
                duration,
                min_height,
                image
            )
            VALUES
            (
                'Pirate Adventure',
                'Water Attraction',
                '5 Minutes',
                '100 cm',
                'pirate.jpg'
            )
            `,

      function () {
        const id = this.lastID;

        db.run(`INSERT INTO ride_times(ride_id,ride_time) VALUES(?,?)`, [
          id,
          "1:00 PM",
        ]);
        db.run(`INSERT INTO ride_times(ride_id,ride_time) VALUES(?,?)`, [
          id,
          "2:00 PM",
        ]);
        db.run(`INSERT INTO ride_times(ride_id,ride_time) VALUES(?,?)`, [
          id,
          "3:00 PM",
        ]);
      },
    );

    /*
        HAUNTED MANSION
        */

    db.run(
      `
            INSERT INTO rides
            (
                ride_name,
                description,
                duration,
                min_height,
                image
            )
            VALUES
            (
                'Haunted Mansion',
                'Scary Adventure',
                '8 Minutes',
                '110 cm',
                'hauntedhouse.jpg'
            )
            `,

      function () {
        const id = this.lastID;

        db.run(`INSERT INTO ride_times(ride_id,ride_time) VALUES(?,?)`, [
          id,
          "11:00 AM",
        ]);
        db.run(`INSERT INTO ride_times(ride_id,ride_time) VALUES(?,?)`, [
          id,
          "12:00 PM",
        ]);
        db.run(`INSERT INTO ride_times(ride_id,ride_time) VALUES(?,?)`, [
          id,
          "2:00 PM",
        ]);
        db.run(`INSERT INTO ride_times(ride_id,ride_time) VALUES(?,?)`, [
          id,
          "4:00 PM",
        ]);
      },
    );
  });

  res.send("Seed Complete");
});
app.get("/session-status", (req, res) => {
  res.json({
    loggedIn: !!req.session.userId,

    userName: req.session.userName || "",
  });
});
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
      `
            INSERT INTO users
            (
                name,
                email,
                password
            )
            VALUES(?,?,?)
            `,

      [name, email, hashedPassword],

      function (err) {
        if (err) {
          return res.status(400).json({
            message: "Email already exists",
          });
        }

        res.json({
          message: "Registration Successful",
        });
      },
    );
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get(
    `
        SELECT *
        FROM users
        WHERE email=?
        `,

    [email],

    async (err, user) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (!user) {
        return res.status(400).json({
          message: "User not found",
        });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(400).json({
          message: "Wrong Password",
        });
      }

      req.session.userId = user.id;

      req.session.userName = user.name;

      res.json({
        message: "Login Successful",
      });
    },
  );
});
// app.get('/logout',(req,res)=>{

//     req.session.destroy();

//     res.send(
//         'Logged Out'
//     );

// });
app.get("/api/rides", (req, res) => {
  db.all(
    `SELECT * FROM rides`,
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json(rows);
    },
  );
});
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});
app.get("/dashboard", authMiddleware, (req, res) => {
  res.sendFile(__dirname + "/public/dashboard.html");
});
app.get("/api/rides/details", (req, res) => {
  const sql = `

SELECT

    rides.id,
    rides.ride_name,
    rides.description,
    rides.duration,
    rides.min_height,
    rides.image,
    ride_times.ride_time

FROM rides

LEFT JOIN ride_times
ON rides.id = ride_times.ride_id

`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(rows);
  });
});
app.post(
  "/api/bookings",

  authMiddleware,

  (req, res) => {
    const { rideId, bookingDate, bookingTime } = req.body;

    db.run(
      `

            INSERT INTO bookings
            (
                user_id,
                ride_id,
                booking_date,
                booking_time
            )

            VALUES(?,?,?,?)

            `,

      [req.session.userId, rideId, bookingDate, bookingTime],

      function (err) {
        if (err) {
          return res.status(500).json(err);
        }

        res.json({
          message: "Booking Created",
        });
      },
    );
  },
);
app.get(
  "/api/bookings",

  authMiddleware,

  (req, res) => {
    const sql = `

        SELECT

            bookings.id,
            bookings.booking_date,
            bookings.booking_time,
            rides.ride_name

        FROM bookings

        INNER JOIN rides

        ON bookings.ride_id = rides.id

        WHERE bookings.user_id = ?

        `;

    db.all(
      sql,

      [req.session.userId],

      (err, rows) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.json(rows);
      },
    );
  },
);
app.delete(
  "/api/bookings/:id",

  authMiddleware,

  (req, res) => {
    db.run(
      `

            DELETE FROM bookings

            WHERE id = ?

            AND user_id = ?

            `,

      [req.params.id, req.session.userId],

      function (err) {
        if (err) {
          return res.status(500).json(err);
        }

        res.json({
          message: "Booking Cancelled",
        });
      },
    );
  },
);
app.listen(
  3000,

  () => {
    console.log("Server Running");
  },
);
