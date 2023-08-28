const express = require("express");
const Category = require("../models/category");
const router = express.Router();

const Task = require("../models/task");

router.get("/", async (req, res) => {
  try {
    const { status, priority, category } = req.query;
    let filter = {};
    if (status || priority || category) {
      if (status) {
        filter.status = status; 
      }
      if (priority) {
        filter.priority = priority; 
      }
      if (category) {
        filter.category = category; 
      }
    }

    res.status(200).send(await Task.find(filter));
  } catch (error) {
    res.status(400).send("Task not found");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await Task.findOne({ _id: req.params.id });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({message: "Task not found"});
  }
});

router.post("/", async (req, res) => {
  try {
    const newTask = new Task({
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      status: req.body.status,
      priority: req.body.priority,
      category: req.body.category,
    });
    await newTask.save();

    res.status(200).send(newTask);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const task_id = req.params.id;
    const updatedTask = await Task.findByIdAndUpdate(task_id, req.body,{
      runValidators: true,
      new: true, 
    });
    res.status(200).send(updatedTask);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const task_id = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(task_id);
    res.status(200).send(deletedTask);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.put("/:id/complete", async (req, res) => {
  try{
    const task_id = req.params.id;
    const completedTask = await Task.findByIdAndUpdate(
      task_id,
      {
        status: "Completed",
      },
      {
        new: true,
      }
    );
    res.status(200).send(completedTask);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
  
});

module.exports = router;