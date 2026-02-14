document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".hero, .core-focus");

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

  const collapseThreshold = 80;
  const desktopMedia = window.matchMedia("(min-width: 769px)");
  const navExpandDurationMs = 350;
  let navReadyTimer;

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
    const shouldCollapse = window.scrollY > collapseThreshold && desktopMedia.matches;

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

  navbar.addEventListener("mouseenter", () => {
    if (navbar.classList.contains("collapsed") && desktopMedia.matches) {
      navbar.classList.remove("nav-ready");
      navbar.classList.remove("scrolled");
      navbar.classList.add("expanded");
      armNavReadyAfterExpand();
    }
  });

  navbar.addEventListener("mouseleave", () => {
    clearNavReadyTimer();
    navbar.classList.remove("expanded", "nav-ready");
  });

  syncNavbarState();
});
