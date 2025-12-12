document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const mobileBtn = document.querySelector(".mobile-menu-btn")
  const navList = document.querySelector(".nav-list")

  if (mobileBtn) {
    mobileBtn.addEventListener("click", () => {
      navList.classList.toggle("active")
      mobileBtn.classList.toggle("active")
    })
  }

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        // Close mobile menu if open
        navList.classList.remove("active")

        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Sticky Header Effect
  const header = document.querySelector(".site-header")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = "0 4px 6px -1px rgba(0,0,0,0.1)"
    } else {
      header.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)"
    }
  })

  // Solution Modal
  const modal = document.querySelector("#solution-modal")
  const modalTitle = document.querySelector("#solution-modal-title")
  const modalBody = document.querySelector("#solution-modal-body")
  const modalImage = document.querySelector("#solution-modal-image")
  const modalClose = document.querySelector(".solution-modal__close")

  const openModal = (title, body, imgSrc) => {
    if (!modal || !modalTitle || !modalBody) return
    modalTitle.textContent = title
    modalBody.textContent = body
    if (modalImage) {
      if (imgSrc) {
        modalImage.src = imgSrc
        modalImage.style.display = "block"
      } else {
        modalImage.removeAttribute("src")
        modalImage.style.display = "none"
      }
    }
    modal.classList.add("active")
    modal.setAttribute("aria-hidden", "false")
  }

  const closeModal = () => {
    if (!modal) return
    modal.classList.remove("active")
    modal.setAttribute("aria-hidden", "true")
  }

  document.querySelectorAll("#solucoes .cards-grid .card").forEach((card) => {
    card.addEventListener("click", () => {
      const title =
        card.getAttribute("data-modal-title") ||
        card.querySelector("h4")?.textContent ||
        ""
      const body =
        card.getAttribute("data-modal-body") ||
        card.querySelector("p")?.textContent ||
        ""
      const imgSrc = card.getAttribute("data-modal-img") || ""
      openModal(title, body, imgSrc)
    })
  })

  modalClose?.addEventListener("click", closeModal)
  modal?.addEventListener("click", (e) => {
    if (
      e.target === modal ||
      e.target.classList.contains("solution-modal__backdrop")
    ) {
      closeModal()
    }
  })

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal()
  })
})
