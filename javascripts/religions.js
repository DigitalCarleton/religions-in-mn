if (!Religions) {
    var Religions = {};
}

(function ($) {
    
    Religions.mobileSelectNav = function () {
        // Create the dropdown base
        $("<select class=\"mobile\" />").appendTo("#primary-nav, #exhibit-pages");

        
        // Create default option "Go to..."
        $("<option />", {
           "selected": "selected",
           "value"   : "",
           "text"    : "Go to..."
        }).appendTo("#primary-nav select, #exhibit-pages select");
        
        // Populate dropdown with menu items
        $("#primary-nav a").each(function() {
            var el = $(this);
            if (el.parents('ul ul').length) {
                var parentCount = el.parents("ul").length;
                var dashes = new Array(parentCount).join('- ');
                $("<option />", {
                    "value": el.attr("href"),
                    "text":  dashes + el.text()
                }).appendTo("#primary-nav select");
            } else {
                $("<option />", {
                    "value": el.attr("href"),
                    "text": el.text()
                }).appendTo("#primary-nav select");
            }
            $("#primary-nav select").change(function() {
              window.location = $(this).find("option:selected").val();
            });
        });

        checkSize();
        $(window).resize(checkSize);
        function checkSize() {
            if($("#primary-nav ul").css("display") == "none"){
                $("#exhibit-pages").insertBefore('#exhibit-blocks');
            }
        }

        $("#exhibit-pages a").each(function() {
            var el = $(this);
            if (el.parents('ul ul').length) {
                var parentCount = el.parents("ul").length;
                var dashes = new Array(parentCount).join('- ');
                $("<option />", {
                    "value": el.attr("href"),
                    "text":  dashes + el.text()
                }).appendTo("#exhibit-pages select");
            } else {
                $("<option />", {
                    "value": el.attr("href"),
                    "text": el.text()
                }).appendTo("#exhibit-pages select");
            }
            $("#exhibit-pages select").change(function() {
              window.location = $(this).find("option:selected").val();
            });
        });
    }

    Religions.exhibitPages = function () {
        var $exhibitpages   = $("#exhibit-pages"),
            $window = $(window),
            offset  = $exhibitpages.offset(),
            topPadding = 20,
            $contentDiv = $("#content");
        if (document.getElementById("exhibit-pages")) {
            $window.scroll(function () {
                if($window.scrollTop() > offset.top && $window.width() > 767 && ($window.height() - topPadding - 85) >  $exhibitpages.height()) {
                    $exhibitpages.stop().animate({
                        marginTop: $window.scrollTop() - offset.top + topPadding
                        },0);
                } else {
                    $exhibitpages.stop().animate({
                        marginTop: 0
                    },0);
                }
            });
        }
    };

    Religions.lightbox = function () {
        $('.exhibit-gallery-item img, .gallery-showcase img').each(function() {
            var baseUrl = $(this).attr('src');
            var directory = /files\/(\w*)/;
            var fullsizeUrl = baseUrl.replace(directory, "files/fullsize");
            var cblink = $(this).parent().attr('href');

            $(this).colorbox({
                href: fullsizeUrl,
                rel: 'gal',
                maxWidth:"75%",
                maxHeight:"95%",
                next:" > ",
                previous:" < ",
                // This function adds the link for single images to cbox photos
                // but doesn't work for slider photos.
                onComplete: function() {
                  $('#colorbox img.cboxPhoto').wrap('<a href="'+cblink+'"></a>');
                }
            });
        });
        
        // open all external links in new windows
        $('a:not([href^="https://religionsmn.carleton.edu"]):not([href^="#"]):not([href^="/"])').attr('target','_blank');
        
        // Add pluralism class to all links to the Pluralism Project
        $('a[href^="http://pluralism.org"]').addClass('pluralism');
              
        // This should load pluralism.org content in an iframe, but doesn't b/c mixed content
        // $('a.pluralism').colorbox({
//             iframe: true,
//             maxWidth:"90%",
//             maxHeight:"90%",
//         });
    }

    // This function sets the parameters for the exhibit sliders.  For the full properties list
    // see https://github.com/bqworks/slider-pro/blob/master/docs/api.md#javascript-api
    Religions.slider = function() {
        $( document ).ready(function( $ ) {
            $( '.slider-pro' ).sliderPro({
                width:'80%',
                arrows: true,
                fadeArrows: false,
                height:450,
                // autoHeight: true,
                buttons:false,
                autoplay:false,
                // imageScaleMode:'cover',
                autoSlideSize:true,
                // autoScaleReference: 1,
                visibleSize:'100%',
                waitForLayers:true,
                //thumbnailsPosition:'top',
                breakpoints: {
                    780: {
                    width:'100%',
                    arrows: true,
                    fadeArrows: false,
                    height:200,
                    // autoHeight: true,
                    buttons:false,
                    autoplay:true,
                    imageScaleMode:'cover',
                    autoScaleReference: 1,
                    thumbnailHeight: 50,
                    thumbnailWidth: 50,
                    }
                }
            });
    });
    }

    // Religions.toggle = function() {
    //     $( ".show-transcription" ).click(function(e) {
    //         e.preventDefault();
    //       $( ".transcription" ).toggle( "blind", 300 );
    //     });
    // }
    Religions.toggle = function() {

        $( ".show-transcription" ).click(function(e) {
            e.preventDefault();
            // $(".show-transcription").parent("p").css("margin-bottom","0px");
          $( ".transcription" ).toggle( "blind", 300 );

          if ($(".show-transcription").text() =='Show Transcription') {
                 $(".show-transcription").html("Hide transcription")
                 // $(".show-transcription").parent("p").css("margin-bottom","0px⮟⮝");
          } else {
              $(".show-transcription").html('Show Transcription')
              // $(".show-transcription").parent("p").css("margin-bottom","1.42857em");
          }
        });

    }
    Religions.sidebar = function() {
        // $( "#exhibit-pages ul li:not(.current,.parent) ul" ).prev().prepend('<div class="drawer" title = "Expand/Collapse">');
        $( "#exhibit-pages ul li:not(.current,.parent) ul" ).prev().prepend('<i class="fas fa-caret-right"></i> ');
        // $( "#exhibit-pages ul li:not(.current,.parent) ul" ).prev().prepend⮞('<span class="ui-icon ui-icon-caret-1-e"></span>');
        $( "#exhibit-pages ul li.current>ul" ).prev().prepend('<i class="fas fa-caret-down"></i> ');
        $( "#exhibit-pages ul li.parent>ul" ).prev().prepend('<i class="fas fa-caret-down"></i> ');
    }


})(jQuery);