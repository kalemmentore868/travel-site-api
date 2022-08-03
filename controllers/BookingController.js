const express = require("express");
const router = express.Router();
const BookingModel = require("../models/BookingModel.js");
const PropertyModel = require("../models/PropertyModel.js");
const ensureLoggedInMidware = require("../middleware/ensureLoggedIn.js");

router.get(
  "/:propertyId",
  //ensureLoggedInMidware,
  async (req, res) => {
    const { propertyId } = req.params;
    const bookedProperty = await PropertyModel.getProperty(propertyId);
    res.render("booking", { bookedProperty });
  }
);

router.post("/:propertyId", ensureLoggedInMidware, async (req, res) => {
  const { propertyId } = req.params;
  const bookingData = req.body;
  bookingData.date_booked = new Date().toISOString().split("T")[0];
  console.log(bookingData);
  await BookingModel.createBooking(
    bookingData,
    req.session.user.id,
    propertyId
  );
  req.flash("success", "successfully booked property");
  res.redirect("/");
});

module.exports = router;
