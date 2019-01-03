"auto";

toast("启动成功!\n请使用“闪念胶囊”唤醒语音识别");

while (true) {
    if (!id("bubble_container").findOne()) {

    } else {
        var text = id("tv_title_small").findOne().text().replace(/。/, "")
        var textArr = text.split("");
        var key = "";

        if (textArr[0] + textArr[1] + textArr[2] == "提醒我") {
            //提醒功能
            id("bubble_sign_close").findOne().click();

            for (var i = 3; i < textArr.length; i++) {
                key += textArr[i];
            };
            remind(key);
        } else if (textArr[0] + textArr[1] + textArr[2] == "导航到") {
            //导航功能
            id("bubble_sign_close").findOne().click();

            for (var i = 3; i < textArr.length; i++) {
                key += textArr[i];
            };
            map(key);
        } else if (textArr[0] + textArr[3] + textArr[4] == "在查询") {
            //查询功能
            id("bubble_sign_close").findOne().click();

            var obj = textArr[1] + textArr[2]; //使用什么软件查询
            for (var i = 5; i < textArr.length; i++) {
                key += textArr[i];
            };

            search(key, obj);
        } else if (textArr[0] + textArr[1] + textArr[2] == "打电话") {
            // id("bubble_sign_close").findOne().click();

            // for (var i = 4; i < textArr.length; i++) {
            //     key += textArr[i];
            // };

            // call(key);
        } else if (textArr[0] + textArr[1] == "开始") {
            //开始番茄计时
            if (getAppName("com.plan.kot32.tomatotime")) {
                id("bubble_sign_close").findOne().click();

                for (var i = 2; i < textArr.length; i++) {
                    key += textArr[i];
                };
                tomatoTime(key);
            } else {
                continue;
            }
        } else if (textArr[2] + textArr[3] == "付款" || textArr[3] + textArr[4] == "付款") {
            //付款
            id("bubble_sign_close").findOne().click();

            var obj = 0;
            if (textArr[0] + textArr[1] == "微信") {

            } else {
                obj = 1;
            }

            pay(obj);
        } else if (textArr[0] + textArr[1] + textArr[2] == "倒计时") {
            //计时器功能
            id("bubble_sign_close").findOne().click();

            var TimeUnitException = {}; //中断forEach
            try {
                if (!textArr[textArr.length] == "钟") {
                    throw TimeException;
                }
                var time = text.match(/\时(\S*)\分/)[1];
                timer(time);

            } catch (TimeUnitException) {
                toast("注意！只能以分钟为单位。");
            }
        }

        text = "";
        textArr = text.split("");
        key = "";
        obj = "";
    }
    sleep(300);
}

//提醒功能
function remind(content) {
    app.startActivity({
        action: "android.intent.action.SEND",
        type: "text/*",
        extras: {
            "android.intent.extra.TEXT": content
        },
        packageName: "com.android.calendar",
        className: "com.android.calendar.event.EditEventActivity"
    });

    while (true) {
        if (!className("android.widget.Button").text("完成").findOne()) {

        } else {
            className("android.widget.Button").text("完成").findOne().click();
            toast("创建成功！");
            break;
        }
    }
}

//导航功能
function map(content) {
    toast("正在使用高德地图查询地点，请稍等……");
    app.startActivity({
        action: "android.intent.action.SEND",
        type: "text/plain",
        extras: {
            "android.intent.extra.TEXT": content
        },
        packageName: "com.autonavi.minimap",
        className: "com.autonavi.map.activity.NewMapActivity"
    });
}

//查询功能
function search(content, obj) {
    toast("正在使用" + obj + "查询，请稍等……");
    if (obj == "淘宝") {
        app.startActivity({
            action: "android.intent.action.SEND",
            type: "text/plain",
            extras: {
                "android.intent.extra.TEXT": content
            },
            packageName: "com.taobao.taobao",
            className: "com.taobao.search.sf.MainSearchResultActivity"
        });
    } else if (obj == "京东") {
        app.startActivity({
            action: "android.intent.action.SEND",
            type: "text/plain",
            extras: {
                "android.intent.extra.TEXT": content
            },
            packageName: "com.jingdong.app.mall",
            className: "com.jd.lib.search.view.Activity.ProductListActivity"
        });
    }
    toast("查询结束后\n请连续点击“返回键”退出搜索页面");
}

//番茄计时功能
function tomatoTime(key) {
    app.startActivity({
        packageName: "com.plan.kot32.tomatotime",
        className: "com.plan.kot32.tomatotime.activity.MainActivity"
    });

    while (true) {
        if (id("tl_custom").exists()) {
            var bounds = className("android.widget.TextView").text(key).findOne().bounds().toString();
            var x = 800;
            var y = Number(bounds.match(/ (\S*)\)/)[1]);
            click(x, y);
            break;
        }
    }
}

//付款
function pay(obj) {

    switch (obj) {
        case 0: //微信
            app.startActivity({
                packageName: "com.tencent.mm",
                className: "com.tencent.mm.plugin.offline.ui.WalletOfflineCoinPurseUI"
            });

            sleep(1000);
            if (id("original_app_icon").exists()) {
                id("original_app_icon").findOne().click();
            }

            break;
        case 1: //支付宝
            app.startActivity({
                packageName: "com.eg.android.AlipayGphone",
                className: "com.eg.android.AlipayGphone.AlipayLogin"
            });

            while (true) {
                if (className("android.widget.TextView").text("首页").exists()) {
                    var BreakException = {}; //中断forEach的异常
                    var bounds = className("android.widget.TextView").text("首页").findOne().bounds().toString();

                    var x = Number(bounds.match(/\((\S*)\,/)[1]);
                    var y = Number(bounds.match(/ (\S*) /)[1]);

                    click(x, y);
                    try {
                        className("android.widget.ListView").findOne().children().forEach(child => {

                            var target = child.findOne(className("android.widget.TextView").text("付钱"));
                            var bounds = target.bounds().toString();

                            if (!target) {
                                throw BreakException;
                            }

                            var x = Number(bounds.match(/\((\S*)\,/)[1]);
                            var y = Number(bounds.match(/ (\S*) /)[1]);
                            click(x, y);
                        });
                    } catch (BreakException) {

                    };

                    break;
                }
            }
    }
}

//倒计时功能
function timer(m) {
    switch (m) {
        case "一":
            m = 1;
            break;
        case "两":
            m = 2;
            break;
        case "三":
            m = 3;
            break;
        case "四":
            m = 4;
            break;
        case "五":
            m = 5;
            break;
        case "六":
            m = 6;
            break;
        case "七":
            m = 7;
            break;
        case "八":
            m = 8;
            break;
        case "九":
            m = 9;
            break;
        case "十":
            m = 10;
            break;
    }

    var TimeException = {}; //时间异常
    try {
        if (!isNaN(m) && m > 0 && m < 61) {
            app.startActivity({
                packageName: "com.smartisanos.clock",
                className: "com.smartisanos.clock.activity.ClockActivity"
            });

            while (true) {
                if (className("android.widget.RadioButton").text("计时器").exists()) {
                    className("android.widget.RadioButton").text("计时器").findOne().click()

                    var bounds = id("high_light").findOne().bounds().toString();

                    var x = Number(bounds.match(/\((\S*)\,/)[1]);;
                    var y = Number(bounds.match(/ (\S*) /)[1]);

                    var endY = y + 20 * m;

                    sleep(200);
                    swipe(x, y, x, endY, 10);
                    break;
                }
            }
        } else {
            throw TimeException;
        }

    } catch (TimeException) {
        toast("时间有误！\n倒计时范围：1 ~ 60 分钟");
    }
}

// function call(content) {
//     app.startActivity({
//         packageName: "com.smartisanos.quicksearch",
//         className: "com.android.quicksearchbox.SearchActivity"
//     });
//     console.log(content+"1");
//     // id("search_bar_edit_text").findOne().setText("content");
//     while(true) {
//         console.log(content+"3");
//         if (!id("search_bar_edit_text").findOne()) {
//             console.log(content+"2");
//         } else {
//             id("search_bar_edit_text").findOne().longClick();
//             break;
//         }
//     }

//     console.log(content);

//     // id("suggestions").findOne().children().forEach(child => {
//     //     var target = child.findOne(id("btn_call"));
//     //     target.click();
//     //     });
// }