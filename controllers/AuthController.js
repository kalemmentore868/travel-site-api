const express = require("express");
const router = express.Router();
const authModel = require("../models/authModel.js");

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body; // grabbing the data that was entered in the form

  // user object or null
  const user = await authModel.authenticate(email, password); //authenticate the user

  if (user) {
    /*
            1.creates SESSION and assigns the  user objec to session
            2. Creates A COOKIE and dumps the unqiue sessio id generated into the cookie  
            3. SENDS THE cookie back to the client (BROWSER). 
        */
    req.session.user = user;
    if (user.type === "User") {
      req.flash("success", "Successfully logged in as User");
      res.redirect("/users/profile");
    } else {
      req.flash("success", "Successfully logged in as Admin");
      res.redirect("users/admin");
    }
  } else {
    req.flash("error", "Incorrect credentials");
    res.render("login");
  }
});

router.get("/logout", (req, res) => {
  //destorys the user session
  req.session.user = undefined;
  req.flash("success", "Successfully logged out");
  res.redirect("/");
});

module.exports = router;
