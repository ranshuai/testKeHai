/**
 *
 * Created by mahuihuang on 15/11/29.
 */

define("money", function () {
    /**
     * 保留小数位的金额格式化
     * 调用：money.fmoney("12345.675910", 2)，返回12,345.67
     * @param s 原金额
     * @param n 保留的小数位
     * @returns {string}
     */
    var fmoney = function (s, n) {
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
        t = "";
        for (i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return "￥" + t.split("").reverse().join("") + "." + r;
    };
    var moneySimple = function (s, n) {
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
        t = "";
        for (i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r;
    };
    var moneyNoComma = function (s, n) {
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
        t = "";
        for (i = 0; i < l.length; i++) {
            t += l[i];
        }
        return t.split("").reverse().join("") + "." + r;
    };

    // 将￥20.26格式转换为分格式
    var money2money = function (s) {
        var tmp = s.substr(1, s.length); // 截取掉￥符号
        return tmp * 100;               // 转换为分
    }

    return {
        fmoney: fmoney,
        moneySimple: moneySimple,
        moneyNoComma: moneyNoComma,
        money2money: money2money
    }
});