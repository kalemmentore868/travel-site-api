const express = require("express");
const router = express.Router();
const Property = require("../models/PropertyModel.js");

router.get("/", async (req, res) => {
  const properties = await Property.getAllProperties();

  res.json({
    message: "A list of all the users",
    data: properties,
  });
});

module.exports = router;
