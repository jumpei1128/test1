// @ts-nocheck
$(window).scroll(function () {
    if ($(window).scrollTop() >= 100) {
        $('header').addClass('fixed');
        $('.menu').addClass('fixed');
        $('.other-header').addClass('fixed');
    } else {
        $('header').removeClass('fixed');
        $('.menu').removeClass('fixed');
        $('.other-header').removeClass('fixed');
    }
});


//scroll top
$(function () {
    $(".pagetop").click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;

    });
});


//menu toggle
$(function () {
    $(".nav-close").hide();
    $(".menu,.nav-close a").click(function () {
        $(".nav-close").slideToggle("slow");
        $(".menu").toggleClass("on");
    });
});


//for Portfolio Page
// dropdown
$(function () {
    $('.categorysec .cat').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('is-active');
        $('.categorysec .promenu').slideToggle();
        $('.categorysec .promenu li').on('click', function () {
            $(this).parent().slideUp();
        });
    });
});
//tag jquery
$(function () {
    //Get a collection of posts
    var $posts = $('.post');
    var tagsArray = [];
    var $tagsNav = $('.promenu');
    var $tagLink = $('.tag-link');
    var $postsTitle = $('.posts-title');
    var marginPosts = (function(posts) {
        var columnSize = 3;// PC
        var columnMargin = "30px";
        var media = "pc"

        if (window.matchMedia('(max-width:768px)').matches) {
          media = "sp"
          columnSize = 2;// SP
          columnMargin = "5px";
        }

        posts.each(function (index) {
            console.log(columnSize);
            if ((index + 1) % columnSize === 0) {
                $(this).css('margin-right',0)
                if (media = "SP") {
                  $(this).css('float', 'right');
                }
            } else {
                $(this).css('margin-right', columnMargin)
                if (media = "SP") {
                  $(this).css('float', 'left');
                }
            }
        });
    });

    // 読み込み時全体に適用
    marginPosts($posts);

    $tagLink.click(function (evt) {
        // alert($(evt.target).text());
        var linkText = $(evt.target).text();
        if (linkText == "all") {
            $postsTitle.text("All");
            $posts.show();
            marginPosts($posts);
        } else {
            $postsTitle.text(linkText);
            $posts.hide()
                .filter('.' + linkText)
                .show();
            // 表示されたものにだけmarginを調整
            marginPosts($('.post:visible'));
        }
    });

    $tagLink.detach(); //hide original from view

    //Iterate thru the collection and get the tag names.
    $posts.each(function (index) {
        var tags = $(this)
            .attr("class")
            .split(" ");

        for (var i = 0; i < tags.length; i++) {
            if ((tags[i] != "post") &&
                (tags[i] != "tag") &&
                (tags[i] != "special-bl") &&
                (tags[i] != "heightLine-01") &&
                (tagsArray.indexOf(tags[i]) < 0)) {
                tagsArray.push(tags[i]);
            }
        }
    });
    tagsArray.sort();
    // tagsArray.push("all");
    console.log(tagsArray);

    for (var i = 0; i < tagsArray.length; i++) {
        //clone the link with events
        $tagLink.clone(true)
            .text(tagsArray[i])
            .appendTo($tagsNav);
    }
});

// lp_params
(function() {
  var params = getUrlParamater();
  if (params.utm_source && params.utm_medium) {
    Cookies.set('lp_params', params.utm_source + ' ' + params.utm_medium, { expires: 3000 });
  }
}());

function getUrlParamater() {
  var params = {};
  location.search.substring(1).split('&').forEach(function (val, index) {
    data = val.split('=');
    params[data[0]] = data[1];
  });
  return params;
}

