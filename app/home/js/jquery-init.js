(function ($) {
    "use strict";

    jQuery(document).ready(function () {

        // Sticky menu
        jQuery(window).scroll(function () {
            var mainmenu = jQuery("#header_menu.header_is_sticky", "#header");
            if (parseInt(mainmenu.attr("rel"),10) <= Math.abs(parseInt(jQuery(window).scrollTop()),10)) {
                mainmenu.addClass("fixed");
            } else {
                mainmenu.removeClass("fixed");
            }
        });

        // Sticky sidebar
        jQuery(".sidebar_area").theiaStickySidebar({
            additionalMarginTop: 65
        });

        jQuery("#header_menu.header_is_sticky", "#header").wrap("<div class='header_menu_parent'></div>").attr("rel", jQuery("#header_menu.header_is_sticky", "#header").offset().top).parent().height($("#header_menu.header_is_sticky", "#header").height());

        // Breaking news
        jQuery(".breaking_news_container").owlCarousel({
            singleItem: true,
            pagination: false,
            theme: "breaking_news_container",
            autoPlay: true
        });

        // Posts carousel
        jQuery(".carousel_posts_container").owlCarousel({
            items: 6,
            pagination: false,
            navigation: true,
            theme: "carousel_posts_container",
            navigationText: ["<div>&#xf104;</div>", "<div>&#xf105;</div>"]
        });

        // Main  slider
        jQuery(".main_slider").owlCarousel({
            singleItem: true,
            pagination: true,
            navigation: false
        });
        
        // Slider articles
        jQuery(".gallery_single_post").owlCarousel({
            singleItem: true,
            stopOnHover: true,
            navigation: true,
            pagination: false,
            navigationText: ["&#xf0d9;", "&#xf0da;"]
        });
        
        // Widget gallery
        jQuery(".widget_gallery_post").owlCarousel({
            singleItem: true,
            stopOnHover: true,
            navigation: true,
            pagination: false,
            navigationText: ["&#xf0d9;", "&#xf0da;"]
        });

        // Tabs content
        jQuery(".tab_group").tabs();

        // Accordions
        jQuery(".accordion_group").accordion({
            heightStyle: "content",
            collapsible: true,
            icons: false
        });

        // Fitvids
        jQuery("body").fitVids();

        // Top mobile navigation
        jQuery(".toggle_top_navigation").on("click", function () {
            jQuery("#top_navigation").toggle();
        });

        // Main mobile navigation
        jQuery(".toggle_main_navigation").on("click", function () {
            jQuery("#main_navigation").toggle();
        });

        // Lightbox image
        jQuery(".magnificPopupImage").magnificPopup({
            type: "image"
        });

        // Lightbox gallery
        jQuery(".magnificPopupGallery").each(function () {
            jQuery(this).magnificPopup({
                delegate: "a",
                type: "image",
                gallery: {
                    enabled: true
                }
            });
        });

        // Lightbox popup iframe
        jQuery(".magnificPopupIframe").magnificPopup({
            type: "iframe"
        });

    });

})(jQuery);