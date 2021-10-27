"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const burgers = document.querySelectorAll(".navbar-burger");

  burgers.forEach(burger => {
    burger.addEventListener("click", () => {
      const targetId = burger.dataset.target;
      const target = document.getElementById(targetId);

      burger.classList.toggle("is-active");
      target.classList.toggle("is-active");
    });
  });
});
