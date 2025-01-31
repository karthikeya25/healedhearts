// Ensure DOM is fully loaded before executing
document.addEventListener("DOMContentLoaded", () => {
    console.log("App loaded successfully!");

    // Handling form submission with smooth validation
    const postForm = document.getElementById("post-story-form");
    const successMessage = document.getElementById("success-message");
    const errorMessage = document.getElementById("error-message");

    if (postForm) {
        postForm.addEventListener("submit", function (event) {
            event.preventDefault();

            // Fetch form values
            let title = document.getElementById("story-title").value.trim();
            let content = document.getElementById("story-content").value.trim();

            // Validation: Ensure fields are filled
            if (title === "" || content === "") {
                showMessage(errorMessage, "⚠️ Please fill out all fields!");
                return;
            }

            // Simulating successful submission
            setTimeout(() => {
                postForm.reset();
                showMessage(successMessage, "🎉 Your story has been posted successfully!");
            }, 800);
        });
    }

    // Function to show messages with fade-in effect
    function showMessage(element, message) {
        element.textContent = message;
        element.classList.remove("hidden");
        element.style.opacity = "0";
        element.style.transition = "opacity 0.5s ease-in-out";
        setTimeout(() => {
            element.style.opacity = "1";
        }, 50);

        // Hide message after 3 seconds
        setTimeout(() => {
            element.style.opacity = "0";
            setTimeout(() => element.classList.add("hidden"), 500);
        }, 3000);
    }

    // Toggle dark mode
    const toggleThemeButton = document.getElementById("toggle-theme");
    if (toggleThemeButton) {
        toggleThemeButton.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            toggleThemeButton.textContent =
                document.body.classList.contains("dark-mode") ? "🌙 Light Mode" : "☀️ Dark Mode";
        });
    }

    // Floating button animation
    const floatingButton = document.querySelector(".floating-button");
    if (floatingButton) {
        floatingButton.addEventListener("mouseover", () => {
            floatingButton.classList.add("bounce");
        });
        floatingButton.addEventListener("mouseleave", () => {
            floatingButton.classList.remove("bounce");
        });
    }

    // Smooth scroll for links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (event) {
            event.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // Real-time character counter for story input
    const storyInput = document.getElementById("story-content");
    const charCount = document.getElementById("char-count");
    if (storyInput && charCount) {
        storyInput.addEventListener("input", () => {
            let count = storyInput.value.length;
            charCount.textContent = `${count}/500 characters`;
            charCount.style.color = count > 500 ? "red" : "#666";
        });
    }

    // Chat message animation
    const chatForm = document.getElementById("chat-form");
    const chatMessages = document.getElementById("chat-messages");

    if (chatForm && chatMessages) {
        chatForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let chatInput = document.getElementById("chat-input").value.trim();

            if (chatInput !== "") {
                let messageBubble = document.createElement("div");
                messageBubble.classList.add("chat-bubble");
                messageBubble.textContent = chatInput;

                chatMessages.appendChild(messageBubble);
                document.getElementById("chat-input").value = "";

                // Auto-scroll to the latest message
                chatMessages.scrollTop = chatMessages.scrollHeight;

                // Animate message fade-in
                messageBubble.style.opacity = "0";
                messageBubble.style.transition = "opacity 0.5s ease-in-out";
                setTimeout(() => {
                    messageBubble.style.opacity = "1";
                }, 50);
            }
        });
    }
});
