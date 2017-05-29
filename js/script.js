
/**
 *  @name plugin
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *    destroy
 */
; (function ($, window, undefined) {
    'use strict';

    var pluginName = 'log-screen';
    var y1, y2,
        clicking = false;

    var PointerEventToXY = function (e) {
        var out = { x: 0, y: 0 };
        if (e.type === 'touchstart' || e.type === 'touchmove' || e.type === 'touchend' || e.type === 'touchcancel') {
            var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            out.x = touch.pageX;
            out.y = touch.pageY;
        } else if (e.type === 'mousedown' || e.type === 'mouseup' || e.type === 'mousemove' || e.type === 'mouseover' || e.type === 'mouseout' || e.type === 'mouseenter' || e.type === 'mouseleave') {
            out.x = e.pageX;
            out.y = e.pageY;
        }
        return out;
    };


    var handleMouseUp = function (e) {
        var page = new PointerEventToXY(e);
        clicking = true;
        y1 = page.y;
    };

    var handleMouseDown = function (e, selector) {
        clicking = false;

        var screenHeight = $(window).height(),
            moveWidth = selector.css('bottom');
        if (parseInt(moveWidth) >= screenHeight * 0.5) {
            selector.animate({ 'bottom': screenHeight }, 'slow', function () {
                selector.css({'display':'none','bottom':'100%'});

            }).parent('body').removeAttr('style');
        } else {
            selector.animate({ 'top': 0, 'bottom': 0 }, 'slow');
        }
    };

    var handleMouseMove = function (e, selector) {
        if (clicking === false) {
            return;
        }

        var page = new PointerEventToXY(e);

        y2 = page.y;
        if ((y1 - y2) > 0) {
            selector.css({ 'top': 'auto', 'bottom': y1 - y2 });
        }
    };

    function Plugin(element, options) {
        this.element = $(element);
        this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var that = this,
                el = that.element;

            el.on('mousedown touchstart', function (e) {
                handleMouseUp(e);
            });
            el.on('mouseup touchend', function (e) {
                handleMouseDown(e, el);
            });
            el.on('mousemove touchmove', function (e) {
                handleMouseMove(e, el);
            });

            $('body').css('overflow', 'hidden');   

            that.handleImg(el);

            $(window).on('resize', function(){
                that.handleImg(el);                
            });
        },

        handleImg : function(el) {
            var img = el.find('img')[0],
                hImg = img.naturalHeight,
                wImg = img.naturalWidth,
                hScreen = el.height(),
                wScreen = el.width();

            if(hImg*wScreen > wImg*hScreen) {
                $(img).css({'width':'100%','height':'auto'});
            } else {
                $(img).css({'width':'auto','height':'100%'});          
            }   
        },

        destroy: function () {
            $.removeData(this.element[0], pluginName);
        }
    };

    $.fn[pluginName] = function (options, params) {
        return this.each(function () {
            var instance = $.data(this, pluginName);
            if (!instance) {
                $.data(this, pluginName, new Plugin(this, options));
            } else if (instance[options]) {
                instance[options](params);
            }
        });
    };

    $.fn[pluginName].defaults = {};

    $(function () {
        $('[data-' + pluginName + ']')[pluginName]({});
    });

}(jQuery, window));

/**
 *  @name plugin
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *    destroy
 */
; (function ($, window, undefined) {
    'use strict';

    var pluginName = 'slider';

    function Plugin(element, options) {
        this.element = $(element);
        this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var that = this,
                el = that.element;

            el.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                // autoplay: true,
                // autoplaySpeed: 2000,
                arrows: false,
                fade: true,
                pauseOnFocus: false,
                adaptiveHeight: true,
                touchMove: false
            });

        },

        destroy: function () {
            $.removeData(this.element[0], pluginName);
        }
    };

    $.fn[pluginName] = function (options, params) {
        return this.each(function () {
            var instance = $.data(this, pluginName);
            if (!instance) {
                $.data(this, pluginName, new Plugin(this, options));
            } else if (instance[options]) {
                instance[options](params);
            }
        });
    };

    $.fn[pluginName].defaults = {};

    $(function () {
        $('[data-' + pluginName + ']')[pluginName]({});
    });

}(jQuery, window));
