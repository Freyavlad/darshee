// Mobile Navigation
const navToggle = document.querySelector(".nav-toggle")
const navLinks = document.querySelector(".nav-links")

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active")
})

// Close mobile menu when clicking on links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active")
  })
})

// Smooth scroll function
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({ behavior: "smooth" })
  }
}

// Active navigation link
function updateActiveNav() {
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
}

window.addEventListener("scroll", updateActiveNav)

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Initialize animations
document.addEventListener("DOMContentLoaded", () => {
  // Add animation classes
  const sections = document.querySelectorAll("section")
  sections.forEach((section) => {
    section.classList.add("fade-in")
    observer.observe(section)
  })

  // Slide animations for specific elements
  const leftElements = document.querySelectorAll(".hero-text, .about-img-wrapper")
  leftElements.forEach((el) => {
    el.classList.add("slide-left")
    observer.observe(el)
  })

  const rightElements = document.querySelectorAll(".hero-visual, .about-content")
  rightElements.forEach((el) => {
    el.classList.add("slide-right")
    observer.observe(el)
  })

  // Skills animation
  const skillItems = document.querySelectorAll(".skill-item")
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const skillPercent = entry.target.getAttribute("data-skill")
        const skillFill = entry.target.querySelector(".skill-fill")
        const skillGlow = entry.target.querySelector(".skill-glow")

        setTimeout(() => {
          skillFill.style.width = skillPercent + "%"
          skillGlow.style.width = skillPercent + "%"
        }, 200)
      }
    })
  }, observerOptions)

  skillItems.forEach((item) => {
    skillObserver.observe(item)
  })
})

// Header background on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(10, 10, 10, 0.95)"
  } else {
    header.style.background = "rgba(10, 10, 10, 0.8)"
  }
})

// Parallax effect for hero
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  const speed = scrolled * 0.3

  if (hero) {
    hero.style.transform = `translateY(${speed}px)`
  }
})

// Dynamic particle animation
function createParticle() {
  const particle = document.createElement("div")
  particle.className = "particle"
  particle.style.left = Math.random() * 100 + "%"
  particle.style.top = Math.random() * 100 + "%"
  particle.style.animationDelay = Math.random() * 6 + "s"

  document.querySelector(".particles").appendChild(particle)

  setTimeout(() => {
    particle.remove()
  }, 6000)
}

// Create particles periodically
setInterval(createParticle, 2000)

// Typing effect for role text
const roleHighlight = document.querySelector(".role-highlight")
const roles = ["Web/App Developer", "Frontend Developer", "Backend Developer", "Full Stack Developer"]
let roleIndex = 0
let charIndex = 0
let isDeleting = false

function typeRole() {
  const currentRole = roles[roleIndex]

  if (isDeleting) {
    roleHighlight.textContent = currentRole.substring(0, charIndex - 1)
    charIndex--
  } else {
    roleHighlight.textContent = currentRole.substring(0, charIndex + 1)
    charIndex++
  }

  let typeSpeed = isDeleting ? 50 : 100

  if (!isDeleting && charIndex === currentRole.length) {
    typeSpeed = 2000
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    roleIndex = (roleIndex + 1) % roles.length
    typeSpeed = 500
  }

  setTimeout(typeRole, typeSpeed)
}

// Start typing effect after page load
window.addEventListener("load", () => {
  setTimeout(typeRole, 1000)
})

// Add glow cursor effect
document.addEventListener("mousemove", (e) => {
  const cursor = document.querySelector(".custom-cursor")
  if (!cursor) {
    const newCursor = document.createElement("div")
    newCursor.className = "custom-cursor"
    newCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(65, 105, 225, 0.6) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        `
    document.body.appendChild(newCursor)
  }

  const cursorElement = document.querySelector(".custom-cursor")
  cursorElement.style.left = e.clientX - 10 + "px"
  cursorElement.style.top = e.clientY - 10 + "px"
})
