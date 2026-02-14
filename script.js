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

  const syncNavbarState = () => {
    const shouldCollapse = window.scrollY > collapseThreshold && desktopMedia.matches;

    if (shouldCollapse) {
      navbar.classList.add("collapsed");
    } else {
      navbar.classList.remove("collapsed", "expanded");
    }
  };

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
      navbar.classList.add("expanded");
    }
  });

  navbar.addEventListener("mouseleave", () => {
    navbar.classList.remove("expanded");
  });

  syncNavbarState();
});
