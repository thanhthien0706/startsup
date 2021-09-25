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
    $(window).scroll(function(){
        var numberScroll = $(this).scrollTop();
        var numberNhaySo = 1846;
        // console.log(numberScroll);
        if(numberScroll > numberNhaySo){
            // console.log("đã vào");
            nhaySo(3012,$('.number_parameters--1'));
        }
    })
});

function nhaySo(number, $TextHienThi){
    // for(var i = 0; i < number; i++){
    //     $TextHienThi.text(i);
    // }
    var firstNumber = 0;
    var lastNumber = number;

    console.log("đã vào");

    var demso = function(){
        if(firstNumber < lastNumber){
            firstNumber+= 50;
            $TextHienThi.text(firstNumber);
        }else{
            clearInterval(Interval);
        }
    }

    var Interval = setInterval(demso, 100);

}