var clicking = false,
    y1 = 0, y2 = 0;

var pointerEventToXY = function (e) {
    var out = { x: 0, y: 0 };
    if (e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel') {
        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        out.x = touch.pageX;
        out.y = touch.pageY;
    } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover' || e.type == 'mouseout' || e.type == 'mouseenter' || e.type == 'mouseleave') {
        out.x = e.pageX;
        out.y = e.pageY;
    }
    return out;
};

$(document).on('mousedown touchstart', function (e) {
    var page = new pointerEventToXY(e);
    clicking = true;
    y1 = page.y;
});

$(document).on('mouseup touchend', function (e) {
    clicking = false;

    var screenHeight = $(window).height(),
        moveWidth = $('.selector').css('bottom');
    if (parseInt(moveWidth) >= screenHeight * .5) {
        $('.selector').animate({ 'bottom': screenHeight }, 'slow');
    } else {
        $('.selector').animate({ 'top': 0, 'bottom': 0 }, 'slow');
    }
})

$('.selector').on('mousemove touchmove', function (e) {
    if (clicking === false) return;

    var page = new pointerEventToXY(e);

    y2 = page.y;
    if ((y1 - y2) > 0) {
        $('.selector').css({ 'top': 'auto', 'bottom': y1 - y2 });
    }
});