//文章对象，以time排列
var artKeyWord=["follow","me","地址","社区","主页", "github","weibo",
                "Display","属性","见解","元素","表现",
                "Class","规范","选择器","优先级","顺序","书写","参考","命名",
                "回乡记","千佛山","水库","花",
                "Meta","标签","详解","申明编码","name","http-equiv",
                "转义","反转义"];

var articleTimeObj = [
    {
        pageId: 0,
        writeDay: "2016年8月20日",
        writeTime: "20160820",
        writeWeek: "Sat",
        title: "follow me",
        path: "aboutme/address/follow-me.html",
        levelOnePath: "classify/nav/aboutme-nav.html",
        levelTwoPath: "",
        levelOne: "关于我",
        levelTwo: "社区地址",
        description: "我的社区主页地址，包括github，weibo"
    },
    {
        pageId: 1,
        writeDay: "2016年8月30日",
        writeTime: "20160830",
        writeWeek: "Tue",
        title: "Display属性的一些见解",
        path: "language/Css/display-1.html",
        levelOnePath: "classify/nav/language-nav.html",
        levelTwoPath: "",
        levelOne: "语言",
        levelTwo: "Css",
        description: "元素的dsiplay，display属性各个值的表现"
    },
    {
        pageId: 2,
        writeDay: "2016年9月7日",
        writeTime: "20160907",
        writeWeek: "Tue",
        title: "Class的规范",
        path: "language/Css/class-1.html",
        levelOnePath: "classify/nav/language-nav.html",
        levelTwoPath: "",
        levelOne: "语言",
        levelTwo: "Css",
        description: "选择器的优先级,属性的书写顺序,属性的书写规范,Class命名参考"
    },
    {
        pageId: 3,
        writeDay: "2016年9月9日",
        writeTime: "20160909",
        writeWeek: "Fri",
        title: "回乡记(一)",
        path: "essay/travel/travel-1.html",
        levelOnePath: "classify/nav/eassy-nav.html",
        levelTwoPath: "",
        levelOne: "随笔",
        levelTwo: "游记",
        description: "千佛山，水库，花"
    },
    {
        pageId: 4,
        writeDay: "2016年9月14日",
        writeTime: "20160914",
        writeWeek: "Tue",
        title: "Meta标签详解",
        path: "language/Html/meta-1.html",
        levelOnePath: "classify/nav/language-nav.html",
        levelTwoPath: "",
        levelOne: "语言",
        levelTwo: "Html",
        description: "申明编码，name属性，http-equiv属性"
    },
    {
        pageId: 5,
        writeDay: "2016年9月17日",
        writeTime: "20160917",
        writeWeek: "Sat",
        title: "转义html",
        path: "webapp/webTool/escape-1.html",
        levelOnePath: "classify/nav/webApp-nav.html",
        levelTwoPath: "",
        levelOne: "webApp",
        levelTwo: "webTool",
        description: "转义和反转义html"
    }
];

var Articleoperation = {
    sameLeveOne: function (artobj, pageLevel) {
        var sameleveloneObj = [],
            samelevelonenum = 0;
        for (var i = 0; i < artobj.length; i++) {
            if (artobj[i].levelOne== pageLevel) {
                sameleveloneObj[samelevelonenum] = artobj[i];
                samelevelonenum++;
            }
        }
        return sameleveloneObj;
    },
    sameLeveTwo: function (artobj, LevelText) {
        var sameLevelTwo = [],
            sameLevelTwoNum=0;
        for (var b = 0; b < artobj.length; b++) {
            if (artobj[b].levelTwo == LevelText) {
                sameLevelTwo[sameLevelTwoNum] = artobj[b];
                sameLevelTwoNum++;
            }
        }
    },
    artReverse: function (artobj) {
        var reverseObj = [];
        for (var i = 0; i < artobj.length; i++) {
            //对应的倒过来的对象
            reverseObj[i] = artobj[artobj.length - 1 - i];
        }
        return reverseObj;
    }
};


var Pageoperation = {
    createArticleMsg: function (artObj) {
        var articleList = "";
        for(var x=0; x<artObj.length;x++){
            articleList +="<div class='article-inf'> <a href='"+"../"+
                    artObj[x].path+"'> <h5>"+
                    artObj[x].title+"</h5> <em>"+
                    artObj[x].levelOne+"</em> <p>"+
                    artObj[x].description+"</p> <span>"+
                    artObj[x].writeDay+"</span> </a> </div>";
        }
        return articleList;
    }
};

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
//获取ID
var $ = function (id) {
    return typeof id === "string" ? document.getElementById(id) : id
};
//获取tagName
var $$ = function (tagName, oParent) {
    return (oParent || document).getElementsByTagName(tagName)
};
//通过类获取
var $$$ = function (className) {
    return document.getElementsByClassName(className)
};
//添加类
var addClass = function (elem, className) {
    //检索字符，如果字符没有出现（返回-1就是没有出现）
    if ((" " + elem.className + " ").indexOf(" " + className + " ") == -1) {
        //如果元素的类名为空就直接添加
        if (elem.className == "") {
            elem.className = className;
        } else {
            //如过类名不为空就添加前加入空格
            elem.className += (" " + className);
        }
    }
};
//判断有没有类
var hasClass = function (elem, className) {
    if ((" " + elem.className + " ").indexOf(" " + className + " ") == -1) {
        //如果元素的类名为空
        return 0;
    } else {
        return 1;
    }
};
//移除类
var removeClass = function (elem, className) {
    //把要移除的类从元素的类当中移除，保存在一个变量当中
    var newClass = (" " + elem.className + " ").replace(" " + className + " ", " ");
    //截取字符串，参数1是为了剔除开头的空格，参数二的原因是为了剔除最后一个空格
    elem.className = newClass.substr(1, newClass.length - 2);
};

//事件注册
var addEvent = function (elem, eventName, handler) {
    if (elem.addEventListener) {
        elem.addEventListener(eventName, handler, false);
    } else if (elem.attachEvent) {
        elem.attachEvent("on" + eventName, handler);
    }
};