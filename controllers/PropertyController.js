const express = require("express");
const router = express.Router();
const Property = require("../models/PropertyModel.js");

router.get("/", async (req, res) => {
  const properties = await Property.getAllProperties();

  res.render("propertyListingPage", { properties });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const property = await Property.getProperty(id);

  res.render("propertyDetailsPage", { property });
});

module.exports = router;
