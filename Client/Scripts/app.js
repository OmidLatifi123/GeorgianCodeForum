// Omid Latifi, Carlos DaSilva, Christian Schoenwiese, Tristan Schwekendiek
//     1199455, 1191123, 1186384 , 1207799

// Custom JavaScript

//IIFE -- Immediately Invoked Function Expression Example
(function(){
    function Start()
    {
        console.info('App Started!');
    }

    window.addEventListener('load', Start);
})(); 

/* DYNAMIC NUMBER COUNTER
SOURCE: https://www.youtube.com/watch?v=zC86L6UzcR4&ab_channel=CoderPrync */

let valueDisplays = document.querySelectorAll(".num");
let interval = 2000;

valueDisplays.forEach((valueDisplay) => {
  let startValue = 0;
  let endValue = parseInt(valueDisplay.getAttribute("data-val"));
  let duration = Math.floor(interval / endValue);

  let counter;

  function startCounter() {
    counter = setInterval(() => {
      startValue++;
      let remainingDistance = endValue - startValue;
      duration = Math.floor(interval / remainingDistance);
      valueDisplay.textContent = startValue;

      if (startValue === endValue) {
        clearInterval(counter);
      }
    }, duration);
  }

  // Check for visibility using the Intersection Observer API
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounter(); // Start the counter when the element is visible
        observer.disconnect(); // Disconnect to avoid unnecessary checks
      }
    });
  });

  observer.observe(valueDisplay); // Observe the visibility of the valueDisplay element
});

// //TIME POSTED CODE TEST:
// // Helper function to calculate time elapsed since creation
// Handlebars.registerHelper('timeSinceCreation', function(createdAt) {
//   // Calculate the time difference between now and the creation time
//   const timeDiff = Date.now() - new Date(createdAt).getTime();

//   // Convert milliseconds to seconds
//   const seconds = Math.floor(timeDiff / 1000);

//   // Define time intervals
//   const intervals = {
//       year: 31536000,
//       month: 2592000,
//       week: 604800,
//       day: 86400,
//       hour: 3600,
//       minute: 60
//   };

//   // Iterate through intervals to find the appropriate unit
//   for (let unit in intervals) {
//       const interval = Math.floor(seconds / intervals[unit]);
//       if (interval > 0) {
//           return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
//       }
//   }

//   return 'Just now'; // If the post was created less than a minute ago
// });

// / AUTOTYPE CODE /
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

/* EMAIL CODE / */

let contactForm = document.getElementById("contact");
let formName = document.getElementById("name");
let formEmail = document.getElementById("email");
let formIssue = document.getElementById("issue");
console.log(formName.value);

contactForm.addEventListener('submit', function(event){
    event.preventDefault()

    let json = {
        name: formName.value,
        email: formEmail.value,
        issue: formIssue.value
    }

    let http = new XMLHttpRequest();
    http.open('POST', '/contact/send_email');
    http.setRequestHeader('content-type', 'application/json');
    http.onload = function(){
        alert('Email has been sent')
    }

    http.send(JSON.stringify(json))
    }
);


