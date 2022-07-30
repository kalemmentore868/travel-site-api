const userFormValidation = (req, res, next) => {
  const errors = {}; // length 0

  //destructring
  const { firstname, lastname, email, password, repeatPassword } = req.body;

  if (firstname === "") {
    errors.firstname = "You must enter a first name";
  }

  if (lastname === "") {
    errors.lastname = "You must enter a last name";
  }

  if (email === "") {
    errors.email = "You must enter an email";
  }

  if (password === "") {
    errors.password = "You must enter a password";
  }

  if (password !== repeatPassword) {
    errors.password = "passwords must match";
  }

  //THE ARE ERRORS
  if (Object.keys(errors).length > 0) {
    //cycle will be broken
    res.render("signup", {
      errors,
      current_form_data: req.body,
    });
  }

  //NO ERROS
  else {
    next();
  }
};

module.exports = userFormValidation;
