// Loops

console.log("Numbers from 1 to 5:");

for (let i = 1; i <= 5; i++) {
    console.log(i);
}

// Arrays

const favoriteMovies = [
    "Interstellar",
    "Inception",
    "The Dark Knight",
    "Avengers: Endgame",
    "Spider-Man: No Way Home"
];

console.log("Favorite Movies:");

favoriteMovies.forEach(function(movie) {
    console.log(movie);
});

// Array Methods

// Add a new movie
favoriteMovies.push("The Batman");

console.log("Updated Movies:");
console.log(favoriteMovies);

// Number of movies
console.log("Total Movies:", favoriteMovies.length);

// Convert movie names to uppercase
const upperCaseMovies = favoriteMovies.map(function(movie) {
    return movie.toUpperCase();
});

console.log("Uppercase Movies:");
console.log(upperCaseMovies);

// Remove one movie
const filteredMovies = favoriteMovies.filter(function(movie) {
    return movie !== "Inception";
});

console.log("Filtered Movies:");
console.log(filteredMovies);

// Object

const student = {

    name: "Uswah Nadir",

    skills: [
        "HTML",
        "CSS",
        "JavaScript"
    ],

    isLearning: true

};

console.log("Student Name:");
console.log(student.name);

console.log("Skills:");
console.log(student.skills);

console.log("Learning:");
console.log(student.isLearning);