const express = require("express");
const User = require("../models/UserModels.js");
const Property = require("../models/PropertyModel.js");
const userRegMidware = require("../middleware/userRegMidware.js");
const ensureAdminUser = require("../middleware/ensureAdminUser.js");
const router = express.Router();

// router.get("/signup", (req, res) => {
//   res.render("signup");
// });

// router.get("/profile", (req, res) => {
//   res.render("profilePage");
// });

// router.get("/showusers", async (req, res) => {
//   const users = await User.getAllUsers();

//   let html = "";
//   users.map((user) => {
//     html += `<h1>${user.firstname} ${user.lastname}</h1> <h2>${user.email} ${user.password} ${user.type}</h2>`;
//   });
//   res.send(html);
// });

router.post(
  "/",
  // userRegMidware,
  async (req, res) => {
    const user_data = req.body; // pluck out the data that was submitted via the form, from the body of the request

    const user = await User.createUsers(user_data);
    console.log(user);
    res.status(201).json({
      message: "A user was created!",
      data: user,
    });
  }
);

// router.get("/admin", ensureAdminUser, async (req, res) => {
//   const properties = await Property.getAllProperties();
//   res.render("admin", { properties });
// });

module.exports = router;
