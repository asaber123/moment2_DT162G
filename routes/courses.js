var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Course = require('../models/Course')


//all routes in here are starting with /courses. 

//Get all courses
router.get('/', async (req, res) => {
    try{
        const course = await Course.find();
        res.json(course)
    }catch(err){
       res.json({message:err})
    }
});

//Post courses, saving all items in the object. 
router.post("/", async (req, res) => {
    //data to add
    const addCourse = new Course({
        //_id: new mongoose.Types.ObjectId(),
        courseId: req.body.courseId,
        courseName: req.body.courseName,
        link: req.body.link,
        progression: req.body.progression,
        term: req.body.term,
    });
    //Saving data to database and print out a message to the sceen with the data that was sent. 
    try{
    const savedCourses = await post.save(); 
    res.json(savedCourses);
}//Send out an error message if post could not be sent
    catch(err){
        res.json({message:err})
    }
});

//Get specific post
router.get('/:id', async (req, res) => {
    try{
    const course = await Course.findById(req.params.id);
    res.json(course);}
    catch(err){
        res.json({message:err})
    }
    //Storing id from requested parameters in the url.
    //Declring a variable that contains the course with the same id. Using the method .find to search and get ther right data with the same id as the parameter
    // const course = courses.find(course => course._id === parseInt(req.params.id));
    // if (!course) res.status(404).send('the course with given id is not found');
    // res.send(course);
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
