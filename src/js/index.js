window.onload = function () {
    touchEvent.tap($("#music"), function (e) {
        if (tool.hasClass($("#music"), "stopped")) {
            tool.removeClass($("#music"), 'stopped');
            /*
            * 重启
            * */
            $("#music-audio").pause();
            $("#music-audio").load();
        } else {
            tool.addClass($("#music"), 'stopped');
            /*
            * 暂停
            * */
            $("#music-audio").pause();
        }
    });

    $("#music-audio").pause();


    setTimeout(function () {
        tool.removeClass($("#music"), 'stopped');
        /*
        * 重启
        * */
        $("#music-audio").pause();
        $("#music-audio").load();

        tool.addClass($(".loading")[0], 'hide');

        var firstIndex = [];
        var mySwiper = new Swiper('.swiper-container', {
            direction: 'vertical',
            pagination: '.swiper-pagination',
            //virtualTranslate : true,
            // effect:'fade',
            // effect:'cube',
            effect: 'coverflow',
            // effect:'flip',
            // mousewheelControl : true,
            onInit: function (swiper) {
                swiperAnimateCache(swiper); //隐藏动画元素
                swiperAnimate(swiper); //初始化完成开始动画
            },
            onSlideChangeEnd: function (swiper) {
                if(swiper.activeIndex == 0) {
                    // firstIndex.forEach((value, index) => {
                    //     value.style.visibility = "initial";
                    // });
                } else {
                    swiperAnimate(swiper);
                }

                switch (swiper.activeIndex) {
                    case 0:
                        // setTimeout(function(){
                        //     $("p").css({
                        //         animation: 'flash 1s linear 0s infinite'
                        //     })
                        // },500);//定时器时间是上一个动画执行时间
                        break;
                    case 1:
                        setTimeout(function () {
                            $("#yewu").style.animation = "swing 1s linear 0s "  //无限循环
                            // $("#yewu").style.animation = "flash 1s linear 0s";
                            // $("#yewu").css({
                            //     animation: 'flash 1s linear 0s infinite'
                            // })
                        }, 5500);//定时器时间是上一个动画执行时间
                        break;
                }
                if (swiper.slides.length - 1 == swiper.activeIndex) {
                    $("#arrow").style.display = "none";
                } else {
                    $("#arrow").style.display = "block";
                }
                if(swiper.activeIndex == 1) {
                    var ani0 = document.querySelectorAll(".swiper-slide")[0].querySelectorAll(".ani");
                    ani0.forEach((value, index) => {
                        firstIndex.push(value);
                        tool.removeClass(value, 'ani');

                        value.style.visibility = "initial";
                    });
                }
                var ani = document.querySelectorAll(".swiper-slide")[swiper.activeIndex].querySelectorAll(".ani");
                ani.forEach((value, index) => {
                    tool.removeClass(value, 'ani');
                });
            },
            onTransitionEnd: function (swiper) {
                swiperAnimate(swiper);
                // this.slides.eq(swiper.activeIndex).find('.ani').removeClass('ani'); //动画只展现一次，去除ani类名
            },
            watchSlidesProgress: true,
            onProgress: function (swiper) {
                var i = 0;
                for (i; i < swiper.slides.length; i++) {
                    var slide = swiper.slides[i];
                    var progress = slide.progress;
                    var translate = progress * swiper.height / 4;
                    var scale = 1 - Math.min(Math.abs(progress * 0.5), 1);
                    var opacity = 1 - Math.min(Math.abs(progress / 2), 0.5);
                    slide.style.opacity = opacity;
                    var es = slide.style;
                    es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'translate3d(0,' + translate + 'px,-' + translate + 'px) scaleY(' + scale + ')';

                }
            },
            onSetTransition: function (swiper, speed) {
                // console.log("我在滚动中")
                var i = 0;
                for (i; i < swiper.slides.length; i++) {
                    let es = swiper.slides[i].style;
                    es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = speed + 'ms';

                }
            }
        });
    }, 1000);
}
