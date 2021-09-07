"use strict";

$(document).ready(function () {
  $('.box_main_slide').slick({
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    adaptiveHeight: true,
    arrows: false,
    autoplay: true
  });
});