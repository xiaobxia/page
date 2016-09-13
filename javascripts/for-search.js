/**
 * Created by Administrator on 2016/8/27.
 */
jQuery.noConflict();
(function ($) {
    $(function () {

        var searchText = $.cookie('searchText');
        // var searchText="follow";
        var tempArray = searchText.split("");
        var textArray = unique1(tempArray);
        var youguanart = [];
        var artin = 0;
        var yuansu = "";
        //去除重复
        function unique1(array) {
            var n = []; //一个新的临时数组
            //遍历当前数组
            for (var i = 0; i < array.length; i++) {
                //如果当前数组的第i已经保存进了临时数组，那么跳过，
                //否则把当前项push到临时数组里面
                if (n.indexOf(array[i]) == -1) n.push(array[i]);
            }
            return n;
        }

        $(".search-page-msg span").text(searchText);
        for (var i = 0; i < articleTimeObj.length; i++) {
            //对应的倒过来的对象
            var obj = articleTimeObj[articleTimeObj.length - 1 - i],
                title = obj.title.toLowerCase(),
                description = obj.description.toLowerCase();

            obj.xiangguandu = 0;

            for (var t = 0; t < textArray.length; t++) {
                if (title.indexOf(textArray[t]) != -1 || description.indexOf(textArray[t]) != -1) {
                    obj.xiangguandu++;
                }
            }
            if (obj.xiangguandu > 0) {
                youguanart[artin] = obj;
                artin++;
            }
        }
        //优化相关度,使用向下取整更好
        var minlength = Math.floor(textArray.length / 2);
        for (var x = 0; x < youguanart.length; x++) {
            if (youguanart[x].xiangguandu > minlength) {
                yuansu += "<div class='article-inf'> <a href='" + "../" +
                    youguanart[x].path + "'> <h5>" +
                    youguanart[x].title + "</h5> <em>" +
                    youguanart[x].levelOne + "</em> <p>" +
                    youguanart[x].description + "</p> <span>" +
                    youguanart[x].writeDay + "</span> </a> </div>";
            }
        }
        if (youguanart.length == 0) {
            $("#no-result").addClass("is-block");
        }

        $(".search-page-content").append(yuansu);
    });
})(jQuery);
