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

let createPost = document.getElementById("create-post")
let postTitle = document.getElementById("postTitle")
let postCode = document.getElementById("postCode")
let postContent = document.getElementById("postContent")
let postLanguage = document.getElementById("codingLanguage")

createPost.addEventListener('submit', function(event){
  event.preventDefault()

  let json = {
    title: postTitle.value,
    code: postCode.value,
    description: postContent.value,
    language: postLanguage.value
  }

  let http2 = newXMLHttpRequest();
  http2.open('POST', '/create/add');
  http2.setRequestHeader('content-type', 'application/json')

  http2.send(JSON.stringify(json))
})