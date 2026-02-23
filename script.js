document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  if (!modal) return;

  const frame = modal.querySelector(".frame");

  function closeVideo() {
    if (frame) frame.innerHTML = "";
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function openVideo(embedUrl) {
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

  // Force it closed on load (fixes “modal stuck open”)
  closeVideo();

  // Click handling (works even if you renamed the close button)
  document.addEventListener("click", (e) => {
    // Close button (either id="close" OR class="modal-close")
    if (e.target && (e.target.id === "close" || e.target.classList.contains("modal-close"))) {
      e.preventDefault();
      closeVideo();
      return;
    }

    // Clicking backdrop closes (clicking inside the frame does not)
    if (e.target === modal) {
      closeVideo();
      return;
    }

    // Work buttons open
    const btn = e.target.closest && e.target.closest(".work-btn[data-embed]");
    if (btn) {
      openVideo(btn.dataset.embed);
    }
  });

  // ESC closes
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeVideo();
  });
});