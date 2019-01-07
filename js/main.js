try {
    var StoragesMode = storages.create("top.warmj.sarascript:mode");

    StoragesMode.put("MainMode", true);
    StoragesMode.put("RemindMode", true);
    StoragesMode.put("MapMode", true);
    StoragesMode.put("SearchMode", true);
    StoragesMode.put("TomatoTimeMode", true);
    StoragesMode.put("PayMode", true);
    StoragesMode.put("TimerMode", true);
    StoragesMode.put("ScannerMode", true);
    StoragesMode.put("BusCodeMode", true);
    StoragesMode.put("OpenAppMode", true);
    StoragesMode.put("CollectMode", true);
    StoragesMode.put("CallMode", true);
    StoragesMode.put("AutoMode", false);
    StoragesMode.put("DoubleWechatMode", false);

    if (!StoragesMode.get("AutoMode")) {
        for (var i = 0; i < 10; i++) {
            try {
                auto();
                console.log("1");
                StoragesMode.put("AutoMode", true);
                break;
            } catch (Exception) {
                if (i == 1) {
                    toast("辅助功能未启动\n请向上滑动找到 SaraScript\n启动该服务");
                }
            }
            sleep(1000);
            if (i == 9) {
                engines.stopAll();
                StoragesMode.put("AutoMode", false);
            }
        }
    }

    toast("启动成功!\n请使用“闪念胶囊”唤醒语音识别");
    toast("按“音量上键”会关闭软件\n可前往软件设置中取消该功能");
    setScreenMetrics(1080, 1920);
    var speed = 10; //点击速度

    if (dialogs.select("有无双开微信？", "有", "没有双开微信") == 0) {
        StoragesMode.put("DoubleWechatMode", true);
    } else {
        StoragesMode.put("DoubleWechatMode", false);
    }

    importClass(android.net.Uri);

    while (StoragesMode.get("MainMode")) {
        if (!id("iv_bubble_play").exists()) {

        } else {
            var text = id("tv_title_small").findOne().text().replace(/。/, "").replace(/\s/g, "");//命令，去中文句号，去空格
            var textArr = text.split(""); //命令数组
            var key = ""; //功能关键字

            remind(); //提醒功能
            map(); //导航功能
            search(); //查询功能
            tomatoTime(); //番茄计时功能
            pay(); //支付功能
            timer(); //倒计时功能
            scanner(); //扫码功能
            busCode(); //乘车码功能
            openApp(); //打开 APP 功能
            collect(); //收款功能
            call(); //打电话功能
        }
        sleep(200);
    }
} catch (Exception) {
    toast("语音助手已关闭");
}

//提醒功能
function remind() {
    if (StoragesMode.get("RemindMode")) {
        if (textArr[0] + textArr[1] + textArr[2] == "提醒我") {
            delBubble();

            for (var i = 3; i < textArr.length; i++) {
                key += textArr[i];
            };

            try {
                app.startActivity({
                    action: "android.intent.action.SEND",
                    type: "text/*",
                    extras: {
                        "android.intent.extra.TEXT": key
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
    }
}

//导航功能
function map() {
    if (StoragesMode.get("MapMode")) {
        if (textArr[0] + textArr[1] == "导航") {
            delBubble();

            for (var i = 3; i < textArr.length; i++) {
                key += textArr[i];
            };

            try {
                app.startActivity({
                    action: "android.intent.action.SEND",
                    type: "text/plain",
                    extras: {
                        "android.intent.extra.TEXT": key
                    },
                    packageName: "com.autonavi.minimap",
                    className: "com.autonavi.map.activity.NewMapActivity"
                });

                toast("正在使用高德地图查询地点，请稍候……");

            } catch (Exception) {
                toast("错误！\n未安装高德地图或不支持此版本\n请安装或更新软件")
            }
        }
    }
}

//查询功能
function search() {
    if (StoragesMode.get("SearchMode")) {
        if (textArr[2] + textArr[3] == "查询"
            || (textArr[3] + textArr[4] == "查询")
            || (textArr[2] + textArr[3] == "搜索")
            || (textArr[3] + textArr[4] == "搜索")) {
            delBubble();

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

            switch (obj) {
                case "淘宝":
                    try {
                        app.startActivity({
                            action: "android.intent.action.SEND",
                            type: "text/plain",
                            extras: {
                                "android.intent.extra.TEXT": key
                            },
                            packageName: "com.taobao.taobao",
                            className: "com.taobao.search.sf.MainSearchResultActivity"
                        });
                        toast("正在使用" + obj + "查询，请稍候……");
                        toast("查询结束后\n请连续点击“返回键”退出搜索页面");
                    } catch (Exception) {
                        toast("错误！\n未安装淘宝或不支持此版本\n请安装或更新软件");
                    }
                    break;
                case "京东":
                    try {
                        app.startActivity({
                            action: "android.intent.action.SEND",
                            type: "text/plain",
                            extras: {
                                "android.intent.extra.TEXT": key
                            },
                            packageName: "com.jingdong.app.mall",
                            className: "com.jd.lib.search.view.Activity.ProductListActivity"
                        });
                        toast("正在使用" + obj + "查询，请稍候……");
                        toast("查询结束后\n请连续点击“返回键”退出搜索页面");
                    } catch (Exception) {
                        toast("错误！\n未安装京东或不支持此版本\n请安装或更新软件");
                    }
                    break;
                default: toast("暂不支持");
            }
        }
    }
}

//番茄计时功能
function tomatoTime() {
    if (StoragesMode.get("TomatoTimeMode")) {
        if (textArr[0] + textArr[1] == "开始") {
            //开始番茄计时
            if (getAppName("com.plan.kot32.tomatotime")) {
                delBubble();

                for (var i = 2; i < textArr.length; i++) {
                    key += textArr[i];
                }

                app.startActivity({
                    packageName: "com.plan.kot32.tomatotime",
                    className: "com.plan.kot32.tomatotime.activity.MainActivity"
                })

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
            } else {
                toast("错误！\n未安装番茄Todo或不支持此版本\n请安装或更新软件");
            }
        }
    }
}
//付款
function pay() {
    if (StoragesMode.get("PayMode")) {
        if (textArr[textArr.length - 2] + textArr[textArr.length - 1] == "付款") {
            delBubble();

            var obj = -1;
            if (textArr[textArr.length - 4] + textArr[textArr.length - 3] == "微信") {
                obj = 0;
            } else if (textArr[textArr.length - 5] + textArr[textArr.length - 4] + textArr[textArr.length - 3] == "支付宝") {
                obj = 1;
            }

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

                            id("d3t").className("android.widget.TextView").text("发现").findOne().parent().parent().click();
                            click(996, 150);
                            sleep(200);
                            click("收付款");

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
    }
}

//倒计时功能
function timer() {
    if (StoragesMode.get("TimerMode")) {
        if (textArr[0] + textArr[1] + textArr[2] == "倒计时") {
            //倒计时功能
            delBubble();

            if (textArr[textArr.length - 1] != "钟") {
                toast("注意！只能以分钟为单位。");
            } else {
                var m = text.match(/\时(\S*)\分/)[1];
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
                    case "六十":
                        m = 60;
                        break;
                }

                if (!isNaN(m) && m > 0 && m < 61) {
                    launch("com.smartisanos.clock");
                    if (isExistsByClass("android.widget.RadioButton", "计时器")) {
                        setScreenMetrics(device.width, device.height);

                        toastNew(0);
                        sleep(1000);

                        click("计时器");
                        var bounds = id("high_light").findOne().bounds();
                        var endY = bounds.centerY() + 20 * m;
                        swipe(bounds.centerX(), bounds.centerY(), bounds.centerX(), endY, 10);
                        click(100, 1500);
                    }
                } else {
                    toast("时间有误！\n倒计时范围：1 ~ 60 分钟");
                }
            }
        }
    }
}

//扫一扫
function scanner() {
    if (StoragesMode.get("ScannerMode")) {
        if (textArr[textArr.length - 3] + textArr[textArr.length - 2] + textArr[textArr.length - 1] == "扫一扫"
            || textArr[textArr.length - 2] + textArr[textArr.length - 1] == "扫码") {
            delBubble();

            var obj = -1;
            if (textArr[textArr.length - 5] + textArr[textArr.length - 4] == "微信"
                || textArr[textArr.length - 4] + textArr[textArr.length - 3] == "微信") {
                obj = 0;
            } else if (textArr[textArr.length - 6] + textArr[textArr.length - 5] + textArr[textArr.length - 4] == "支付宝"
                || textArr[textArr.length - 5] + textArr[textArr.length - 4] + textArr[textArr.length - 3] == "支付宝") {
                obj = 1;
            }

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
    }
}

//乘车码
function busCode() {
    if (StoragesMode.get("BusCodeMode")) {
        if (textArr[textArr.length - 2] + textArr[textArr.length - 1] == "乘车"
            || textArr[textArr.length - 3] + textArr[textArr.length - 2] + textArr[textArr.length - 1] == "乘车码") {
            delBubble();

            var obj = -1;
            if (textArr[textArr.length - 4] + textArr[textArr.length - 3] == "微信"
                || textArr[textArr.length - 5] + textArr[textArr.length - 4] == "微信") {
                obj = 0;
            } else if (textArr[textArr.length - 5] + textArr[textArr.length - 4] + textArr[textArr.length - 3] == "支付宝"
                || textArr[textArr.length - 6] + textArr[textArr.length - 5] + textArr[textArr.length - 4] == "支付宝") {
                obj = 1;
            }

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
                            click(1016, 150);
                            sleep(400);
                            click("乘车码");
                        }

                    } catch (Exception) {
                        toast("错误！\n未安装支付宝或不支持此版本\n请安装或更新软件");
                    };
                    break;
                default: toast("暂不支持");
            }
        }
    }
}

//打开应用
function openApp() {
    if (StoragesMode.get("OpenAppMode")) {
        if (textArr[0] + textArr[1] == "启动"
            || textArr[0] + textArr[1] == "打开"
            || textArr[0] + textArr[1] == "运行") {
            delBubble();

            var AppName = text.slice(2);

            switch (AppName) {
                case "微信":
                case "主微信":
                case "第一个微信":
                    toastLaunchApp("微信");
                    if (StoragesMode.get("DoubleWechatMode")) {
                        clickMainWeChat();
                    }
                    break;
                case "副微信":
                case "第二个微信":
                    toastLaunchApp("微信");
                    if (StoragesMode.get("DoubleWechatMode")) {
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
                    if (!toastLaunchApp(AppName)) {
                        toast("未找到应用");
                    };
            }
        }
    }
}

//收款
function collect() {
    if (StoragesMode.get("CollectMode")) {
        if (textArr[textArr.length - 2] + textArr[textArr.length - 1] == "收钱"
            || textArr[textArr.length - 2] + textArr[textArr.length - 1] == "收款") {
            delBubble();

            var obj = -1;
            if (textArr[textArr.length - 4] + textArr[textArr.length - 3] == "微信") {
                obj = 0;
            } else if (textArr[textArr.length - 5] + textArr[textArr.length - 4] + textArr[textArr.length - 3] == "支付宝") {
                obj = 1;
            }

            switch (obj) {
                case 0: //微信
                    try {
                        app.startActivity({
                            packageName: "com.tencent.mm",
                            className: "com.tencent.mm.plugin.collect.ui.CollectMainUI"
                        })

                        toastNew(1);
                        clickMainWeChat();

                    } catch (Exception) {
                        if (launch("com.tencent.mm")) {
                            toastNew(1);
                            clickMainWeChat();

                            id("d3t").className("android.widget.TextView").text("发现").findOne().parent().parent().click();
                            click(996, 150);
                            sleep(200);
                            click("收付款");
                            sleep(800);
                            click(540, 1540);

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
                            click("收钱");
                        }

                    } catch (Exception) {
                        toast("错误！\n未安装支付宝或不支持此版本\n请安装或更新软件");
                    }
                    break;
                default: toast("暂不支持");
            }
        }
    }
}

//打电话
function call() {
    if (StoragesMode.get("CallMode")) {
        if (id("title").exists()) {
            //打电话功能
            if (id("title").findOne().text() == "联系人") {
                var count = 0;

                id("item_layout").untilFind().forEach(child => {
                    count++;
                });

                if (count == 1) {
                    id("item_layout").findOne().click();
                }
            }
        }
    }
}

//是否开启辅助功能
function isAutoMode() {

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
    if (StoragesMode.get("DoubleWechatMode")) {
        if (isExistsById("original_app_icon")) {
            clickCenterById("original_app_icon");
        };
    };
}

//点击副微信
function clickViceWeChat() {
    if (StoragesMode.get("DoubleWechatMode")) {
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

//打开App，多个应用时启动速度会快
function toastLaunchApp(appName) {
    if (launchApp(appName)) {
        return true;
    } else {
        toast("未找到应用");
        return false;
    }
}

//关闭闪念胶囊
function delBubble() {
    if (id("bubble_sign_close").exists()) {
        id("bubble_sign_close").findOne().click();
    } else {
        id("iv_bubble_del").findOne().click();
        if (id("local_result").exists() || id("web_result").exists()) {
            sleep(400);
            click(527, 117);
        }
    }
}