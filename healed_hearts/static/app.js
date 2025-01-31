// Smooth Scrolling for Navigation Links
document.querySelectorAll('.nav-bar ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Testimonial Slider Functionality
const testimonials = document.querySelectorAll('.testimonial');
let index = 0;

function showTestimonial() {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.transform = `translateX(${(i - index) * 120}%)`;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    showTestimonial();
    setInterval(() => {
        index = (index + 1) % testimonials.length;
        showTestimonial();
    }, 4000); // Auto-slide every 4 seconds
});

// Scroll Fade-in Animations
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOnScroll = () => {
    fadeElements.forEach(element => {
        const elementPos = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementPos < windowHeight - 100) {
            element.classList.add('pop-up');
        }
    });
};

window.addEventListener('scroll', fadeInOnScroll);

// Form Validation for Contact & Post Story Forms
function validateForm(event) {
    event.preventDefault();
    let name = document.querySelector("#name").value.trim();
    let email = document.querySelector("#email").value.trim();
    let message = document.querySelector("#message").value.trim();

    if (name === '' || email === '' || message === '') {
        alert("Please fill out all fields.");
        return false;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    alert("Your message has been sent successfully!");
    document.querySelector("#contact-form").reset();
    return true;
}

document.querySelector("#contact-form").addEventListener("submit", validateForm);

// Story Submission Validation
document.querySelector("#story-form").addEventListener("submit", function (event) {
    event.preventDefault();
    let storyTitle = document.querySelector("#story-title").value.trim();
    let storyContent = document.querySelector("#story-content").value.trim();

    if (storyTitle === '' || storyContent === '') {
        alert("Please enter a title and story content.");
        return;
    }

    alert("Your story has been submitted successfully!");
    document.querySelector("#story-form").reset();
});

// Button Hover Effect Animation
document.querySelectorAll(".pulse-btn").forEach(button => {
    button.addEventListener("mouseenter", () => {
        button.style.transform = "scale(1.1)";
    });

    button.addEventListener("mouseleave", () => {
        button.style.transform = "scale(1)";
    });
});
