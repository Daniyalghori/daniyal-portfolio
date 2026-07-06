/* =====================================================
   PORTFOLIO WEBSITE
   JavaScript
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio Loaded Successfully");

  /* =====================================================
   EMAILJS INITIALIZATION
===================================================== */

  emailjs.init("d-cgjBKMLz5BhQpVJ");
  /* =====================================================
 /* =====================================================
   CONTACT FORM (EMAILJS)
===================================================== */

  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const submitButton = contactForm.querySelector("button");

      submitButton.disabled = true;

      submitButton.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

      emailjs.init("d-cgjBKMLz5BhQpVJ");

      emailjs
        .sendForm(
          "service_lad9rii",
          "template_bszgbn4",
          this,
          "d-cgjBKMLz5BhQpVJ",
        )

        .then(function () {
          alert("✅ Message sent successfully!");

          contactForm.reset();

          submitButton.disabled = false;

          submitButton.innerHTML =
            '<i class="fa-solid fa-paper-plane"></i> Send Message';
        })

        .catch(function (error) {
          console.error("EmailJS Error:", error);

          alert(
            "❌ Failed to send message.\n\n" +
              "Status: " +
              error.status +
              "\n" +
              "Message: " +
              error.text,
          );

          submitButton.disabled = false;

          submitButton.innerHTML =
            '<i class="fa-solid fa-paper-plane"></i> Send Message';
        });
    });
  }
  /* =====================================================
       TYPING ANIMATION
    ===================================================== */

  const typingElement = document.getElementById("typing-text");

  if (!typingElement) return;

  const professions = [
    "AI & Data Science Engineer",
    "Full Stack Developer",
    "Generative AI Enthusiast",
    "Machine Learning Developer",
  ];

  let professionIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  function typeEffect() {
    const current = professions[professionIndex];

    if (!deleting) {
      typingElement.textContent = current.substring(0, characterIndex);
      characterIndex++;

      if (characterIndex > current.length) {
        deleting = true;
        setTimeout(typeEffect, 1500);
        return;
      }
    } else {
      typingElement.textContent = current.substring(0, characterIndex);
      characterIndex--;

      if (characterIndex < 0) {
        deleting = false;
        professionIndex = (professionIndex + 1) % professions.length;
        characterIndex = 0;
      }
    }

    setTimeout(typeEffect, deleting ? 50 : 100);
  }

  typeEffect();
});

/* =====================================================
   SCROLL TO TOP BUTTON
===================================================== */

const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.style.display = "block";
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

AOS.init({
  duration: 1000,
  once: true,
});
