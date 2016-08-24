/**
 * Created by Administrator on 2016/8/21.
 */
jQuery.noConflict();
(function ($) {
    $(function () {
        //article-tab在滚动时的效果
        var positionTimer = null;
        var currentPosition=null;

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
        var id= $("#page-id").text();
        var obj=articleTimeObj[id];

        var $headerNavA=$(".header-nav a");

        var sameLevelOne=[];
        var o=0;
        var sameLevelTwo=[];
        var t=0;

        var levelOne=obj.levelOne;
        var levelTwo=obj.levelTwo;

        var levelOnePath=obj.levelOnePath;
        var levelTwoPath=obj.levelTwoPath;
        //header部分
        for(var d = 0; d<$headerNavA.length;d++){
            //这句的错误在于jquery中元素列表不是用[]来访问的
           // var text=$headerNavA[d].text();
            var text=$headerNavA.eq(d).text();
            if (text==levelOne)
            {
                $headerNavA.eq(d).addClass("active");
            }
        }
        //article-tab部分
        $("#levelOne").text(levelOne).attr("href", "../"+levelOnePath);
        //目前还没实现leveltwo的链接
      //  $("#levelTwo").text(levelTwo);
        $("#levelTwo").text(levelTwo).attr("href", "../"+levelTwoPath);

        //article-side-nav部分
        //找到levelone相同的
        for(var a = 0; a<articleTimeObj.length;a++){
            if (articleTimeObj[a].levelOne==levelOne){
                sameLevelOne[o]=articleTimeObj[a];
                o++;
            }
        }
        //找到leveltwo相同的
        for(var b = 0; b<sameLevelOne.length;b++){
            if (sameLevelOne[b].levelTwo==levelTwo){
                sameLevelTwo[t]=sameLevelOne[b];
                t++;
            }
        }
        //给li加文字
        for (var c = 0; c<sameLevelTwo.length;c++){

            var $navU=$(".list-nav ul");

            var $creLi=$("<li ><span> > </span><a></a></li>");
            $navU.append($creLi);

            var $navA=$(".list-nav a:eq("+c+")");
            var $navL=$(".list-nav li:eq("+c+")");
            var title = sameLevelTwo[c].title;
            var path = sameLevelTwo[c].path;
            var navId = sameLevelTwo[c].pageId;
            $navA.text(title).attr("href", "../"+path);
            if( navId == id){
                $navL.addClass("active");
                $navU.addClass("active");
            }
        }
    });
})(jQuery);
