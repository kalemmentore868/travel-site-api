const express = require("express");
const { engine } = require("express-handlebars");
const generalController = require("./controllers/GeneralController.js");
const userController = require("./controllers/UserController.js");

const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use("/", generalController);
app.use("/users", userController);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
