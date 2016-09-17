/**
 * Created by Administrator on 2016/8/16.
 */

/***
 ----------------图片切换部分---------
 ***/

var AutoPlay = function (interval, nowIndex, rollBarId, frameId, rollIndexId, collectionId) {
    this.initialize(interval, nowIndex, rollBarId, frameId, rollIndexId, collectionId);
};
AutoPlay.prototype = {

    initialize: function (interval, nowIndex, rollBarId, frameId, rollIndexId, collectionId) {
        var oThis = this;
        //interval是时间间隔
        //nowIndex是初始的索引
        //定时器
        this.autoTimer = null;
        //现在显示的图片的索引
        this.iNow = nowIndex;
        //这些不能var 因为到了toggle，left等的就不认识了
        //滑动按钮
        this.rollBar = $(rollBarId);
        this.rollBtn = $$("div", this.rollBar);
        //显示框,不能包括按钮的
        this.scrollBlock = $(frameId);
        //索引
        this.roll = $(rollIndexId);
        this.rollIndex = $$("li", this.roll);
        //图片集中框
        this.picBlock = $(collectionId);

        //图片索引数
        var picIndex = this.rollIndex.length - 1;

        //定时显示
        this.autoTimer = setInterval(function () {
            var temp = null;
            if (oThis.iNow == picIndex) {
                temp = 0;
            } else {
                temp = oThis.iNow + 1;
            }
            oThis.toggle(temp);

        }, interval);

        //鼠标在图片上
        addEvent(this.scrollBlock, "mouseover", function () {
            clearInterval(oThis.autoTimer);
        });

        //鼠标移开图片
        addEvent(this.scrollBlock, "mouseout", function () {
            oThis.autoTimer = setInterval(function () {
                var temp = null;
                if (oThis.iNow == picIndex) {
                    temp = 0;
                } else {
                    temp = oThis.iNow + 1;
                }
                oThis.toggle(temp);
            }, interval);
        });

        //按左划
        addEvent(this.rollBtn[0], "click", function () {
            clearInterval(oThis.autoTimer);
            var temp2 = null;
            if (oThis.iNow == 0) {
                temp2 = picIndex;
            } else {
                temp2 = oThis.iNow - 1;
            }
            oThis.toggle(temp2);
            oThis.autoTimer = setInterval(function () {
                var temp = null;
                if (oThis.iNow == picIndex) {
                    temp = 0;
                } else {
                    temp = oThis.iNow + 1;
                }
                oThis.toggle(temp);
            }, interval);
        });

        //按右划
        addEvent(this.rollBtn[1], "click", function () {
            clearInterval(oThis.autoTimer);
            var temp2 = null;
            if (oThis.iNow == picIndex) {
                temp2 = 0;
            } else {
                temp2 = oThis.iNow + 1;
            }
            oThis.toggle(temp2);
            oThis.autoTimer = setInterval(function () {
                var temp = null;
                if (oThis.iNow == picIndex) {
                    temp = 0;
                } else {
                    temp = oThis.iNow + 1;
                }
                oThis.toggle(temp);
            }, interval);

        });
        //鼠标放在导航上
        for (var i = 0; i < this.rollIndex.length; i++) {
            this.rollIndex[i].index = i;
            addEvent(this.rollIndex[i], "click", function () {
                var temp3 = this.index;
                oThis.toggle(temp3);
            });
        }
    },

    toggle: function (next) {
        var oThis = this;
        if (next < this.iNow) {
            this.right(next);
        } else if (next > this.iNow) {
            this.left(next);
        }
    },

    left: function (next) {
        var left = next * 100;
        this.picBlock.style.left = -left + "%";
        removeClass(this.rollIndex[this.iNow], "active");
        addClass(this.rollIndex[next], "active");
        this.iNow = next;
    },

    right: function (next) {
        var left = next * 100;
        this.picBlock.style.left = -left + "%";
        removeClass(this.rollIndex[this.iNow], "active");
        addClass(this.rollIndex[next], "active");
        this.iNow = next;
    }
};

