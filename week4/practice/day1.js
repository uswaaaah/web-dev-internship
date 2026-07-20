// Variables

let studentName = "Uswah";

const university = "University";

let semester = 7;


// Data Types

let age = 21;
let isLearning = true;
let city = "Lahore";

let skills = [
    "HTML",
    "CSS",
    "JavaScript"
];

let student = {

    name: "Uswah",
    age: 21,
    course: "Computer Science"

};


// Functions

function greet(name) {

    return "Hello, " + name + "!";

}

function add(a, b) {

    return a + b;

}

function multiply(a, b) {

    return a * b;

}

const square = (number) => {

    return number * number;

};


// Console Output

console.log(greet(studentName));

console.log("Addition:", add(10, 5));

console.log("Multiplication:", multiply(4, 6));

console.log("Square:", square(8));

console.log("Skills:", skills);

console.log("Student Object:", student);