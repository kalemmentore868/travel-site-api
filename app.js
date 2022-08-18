if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const session = require("express-session");

const generalController = require("./controllers/GeneralController.js");
const userController = require("./controllers/UserController.js");
const propertyController = require("./controllers/PropertyController.js");
const authController = require("./controllers/AuthController.js");
const bookingController = require("./controllers/BookingController.js");

const app = express();

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(express.json());

app.use((req, res, next) => {
  res.locals.user = req.session.user; // this is avaiable to every handlebars page
  next();
});

app.use("/api", generalController);
app.use("/api/users", userController);
app.use("/api/properties", propertyController);
app.use("/api", authController);
app.use("/api/booking", bookingController);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
