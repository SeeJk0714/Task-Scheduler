const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const Category = require("./category");

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    dueDate: Date,
    status: {
        type: String,
        enum: ["Pending", "In Progress", "Completed", "Overdue"],
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
    },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
});

taskSchema.post("save", async function () {
    // retrieve the current id that is updated
    const taskID = this._id;
    const categoryID = this.category;
    // find the selected category
    const selectedCategory = await Category.findById(categoryID);
    // add the task into the selected category
    selectedCategory.tasks.push(taskID);
    // save the category
    await selectedCategory.save();
});

const Task = model("Task", taskSchema);
module.exports = Task;
