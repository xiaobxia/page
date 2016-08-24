/**
 * Created by Administrator on 2016/8/18.
 */

jQuery.noConflict();
(function ($) {


    $(function () {
        //对header中最近更新的实现
        var newest = articleTimeObj[articleTimeObj.length - 1].writeDay;
        $(".date-update span").text("最后更新：" + newest);
        function startTime() {
            var today = new Date();
            var year = today.getFullYear();
            //0表示一月
            var month = today.getMonth() + 1;
            var day = today.getDate();
            var week = today.getDay();
            var hour = today.getHours();
            var minute = today.getMinutes();
            var second = today.getSeconds();// 在小于10的数字钱前加一个‘0’
            week = transformWeek(week);
            minute = checkTime(minute);
            second = checkTime(second);
            $("#date-day").text(year + "年" + month + "月" + day + "日");
            $("#date-week").text("星期" + week);
            $("#date-time").text(hour + ":" + minute + ":" + second);
            //jquery中的定时器
            var t = setTimeout(function () {
                startTime()
            }, 500);
        }

        function checkTime(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }

        function transformWeek(week) {
            switch (week) {
                case 0:
                    return "七";
                    break;
                case 1:
                    return "一";
                    break;
                case 2:
                    return "二";
                    break;
                case 3:
                    return "三";
                    break;
                case 4:
                    return "四";
                    break;
                case 5:
                    return "五";
                    break;
                case 6:
                    return "六";
                    break;
            }
        }

        startTime();
    });

    //天气模块
    $(function () {
        function DataObj(data) {
            this.city = data.retData.city;
            this.date = data.retData.date;//日起
            this.time = data.retData.time;//发布时间
            this.longitude = data.retData.longitude;//经度
            this.latitude = data.retData.latitude;//纬度
            this.altitude = data.retData.altitude;//海拔
            this.weather = data.retData.weather;//天气
            this.temp = data.retData.temp;//温度
            this.lowTemp = data.retData.l_tmp;//最低温
            this.highTemp = data.retData.h_tmp;//最高温
            this.WD = data.retData.WD;//持续风向
            this.WS = data.retData.WS;//风速
            this.sunrise = data.retData.sunrise;//日出时间
            this.sunset = data.retData.sunset;//日落时间
        }

        function headerWeather(weatherObj) {
            $("#weather-city").text("城市：" + weatherObj.city);
            $("#weather-type").text("天气：" + weatherObj.weather);
            $("#weather-time").text("更新时间：" + weatherObj.time);
            //$("#weather-time").text("更新时间：" + cityone);
        }

        $.ajax({
            //首先通过ip获得地址
            type: "get",
            url: "https://webapi.amap.com/maps/ipLocation?key=608d75903d29ad471362f8c58c550daf",
            dataType: 'text',
            success: function (data) {
                //得到的是"({});",所以去括号还有分号
                var jsono=data.replace('(', '').replace(')', '').replace(';', '');
                //把json字符串，弄成obj
                var jsonObj=JSON.parse(jsono);
               // var jsonObj = eval("(" + data.replace('(', '').replace(')', '').replace(';', '') + ")");
                //当前城市，因为得到的是例如杭州市，而我只需要杭州，所以把市剔除
                var chengshi=jsonObj.city.slice(0,-1);
                //放在回调中才能得到chengshi，放外面就是undefined
                $.ajax({
                        type: "GET",
                        //根据拼音查
                        // url: "https://apis.baidu.com/apistore/weatherservice/weather",
                        //根据名称查
                        url: "https://apis.baidu.com/apistore/weatherservice/cityname",
                        dataType: "json",
                        //根据名称
                        data: {cityname: chengshi},
                        //根据拼音
                        //data: {citypinyin: "hangzhou"},
                        headers: {
                            apikey: "cfa3582ff1836c6a683adaa458cab144"
                        },
                        success: function (data) {
                            var dataObjOne = new DataObj(data);
                            headerWeather(dataObjOne);

                        }
                    }
                );
            }
        });



    });


})(jQuery);