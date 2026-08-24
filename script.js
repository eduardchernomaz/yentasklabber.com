(() => {
  const contents = document.getElementById("contents");
  const toggle = document.getElementById("menu-toggle");
  const backdrop = document.getElementById("contents-backdrop");
  const closeBtn = document.getElementById("contents-close");
  const heroMenuBtn = document.getElementById("hero-menu-btn");
  if (!contents || !toggle) return;

  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const setMenuOpen = (open) => {
    contents.hidden = !open;
    if (backdrop) backdrop.hidden = !open;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close contents" : "Open contents");
    document.body.classList.toggle("is-menu-open", open);
    if (open) {
      const focusTarget = closeBtn || contents.querySelector("a");
      if (focusTarget) focusTarget.focus();
    } else {
      toggle.focus();
    }
  };

  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen(contents.hidden);

  toggle.addEventListener("click", toggleMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  if (backdrop) backdrop.addEventListener("click", closeMenu);
  if (heroMenuBtn) heroMenuBtn.addEventListener("click", openMenu);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !contents.hidden) {
      event.preventDefault();
      closeMenu();
    }
  });

  const scrollToId = (id, updateHash) => {
    const target = document.getElementById(id);
    if (!target) return;
    const behavior = prefersReducedMotion() ? "auto" : "smooth";
    target.scrollIntoView({ behavior, block: "start" });
    if (updateHash) {
      history.pushState(null, "", `#${id}`);
    }
    if (typeof target.focus === "function") {
      target.focus({ preventScroll: true });
    }
  };

  contents.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || !contents.contains(link)) return;
    const id = decodeURIComponent(link.getAttribute("href").slice(1));
    if (!id) return;
    event.preventDefault();
    closeMenu();
    // Let the drawer start closing before scrolling
    requestAnimationFrame(() => scrollToId(id, true));
  });

  const onHash = () => {
    const id = decodeURIComponent(location.hash.replace(/^#/, ""));
    if (!id || id === "contents") return;
    requestAnimationFrame(() => scrollToId(id, false));
  };

  window.addEventListener("hashchange", onHash);
  if (location.hash) onHash();
})();
