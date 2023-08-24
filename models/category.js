const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const taskSchema = require("./task");

const categorySchema = new Schema({
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  name: {
    type: String,
    required: true,
  },
});

const Category = model("Category", categorySchema);
module.exports = Category;
