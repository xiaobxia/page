/**
 * Created by Administrator on 2016/8/21.
 */
jQuery.noConflict();
(function ($) {
    $(function () {
        //article-tab在滚动时的效果
        var positionTimer = null,
            currentPosition = 0;

        positionTimer = setInterval(function () {
            currentPosition = document.documentElement.scrollTop || document.body.scrollTop;

            if (0 <= currentPosition && currentPosition < 110) {
                $(".article-tab").removeClass("fix");
            } else if (110 <= currentPosition) {
                $(".article-tab").addClass("fix");
            }
        }, 3);
    });
    $(function () {
        //article-tab在滚动时的效果
        var $subtitle=$(".for-subtitle"),
            titleOp="",
            titlePosi=[];
        if ($subtitle!=undefined){
            for(var a=0;a<$subtitle.length;a++){
                var subtitleText=$subtitle.eq(a).text();
                titlePosi[a]=$subtitle.eq(a).offset().top;
                titleOp += "<option>"+subtitleText+"</option>"
            }
            $("#subtitle-sel").append(titleOp);

            $("#jump-btn").bind("click", function () {
                var subindex =$(".subtitle-sel option:selected").index();
                var subposi=titlePosi[subindex];
                window.scrollTo(0, subposi);
            });
        }
    });

    $(function () {
        //得到页面的pageid，然后通过id得到文章的对象
        var id = $("#page-id").text(),
            obj = articleTimeObj[id],
            //header中的导航的li a的集合
            $headerNavA = $(".header-nav a"),
            //相同levelone的集合，和索引
            sameLevelOne = [],
            o = 0,
            //相同leveltwo的集合，和索引
            sameLevelTwo = [],
            t = 0,
            //对象的levelone和leveltwo以及对应的路径
            levelOne = obj.levelOne,
            levelTwo = obj.levelTwo,
            twoc= encodeURIComponent(levelTwo),
            twot= encodeURIComponent("levelTwo"),
            levelOnePath = obj.levelOnePath,
            levelTwoPath = obj.levelTwoPath;

        //header中的导航对应地添加高亮
        for (var d = 0; d < $headerNavA.length; d++) {
            //这句的错误在于jquery中元素列表不是用[]来访问的
            // var text=$headerNavA[d].text();
            var text = $headerNavA.eq(d).text();
            if (text == levelOne) {
                $headerNavA.eq(d).addClass("active");
            }
        }

        //article-tab部分
        $("#levelOne").text(levelOne).attr("href", "../../" + levelOnePath);
        //目前还没实现leveltwo的链接
        //  $("#levelTwo").text(levelTwo);
        $("#levelTwo").text(levelTwo).attr("href", "../../" + levelOnePath+"?"+twot+"="+twoc);

        //article-side-nav部分
        //找到levelone相同的，保存在数组中
        for (var a = 0; a < articleTimeObj.length; a++) {
            if (articleTimeObj[a].levelOne == levelOne) {
                sameLevelOne[o] = articleTimeObj[a];
                o++;
            }
        }
        //找到leveltwo相同的，保存在数组中
        for (var b = 0; b < sameLevelOne.length; b++) {
            if (sameLevelOne[b].levelTwo == levelTwo) {
                sameLevelTwo[t] = sameLevelOne[b];
                t++;
            }
        }
        //给side导航中的li添加文字
        for (var c = 0; c < sameLevelTwo.length; c++) {
            //得到ul
            var $navU = $(".list-nav ul"),
                //设置li的格式
                $creLi = $("<li ><span> > </span><a></a></li>"),
                title = sameLevelTwo[c].title,
                path = sameLevelTwo[c].path,
                navId = sameLevelTwo[c].pageId;
            //向ul中添加li
            $navU.append($creLi);
            //如果放在顶部过早得声明也是错的，会找不到li
            var $navA = $(".list-nav a:eq(" + c + ")"),
                $navL = $(".list-nav li:eq(" + c + ")");
            //给side导航的项设置路径
            $navA.text(title).attr("href", "../../" + path);
            //如果pageid对上了，就是说是当前的文章
            if (navId == id) {
                $navL.addClass("active");
                $navU.addClass("active");
            }
        }
    });
})(jQuery);
