jQuery.noConflict();
(function ($) {
    $(function () {

        var articleTimeObj = [
            {
                pageId: 0,
                writeDay: "2016年8月20日",
                writeTime: "20160820",
                title: "follow me",
                path: "aboutme/about-me.html",
                levelOnePath: "aboutme/about-me.html",
                levelTwoPath: "",
                levelOne: "关于我",
                levelTwo: "",
                description: "我的社区主页地址",
                content: ""
            },
            {
                pageId: 1,
                writeDay: "2016年8月20日",
                writeTime: "20160820",
                title: "follow me",
                path: "aboutme/about-me.html",
                levelOnePath: "aboutme/about-me.html",
                levelTwoPath: "",
                levelOne: "关于我",
                levelTwo: "",
                description: "我的社区主页地址"
            }
        ];

        for (var a = 0; a < articleTimeObj.length; a++) {
            articleTimeObj[a].pageId = a;
        }
        //方法2
        /*var e="";
         for(var b = 0; b<articleTimeObj.length;b++){
         var j =dump(articleTimeObj[b]);
         e+=j;
         }
         $("#one").html(e);
         function dump(myObject) {
         var s = "";
         for (var property in myObject) {
         s = s + "<br> "+property +": " + myObject[property] ;
         }
         return s;
         }*/
        //方法1
        function obj2string(o) {
            var r = [];
            if (typeof o == "string") {
                return "\"" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
            }
            if (typeof o == "object") {
                if (!o.sort) {
                    for (var i in o) {
                        r.push(i + ":" + obj2string(o[i]));
                    }
                    if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
                        r.push("toString:" + o.toString.toString());
                    }
                    r = "{" + r.join() + "}";
                } else {
                    for (var i = 0; i < o.length; i++) {
                        r.push(obj2string(o[i]))
                    }
                    r = "[" + r.join() + "]";
                }
                return r;
            }
            return o.toString();
        }

        var obj = obj2string(articleTimeObj);
        $("#one").text(obj);


    });
})(jQuery);