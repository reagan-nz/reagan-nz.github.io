(function () {
  "use strict";
  var button = document.querySelector("[data-portrait-toggle]");
  if (!button) return;
  var caption = document.querySelector("[data-portrait-caption]");
  var announcement = document.querySelector("[data-portrait-announcement]");
  button.querySelectorAll("img").forEach(function (image) {
    image.setAttribute("aria-hidden", "true");
  });
  button.addEventListener("click", function () {
    var showPhoto = button.getAttribute("data-portrait") === "illustration";
    button.setAttribute("data-portrait", showPhoto ? "photo" : "illustration");
    button.setAttribute("aria-pressed", String(showPhoto));
    button.setAttribute("aria-label", showPhoto
      ? "Show illustrated portrait of Nanyi holding a plush dog"
      : "Show original photo of Nanyi holding a plush dog");
    if (caption) caption.textContent = showPhoto ? "Click for illustration" : "Click for photo";
    if (announcement) announcement.textContent = showPhoto ? "Original photo shown." : "Illustration shown.";
  });
})();
