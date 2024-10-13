(function ($) {

    "use strict";

    $(document).ready(function () {
        const swiper2 = new Swiper('.sub_Swiper', {
            direction: 'horizontal',
            speed: 2400,
            mousewheel: {
                releaseOnEdges: true,
            },
            touchReleaseOnEdges: true,
            pagination: {
                el: ".sup_swiper-pagination",
                dynamicBullets: false,
                clickable: true,
            },
            navigation: {
                nextEl: ".sup_swiper-button-next",
                prevEl: ".sup_swiper-button-prev",
            },
        });

        const kv_Swiper = new Swiper('.kv_Swiper', {
            direction: 'vertical',
            autoplay: false,
            mousewheel: {
                // forceToAxis: true,
                releaseOnEdges: true,
            },
            touchReleaseOnEdges: true,
            // effect: 'fade',
            speed: 2400,
            pagination: {
                el: ".kv_Swiper .swiper-pagination",
                dynamicBullets: false,
                clickable: true,
            },
        })

        const Customers_swiper = new Swiper('.Customers-swiper', {
            loop: true,
            slidesPerView: 1,
            freeMode: true,
            centeredSlides: true,
            // allowTouchMove: true,
            speed: 1200,
            spaceBetween: 0,
            autoplay: {
                delay: 2500
            },
            navigation: {
                nextEl: ".swiper_Customers-button-next",
                prevEl: ".swiper_Customers-button-prev",
            },
            breakpoints: {
                991: {
                    slidesPerView: 2.5,
                    spaceBetween: 80,
                    centeredSlides: true,
                },
                768: {
                    slidesPerView: 1.8,
                    spaceBetween: 80,
                    centeredSlides: true,
                },
            }
        })

        const news_Swiper = new Swiper('.news_Swiper', {
            // direction: 'horizontal',
            speed: 2400,
            slidesPerView: 1,
            spaceBetween: 0,
            pagination: {
                el: ".swiper_news-pagination",
                dynamicBullets: false,
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper_news-button-next",
                prevEl: ".swiper_news-button-prev",
            },
            breakpoints: {
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 16
                  },
                577: {
                slidesPerView: 2,
                spaceBetween: 16
                },
              },
        });



        // init jarallax parallax
        var initJarallax = function () {
            jarallax(document.querySelectorAll(".jarallax"));
            jarallax(document.querySelectorAll(".jarallax-img"), {
                keepImg: true,
            });
        }
        initJarallax();

        // init gasp
        setTimeout(function () {
            gsap.registerPlugin(ScrollTrigger);
            // header
            let dom_first = document.getElementById("header").nextElementSibling.id;
            console.log(dom_first)
            gsap.to("#header", {
                duration: 1,
                scrollTrigger: {
                    trigger: `#${dom_first}`,
                    markers: false,
                    start: "top bottom",
                    end: "bottom top",
                    onEnter: () => { $("#header").removeClass('scroll') },
                    onEnterBack: () => { $("#header").removeClass('scroll') },
                    onLeave: () => { $("#header").addClass('scroll') },
                    onLeaveBack: () => { $("#header").addClass('scroll') },
                }
            });

            gsap.utils.toArray(".item-bg").forEach((item, i) => {
                gsap.to(item, {
                    left: "120%",
                    duration: 2,
                    ease: "slow(0.1,0.4,false)",
                    scrollTrigger: {
                        trigger: item,
                        markers: false,
                        start: "top bottom",
                        end: "bottom top",
                        toggleActions: "restart pause restart pause",
                    }
                });
            });

            gsap.utils.toArray(".js-scroll-item").forEach(item => {
                let href = item.getAttribute("href")
                // console.log(item,href)
                // let menuDom = $(item).parent().parent().parent()
                // console.log(menuDom)
                let offset = item.getAttribute("data-offset") ? item.getAttribute("data-offset") : 0
                const eachTop = $(href).offset().top - $('#header').height() - offset
                gsap.to(href, {
                    scrollTrigger: {
                        trigger: href,
                        markers: false,
                        start: "top 40%",
                        end: "bottom 20%",
                        onEnter: () => { $(`#header a[href='${href}']`).addClass('active') },
                        onEnterBack: () => { $(`#header a[href='${href}']`).addClass('active') },
                        onLeave: () => { $(`#header a[href='${href}']`).removeClass('active') },
                        onLeaveBack: () => { $(`#header a[href='${href}']`).removeClass('active') },
                    },
                })
                item.addEventListener('click', function (e) {
                    e.preventDefault()
                    // console.log(item, eachTop)
                    $("html, body").animate({ scrollTop: eachTop }, 600);
                })
            })

        }, 1000);

        // var offcanvasElementList = [].slice.call(document.querySelectorAll('.offcanvas'))
        // var offcanvasList = offcanvasElementList.map(function (offcanvasEl) {
        //     return new bootstrap.Offcanvas(offcanvasEl)
        // })



        // 影片輪播
        if ($('.video-wrapper').length > 0) {
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
            // 3. This function creates an <iframe> (and YouTube player)
    
            var initPlayer = function (element) {
                var player = element.querySelector('.video-iframe');
                var button = element.querySelector('.video-play');
                var ytplayer = new YT.Player(player, {
                    playerVars: {
                        'autoplay': 0,
                        'modestbranding': 1,
                        'controls': 0,
                        'rel': 0,
                    },
                    videoId: element.dataset.id
                });
    
                button.addEventListener('click', function () {
                    console.log(ytplayer);
                    console.log(ytplayer.getPlayerState());
                    ytplayer.playVideo();
                    switch (ytplayer.getPlayerState()) {
                        case 1:
                            ytplayer.stopVideo();
                            break;
                        default:
                            ytplayer.playVideo();
                            break;
                    }
                });
            };
            // var titles = ['Page 1', 'Page 2', 'Page 3'];
            var swiper_youtube = new Swiper('.swiper-youtube-container', {
                loop: true,  // 循環
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                // pagination: {
                //     el: '.swiper-pagination',
                //     type: 'bullets',
                //     clickable: true,
                // },
                lazy: {
                    loadPrevNext: true,
                },
                // paginationBulletRender: function (index, className) {
                //     return '<span class="' + className + '">' + titles[index] + '</span>';
                // }
            }).on('slideChange', function () {
                var isVideo = swiper_youtube.slides[swiper_youtube.previousIndex].querySelector('.video-container');
                if (isVideo) {
                    YT.get(isVideo.querySelector('iframe').id).stopVideo();
                    console.log(isVideo.querySelector('iframe').id);
                }
            });
    
            window.onYouTubePlayerAPIReady = function () {
                var container = document.querySelectorAll('.video-container');
                for (var i = 0; i < container.length; i++) {
                    initPlayer(container[i])
                }
            };
    
            if ($('.video-wrapper .swiper-slide').length < 2) {
                $('.video-ctrl').hide();
            }
        }
    }); // End of a document






})(jQuery);