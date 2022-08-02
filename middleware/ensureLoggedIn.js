const ensureAdminUser = (req, res, next) => {
  //if session doesn't exists
  if (!req.session.user) {
    req.flash("error", "You must login to perform this action");
    res.redirect("/login");
  }

  //if session do exists
  next();
};

module.exports = ensureAdminUser;
