
"use strict"
//Get elements from html elements and declares variables
const coursesEL = document.getElementById("courses");

//Adding eventlisteners which will start different funcions on events. 
window.addEventListener('load', getCourses);


//Function that gets data witg courses from the rest-api.
function getCourses() {
    //Everytime the window reloads, the element will get empty.
    coursesEL.innerHTML = '';
    //Fetching data from rest-api courses
    fetch('http://localhost:3000/courses/')
        .then((resp) => resp.json())
        .then((data) => {
            let output = "";
            data.forEach(course => {
                coursesEL.innerHTML +=
                    "<div class='course'>" +
                    "<p>" + course.courseId + " - " + course.courseName + " - " + course.coursePeriod + "</p>" +

                    "<div class='buttons'>" +
                    "<button onclick='deleteCourse(" + course._id + ")'>Ta bort</button>" +
                    "</div>" +
                    "</div>";
            })
        })
}
//when delete button is clicked this funciton starts. 
function deleteCourse(id) {
    //Fetching the rest-api with delete request. 
    fetch('http://localhost:3000/courses/' + id, {
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
