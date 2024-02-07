document.addEventListener("DOMContentLoaded", function () {
    // Simulate a delay (e.g., 3 seconds) to mimic loading content
    setTimeout(function () {
        var splashScreen = document.getElementById("splash-screen");
        splashScreen.classList.add("fade-out"); // Add the fade-out class
        document.body.style.overflow = "auto"; // Re-enable scrolling after the fade-out
        // Hide the logo after the fade-out transition completes
        setTimeout(function () {
            var logo = document.getElementById("logo");
            logo.style.display = "none";
        }, 2000);
    }, 2000);
});
