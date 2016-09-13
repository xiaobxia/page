//文章对象，以time排列
var articleTimeObj = [
    {
        pageId: 0,
        writeDay: "2016年8月20日",
        writeTime: "20160820",
        writeWeek: "Sat",
        title: "follow me",
        path: "aboutme/follow-me.html",
        levelOnePath: "classify/aboutme-nav.html",
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
        path: "language/display-1.html",
        levelOnePath: "classify/language-nav.html",
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
        path: "language/class-1.html",
        levelOnePath: "classify/language-nav.html",
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
        path: "essay/travel-1.html",
        levelOnePath: "classify/eassy-nav.html",
        levelTwoPath: "",
        levelOne: "随笔",
        levelTwo: "游记",
        description: "千佛山，水库，花"
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