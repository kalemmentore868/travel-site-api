const express = require("express");
const User = require("../models/UserModels.js");
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

router.post("/signup", async (req, res) => {
  /*
        1. Get the information from the body of the request and store in an object
        2. Call the userModel to create the user
        3. res.redirect("/users") // GET A REQUEST!!! 
    */
  const user_data = req.body; // pluck out the data that was submitted via the form, from the body of the request

  if (user_data.password === user_data.repeatPassword) {
    delete user_data.repeatPassword;
    await User.createUsers(user_data);

    res.redirect("/users/showusers"); // SENDS A GET REQUEST TO /USERS
  }
});

module.exports = router;
