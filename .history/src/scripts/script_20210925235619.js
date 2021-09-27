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
        slidesToShow: 4,
        slidesToScroll: 2,
        adaptiveHeight: true,
        arrows: true,
        // autoplay: true,
        prevArrow: "<div class='box_icon_btn box_icon_btn_right'>
        <svg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='chevron-right' class='svg-inline--fa fa-chevron-right fa-w-10' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'><path fill='currentColor' d='M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z'></path></svg>
      </div>"",
        nextArrow: "<i class='slick-next fas fa-chevron-right'></i>",
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