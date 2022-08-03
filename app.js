if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const { create } = require("express-handlebars");
const session = require("express-session");
const flash = require("connect-flash");

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

app.use(flash());

const hbs = create({
  // Specify helpers which are only registered on this instance.
  helpers: {
    isFirst: function (id) {
      if (id === 1) return "active";
    },
  },
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals.user = req.session.user; // this is avaiable to every handlebars page
  next();
});

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", generalController);
app.use("/users", userController);
app.use("/properties", propertyController);
app.use("/", authController);
app.use("/booking", bookingController);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
