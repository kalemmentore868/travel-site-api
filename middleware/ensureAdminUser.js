const ensureAdminUser = (req, res, next) => {
  //if session doesn't exists
  if (!req.session.user || req.session.user.type !== "Admin") {
    req.flash("error", "You must be an admin to view this page");
    res.redirect("/properties");
  } else {
    next();
  }

  //if session do exists
};

module.exports = ensureAdminUser;
