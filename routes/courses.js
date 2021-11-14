var express = require('express');
var router = express.Router();



//Making an emtpy array to fill it in through postman. Have to use let to be able to add, uppdate and delete the array. 
let courses = [{"_id":1,"courseId":"DT162G","courseName":"Javascript-baserad webbutveckling","coursePeriod":1},{"_id":2,"courseId":"IK060G","courseName":"Projektledning","coursePeriod":1},{"_id":3,"courseId":"DT071G","courseName":"Programmering i C#.NET","coursePeriod":2},{"_id":4,"courseId":"DT148G","courseName":"Webbutveckling för mobila enheter","coursePeriod":2},{"_id":5,"courseId":"DT102G","courseName":"ASP.NET med C#","coursePeriod":3},{"_id":6,"courseId":"IG021G","courseName":"Affärsplaner och kommersialisering","coursePeriod":3},{"_id":7,"courseId":"DT069G","courseName":"Multimedia för webben","coursePeriod":4},{"_id":8,"courseId":"DT080G","courseName":"Självständigt arbete","coursePeriod":4}]

//all routes in here are starting with /courses. 
router.get('/', (req, res) => {
    res.send(courses);
});

// router.post('/', (req, res) =>{
//     const courses = req.body;
//     //Adding one more value vith id to the courses object 
//     const coursesWithId = { ...course, id:uuidv4()} // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
//     courses.push(coursesWithId);
//     res.send(`Courses with the name ${course.courseName} added to the database `);
// });

router.get('/:id', (req,res) =>{
    //Storing id from requested parameters in the url.
    //Declring a variable that contains the course with the same id. Using the method .find to search and get ther right data with the same id as the parameter
    const course = courses.find(course=> course._id === parseInt(req.params.id));
    if (!course) res.status(404).send('the course with given id is not found');
    res.send(course);
})

router.delete('/:id', (req,res) =>{
    //Want to keep all courses, exept the one that has the same id as in the request parameter. 
    const course = courses.find(course=> course._id === parseInt(req.params.id));
    if (!course) res.status(404).send('the course with given id is not found');
    //Deleting object with the method indexOf to find the index of the item. 
    const index= courses.indexOf(course);
    //Using the method splice to remove an object from teh array. 
    courses.splice(index, 1);
    res.send(`the course is deleted`);

})

module.exports = router;
