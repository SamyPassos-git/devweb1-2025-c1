// Language and Theme Management
class PortfolioManager {
  constructor() {
    this.currentLanguage = "pt"
    this.currentTheme = "light"
    this.init()
  }

  init() {
    this.setupEventListeners()
    this.loadPreferences()
  }

  setupEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById("theme-toggle")
    themeToggle.addEventListener("click", () => this.toggleTheme())

    // Language toggle
    const languageToggle = document.getElementById("language-toggle")
    languageToggle.addEventListener("click", () => this.toggleLanguage())

    // Contact button scroll
    const contactBtn = document.getElementById("contact-btn")
    contactBtn.addEventListener("click", () => this.scrollToContact())
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === "light" ? "dark" : "light"
    document.body.classList.toggle("dark", this.currentTheme === "dark")

    // Toggle icons
    const sunIcon = document.querySelector(".sun-icon")
    const moonIcon = document.querySelector(".moon-icon")

    if (this.currentTheme === "dark") {
      sunIcon.classList.add("hidden")
      moonIcon.classList.remove("hidden")
    } else {
      sunIcon.classList.remove("hidden")
      moonIcon.classList.add("hidden")
    }

    this.savePreferences()
  }

  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === "pt" ? "en" : "pt"
    this.updateLanguageButton()
    this.updateContent()
    this.savePreferences()
  }

  updateLanguageButton() {
    const languageText = document.querySelector(".language-text")
    languageText.textContent = this.currentLanguage === "pt" ? "EN" : "PT"
  }

  updateContent() {
    const elements = document.querySelectorAll("[data-pt][data-en]")
    elements.forEach((element) => {
      const content = element.getAttribute(`data-${this.currentLanguage}`)
      if (content) {
        element.textContent = content
      }
    })

    // Update document language
    document.documentElement.lang = this.currentLanguage === "pt" ? "pt-BR" : "en"

    // Update page title
    document.title =
      this.currentLanguage === "pt"
        ? "Samyla Passos - Desenvolvedora de Software"
        : "Samyla Passos - Software Developer"
  }

  scrollToContact() {
    const contactSection = document.getElementById("contato")
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  savePreferences() {
    localStorage.setItem("portfolio-theme", this.currentTheme)
    localStorage.setItem("portfolio-language", this.currentLanguage)
  }

  loadPreferences() {
    // Load theme
    const savedTheme = localStorage.getItem("portfolio-theme")
    if (savedTheme) {
      this.currentTheme = savedTheme
      document.body.classList.toggle("dark", this.currentTheme === "dark")

      const sunIcon = document.querySelector(".sun-icon")
      const moonIcon = document.querySelector(".moon-icon")

      if (this.currentTheme === "dark") {
        sunIcon.classList.add("hidden")
        moonIcon.classList.remove("hidden")
      }
    }

    // Load language
    const savedLanguage = localStorage.getItem("portfolio-language")
    if (savedLanguage) {
      this.currentLanguage = savedLanguage
      this.updateLanguageButton()
      this.updateContent()
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new PortfolioManager()
})

// Smooth scroll for any internal links
document.addEventListener("click", (e) => {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault()
    const targetId = e.target.getAttribute("href").substring(1)
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }
})
