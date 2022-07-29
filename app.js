const express = require("express");
const { create } = require("express-handlebars");
const session = require("express-session");

const generalController = require("./controllers/GeneralController.js");
const userController = require("./controllers/UserController.js");
const propertyController = require("./controllers/PropertyController.js");
const authController = require("./controllers/AuthController.js");

const app = express();

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

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
  console.log(res.locals.user);
  next();
});

app.use("/", generalController);
app.use("/users", userController);
app.use("/properties", propertyController);
app.use("/login", authController);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
