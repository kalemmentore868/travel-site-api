const propertyFormValidation = (req, res, next) => {
  const errors = {}; // length 0

  //destructring
  const { title, price, imageUrl, location, starRating, type, details } =
    req.body;

  if (title === "") {
    errors.title = "You must enter a title";
  }

  if (price === "") {
    errors.price = "You must enter a price";
  } else if (isNaN(parseInt(price))) {
    errors.price = "Price must be a number";
  }

  if (location === "") {
    errors.location = "You must enter a location";
  }

  if (starRating === "") {
    errors.starRating = "You must enter a star rating";
  } else if (isNaN(parseInt(starRating))) {
    errors.starRating = "Star rating must be a number";
  }

  if (type === "") {
    errors.type = "You must enter a type";
  }

  if (details === "") {
    errors.details = "You must enter a details";
  }

  console.log(errors, req.body);

  //THE ARE ERRORS
  if (Object.keys(errors).length > 0) {
    //cycle will be broken
    res.render("newProperty", {
      errors,
      current_form_data: req.body,
    });
  }

  //NO ERROS
  else {
    next();
  }
};

module.exports = propertyFormValidation;
