const express = require("express");
const router = express.Router();

// import model into router
const Task = require("../models/task");

router.get("/", async (req, res) => {
  const { status, priority, category } = req.query;
  let filter = {};

  if (status || priority || category) {
    if (status) {
      filter.status = status; // { genre: genre }
    }
    if (priority) {
      filter.priority = priority; // { rating: { $gt: rating } }
    }
    if (category) {
      filter.category = category; // { release_year: { $gt: release_year } }
    }
  }

  res.send(await Task.find(filter));
});

router.get("/:id", async (req, res) => {
  const data = await Task.findOne({ _id: req.params.id });
  res.send(data);
});

router.post("/", async (req, res) => {
  try {
    // create a placeholder for a new movie
    const newTask = new Task({
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      priority: req.body.priority,
      status: req.body.status,
      category: req.body.category,
    });
    // save the movie into mongodb
    await newTask.save();
    res.status(200).send(newTask);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.put("/:id", async (req, res) => {
  // get movie id
  const task_id = req.params.id; // update the movie
  const updatedTask = await Task.findByIdAndUpdate(task_id, req.body, {
    runValidators: true,
    new: true, // return the modified data
  });
  res.send(updatedTask);
});

router.put("/:id/completed", async (req, res) => {
  // get movie id
  const task_id = req.params.id;
  // update the movie
  const completedTask = await Task.findByIdAndUpdate(
    task_id,
    {
      completed: true,
    },
    {
      new: true,
    }
  );
  res.send(completedTask);
});

router.delete("/:id", async (req, res) => {
  // get movie id
  const task_id = req.params.id;
  // delete the movie
  const deletedTask = await Task.findByIdAndDelete(task_id);
  res.send(deletedTask);
});

module.exports = router;
