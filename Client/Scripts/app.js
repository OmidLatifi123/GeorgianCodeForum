// Omid Latifi, Carlos DaSilva, Christian Schoenwiese, Tristan Schwekendiek
//     1199455, 1191123, 1186384 , 1207799

// Custom JavaScript

//IIFE -- Immediately Invoked Function Expression Example
(function(){
    function Start()
    {
        console.info(`App Started!`);
    }

    window.addEventListener('load', Start);
})(); 

/* EMAIL CODE */

/* AUTOTYPE CODE */
// SOURCE: https://chat.openai.com/

document.addEventListener("DOMContentLoaded", function () {
    // Function to shuffle the array randomly
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
// The texts which will be shown
    var strings = [
        " center a div?",
        " clone a git repo?",
        " fix my code?",
        " add a .gitignore file?",
        " install npm packages?",
        " make a linked list?"
    ];

    // Shuffle the array randomly
    strings = shuffleArray(strings);

    // Vertical Cursor ICon shown, 125ms to write a letter, 80ms to delete a letter 
    var type = new Typed(".auto-type", {
        strings: strings,
        typeSpeed: 125,
        backSpeed: 80,
        loop: true,
        showCursor: true
    });
});

