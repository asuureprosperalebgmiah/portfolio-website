document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(
    ".hero, .core-focus, .about-hero, .projects-hero, .about-grid, .projects-showcase",
  );

  elements.forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(20px)";
  });

  setTimeout(() => {
    elements.forEach((el) => {
      el.style.transition = "all 0.6s ease";
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    });
  }, 200);

  // Floating navbar behavior
  const navbar = document.getElementById("siteNavbar");
  if (!navbar) return;
  const navToggle = navbar.querySelector(".nav-toggle");
  const navMenu = navbar.querySelector(".nav-menu");

  const collapseThreshold = 80;
  const desktopMedia = window.matchMedia("(min-width: 769px)");
  const hoverCapableMedia = window.matchMedia(
    "(hover: hover) and (pointer: fine)",
  );
  const navExpandDurationMs = 350;
  let navReadyTimer;

  const canUseHoverExpansion = () =>
    desktopMedia.matches && hoverCapableMedia.matches;

  const clearNavReadyTimer = () => {
    if (!navReadyTimer) return;
    window.clearTimeout(navReadyTimer);
    navReadyTimer = null;
  };

  const armNavReadyAfterExpand = () => {
    clearNavReadyTimer();
    navReadyTimer = window.setTimeout(() => {
      if (navbar.classList.contains("expanded")) {
        navbar.classList.add("nav-ready");
      }
    }, navExpandDurationMs);
  };

  const syncNavbarState = () => {
    const shouldCollapse =
      window.scrollY > collapseThreshold && canUseHoverExpansion();

    if (shouldCollapse) {
      navbar.classList.add("collapsed");
    } else {
      clearNavReadyTimer();
      navbar.classList.remove("collapsed", "expanded", "nav-ready");
    }
  };

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        syncNavbarState();
        ticking = false;
      });
    },
    { passive: true },
  );

  desktopMedia.addEventListener("change", syncNavbarState);
  hoverCapableMedia.addEventListener("change", syncNavbarState);

  if (navToggle && navMenu) {
    const closeMobileMenu = () => {
      navbar.classList.remove("mobile-menu-open");
      navToggle.setAttribute("aria-expanded", "false");
    };

    navToggle.addEventListener("click", () => {
      const isOpen = navbar.classList.toggle("mobile-menu-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMobileMenu();
    });

    desktopMedia.addEventListener("change", () => {
      if (desktopMedia.matches) closeMobileMenu();
    });
  }

  navbar.addEventListener("mouseenter", () => {
    if (navbar.classList.contains("collapsed") && canUseHoverExpansion()) {
      navbar.classList.remove("nav-ready");
      navbar.classList.add("expanded");
      navbar.classList.remove("scrolled");
      armNavReadyAfterExpand();
    }
  });

  navbar.addEventListener("mouseleave", () => {
    if (navbar.classList.contains("collapsed") && canUseHoverExpansion()) {
      clearNavReadyTimer();
      navbar.classList.remove("expanded", "nav-ready");
      navbar.classList.add("scrolled");
    }
  });

  syncNavbarState();
});
