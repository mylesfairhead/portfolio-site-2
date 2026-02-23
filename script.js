document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const frame = modal ? modal.querySelector(".frame") : null;

  function closeVideo() {
    if (frame) frame.innerHTML = "";
    if (modal) {
      modal.hidden = true;
      modal.setAttribute("aria-hidden", "true");
    }
    document.body.style.overflow = "";
  }

  function openVideo(embedUrl) {
    if (!modal) return;

    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");

    if (frame) {
      frame.innerHTML = `
        <iframe
          src="${embedUrl}"
          width="100%" height="100%"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
        ></iframe>
      `;
    }

    document.body.style.overflow = "hidden";
  }

  // Always start closed (prevents “stuck open”)
  closeVideo();

  // One click handler for everything (very hard to break)
  document.addEventListener("click", (e) => {
    // Close via X
    if (e.target && (e.target.id === "close" || e.target.classList.contains("modal-close"))) {
      e.preventDefault();
      closeVideo();
      return;
    }

    // Close by clicking backdrop
    if (modal && e.target === modal) {
      closeVideo();
      return;
    }

    // Open via clicking a work
    const btn = e.target.closest?.(".work-btn[data-embed]");
    if (btn) {
      openVideo(btn.dataset.embed);
    }
  });

  // ESC closes
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && !modal.hidden) closeVideo();
  });
});