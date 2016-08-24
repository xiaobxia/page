/**
 * Created by Administrator on 2016/8/21.
 */
jQuery.noConflict();
(function ($) {
    $(function () {
        //最近文章部分
        //个数
        var tempMonth = null;
        for (var i = 0; i < $(".sub-article-nav").length; i++) {
            //对应的倒过来的对象
            var obj = articleTimeObj[articleTimeObj.length - 1 - i];
            var path = null;
            var title = null;
            var levelOne = null;
            var description = null;
            var writeTime = null;
            var month = null;
            var day = null;


            //对于文章不多的时候，等文章多了就不会需要这个判断了
            if (obj == undefined) {
                break;
            } else {
                path = obj.path;
                title = obj.title;
                levelOne = obj.levelOne;
                description = obj.description;
                writeTime = obj.writeTime;

                month = writeTime.substr(4, 2);
                month = transMonth(month);
                day = writeTime.substr(6, 2);

                if (month != tempMonth) {
                    $(".art-date:eq(" + i + ")").addClass("new-month");
                    tempMonth = month;
                }
                $(".art-introduction:eq(" + i + ") a").attr("href", path);
                $(".art-introduction:eq(" + i + ") h5").text(title);
                $(".art-introduction:eq(" + i + ") span").text("标签：" + levelOne);
                $(".art-introduction:eq(" + i + ") p").text(description);
                $(".art-date-m:eq(" + i + ") span").text(month);
                $(".art-date-d:eq(" + i + ") span").text(day);
            }
        }


        function transMonth(num) {
            switch (num) {
                case "01":
                    return "Jan";
                    break;
                case "02":
                    return "Feb";
                    break;
                case "03":
                    return "Mar";
                    break;
                case "04":
                    return "Apr";
                    break;
                case "05":
                    return "May";
                    break;
                case "06":
                    return "Jun";
                    break;
                case "07":
                    return "Jul";
                    break;
                case "08":
                    return "Aug";
                    break;
                case "09":
                    return "Sep";
                    break;
                case "10":
                    return "Oct";
                    break;
                case "11":
                    return "Nov";
                    break;
                case "12":
                    return "Dec";
                    break;

            }
        }
    });
})(jQuery);