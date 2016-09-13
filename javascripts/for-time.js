jQuery.noConflict();
(function ($) {
    $(function () {
        var tempYear = null,
            //side导航li数量
            liNum = 0,
            //side导航li的索引
            liNumT = 0,
            //文章数量
            artNum = 1;

        //用来分年份存放对象的数组
        //存放对象artintime[li索引][文章索引]
        artintime = [[]];

        //  var $liYear = $("<li ><span></span><em></em></li>");
        for (var i = 0; i < articleTimeObj.length; i++) {
            //对应的倒过来的对象
            var obj = articleTimeObj[articleTimeObj.length - 1 - i],
                year = obj.writeTime.substr(0, 4);

            //添加年份和文章数
            if (year != tempYear) {
                //如果使用变量，我发现这个变量只能用一次，创建左边的年份导航
                $(".list-nav ul").append($("<li ><span></span><em></em></li>"));
                tempYear = year;
                liNum++;
                //linumt代表的左边导航栏的li的索引
                liNumT = liNum - 1;
                //文章的数量
                artNum = 1;
            } else {
                //如果年份相同，说明文章数加1
                artNum++;
            }
            //存放对象artintime[li索引][文章索引]

            if (artintime[liNumT] == undefined) {
                artintime[liNumT] = [];
                artintime[liNumT][artNum - 1] = obj;
            } else {
                artintime[liNumT][artNum - 1] = obj;
            }


          //  artintime[liNumT][artNum - 1] = obj;
            //给side导航的li添加高亮，文章数，年份
            $(".list-nav ul span:eq(" + liNumT + ")").text(year);
            $(".list-nav ul em:eq(" + liNumT + ")").text(artNum);
            $(".list-nav ul li:eq(0)").addClass("active");
        }
        //通过选择年份显示文章
        //$(".list-nav ul li")不设成变量的原因是，初始化变量时，还没li，所以会造成变量一直undefined
        $(".list-nav ul li").bind("click", function () {
            $(".article-content-body").empty();
            $(this).addClass("active").siblings().removeClass("active");
            jiawenzhang();
        });
        jiawenzhang();
        //在文章框内添加文章的函数
        function jiawenzhang() {

            //添加文章
            for (var a = 0; a < $(".list-nav ul li").length; a++) {
                if ($(".list-nav ul li").eq(a).hasClass("active")) {
                    var yuansu = "",
                        tempMonth="";
                    for (var c = 0; c < artintime[a].length; c++) {
                        var month =artintime[a][c].writeTime.substr(4, 2);
                        month = transMonth(month);
                        if (month != tempMonth) {
                            yuansu +="<div class='art-time'><span>"+month+"</span></div>";
                            tempMonth = month;
                        }
                        yuansu += "<div class='article-inf'> <a href='" + "../" +
                            artintime[a][c].path + "'> <h5>" +
                            artintime[a][c].title + "</h5> <em>" +
                            artintime[a][c].levelOne + "</em> <p>" +
                            artintime[a][c].description + "</p> <span>" +
                            artintime[a][c].writeDay + "</span> </a> </div>";
                    }
                    $(".article-content-body").append(yuansu);
                }
            }
        }
    });
})(jQuery);
