const ensureAdminUser = (req, res, next) => {
  //if session doesn't exists
  if (!req.session.user) {
    console.log("Please login");
    res.redirect("/");
  }

  //if session do exists
  next();
};

module.exports = ensureAdminUser;
