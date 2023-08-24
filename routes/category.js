const express = require("express");
const router = express.Router();

// import model into router
const Category = require("../models/category");

router.get("/", async (req, res) => {
  try {
    res.status(200).send(await Category.find().populate("tasks"));
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.post("/", async (req, res) => {
  // create a placeholder for a new movie
  const newCategory = new Category({
    name: req.body.name,
  });
  // save the movie into mongodb
  await newCategory.save();
  res.send(newCategory);
});

module.exports = router;
