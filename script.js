const revealItems = document.querySelectorAll(".reveal");
const cursor = document.querySelector(".cursor-dot");
const filterButtons = document.querySelectorAll(".filter-btn");
const works = document.querySelectorAll(".work-item");

document.documentElement.classList.add("js-ready");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { rootMargin: "0px 0px -8% 0px", threshold: 0.01 }
);

revealItems.forEach((item) => revealObserver.observe(item));

if (cursor) {
  window.addEventListener("pointermove", (event) => {
    cursor.style.opacity = "1";
    cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)`;
  });

  document.querySelectorAll("a, button").forEach((item) => {
    item.addEventListener("pointerenter", () => cursor.classList.add("is-hot"));
    item.addEventListener("pointerleave", () => cursor.classList.remove("is-hot"));
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    works.forEach((work) => {
      const shouldShow = filter === "all" || work.dataset.category === filter;
      work.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

document.querySelectorAll(".feature-piece, .work-item").forEach((piece) => {
  piece.addEventListener("pointermove", (event) => {
    const rect = piece.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    piece.style.transform = `rotate(${x * 2}deg) translate(${x * 5}px, ${y * 5}px)`;
  });

  piece.addEventListener("pointerleave", () => {
    piece.style.transform = "";
  });
});
