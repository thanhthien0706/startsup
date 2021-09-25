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
    // $(window).scroll(function(){
    //     var numberScroll = $(this).sc;
    //     var numberNhaySo = 1846;
    //     console.log(numberScroll);
    //     if(numberScroll > numberNhaySo){
            
    //     }
    // })
    var phantu = document.querySelector('.box_parameter');
    console.log([phantu]);
    console.log(phantu.offsetTop);
    console.log($('.box_parameter').top);
    var number1 = Number($('.number_parameters--1').text());
    // console.log(number1);
    animationCountUp(number1, 3000, 0, function(number){
        const formatNumber = number.toLocaleString();
        $('.number_parameters--1').text(formatNumber);
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