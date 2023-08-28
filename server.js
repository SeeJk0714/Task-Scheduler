const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose
    .connect("mongodb://127.0.0.1:27017/taskscheduler")
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));

const taskRouter = require("./routes/task");
const categoryRouter = require("./routes/category");

app.use("/tasks", taskRouter);
app.use("/categories", categoryRouter);

app.get("/", (req, res) => {
    res.send("<a href='/tasks'>Tasks</a><a href='/categories'>Categories</a>");
})

app.listen(4000, () => {
    console.log("Server is running at http://localhost:4000");
});