/**
 * Created by Administrator on 2016/8/22.
 */
jQuery.noConflict();
(function ($) {
    $(function () {
        var tempYear = null;
        var liNum = 0;
        var liNumT = 0;
        var pageLevel=$("#level-one").text();
        var $lilevel=$(".list-nav ul span");
        var samelevelone=[];
        var samelevelonenum=0;

        var artleveltwo=[[],[]];

        var $headerNavA=$(".header-nav a");

        for(var u = 0; u<$headerNavA.length;u++){
            //这句的错误在于jquery中元素列表不是用[]来访问的
            // var text=$headerNavA[d].text();
            var text=$headerNavA.eq(u).text();
            if (text==pageLevel)
            {
                $headerNavA.eq(u).addClass("active");
            }
        }

     //   var artilevel=[[],[]];
        //var artNum=1;
        $(".list-nav ul li:eq(0)").addClass("active");
        for (var i = 0; i < articleTimeObj.length; i++) {
            //对应的倒过来的对象
            var obj = articleTimeObj[articleTimeObj.length - 1 - i];
            //var path = null;
          //  var title = null;
            var levelOne = null;
          //  var description = null;
         //   var writeTime = null;
            var year = null;


        //    path = obj.path;
       //     title = obj.title;

            levelOne = obj.levelOne;

       //     description = obj.description;
         //   writeTime = obj.writeTime;

            //year = writeTime.substr(0, 4);

            if (levelOne ==pageLevel) {
                //如果使用变量，我发现这个变量只能用一次，创建左边的年份导航
                samelevelone[samelevelonenum]=obj;
                samelevelonenum++;
            }

            /*$(".list-nav ul span:eq(" + liNumT + ")").text(year);
            $(".list-nav ul em:eq(" + liNumT + ")").text(artNum);*/

        }
        for (var b = 0; b < $lilevel.length; b++){
            var nub=0;
            for (var d = 0; d < samelevelone.length; d++){
                if (samelevelone[d].levelTwo==$lilevel.eq(b).text()){
                    artleveltwo[b][nub]=samelevelone[d];
                    nub++;
                }
            }
            $(".list-nav ul em:eq(" + b + ")").text(nub);
        }
        function jiawenzhang() {
            //添加文章
            for (var a = 0; a < $(".list-nav ul li").length; a++) {
                if ($(".list-nav ul li").eq(a).hasClass("active")) {
                    var yuansu = "";
                    for (var c = 0; c < artleveltwo[a].length; c++) {
                        yuansu += "<div class='article-inf'> <a href='" +
                            "../"+artleveltwo[a][c].path + "'> <h5>" +
                            artleveltwo[a][c].title + "</h5> <em>" +
                            artleveltwo[a][c].levelOne + "</em> <p>" +
                            artleveltwo[a][c].description + "</p> <span>" +
                            artleveltwo[a][c].writeDay + "</span> </a> </div>";
                    }
                    $(".article-content-body").append(yuansu);
                }
            }
        }
        $(".list-nav ul li").bind("click",function () {
            $(".article-content-body").empty();
            $(this).addClass("active").siblings().removeClass("active");
            jiawenzhang();
        });
        jiawenzhang();
       /* //用来分年份存放对象的数组
        var artintime=[[],[]];
        //  var $liYear = $("<li ><span></span><em></em></li>");
        for (var i = 0; i < articleTimeObj.length; i++) {
            //对应的倒过来的对象
            var obj = articleTimeObj[articleTimeObj.length - 1 - i];
            var path = null;
            var title = null;
            var levelOne = null;
            var description = null;
            var writeTime = null;
            var year = null;


            path = obj.path;
            title = obj.title;

            levelOne = obj.levelOne;

            description = obj.description;
            writeTime = obj.writeTime;

            //year = writeTime.substr(0, 4);

            if (year != tempYear) {
                //如果使用变量，我发现这个变量只能用一次，创建左边的年份导航
                $(".list-nav ul").append($("<li ><span></span><em></em></li>"));
                tempYear = year;
                liNum++;
                //linumt代表的左边导航栏的li的索引
                liNumT = liNum - 1;
                //文章的数量
                artNum=1;
            }else {
                artNum++;
            }
            //存放对象artintime[li索引][文章索引]
            artintime[liNumT][artNum-1]=obj;

            $(".list-nav ul span:eq(" + liNumT + ")").text(year);
            $(".list-nav ul em:eq(" + liNumT + ")").text(artNum);
            $(".list-nav ul li:eq(0)").addClass("active");
        }
        //$(".list-nav ul li")不设成变量的原因是，初始化变量时，还没li，所以会造成变量一直undefined
        $(".list-nav ul li").bind("click",function () {
            $(".article-content-body").empty();
            $(this).addClass("active").siblings().removeClass("active");
            jiawenzhang();
        });
        jiawenzhang();
        function jiawenzhang() {
            //添加文章
            for(var a =0; a<$(".list-nav ul li").length;a++){
                if($(".list-nav ul li").eq(a).hasClass("active")){
                    var yuansu="";
                    for (var c=0;c<artintime[a].length;c++){
                        yuansu+="<div class='article-inf'> <a href='"+
                            artintime[a][c].path+"'> <h5>"+
                            artintime[a][c].title+"</h5> <em>"+
                            artintime[a][c].levelOne+"</em> <p>"+
                            artintime[a][c].description+"</p> <span>"+
                            artintime[a][c].writeDay+"</span> </a> </div>";
                    }
                    $(".article-content-body").append(yuansu);
                }
            }
        }*/
    });
})(jQuery);