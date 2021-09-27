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
  $('.box_main_slide_new').slick({
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    adaptiveHeight: true,
    arrows: false,
    autoplay: true
  });
  $('.box_show_slide_products').slick({
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 2,
    slidesToScroll: 2,
    adaptiveHeight: true,
    arrows: false,
    autoplay: true
  });
  $('.box_show_slide_propose').slick({
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 4,
    slidesToScroll: 2,
    adaptiveHeight: true,
    arrows: true,
    // autoplay: true,
    nextArrow: "<div class='box_icon_btn box_icon_btn_right'> <svg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='chevron-right' class='svg-inline--fa fa-chevron-right fa-w-10' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'><path fill='currentColor' d='M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z'></path></svg></div>'",
    prevArrow: "<div class='box_icon_btn box_icon_btn_left'> <svg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='chevron-left' class='svg-inline--fa fa-chevron-left fa-w-10' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'><path fill='currentColor' d='M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z'></path></svg></div>'"
  }); // function hienThi($idFrame, $this){
  //     $(".list_content ").children(".active").removeClass("active");
  //     $('.'+$idFrame).show(500);
  // }

  var number1 = Number($('.number_parameters--1').text()); // console.log(number1);

  animationCountUp(number1, 3000, 0, function (number) {
    var formatNumber = number.toLocaleString();
    $('.number_parameters--1').text(formatNumber);
  });
  var number2 = Number($('.number_parameters--2').text()); // console.log(number2);

  animationCountUp(number2, 3000, 0, function (number) {
    var formatNumber = number.toLocaleString();
    $('.number_parameters--2').text(formatNumber);
  });
  var number3 = Number($('.number_parameters--3').text()); // console.log(number3);

  animationCountUp(number3, 3000, 0, function (number) {
    var formatNumber = number.toLocaleString();
    $('.number_parameters--3').text(formatNumber);
  });
  var number4 = Number($('.number_parameters--4').text()); // console.log(number3);

  animationCountUp(number3, 3000, 0, function (number) {
    var formatNumber = number.toLocaleString();
    $('.number_parameters--4').text(formatNumber);
  });
});

function animationCountUp(finalNumber) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5000;
  var startNumber = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var callback = arguments.length > 3 ? arguments[3] : undefined;
  var currentNumber = startNumber;
  var interval = setInterval(updateNumber, 17);

  function updateNumber() {
    if (currentNumber >= finalNumber) {
      clearInterval(interval);
    } else {
      var inc = Math.ceil(finalNumber / (duration / 17));

      if (currentNumber + inc > finalNumber) {
        currentNumber = finalNumber;
        clearInterval(interval);
      } else {
        currentNumber = currentNumber + inc;
      }

      callback(currentNumber);
    }
  }
}