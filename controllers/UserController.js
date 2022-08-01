const express = require("express");
const User = require("../models/UserModels.js");
const Property = require("../models/PropertyModel.js");
const userRegMidware = require("../middleware/userRegMidware.js");
const ensureAdminUser = require("../middleware/ensureAdminUser.js");
const router = express.Router();

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/profile", (req, res) => {
  res.render("profilePage");
});

router.get("/showusers", async (req, res) => {
  const users = await User.getAllUsers();

  let html = "";
  users.map((user) => {
    html += `<h1>${user.firstname} ${user.lastname}</h1> <h2>${user.email} ${user.password} ${user.type}</h2>`;
  });
  res.send(html);
});

router.post("/signup", userRegMidware, async (req, res) => {
  /*
        1. Get the information from the body of the request and store in an object
        2. Call the userModel to create the user
        3. res.redirect("/users") // GET A REQUEST!!! 
    */
  const user_data = req.body; // pluck out the data that was submitted via the form, from the body of the request

  await User.createUsers(user_data);
  req.session.user = user_data;

  if (user_data.type === "User") {
    res.redirect("/users/profile");
  } else {
    res.redirect("/users/admin");
  }
});

router.get("/admin", ensureAdminUser, async (req, res) => {
  const properties = await Property.getAllProperties();
  res.render("admin", { properties });
});

module.exports = router;
