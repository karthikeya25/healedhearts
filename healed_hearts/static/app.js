document.addEventListener("DOMContentLoaded", function () {
    // Select Elements
    const storyForm = document.getElementById("story-form");
    const confirmationModal = document.getElementById("confirmation-modal");
    const charCount = document.getElementById("char-count");
    const storyInput = document.getElementById("story");
    const closeModalBtn = document.querySelector(".btn-close");
    const submitBtn = document.querySelector(".btn-submit");

    // Smooth Scroll Effect for Page Load
    document.body.classList.add("fade-in");

    // **📝 Live Character Counter**
    storyInput.addEventListener("input", function () {
        const count = storyInput.value.length;
        charCount.textContent = `${count}/500`;
        charCount.style.color = count > 500 ? "red" : "#333";
    });

    // **🛑 Form Validation Before Submission**
    storyForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const story = storyInput.value.trim();

        if (name === "" || email === "" || story === "") {
            alert("⚠️ Please fill in all fields before submitting.");
            return;
        }

        if (story.length > 500) {
            alert("⚠️ Story cannot exceed 500 characters.");
            return;
        }

        // **🚀 Show Confirmation Modal**
        confirmationModal.classList.remove("hidden");
        confirmationModal.classList.add("fade-in-modal");

        // Disable Button to Prevent Multiple Submissions
        submitBtn.disabled = true;
    });

    // **🔄 Close Modal and Redirect**
    closeModalBtn.addEventListener("click", function () {
        confirmationModal.classList.add("hidden");
        window.location.href = "index.html"; // Redirect to homepage
    });

    // **🔗 Activate Navigation Links**
    document.querySelectorAll("nav ul li a").forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetPage = this.getAttribute("href");
            document.body.classList.add("fade-out");
            setTimeout(() => {
                window.location.href = targetPage;
            }, 500);
        });
    });

    // **🎨 Button Hover Effects**
    document.querySelectorAll(".btn-submit, .btn-close").forEach((btn) => {
        btn.addEventListener("mouseenter", function () {
            this.style.transform = "scale(1.1)";
            this.style.transition = "transform 0.3s ease-in-out";
        });

        btn.addEventListener("mouseleave", function () {
            this.style.transform = "scale(1)";
        });
    });

    // **⬆️ Scroll to Top Button**
    const scrollBtn = document.createElement("button");
    scrollBtn.innerText = "⬆️";
    scrollBtn.classList.add("scroll-top-btn", "hidden");
    document.body.appendChild(scrollBtn);

    window.addEventListener("scroll", function () {
        if (window.scrollY > 200) {
            scrollBtn.classList.remove("hidden");
        } else {
            scrollBtn.classList.add("hidden");
        }
    });

    scrollBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
