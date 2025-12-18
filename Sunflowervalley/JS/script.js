// Navigation 
document.querySelector('.menu-toggle')?.addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('show');
});

// Cart button 
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".add-cart").forEach(button => {
    button.addEventListener("click", () => {
      alert("Item added to cart 🌻");
    });
  });
});
