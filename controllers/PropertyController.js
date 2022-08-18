const express = require("express");
const router = express.Router();
const Property = require("../models/PropertyModel.js");
const propertyFormValidation = require("../middleware/propertyRegMidware.js");
const ensureAdminUser = require("../middleware/ensureAdminUser.js");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router.get("/", async (req, res) => {
  const properties = await Property.getAllProperties();

  res.json({
    message: "A list of all the properties",
    data: properties,
  });
});

// router.get("/new", ensureAdminUser, (req, res) => {
//   res.render("newProperty");
// });

router.get(
  "/edit/:id",
  //ensureAdminUser,
  async (req, res) => {
    const { id } = req.params;
    const property = await Property.getProperty(id);

    if (!property) {
      res.status(404).json({
        message: `Property with id :${id} cannot be found`,
      });
    } else {
      res.json({
        message: "A property you want to edit",
        data: property,
      });
    }
  }
);

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const property = await Property.getProperty(id);

  if (!property) {
    res.status(404).json({
      message: `Property with id :${id} cannot be found`,
    });
  } else {
    res.json({
      message: "the selected property",
      data: property,
    });
  }
});

router.post(
  "/",
  //upload.single("image"),
  //propertyFormValidation,
  //ensureAdminUser,
  async (req, res) => {
    const property_data = req.body;
    // property_data.imageUrl = req.file.path;

    const property = await Property.createProperties(property_data);
    res.status(201).json({
      message: "A property was created!",
      data: property,
    });

    // res.redirect("/users/admin");
  }
);

router.put(
  "/:id",
  // upload.single("image"),
  // propertyFormValidation,
  //ensureAdminUser,
  async (req, res) => {
    const { id } = req.params;
    const property_data = req.body;

    const property = await Property.updateProperty(property_data, id);
    res.json({
      message: `Property with id : ${id} was updated`,
      data: property,
    });
  }
);

router.delete(
  "/:id",
  //ensureAdminUser,
  async (req, res) => {
    const { id } = req.params;

    const property = await Property.getProperty(id);

    if (!property) {
      res.status(404).json({
        message: `Property with id :${id} cannot be found`,
      });
    } else {
      await Property.deleteProperty(id);
      res.json({
        message: `Property with id :${id} was deleted`,
      });
    }
  }
);

module.exports = router;
