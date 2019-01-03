"auto";

toast("启动成功!\n请使用“闪念胶囊”唤醒语音识别");

while (true) {
    if (!id("bubble_container").findOne()) {

    } else {
        sleep(100);
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
            continue;
        } else if (textArr[0] + textArr[3] + textArr[4] == "在查询") {
            //查询功能
            id("bubble_sign_close").findOne().click();

            var obj = textArr[1] + textArr[2]; //使用什么软件查询
            for (var i = 5; i < textArr.length; i++) {
                key += textArr[i];
            };

            search(key, obj);
            continue;
        } else if (textArr[0] + textArr[1] + textArr[2] == "打电话") {
            // id("bubble_sign_close").findOne().click();

            // for (var i = 4; i < textArr.length; i++) {
            //     key += textArr[i];
            // };

            // call(key);
        }

        text = "";
        textArr = text.split("");
        key = "";
        obj = "";
    }
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