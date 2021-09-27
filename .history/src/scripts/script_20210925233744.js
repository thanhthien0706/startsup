$(document).ready(function(){
    $('.box_main_slide').slick({
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        adaptiveHeight: true,
        arrows: false,
        autoplay: true,
    });
    $('.box_show_slide_products').slick({
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 2,
        slidesToScroll: 2,
        adaptiveHeight: true,
        arrows: false,
        autoplay: true,
    });
    $('.box_show_slide_propose').slick({
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 2,
        slidesToScroll: 2,
        adaptiveHeight: true,
        arrows: true,
        autoplay: true,
    });

    var number1 = Number($('.number_parameters--1').text());
    // console.log(number1);
    animationCountUp(number1, 3000, 0, function(number){
        const formatNumber = number.toLocaleString();
        $('.number_parameters--1').text(formatNumber);
    });

    var number2 = Number($('.number_parameters--2').text());
    // console.log(number2);
    animationCountUp(number2, 3000, 0, function(number){
        const formatNumber = number.toLocaleString();
        $('.number_parameters--2').text(formatNumber);
    });

    var number3 = Number($('.number_parameters--3').text());
    // console.log(number3);
    animationCountUp(number3, 3000, 0, function(number){
        const formatNumber = number.toLocaleString();
        $('.number_parameters--3').text(formatNumber);
    });

    var number4 = Number($('.number_parameters--4').text());
    // console.log(number3);
    animationCountUp(number3, 3000, 0, function(number){
        const formatNumber = number.toLocaleString();
        $('.number_parameters--4').text(formatNumber);
    });
});

function animationCountUp(finalNumber, duration=5000, startNumber=0, callback ){
    let currentNumber = startNumber;
    const interval = setInterval(updateNumber, 17);

    function updateNumber(){
        if(currentNumber >= finalNumber){
            clearInterval(interval);
        }else{
            let inc = Math.ceil(finalNumber/(duration/17));
            if(currentNumber + inc > finalNumber){
                currentNumber = finalNumber;
                clearInterval(interval);
            }else{
                currentNumber = currentNumber + inc;
            }
            callback(currentNumber);
        }
    }
}