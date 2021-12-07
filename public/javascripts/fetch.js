
"use strict"
//Get elements from html elements and declares variables
const coursesEL = document.getElementById("courses");
const addCourseBtn = document.getElementById("addCourseBtn");
let courseIdItem = document.getElementById("courseId");
let courseNameItem = document.getElementById("courseName");
let linkItem = document.getElementById("link");
let progressionItem = document.getElementById("progression");
let termItem = document.getElementById("term");


//Adding eventlisteners which will start different funcions on events. 
window.addEventListener('load', getCourses);
addCourseBtn.addEventListener('click', addCourse);



//Function that gets data witg courses from the rest-api.
function getCourses() {
    //Everytime the window reloads, the element will get empty.
    coursesEL.innerHTML = '';
    //Fetching data from rest-api courses
    fetch('http://localhost:3000/courses/')
        .then((resp) => resp.json())
        .then((data) => {
            data.forEach(course => {
                coursesEL.innerHTML +=
                    "<div class='course'>" +
                    "<div><h2>" + course.courseName + "</h2><p>" + course.courseId + " <br> <a href=' " + course.link + "'>Kurslänk</a> <br> Progression: " + course.progression + " <br> Termin:  " + course.term +"</p></div>" +
                    "<div class='buttons'>" +
                    "<button onclick='deleteCourse(\"" + course._id + "\")'>Ta bort</button>" +
                    "</div>";
            })
        })
}
//when delete button is clicked this funciton starts. 
function deleteCourse(_id) {
    //Fetching the rest-api with delete request. 
    fetch('http://localhost:3000/courses/' + _id, {
        method: 'DELETE',
    })
        //After request is done courses are reloded again. 
        .then(data => {
            getCourses();
        })
        //If something goes wrong, an error message will be shown. 
        .catch(error => {
            console.log('Felmeddelande:', error);
        })
}


//When the user in the admin page is filling in the form and klick the button "lägg till" this funciton will start
function addCourse() {
    //Creating variables with the values that is inputed in the form

    let courseId = courseIdItem.value;
    let courseName = courseNameItem.value;
    let link = linkItem.value;
    let progression = progressionItem.value;
    let term = termItem.value;

    //Adding the values into the object course
    let course = { 'courseId': courseId, 'courseName': courseName,'link': link, 'progression': progression, 'term':term };
    //Fetching dtaa to courses api with the request post. 
    fetch("http://localhost:3000/courses/", {
        method: 'POST',
        body: JSON.stringify(course),
        headers: {
          'Content-Type': 'application/json'
        }        
    })
        .then(response => response.json())
        .then(data => {
        //After request is done courses are reloded again. 
            getCourses();
        })
        //If something goes wrong, an error message will be shown. 
        .catch(error => {
            console.log('Felmeddelande:', error);
        })
}
