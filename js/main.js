for (var i = 0; i < 20; i++) {
    try {
        auto();
        toast("启动成功!\n请使用“闪念胶囊”唤醒语音识别");
        toast("按“音量上键”会关闭软件\n可前往软件设置中取消该功能");
        setScreenMetrics(1080, 1920);
        var speed = 10; //点击速度
        var doubleWechat = 1;//默认没有双开微信，0 双开，1 单开
        doubleWechat = dialogs.select("有无双开微信？", "有", "没有双开微信");
        importClass(android.net.Uri);
        break;
    } catch (Exception) {
        if (i == 0) {
            toast("辅助功能未启动\n请向上滑动找到 SaraScript\n启动该服务");
        }
    }
    sleep(1000);
}

while (true) {
    if (!id("bubble_container").exists()) {

    } else {
        var text = id("tv_title_small").findOne().text().replace(/。/, "").replace(/\s/g, "");//关键字，去中文句号，去空格
        var textArr = text.split("");
        var key = "";

        if (textArr[0] + textArr[1] + textArr[2] == "提醒我") {
            //提醒功能
            id("bubble_sign_close").findOne().click();

            for (var i = 3; i < textArr.length; i++) {
                key += textArr[i];
            };

            remind(key);
        } else if (textArr[0] + textArr[1] == "导航") {
            //导航功能
            id("bubble_sign_close").findOne().click();

            for (var i = 3; i < textArr.length; i++) {
                key += textArr[i];
            };

            map(key);
        } else if (textArr[2] + textArr[3] == "查询"
            || (textArr[3] + textArr[4] == "查询")
            || (textArr[2] + textArr[3] == "搜索")
            || (textArr[3] + textArr[4] == "搜索")) {
            //查询功能
            id("bubble_sign_close").findOne().click();

            var obj;
            textArr.some(function (value, index) {
                if (value == "查" || value == "搜") {
                    obj = textArr[index - 2] + textArr[index - 1]; //使用什么软件查询
                    for (var i = index + 2; i < textArr.length; i++) {
                        key += textArr[i];
                    };
                    return true;
                }
            })

            search(key, obj);
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
        } else if (textArr[textArr.length - 2] + textArr[textArr.length - 1] == "付款") {
            //付款
            id("bubble_sign_close").findOne().click();

            var obj = -1;
            if (textArr[textArr.length - 4] + textArr[textArr.length - 3] == "微信") {
                obj = 0;
            } else if (textArr[textArr.length - 5] + textArr[textArr.length - 4] + textArr[textArr.length - 3] == "支付宝") {
                obj = 1;
            }

            pay(obj);
        } else if (textArr[0] + textArr[1] + textArr[2] == "倒计时") {
            //倒计时功能
            id("bubble_sign_close").findOne().click();

            if (textArr[textArr.length - 1] != "钟") {
                toast("注意！只能以分钟为单位。");
            } else {
                var time = text.match(/\时(\S*)\分/)[1];

                timer(time);
            }
        } else if (textArr[textArr.length - 3] + textArr[textArr.length - 2] + textArr[textArr.length - 1] == "扫一扫"
            || textArr[textArr.length - 2] + textArr[textArr.length - 1] == "扫码") {
            //扫一扫功能
            id("bubble_sign_close").findOne().click();

            var obj = -1;
            if (textArr[textArr.length - 5] + textArr[textArr.length - 4] == "微信"
                || textArr[textArr.length - 4] + textArr[textArr.length - 3] == "微信") {
                obj = 0;
            } else if (textArr[textArr.length - 6] + textArr[textArr.length - 5] + textArr[textArr.length - 4] == "支付宝"
                || textArr[textArr.length - 5] + textArr[textArr.length - 4] + textArr[textArr.length - 3] == "支付宝") {
                obj = 1;
            }
            scanner(obj);
        } else if (textArr[textArr.length - 2] + textArr[textArr.length - 1] == "乘车"
            || textArr[textArr.length - 3] + textArr[textArr.length - 2] + textArr[textArr.length - 1] == "乘车码") {
            //乘车码功能
            id("bubble_sign_close").findOne().click();

            var obj = -1;
            if (textArr[textArr.length - 4] + textArr[textArr.length - 3] == "微信"
                || textArr[textArr.length - 5] + textArr[textArr.length - 4] == "微信") {
                obj = 0;
            } else if (textArr[textArr.length - 5] + textArr[textArr.length - 4] + textArr[textArr.length - 3] == "支付宝"
                || textArr[textArr.length - 6] + textArr[textArr.length - 5] + textArr[textArr.length - 4] == "支付宝") {
                obj = 1;
            }

            busCode(obj);
        } else if (textArr[0] + textArr[1] == "启动"
            || textArr[0] + textArr[1] == "打开"
            || textArr[0] + textArr[1] == "运行") {
            //打开程序功能
            id("bubble_sign_close").findOne().click();

            var obj = text.slice(2);

            openApp(obj);
        } else {
            //打电话功能
            call();
        };

        text = "";
        textArr = text.split("");
        key = "";
        obj = "";
    }
    sleep(200);
}

//提醒功能
function remind(content) {
    try {
        app.startActivity({
            action: "android.intent.action.SEND",
            type: "text/*",
            extras: {
                "android.intent.extra.TEXT": content
            },
            packageName: "com.android.calendar",
            className: "com.android.calendar.event.EditEventActivity"
        });

        if (isExistsByClass("android.widget.Button", "完成")) {
            clickCenterByClass("android.widget.Button", "完成")
            toast("创建成功！");
        };

    } catch (Exception) {
        toast("创建失败！");
    }
}

//导航功能
function map(content) {
    try {
        app.startActivity({
            action: "android.intent.action.SEND",
            type: "text/plain",
            extras: {
                "android.intent.extra.TEXT": content
            },
            packageName: "com.autonavi.minimap",
            className: "com.autonavi.map.activity.NewMapActivity"
        });

        toast("正在使用高德地图查询地点，请稍候……");

    } catch (Exception) {
        toast("错误！\n未安装高德地图或不支持此版本\n请安装或更新软件")
    }
}

//查询功能
function search(content, obj) {
    switch (obj) {
        case "淘宝":
            try {
                app.startActivity({
                    action: "android.intent.action.SEND",
                    type: "text/plain",
                    extras: {
                        "android.intent.extra.TEXT": content
                    },
                    packageName: "com.taobao.taobao",
                    className: "com.taobao.search.sf.MainSearchResultActivity"
                });
                toast("正在使用" + obj + "查询，请稍候……");
                toast("查询结束后\n请连续点击“返回键”退出搜索页面");
            } catch (Exception) {
                toast("错误！\n未安装淘宝或不支持此版本\n请安装或更新软件");
            };
            break;
        case "京东":
            try {
                app.startActivity({
                    action: "android.intent.action.SEND",
                    type: "text/plain",
                    extras: {
                        "android.intent.extra.TEXT": content
                    },
                    packageName: "com.jingdong.app.mall",
                    className: "com.jd.lib.search.view.Activity.ProductListActivity"
                });
                toast("正在使用" + obj + "查询，请稍候……");
                toast("查询结束后\n请连续点击“返回键”退出搜索页面");
            } catch (Exception) {
                toast("错误！\n未安装京东或不支持此版本\n请安装或更新软件");
            };
            break;
        default: toast("暂不支持");
    }
}

//番茄计时功能
function tomatoTime(key) {
    try {
        app.startActivity({
            packageName: "com.plan.kot32.tomatotime",
            className: "com.plan.kot32.tomatotime.activity.MainActivity"
        });
        toastNew(0);

        for (var i = 0; i < 6; i++) {
            if (i == 5) {
                toast("启动失败，没有这个待办事项");
            }

            if (className("android.widget.TextView").text(key).exists()) {
                var bounds = className("android.widget.TextView").text(key).findOne().bounds();
                setScreenMetrics(device.width, device.height);
                click(device.width - 100, bounds.bottom);

                return;
            }
            sleep(600);
        }
    } catch (Exception) {
        toast("错误！\n未安装番茄Todo或不支持此版本\n请安装或更新软件");
    }
}

//付款
function pay(obj) {
    switch (obj) {
        case 0: //微信  
            try {
                //直接唤醒付款页面，双开微信可用
                app.startActivity({
                    packageName: "com.tencent.mm",
                    className: "com.tencent.mm.plugin.offline.ui.WalletOfflineCoinPurseUI"
                });
                toastNew(1);

                clickMainWeChat();

            } catch (Exception) {
                //连续点击到付款页面
                if (launch("com.tencent.mm")) {
                    toastNew(1);

                    clickMainWeChat();

                    id("d3t").className("android.widget.TextView").text("我").findOne().parent().parent().click();
                    if (clickTimerByText("收付款")) {
                        clickTimerByText("收付款");
                    };

                } else {
                    toast("错误！\n未安装微信或不支持此版本\n请安装或更新软件");
                }
            }

            break;
        case 1: //支付宝
            try {
                app.startActivity({
                    packageName: "com.eg.android.AlipayGphone",
                    className: "com.eg.android.AlipayGphone.AlipayLogin"
                });
                toastNew(1);

                if (isExistsByClass("android.widget.TextView", "首页")) {
                    click("首页");
                    click("付钱");
                }

            } catch (Exception) {
                toast("错误！\n未安装支付宝或不支持此版本\n请安装或更新软件");
            };
            break;
        default: toast("暂不支持");
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

    if (!isNaN(m) && m > 0 && m < 61) {
        launch("com.smartisanos.clock");

        if (isExistsByClass("android.widget.RadioButton", "计时器")) {
            toastNew(0);
            sleep(1000);
            click("计时器");

            var bounds = id("high_light").findOne().bounds();
            var rate = bounds.centerY() / 329; //缩放比

            try {
                if (rate != 1) {
                    throw Exception;
                }
                var endY = bounds.centerY() + 20 * rate * m;
                setScreenMetrics(device.width, device.height);
                swipe(bounds.centerX(), bounds.centerY(), bounds.centerX(), endY, 10);
                click(100, 1500);
            } catch (Exception) {
                toast("暂不支持此设备，请联系开发者");
            }
        }
    } else {
        toast("时间有误！\n倒计时范围：1 ~ 60 分钟");
    }
}

//扫一扫
function scanner(obj) {
    switch (obj) {
        case 0: //微信
            try {
                //直接唤醒扫一扫界面，双开微信可用
                app.startActivity({
                    packageName: "com.tencent.mm",
                    className: "com.tencent.mm.plugin.scanner.ui.BaseScanUI"
                });

                toastNew(1);
                clickMainWeChat();

            } catch (Exception) {
                //连续点击到扫一扫界面
                if (launch("com.tencent.mm")) {
                    toastNew(1);
                    clickMainWeChat();

                    id("d3t").className("android.widget.TextView").text("发现").findOne().parent().parent().click();
                    clickTimerByText("扫一扫");

                } else {
                    toast("错误！\n未安装微信或不支持此版本\n请安装或更新软件");
                }
            };
            break;
        case 1: //支付宝
            try {
                app.startActivity({
                    packageName: "com.eg.android.AlipayGphone",
                    className: "com.eg.android.AlipayGphone.AlipayLogin"
                });

                toastNew(1);

                if (isExistsByClass("android.widget.TextView", "首页")) {
                    click("首页");
                    click("扫一扫");
                }

            } catch (Exception) {
                toast("错误！\n未安装支付宝或不支持此版本\n请安装或更新软件");
            };
            break;
        default: toast("暂不支持");
    }
}

//乘车码
function busCode(obj) {
    switch (obj) {
        case 0: //微信
            toast("该功能不稳定，请保证微信乘车码已添加至‘一步’中，且置顶在最上面。");
            toastNew(1);
            swipe(1060, 10, 820, 360, 200);
            sleep(300);
            swipe(1000, 400, 1000, 4000, 200);
            sleep(1500);
            click(1020, 342);
            click(1060, 10);
            break;
        case 1: //支付宝
            try {
                app.startActivity({
                    packageName: "com.eg.android.AlipayGphone",
                    className: "com.eg.android.AlipayGphone.AlipayLogin"
                });

                toastNew(1);

                if (isExistsByClass("android.widget.TextView", "首页")) {
                    click("首页");
                    click("付钱");
                    click("乘车码");
                }

            } catch (Exception) {
                toast("错误！\n未安装支付宝或不支持此版本\n请安装或更新软件");
            };
            break;
        default: toast("暂不支持");
    }
}

//打电话
function call() {
    var count = 0;
    if (hasWidgetTextById("title", "联系人")) {
        id("item_layout").untilFind().forEach(child => {
            count++;
        });

        if (count == 1) {
            id("item_layout").findOne().click();
        }
    }
}

//打开应用
function openApp(appName) {
    switch (appName) {
        case "微信":
        case "主微信":
        case "第一个微信":
            toastLaunchApp("微信");
            if (doubleWechat == 0) {
                clickMainWeChat();
            }
            break;
        case "副微信":
        case "第二个微信":
            toastLaunchApp("微信");
            if (doubleWechat == 0) {
                clickViceWeChat();
            }
            break;
        case "淘宝":
        case "手机淘宝":
            toastLaunchApp("手机淘宝");
            break;
        case "浏览器":
            openUrl("http://");
            break;
        case "微博":
        case "新浪微博":
            if (app.getAppName("com.sina.weibo") != null) {
                toastLaunchApp("微博");
            } else if (app.getAppName("com.hengye.share") != null) {
                toastLaunchApp("Share");
            } else if (app.getAppName("com.weico.international") != null) {
                toastLaunchApp("微博国际版");
            } else if (app.getAppName("com.sina.weibolite") != null) {
                toastLaunchApp("微博极速版");
            } else if (app.getAppName("com.sina.weibog3") != null) {
                toastLaunchApp("新浪微博4G版");
            };
            break;
        case "QQ":
        case "qq":
            if (app.getAppName("com.tencent.mobileqq") != null) {
                toastLaunchApp("QQ");
            } else if (app.getAppName("com.tencent.tim") != null) {
                toastLaunchApp("TIM");
            } else if (app.getAppName("com.tencent.mobileqqi") != null) {
                toastLaunchApp("QQ国际版");
            }
            break;
        case "哔哩哔哩":
        case "哔哩哔哩哔哩":
        case "b站":
            toastLaunchApp("哔哩哔哩");            
            break;
        default:
            if (!toastLaunchApp(obj)) {
                toast("未发现应用");
            };
    }
}

//点击一个Class控件 text参数,点击到或者等待5s后退出
function clickTimerByText(text) {

    for (var i = 0; i < 5000 / speed; i++) {

        if (i == 5000 / speed - 1) {
            toast("失败！");
            return false;
        }

        if (click(text)) {
            return true;
        }
        sleep(speed);
    }
}

//点击一个Class控件 text参数 
//i {number} 如果相同的文本在屏幕中出现多次，则i表示要点击第几个文本, i从0开始计算,点击到或者等待5s后退出
function clickTimerByText(text, i) {

    for (var i = 0; i < 5000 / speed; i++) {

        if (i == 5000 / speed - 1) {
            toast("失败！");
            return false;
        }

        if (click(text), i) {
            return true;
        }
        sleep(speed);
    }
}

//点击一个Class控件中心 text参数
function clickCenterByClass(obj, text) {
    setScreenMetrics(device.width, device.height);
    var widget = className(obj).text(text).findOne();
    click(widget.bounds().centerX(), widget.bounds().centerY());

}

//点击一个id控件中心
function clickCenterById(obj) {
    setScreenMetrics(device.width, device.height);
    var widget = id(obj).findOne();
    click(widget.bounds().centerX(), widget.bounds().centerY());

}

//判断id控件是否存在
function isExistsById(obj) {
    for (var i = 0; i < 5000 / speed; i++) {

        if (i == 5000 / speed - 1) {
            return false;
        }

        if (id(obj).exists()) {
            return true;
        }
        sleep(speed);
    }
}

//判断class控件是否存在
function isExistsByClass(obj, var1) {
    for (var i = 0; i < 5000 / speed; i++) {

        if (i == 5000 / speed - 1) {
            return false;
        }

        if (className(obj).text(var1).exists()) {
            return true;
        }
        sleep(speed);
    }
}

//判断含有text的id控件是否存在
function hasWidgetTextById(obj, text) {
    for (var i = 0; i < 5000 / speed; i++) {

        if (i == 5000 / speed - 1) {
            return false;
        }

        if (id(obj).findOne().text() == text) {
            return true;
        }
        sleep(speed);
    }
}

//提醒函数
function toastNew(var1) {
    switch (var1) {
        case 0:
            toast("正在启动，请稍候……");
            break;
        case 1:
            toast("正在启动，请不要点击屏幕");
            break;
    }
}

//点击主微信
function clickMainWeChat() {
    if (doubleWechat == 0) {
        if (isExistsById("original_app_icon")) {
            clickCenterById("original_app_icon");
        };
    };
}

//点击副微信
function clickViceWeChat() {
    if (doubleWechat == 0) {
        if (isExistsById("doppelganger_app_icon")) {
            clickCenterById("doppelganger_app_icon");
        };
    };
}

//使用默认浏览器打开网页
function openUrl(url) {
    var intent = new Intent();
    intent.setAction("android.intent.action.VIEW");
    var content_url = Uri.parse(url);
    intent.setData(content_url);
    app.startActivity(intent);
}

//带提醒的打开App，启动速度会快
function toastLaunchApp(appName) {
    if (launchApp(appName)) {
        toastNew(0);
        return true;
    } else {
        toast("未找到应用");
        return false;
    }
}