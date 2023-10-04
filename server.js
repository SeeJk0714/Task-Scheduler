const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsHandler = cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
    preflightContinue: true,
});

app.use(corsHandler);

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
});

app.listen(4000, () => {
    console.log("Server is running at http://localhost:4000");
});
