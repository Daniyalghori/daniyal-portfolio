/* =====================================================
   PORTFOLIO WEBSITE
   JavaScript
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio Loaded Successfully");

  /* =====================================================
       EMAILJS INITIALIZATION
    ===================================================== */

  if (typeof emailjs !== "undefined") {
    emailjs.init("d-cgjBKMLz5BhQpVJ");
  } else {
    console.warn("EmailJS library not loaded.");
  }

  /* =====================================================
       CONTACT FORM - EMAILJS
    ===================================================== */

  const contactForm = document.getElementById("contact-form");

  if (contactForm && typeof emailjs !== "undefined") {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const submitButton = contactForm.querySelector("button");

      if (submitButton) {
        submitButton.disabled = true;

        submitButton.innerHTML =
          '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      }

      emailjs
        .sendForm("service_lad9rii", "template_bszgbn4", this)

        .then(function () {
          alert("Message sent successfully!");

          contactForm.reset();

          if (submitButton) {
            submitButton.disabled = false;

            submitButton.innerHTML =
              '<i class="fa-solid fa-paper-plane"></i> Send Message';
          }
        })

        .catch(function (error) {
          console.error("EmailJS Error:", error);

          alert(
            "Failed to send message.\n\n" +
              "Status: " +
              (error.status || "Unknown") +
              "\n" +
              "Message: " +
              (error.text || "Unknown error"),
          );

          if (submitButton) {
            submitButton.disabled = false;

            submitButton.innerHTML =
              '<i class="fa-solid fa-paper-plane"></i> Send Message';
          }
        });
    });
  }

  /* =====================================================
       HERO TYPING EFFECT
    ===================================================== */

  const typingElement = document.getElementById("typing-text");

  if (typingElement) {
    const roles = [
      "Artificial Intelligence",
      "Machine Learning",
      "Generative AI",
      "Full Stack Development",
      "AI Engineering",
    ];

    let roleIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    const typingSpeed = 90;
    const deletingSpeed = 50;
    const typingPause = 1800;
    const deletingPause = 500;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      /* =========================
               TYPING
            ========================= */

      if (!deleting) {
        typingElement.textContent = currentRole.substring(
          0,
          characterIndex + 1,
        );

        characterIndex++;

        if (characterIndex >= currentRole.length) {
          deleting = true;

          setTimeout(typeEffect, typingPause);
        } else {
          setTimeout(typeEffect, typingSpeed);
        }
      } else {
        /* =========================
               DELETING
            ========================= */
        typingElement.textContent = currentRole.substring(
          0,
          characterIndex - 1,
        );

        characterIndex--;

        if (characterIndex <= 0) {
          deleting = false;

          roleIndex = (roleIndex + 1) % roles.length;

          setTimeout(typeEffect, deletingPause);
        } else {
          setTimeout(typeEffect, deletingSpeed);
        }
      }
    }

    /* Start typing */

    typeEffect();
  } else {
    console.error("Typing element #typing-text was not found.");
  }

  /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");

        const target = document.querySelector(targetId);

        if (!target) return;

        /*
         * Get actual navbar height
         */
        const navbar = document.querySelector("nav");

        const navbarHeight = navbar ? navbar.offsetHeight : 0;

        /*
         * Calculate exact position
         */
        const targetPosition =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          navbarHeight -
          10;

        /*
         * Scroll to exact section
         */
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        /*
         * Close mobile menu
         */
        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });
  }

  /* =====================================================
   SCROLL TO TOP
===================================================== */

  const scrollBtn = document.getElementById("scrollTopBtn");

  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        scrollBtn.style.display = "flex";
      } else {
        scrollBtn.style.display = "none";
      }
    });

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  /* =====================================================
   AOS ANIMATION
===================================================== */

  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });
  }

  /* =====================================================
   #19 SCROLL PROGRESS INDICATOR
===================================================== */

  const scrollProgress = document.getElementById("scroll-progress");

  if (scrollProgress) {
    function updateScrollProgress() {
      const scrollTop = window.scrollY;

      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (documentHeight <= 0) {
        scrollProgress.style.width = "0%";
        return;
      }

      const progress = (scrollTop / documentHeight) * 100;

      scrollProgress.style.width = Math.min(100, Math.max(0, progress)) + "%";
    }

    window.addEventListener("scroll", updateScrollProgress, { passive: true });

    window.addEventListener("resize", updateScrollProgress);

    updateScrollProgress();
  }
});
