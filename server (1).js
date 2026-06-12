const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/portfolioDB")
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const projectSchema = new mongoose.Schema({
    title: String,
    technology: String,
    github: String,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Project = mongoose.model("Project", projectSchema);

// Home Route
app.get("/", (req, res) => {
    res.send("🚀 Portfolio Project Manager Backend Running!");
});

// Get All Projects
app.get("/projects", async (req, res) => {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
});

// Add Project
app.post("/projects", async (req, res) => {
    const project = new Project(req.body);
    await project.save();

    res.json({
        success: true,
        message: "Project Added Successfully!"
    });
});

// Delete Project
app.delete("/projects/:id", async (req, res) => {
    await Project.findByIdAndDelete(req.params.id);

    res.json({
        success: true,
        message: "Project Deleted!"
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});