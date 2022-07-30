const express = require("express");
const router = express.Router();
const Property = require("../models/PropertyModel.js");

router.get("/", async (req, res) => {
  const properties = await Property.getAllProperties();

  res.render("propertyListingPage", { properties });
});

router.get("/new", (req, res) => {
  res.render("newProperty");
});

router.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const property = await Property.getProperty(id);

  res.render("editProperty", { property });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const property = await Property.getProperty(id);

  res.render("propertyDetailsPage", { property });
});

router.post("/", async (req, res) => {
  const property_data = req.body;

  await Property.createProperties(property_data);

  res.redirect("/users/admin");
});

router.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const property_data = req.body;

  await Property.updateProperty(property_data, id);

  res.redirect("/users/admin");
});

router.post("/delete/:id", async (req, res) => {
  const { id } = req.params;

  await Property.deleteProperty(id);

  res.redirect("/users/admin");
});

module.exports = router;
