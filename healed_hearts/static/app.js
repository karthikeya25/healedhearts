// Wait for the DOM to load before running scripts
document.addEventListener("DOMContentLoaded", () => {
    
    // 🔹 Animated "Healed Hearts" Logo
    const logo = document.querySelector(".logo");
    logo.style.opacity = "0";
    setTimeout(() => {
        logo.style.opacity = "1";
        logo.style.transform = "translateY(0)";
    }, 500);

    // 🔹 Mobile Navbar Toggle
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");

    burger.addEventListener("click", () => {
        nav.classList.toggle("nav-active");
        burger.classList.toggle("toggle");
    });

    // 🔹 Smooth Scrolling for Navbar Links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const section = document.querySelector(this.getAttribute("href"));
            if (section) {
                window.scrollTo({
                    top: section.offsetTop - 50,
                    behavior: "smooth"
                });
            }
            nav.classList.remove("nav-active");
            burger.classList.remove("toggle");
        });
    });

    // 🔹 "Get Started" Button Animation
    const getStartedBtn = document.querySelector(".btn");
    getStartedBtn.addEventListener("mouseover", () => {
        getStartedBtn.classList.add("bounce");
    });
    getStartedBtn.addEventListener("mouseleave", () => {
        getStartedBtn.classList.remove("bounce");
    });

    // 🔹 Contact Form Validation
    const contactForm = document.getElementById("contact-form");
    const formMessage = document.getElementById("form-message");

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent page refresh

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let message = document.getElementById("message").value.trim();

        if (name === "" || email === "" || message === "") {
            formMessage.textContent = "All fields are required!";
            formMessage.style.color = "red";
            return;
        }

        formMessage.textContent = "Message sent successfully!";
        formMessage.style.color = "green";

        // Reset form after 3 seconds
        setTimeout(() => {
            contactForm.reset();
            formMessage.textContent = "";
        }, 3000);
    });

    // 🔹 Scroll-to-Top Button Functionality
    const scrollTopBtn = document.getElementById("scrollTopBtn");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
            scrollTopBtn.style.display = "block";
        } else {
            scrollTopBtn.style.display = "none";
        }
    });

    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

});
