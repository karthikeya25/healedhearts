<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Healed Hearts</title>
    <link rel="stylesheet" href="static/styles.css">
    <script defer src="static/app.js"></script>
    <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
</head>
<body>

    <!-- Navigation -->
    <header>
        <nav class="navbar">
            <h1 class="logo">Healed Hearts</h1>
            <ul class="nav-links">
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            <div class="burger">
                <div class="line1"></div>
                <div class="line2"></div>
                <div class="line3"></div>
            </div>
        </nav>
        <div class="hero">
            <h2>Welcome to Healed Hearts</h2>
            <p>Your journey to healing begins here.</p>
            <a href="chat.html" class="btn">Get Started</a>
        </div>
    </header>

    <!-- About Section -->
    <section id="about">
        <h2>About Us</h2>
        <p>Healed Hearts is dedicated to providing support and resources for emotional healing.</p>
    </section>

    <!-- Services Section -->
    <section id="services">
        <h2>Our Services</h2>
        <div class="service-container">
            <div class="service-box">
                <i class="fas fa-comments"></i>
                <h3>24/7 Chat Support</h3>
            </div>
            <div class="service-box">
                <i class="fas fa-heart"></i>
                <h3>Therapy Sessions</h3>
            </div>
            <div class="service-box">
                <i class="fas fa-meditation"></i>
                <h3>Guided Meditation</h3>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact">
        <h2>Contact Us</h2>
        <form id="contact-form">
            <input type="text" id="name" placeholder="Your Name" required>
            <input type="email" id="email" placeholder="Your Email" required>
            <textarea id="message" placeholder="Your Message" required></textarea>
            <button type="submit" class="btn">Send Message</button>
            <p id="form-message" class="success-message"></p>
        </form>
    </section>

    <!-- Footer -->
    <footer>
        <div class="social-icons">
            <a href="#"><i class="fab fa-facebook"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
        </div>
        <p>© 2025 Healed Hearts. All rights reserved.</p>
        <button id="scrollTopBtn">↑</button>
    </footer>

</body>
</html>
