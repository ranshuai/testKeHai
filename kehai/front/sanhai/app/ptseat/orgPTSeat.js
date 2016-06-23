/**
 * Created by slg on 2016/4/25.
 */
require.config({

    baseUrl: '/front/sanhai/',
    paths: {
        "jquery": "lib/jquery-1.8.3.min",
        "jquery_ui_min": "lib/jquery-ui.min",
        "base": "module/base",
        "money": "module/money",
        "dialogs": "module/dialogs",
        "pageBar": "module/sanhai-base-pagebar-standard-1.0.0",
        "orgPTSeatDo": "app/ptseat/orgPTSeatDo"
    },
    shim: {}
});

require(["orgPTSeatDo"], function (orgPTSeatDo) {
    orgPTSeatDo.seat();
    orgPTSeatDo.loadFreePTSeat();
    orgPTSeatDo.loadPTSeatBuyLog(1);
});