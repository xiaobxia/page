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

            artleveltwo = [[]],
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
                    if(artleveltwo[b]==undefined){
                        artleveltwo[b]= [];
                        artleveltwo[b][nub] = samelevelone[d];
                        nub++;
                    }else {
                        artleveltwo[b][nub] = samelevelone[d];
                        nub++;
                    }

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
                    var yuansu = "",
                        tempMonth="",
                        tempYear="";

                    for (var c = 0; c < artleveltwo[a].length; c++) {
                        var year =artleveltwo[a][c].writeTime.substr(0, 4);
                        if (year != tempYear) {
                            yuansu +="<div class='art-time'><span>"+year+"年"+"</span></div>";
                            tempYear = year;
                        }
                        var month =artleveltwo[a][c].writeTime.substr(4, 2);
                        month = transMonth(month);
                        if (month != tempMonth) {
                            yuansu +="<div class='art-time'><span>"+month+"</span></div>";
                            tempMonth = month;
                        }
                        yuansu += "<div class='article-inf'> <a href='" +
                            "../../" + artleveltwo[a][c].path + "'> <h5>" +
                            artleveltwo[a][c].title + "</h5> <em>" +
                            artleveltwo[a][c].levelOne + "</em> <p>" +
                            artleveltwo[a][c].description + "</p> <span>" +
                            artleveltwo[a][c].writeDay + "</span> </a> </div>";
                    }
                    $(".article-content-body").append(yuansu);
                }
            }
        }


        function getQueryStringArgs(){
            //get query string without the initial ?
            var qs = (location.search.length > 0 ? location.search.substring(1) : ""),
                //object to hold data
                args = {},
                //get individual items
                items = qs.length ? qs.split("&") : [],
                item = null,
                name = null,
                value = null,

                //used in for loop
                i = 0,
                len = items.length;

            //assign each item onto the args object
            for (i=0; i < len; i++){
                item = items[i].split("=");
                name = decodeURIComponent(item[0]);
                value = decodeURIComponent(item[1]);

                if (name.length){
                    args[name] = value;
                }
            }
            return args;
        }

        //assume query string of ?q=javascript&num=10

        var args = getQueryStringArgs();

        if(args["levelTwo"]!=""){
            for(var o=0;o<$(".list-nav ul li").length;o++){
                if(args["levelTwo"]==$(".list-nav ul li span").eq(o).text()){
                    $(".article-content-body").empty();
                    $(".list-nav ul li").eq(o).addClass("active").siblings().removeClass("active");
                 //   jiawenzhang();
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