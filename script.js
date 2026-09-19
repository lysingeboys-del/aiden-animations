const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", (event) => {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

document.querySelectorAll("video").forEach((video) => {
  video.addEventListener("error", () => {
    const label = video.parentElement.querySelector(".preview-label");
    if (label) label.textContent = "preview unavailable";
    video.parentElement.classList.add("video-error");
  });
});

document.querySelectorAll(".play-icon").forEach((button) => {
  button.addEventListener("click", () => {
    const video = button.closest(".card-preview").querySelector("video");
    if (!video) return;
    if (video.paused) {
      video.play().then(() => {
        button.textContent = "Ⅱ";
        button.classList.add("is-playing");
      }).catch(() => {
        button.textContent = "!";
      });
    } else {
      video.pause();
      button.textContent = "▶";
      button.classList.remove("is-playing");
    }
  });
});

const revealItems = document.querySelectorAll(".project-card, .about-content, .about-copy, .contact");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => {
  item.classList.add("reveal");
  revealObserver.observe(item);
});
