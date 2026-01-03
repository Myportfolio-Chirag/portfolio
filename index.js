/* menu bar */

let menuIcon = document.querySelector("#menu-bar-icone");
let navbar = document.querySelector(".nav-list");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("fa-xmark");
  navbar.classList.toggle("active");
};

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav ul li a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector(`header nav ul li a[href*='${id}']`)
          .classList.add("active");
      });
    }
  });

  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);

  menuIcon.classList.remove("fa-xmark");
  navbar.classList.remove("active");
};

function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");

  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

/* live dashboards code */

function liveDashboard(event) {
  const button = event.currentTarget;
  const cardContainer = button.closest(".card-container");
  const dashboard = cardContainer.querySelector(".dashboard-main");

  dashboard.style.display = "block";
  document.body.classList.add("dashboard-open");
}

function closeDashboard(event) {
  const dashboard = event.target.closest(".dashboard-main");

  dashboard.style.display = "none";
  document.body.classList.remove("dashboard-open");
}

document.querySelectorAll("button[id^='button']").forEach((button) => {
  button.addEventListener("click", liveDashboard);
});

document.querySelectorAll(".close-icon").forEach((icon) => {
  icon.addEventListener("click", closeDashboard);
});

// Check if topmate-logo exists before adding event listener
const topmateLogo = document.getElementById("topmate-logo");
if (topmateLogo) {
  topmateLogo.addEventListener("click", function () {
    // Simulate a click on the Topmate button to show the profile
    const topmateButton = document.querySelector(".topmate-button");
    if (topmateButton) {
      topmateButton.click();
    }
  });
}

/*right click */

// Disable right-click context menu
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

// Disable common key shortcuts for opening DevTools
document.addEventListener("keydown", function (e) {
  // Disable F12 (DevTools)
  if (e.key === "F12") {
    e.preventDefault();
  }

  // Disable Ctrl+Shift+I (DevTools)
  if (e.ctrlKey && e.shiftKey && e.key === "I") {
    e.preventDefault();
  }

  // Disable Ctrl+Shift+C (Element Inspector)
  if (e.ctrlKey && e.shiftKey && e.key === "C") {
    e.preventDefault();
  }

  // Disable Ctrl+Shift+J (DevTools in Chrome)
  if (e.ctrlKey && e.shiftKey && e.key === "J") {
    e.preventDefault();
  }

  // Disable Ctrl+U (View Source)
  if (e.ctrlKey && e.key === "U") {
    e.preventDefault();
  }
});

ScrollReveal({
  distance: "120px",
  duration: 2000,
  delay: 160,
});

ScrollReveal().reveal(".home-container h1, section .headings .headings-para", {
  origin: "top",
});
ScrollReveal().reveal(
  ".home-container .social-media-profiles a, .skills p, .social-media-icons a, .social-media-icons img, .certificate-card, .certifi-2",
  {
    origin: "bottom",
  }
);
ScrollReveal().reveal(
  ".home-container .button-1, .profile-picture, .about-image, .form-content h1, .form-content p, .education, .certifi-1",
  {
    origin: "left",
  }
);
ScrollReveal().reveal(
  ".home-container p, .home-container .button-2, section .headings .section-heading, .about-content, .form-content-container form, .certifi-3",
  {
    origin: "right",
  }
);

/* Form Submission with Success Overlay */

const contactForm = document.getElementById("contact-form");
const successOverlay = document.getElementById("success-overlay");

if (contactForm && successOverlay) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitButton = contactForm.querySelector(".submit-button");
    const originalButtonText = submitButton.innerHTML;

    // Disable button and show loading state
    submitButton.disabled = true;
    submitButton.innerHTML =
      'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';

    // Prepare form data
    const formData = new FormData(contactForm);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        // Show success overlay
        showSuccessOverlay();

        // Reset form
        contactForm.reset();
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }

    // Reset button
    submitButton.disabled = false;
    submitButton.innerHTML = originalButtonText;
  });
}

function showSuccessOverlay() {
  successOverlay.classList.add("active");
  document.body.style.overflow = "hidden";

  // Reset and restart progress bar animation
  const progressFill = successOverlay.querySelector(".success-progress-fill");
  if (progressFill) {
    progressFill.style.animation = "none";
    progressFill.offsetHeight; // Trigger reflow
    progressFill.style.animation = "progressShrink 5s linear forwards";
  }

  // Auto hide after 5 seconds
  setTimeout(() => {
    hideSuccessOverlay();
  }, 5000);
}

function hideSuccessOverlay() {
  if (successOverlay) {
    successOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Close overlay when clicking outside the container
if (successOverlay) {
  successOverlay.addEventListener("click", function (e) {
    if (e.target === successOverlay) {
      hideSuccessOverlay();
    }
  });
}

// Close overlay with Escape key
document.addEventListener("keydown", (e) => {
  if (
    e.key === "Escape" &&
    successOverlay &&
    successOverlay.classList.contains("active")
  ) {
    hideSuccessOverlay();
  }
});
