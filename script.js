// Prevent placeholder links from jumping to the top of the page.
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[href="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => event.preventDefault());
  });
});

