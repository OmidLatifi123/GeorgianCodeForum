document.addEventListener("DOMContentLoaded", function () {
    // Function to shuffle the array randomly
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    var strings = [
        "How do I center a div?",
        "How do I clone a git repo?",
        "Why is my code underlined red?",
        "What is a .gitignore file?",
        "How do I install npm packages?",
        "Should I use Angular or React?"
    ];

    // Shuffle the array randomly
    strings = shuffleArray(strings);

    var type = new Typed(".auto-type", {
        strings: strings,
        typeSpeed: 125,
        backSpeed: 80,
        loop: true,
    });
});