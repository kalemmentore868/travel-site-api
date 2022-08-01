const ensureAdminUser = (req, res, next) => {
  //if session doesn't exists
  if (!req.session.user || !req.session.user.type === "Admin") {
    console.log("Not an admin user");
    res.redirect("/");
  }

  //if session do exists
  next();
};

module.exports = ensureAdminUser;
