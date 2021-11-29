var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');


// Create db schema
const coursesSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    courseId: String,
    courseName: String,
    link: String,
    progression: String,
    term: String,
});

//compile courses schema to model
module.exports = mongoose.model("course",coursesSchema)

//const course = mongoose.model("courses", courses);

//all routes in here are starting with /courses. 
router.get('/', (req, res) => {
    res.send(coursesSchema);
});

//Post courses, saving all items in the object. 
router.post("/", async function (req, res, next) {
    //data to add
    const addCourse = new course({
        _id: new mongoose.Types.ObjectId(),
        courseId: req.body.courseId,
        courseName: req.body.courseName,
        link: req.body.link,
        progression: req.body.progression,
        term: req.body.term,
    });
    //Saving data to database and print out a message. 
    addCourse.save().then(result=>{
        console.log(result);
    })
    .catch(err=> console.log(err));
});


router.get('/:id', (req, res) => {
    //Storing id from requested parameters in the url.
    //Declring a variable that contains the course with the same id. Using the method .find to search and get ther right data with the same id as the parameter
    const course = courses.find(course => course._id === parseInt(req.params.id));
    if (!course) res.status(404).send('the course with given id is not found');
    res.send(course);
})

router.delete('/:id', (req, res) => {
    //Want to keep all courses, exept the one that has the same id as in the request parameter. 
    const course = courses.find(course => course._id === parseInt(req.params.id));
    if (!course) res.status(404).send('the course with given id is not found');
    //Deleting object with the method indexOf to find the index of the item. 
    const index = courses.indexOf(course);
    //Using the method splice to remove an object from teh array. 
    courses.splice(index, 1);
    res.send(`the course is deleted`);

})

module.exports = router;
