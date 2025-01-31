document.addEventListener("DOMContentLoaded", function () {
    console.log("App.js Loaded Successfully!");

    /* Smooth Scroll Effect for Navigation Links */
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    /* Hero Section Auto-Scrolling Text Animation */
    let heroText = document.querySelector(".hero-text");
    let textIndex = 0;
    const texts = ["Your journey to healing begins here.", "Guided Meditation & Support.", "24/7 Chat & Therapy Services."];

    function changeHeroText() {
        heroText.style.opacity = 0;
        setTimeout(() => {
            heroText.textContent = texts[textIndex];
            heroText.style.opacity = 1;
            textIndex = (textIndex + 1) % texts.length;
        }, 500);
    }

    setInterval(changeHeroText, 4000);

    /* Parallax Scrolling Effect */
    window.addEventListener("scroll", function () {
        let scrollPos = window.scrollY;
        document.querySelector(".parallax-bg").style.backgroundPositionY = scrollPos * 0.5 + "px";
    });

    /* Fade-in Effects for Sections */
    const fadeInElements = document.querySelectorAll(".fade-in");
    function fadeInOnScroll() {
        fadeInElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                el.classList.add("visible");
            }
        });
    }
    fadeInOnScroll(); // Initial call
    window.addEventListener("scroll", fadeInOnScroll);

    /* Animated Button Hover Effect */
    document.querySelectorAll(".animated-button").forEach(button => {
        button.addEventListener("mouseover", function () {
            this.style.transform = "scale(1.05)";
            this.style.boxShadow = "0px 10px 25px rgba(255, 105, 180, 0.3)";
        });
        button.addEventListener("mouseleave", function () {
            this.style.transform = "scale(1)";
            this.style.boxShadow = "none";
        });
    });

    /* Form Validation & Submission */
    document.querySelector("#contact-form").addEventListener("submit", function (e) {
        e.preventDefault();
        let name = document.querySelector("#name").value.trim();
        let email = document.querySelector("#email").value.trim();
        let message = document.querySelector("#message").value.trim();

        if (!name || !email || !message) {
            alert("Please fill in all fields.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        alert("Message Sent! We will get back to you soon.");
        this.reset();
    });

    /* Email Validation Function */
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    /* Dynamic Navbar Background Change on Scroll */
    window.addEventListener("scroll", function () {
        const navbar = document.querySelector(".navbar");
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    /* Chat Section - Toggle Chatbox Visibility */
    const chatToggle = document.querySelector("#chat-toggle");
    const chatBox = document.querySelector("#chat-box");
    
    chatToggle.addEventListener("click", function () {
        chatBox.classList.toggle("active");
    });

    /* Close Chatbox When Clicking Outside */
    document.addEventListener("click", function (event) {
        if (!chatBox.contains(event.target) && !chatToggle.contains(event.target)) {
            chatBox.classList.remove("active");
        }
    });
});
