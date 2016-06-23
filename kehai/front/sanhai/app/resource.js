/**
 * Created by cc on 2016/1/13.
 */
define(['angular'], function(angular) {

    'use strict'; // 使用严格模式
    angular.module('resource', []).
        constant("subjects",
            '[{"code": "10010", "name": "语文","checked": false},' +
            '{"code": "10011", "name": "数学","checked": false},' +
            '{"code": "10012", "name": "英语","checked": false},' +
            '{"code": "10013", "name": "生物","checked": false},' +
            '{"code": "10014", "name": "物理","checked": false},' +
            '{"code": "10015", "name": "化学","checked": false},' +
            '{"code": "10016", "name": "地理","checked": false},' +
            '{"code": "10018", "name": "政治","checked": false},' +
            '{"code": "10017", "name": "历史","checked": false}]'
        ).
        constant("grades",
            '[{"code": "1001", "name": "一年级","checked": false},' +
            '{"code": "1002", "name": "二年级","checked": false},' +
            '{"code": "1003", "name": "三年级","checked": false},' +
            '{"code": "1004", "name": "四年级","checked": false},' +
            '{"code": "1005", "name": "五年级","checked": false},' +
            '{"code": "1006", "name": "六年级","checked": false},' +
            '{"code": "1007", "name": "预初","checked": false},' +
            '{"code": "1008", "name": "初一","checked": false},' +
            '{"code": "1009", "name": "初二","checked": false},' +
            '{"code": "1010", "name": "初三","checked": false},' +
            '{"code": "1011", "name": "高一","checked": false},' +
            '{"code": "1012", "name": "高二","checked": false},' +
            '{"code": "1013", "name": "高三","checked": false}]'
        )
});