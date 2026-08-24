(() => {
  const FLASH_MS = 900;
  const contents = document.querySelector("nav.contents");
  if (!contents) return;

  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const flashSection = (el) => {
    if (!el) return;
    el.classList.remove("section--flash");
    // force reflow so re-adding restarts transition
    void el.offsetWidth;
    el.classList.add("section--flash");
    window.clearTimeout(el._flashTimer);
    el._flashTimer = window.setTimeout(() => {
      el.classList.remove("section--flash");
    }, FLASH_MS);
  };

  let cancelPendingScrollFlash = null;

  const flashAfterScrollSettles = (target) => {
    if (cancelPendingScrollFlash) cancelPendingScrollFlash();

    const SCROLL_IDLE_MS = 130;
    const SCROLL_MAX_MS = 1500;
    let idleTimer = null;
    let maxTimer = null;

    const cleanup = () => {
      window.removeEventListener("scroll", onScroll);
      if (idleTimer) window.clearTimeout(idleTimer);
      if (maxTimer) window.clearTimeout(maxTimer);
      idleTimer = null;
      maxTimer = null;
      if (cancelPendingScrollFlash === cleanup) {
        cancelPendingScrollFlash = null;
      }
    };

    const triggerFlash = () => {
      cleanup();
      flashSection(target);
    };

    const onScroll = () => {
      if (idleTimer) window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(triggerFlash, SCROLL_IDLE_MS);
    };

    cancelPendingScrollFlash = cleanup;
    window.addEventListener("scroll", onScroll, { passive: true });
    idleTimer = window.setTimeout(triggerFlash, SCROLL_IDLE_MS);
    maxTimer = window.setTimeout(triggerFlash, SCROLL_MAX_MS);
  };

  const scrollToId = (id, updateHash) => {
    const target = document.getElementById(id);
    if (!target) return;
    const behavior = prefersReducedMotion() ? "auto" : "smooth";
    target.scrollIntoView({ behavior, block: "start" });
    if (updateHash) {
      history.pushState(null, "", `#${id}`);
    }
    if (behavior === "auto") {
      flashSection(target);
    } else {
      flashAfterScrollSettles(target);
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
    scrollToId(id, true);
  });

  const heroCta = document.querySelector('.hero a.btn[href="#contents"]');
  if (heroCta) {
    heroCta.addEventListener("click", (event) => {
      event.preventDefault();
      scrollToId("contents", true);
    });
  }

  const onHash = () => {
    const id = decodeURIComponent(location.hash.replace(/^#/, ""));
    if (!id) return;
    // defer so layout is ready
    requestAnimationFrame(() => scrollToId(id, false));
  };

  window.addEventListener("hashchange", onHash);
  if (location.hash) onHash();
})();
