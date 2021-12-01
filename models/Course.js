const mongoose = require('mongoose');

// Create db schema
const coursesSchema = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    courseId: String,
    courseName: String,
    link: String,
    progression: String,
    term: String,
});

//compile courses schema to model
module.exports = mongoose.model("Course", coursesSchema)
