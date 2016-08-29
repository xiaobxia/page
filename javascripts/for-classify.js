jQuery.noConflict();
(function ($) {
    $(function () {
        //页面的levelone
        var pageLevel = $("#level-one").text(),
            //页面的预先写好的side的li的集合
            $lilevel = $(".list-nav ul span"),
            //同一levelone的集合
            samelevelone = [],
            //同一levelone的集合的索引
            samelevelonenum = 0,

            artleveltwo = [[], []],
            //header中的导航
            $headerNavA = $(".header-nav a");
        //给header中的导航添加高亮
        for (var u = 0; u < $headerNavA.length; u++) {
            //这句的错误在于jquery中元素列表不是用[]来访问的
            // var text=$headerNavA[d].text();
            var text = $headerNavA.eq(u).text();
            if (text == pageLevel) {
                $headerNavA.eq(u).addClass("active");
            }
        }
        //给side导航中的第一项li添加高亮
        $(".list-nav ul li:eq(0)").addClass("active");
        //把同一levelone的文章对象放在数组中
        for (var i = 0; i < articleTimeObj.length; i++) {
            //对应的倒过来的对象
            var obj = articleTimeObj[articleTimeObj.length - 1 - i],
                levelOne = null;
            levelOne = obj.levelOne;
            if (levelOne == pageLevel) {
                samelevelone[samelevelonenum] = obj;
                samelevelonenum++;
            }
        }
        //得到side导航的li项的长度，因为这是预先写在页面里的
        for (var b = 0; b < $lilevel.length; b++) {
            //leveltwo的文章数
            var nub = 0;
            //遍历同levelone的数组，把相同leveltwo的放数组li，数组artleveltwo既有levelone又有leveltwo
            for (var d = 0; d < samelevelone.length; d++) {
                if (samelevelone[d].levelTwo == $lilevel.eq(b).text()) {
                    artleveltwo[b][nub] = samelevelone[d];
                    nub++;
                }
            }
            //文章数显示在side导航
            $(".list-nav ul em:eq(" + b + ")").text(nub);
        }
        //在文章框中添加文章
        function jiawenzhang() {
            //添加文章
            for (var a = 0; a < $(".list-nav ul li").length; a++) {
                if ($(".list-nav ul li").eq(a).hasClass("active")) {
                    var yuansu = "";
                    for (var c = 0; c < artleveltwo[a].length; c++) {
                        yuansu += "<div class='article-inf'> <a href='" +
                            "../" + artleveltwo[a][c].path + "'> <h5>" +
                            artleveltwo[a][c].title + "</h5> <em>" +
                            artleveltwo[a][c].levelOne + "</em> <p>" +
                            artleveltwo[a][c].description + "</p> <span>" +
                            artleveltwo[a][c].writeDay + "</span> </a> </div>";
                    }
                    $(".article-content-body").append(yuansu);
                }
            }
        }

        //点击side导航的li项，添加高亮并显示内容
        $(".list-nav ul li").bind("click", function () {
            $(".article-content-body").empty();
            $(this).addClass("active").siblings().removeClass("active");
            jiawenzhang();
        });
        jiawenzhang();
    });
})(jQuery);