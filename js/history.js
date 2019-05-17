$(".owl-carousel").owlCarousel({
  loop: true,
  items: 1,
  margin: 10
});

// OverlayScrollbars(document.querySelector('.js-section__description--skimmer'), {
//     className: "os-theme-dark"
// });
// OverlayScrollbars(document.querySelector('.js-section__description--aquarium'), {
//     className: "os-theme-dark"
// });
// OverlayScrollbars(document.querySelector('.js-section__description--bike'), {
//     className: "os-theme-dark"
// });

$(".js-section__wraper-photo").on("mouseover", function() {
  $(".js-section__description-background").css("opacity", "0");
});

$(".js-section__wraper-photo").on("mouseout", function() {
  $(".js-section__description-background").css("opacity", ".9");
});

const hiddenParagrapfSkimmer = $(".js-hidden-paragrapf--skimmer");

$(".js-section__btn--skimmer").on("click", function() {
  const $btn = $(this);
  if (hiddenParagrapfSkimmer.is(":visible")) {
    $btn.text("Czytaj więcej");
  } else {
    $btn.text("Zwiń");
  }
  hiddenParagrapfSkimmer.slideToggle(500);
});

const hiddenParagrapfAquarium = $(".js-hidden-paragrapf--aquarium");

$(".js-section__btn--aquarium").on("click", function() {
  const $btn = $(this);
  if (hiddenParagrapfAquarium.is(":visible")) {
    $btn.text("Czytaj więcej");
  } else {
    $btn.text("Zwiń");
  }
  hiddenParagrapfAquarium.slideToggle(500);
});

const hiddenParagrapfBike = $(".js-hidden-paragrapf--bike");

$(".js-section__btn--bike").on("click", function() {
  const $btn = $(this);
  if (hiddenParagrapfBike.is(":visible")) {
    $btn.text("Czytaj więcej");
  } else {
    $btn.text("Zwiń");
  }
  hiddenParagrapfBike.slideToggle(500);
});
