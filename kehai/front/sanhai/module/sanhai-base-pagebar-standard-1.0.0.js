/**
 * Created by bbb on 2015/12/9.
 */
define(['jquery'],function($){

    /**
     *
     * @param totalPages
     * @param currentPage
     * @param callback      回调函数，请求数据的方法
     * @param params        回调函数入参集合，请求数据方法的入参集合
     * @注意
     * @1. 点击分页条的任意页，在分页条事件中传递页码，不在回调函数中获得
     */
    var setBasePageBar=function (totalPages, currentPage, callback, params) {
        // 默认分页条渲染元素
        var container = $("div[class='page ']");
        var count = totalPages;
        var pageIndex = currentPage;
        var a = [];
        // 清空分页条
        container.empty();

        // 设置当前选择页
        function setPageList() {
            if (pageIndex == i) {
                a[a.length] = "<a href='#top1' class='current'>" + i + "</a>";
            } else {
                a[a.length] = "<a href='#top1'>" + i + "</a>";
            }
        }

        //总页数少于10 全部显示,大于10 显示前3 后3 中间3 其余....
        if (count == 0) return;
        if (pageIndex == 1) {
            a[a.length] = "<a href='#top1' class='unclick'>上一页</a>";
        } else {
            a[a.length] = "<a href='#top1'>上一页</a>";
        }

        if (count <= 10) {  // 总页数小于10页
            for (var i = 1; i <= count; i++) {
                setPageList();
            }
        } else {            // 总页数大于10页
            if (pageIndex <= 4) {
                for (var i = 1; i <= 5; i++) {
                    setPageList();
                }
                a[a.length] = "...&nbsp;&nbsp;<a href='#top1'>" + count + "</a>";
            } else if (pageIndex >= count - 3) {
                a[a.length] = "<a href='#top1'>1</a>...&nbsp;&nbsp;";
                for (var i = count - 4; i <= count; i++) {
                    setPageList();
                }
            }
            else {          //当前页在中间部分
                a[a.length] = "<a href='#top1'>1</a>...&nbsp;&nbsp;";
                for (var i = pageIndex - 2; i <= Number(pageIndex) + 2; i++) {
                    setPageList();
                }
                a[a.length] = "...&nbsp;&nbsp;<a href='#top1'>" + count + "</a>";
            }
        }

        if (pageIndex == count) {
            a[a.length] = "<a href='#top1' class='unclick'>下一页</a>";
        } else {
            a[a.length] = "<a href='#top1'>下一页</a>";
        }

        // 渲染分页条
        container.append(a.join(""));

        var pageInput = "<span>到第&nbsp;<input type='text' id='pageNum' value='" + currentPage + "' class='jumpInp'/>&nbsp;页" +
            "<button id='toPage' class='btn30 w60'>确定</button></span>";

        // 渲染跳转指定页
        container.append(pageInput);

        // 绑定事件（确定按钮）
        $("#toPage").on("click", function () {
            if(isNaN($("#pageNum").val())){
                return;
            }
            if(parseInt($("#pageNum").val())>totalPages){
                return;
            }
            if($("#pageNum").val()==''){
                return;
            }
            if($("#pageNum").val()<=0){
                return;
            }

            var page = parseInt($("#pageNum").val());
            if (page <= 0 || page > totalPages) {
                return false;
            }
            params.push($("#pageNum").val());
            callback.apply(this, params);
        });

        //事件点击（这里重新请求分页数据方法）
        var pageClick = function () {
            var oAlink = container.find("a");
            //console.log(container);
            //console.log(oAlink);
            var inx = pageIndex; //初始的页码
            oAlink[0].onclick = function () {                   //点击上一页
                if (inx == 1) {
                    return false;
                }
                inx--;
                params.push(inx);                               // 入参集合中最后一个元素是跳转的页数
                callback.apply(this, params);
                return false;
            }
            for (var i = 1; i < oAlink.length - 1; i++) {       // 点击页码
                oAlink[i].onclick = function () {

                    inx = parseInt(this.innerHTML);
                    params.push(inx);                           // 入参集合中最后一个元素是跳转的页数
                    callback.apply(this, params);
                    return false;
                }
            }
            oAlink[oAlink.length - 1].onclick = function () {   //点击下一页
                if (inx == count) {
                    return false;
                }
                inx++;
                params.push(inx);                               // 入参集合中最后一个元素是跳转的页数
                callback.apply(this, params);
                return false;
            }
        }()

    }


    /**
     * 显示分页工具栏 2
     * @param currPage      当前页
     * @param totalPages    总页数
     * @param callback      回调函数
     */
    var showPageBar= function (currPage, totalPages, callback) {
        var maxShowPage = 7;
        var pageBarHtml = "";
        if (currPage > 1) {
            pageBarHtml += '<a href="#top" class="jumpBtn prev" page_number="' + (currPage - 1 ) + '">上一页</a>';
        }
        if (currPage <= 3) {
            var i = 1
            for (; (i < maxShowPage && i < Number(totalPages) + 1); i++) {
                if (i == Number(currPage)) {
                    pageBarHtml += '<a href="#top"  class="current" page_number=' + i + ' >' + i + '</a>';
                } else {
                    pageBarHtml += '<a href="#top" page_number= ' + i + ' >' + i + '</a>';
                }
            }
            if (i < totalPages) {
                pageBarHtml += '<span>……</span>';
                /*pageBarHtml += '<a href="#top" page_number= ' + totalPages + ' >' + totalPages + '</a>';*/
            }
        } else {
            /*var i = currPage - 3*/
            if (currPage > 5) {
                pageBarHtml += '<a href="#top"   page_number=1 >1</a>';
                pageBarHtml += '<span>……</span>';
            } else {
                if (currPage == 5) {
                    pageBarHtml += '<a href="#top"   page_number=1 >1</a>';
                }

            }
            for (var i = Number(currPage) - 3; (i < Number(currPage) + 4 && i < Number(totalPages) + 1); i++) {
                if (i == Number(currPage)) {
                    pageBarHtml += '<a href="#top"  class="current" page_number=' + i + ' >' + i + '</a>';
                } else {
                    pageBarHtml += '<a href="#top" page_number= ' + i + ' >' + i + '</a>';
                }
            }
            /*for (; (i < (currPage + (maxShowPage -3)) && i < Number(totalPages) + 1); i++) {
             if (i == Number(currPage)) {
             pageBarHtml += '<a href="#top"  class="current" page_number=' + i + ' >' + i + '</a>';
             } else {
             pageBarHtml += '<a href="#top" page_number= ' + i + ' >' + i + '</a>';
             }
             }*/
            if (i < totalPages) {
                pageBarHtml += '<span>……</span>';
                /*pageBarHtml += '<a href="#top" page_number= ' + totalPages + ' >' + totalPages + '</a>';*/
            }
        }

        if (Number(currPage) < Number(totalPages)) {
            pageBarHtml += '<a href="#top" class="jumpBtn next" page_number=' + (Number(currPage) + 1 ) + '>下一页</a>';
        }
        if (totalPages > 1) {
            pageBarHtml += "到第&nbsp;<input type='text' id='pageNum1' value='" + currPage + "' class='jumpInp'/>&nbsp;页" +
                "<button id='toPage' class='btn30 w60'>确定</button></span><span id='message'></span>";
        }


        $("#pageBar").html(pageBarHtml);
        // 绑定事件（确定按钮）
        $("#toPage").on("click", function () {
            if(isNaN($("#pageNum1").val())){
                return;
            }
            if(parseInt($("#pageNum1").val())>totalPages){
                return;
            }
            if($("#pageNum1").val()==''){
                return;
            }
            if($("#pageNum1").val()<=0){
                return;
            }
            callback($("#pageNum1").val());
        });
        $('#pageBar a').die('click');//移除所有的事件
        $('#pageBar a').live('click', function () {
            callback($(this).attr('page_number'));
        });
    }

    /**
     * 匹配教师分页条
     * @param totalPages
     * @param currentPage
     * @param callback
     * @param params
     */
    var setMatchTeacherPageBar=function (totalPages, currentPage, callback, params) {
        // 默认分页条渲染元素
        //var container = $("div[class='page ']");
        var container = $("#page");
        var count = totalPages;
        var pageIndex = currentPage;
        var a = [];

        // 清空分页条
        container.empty();

        // 设置当前选择页
        function setPageList() {
            if (pageIndex == i) {
                a[a.length] = "<a class='current'>" + i + "</a>";
            } else {
                a[a.length] = "<a>" + i + "</a>";
            }
        }

        //总页数少于10 全部显示,大于10 显示前3 后3 中间3 其余....
        if (count == 0) return;
        if (pageIndex == 1) {
            a[a.length] = "<a class='unclick'>上一页</a>";
        } else {
            a[a.length] = "<a>上一页</a>";
        }

        if (count <= 10) {  // 总页数小于10页
            for (var i = 1; i <= count; i++) {
                setPageList();
            }
        } else {            // 总页数大于10页
            if (pageIndex <= 4) {
                for (var i = 1; i <= 5; i++) {
                    setPageList();
                }
                a[a.length] = "...&nbsp;&nbsp;<a>" + count + "</a>";
            } else if (pageIndex >= count - 3) {
                a[a.length] = "<a>1</a>...&nbsp;&nbsp;";
                for (var i = count - 4; i <= count; i++) {
                    setPageList();
                }
            }
            else {          //当前页在中间部分
                a[a.length] = "<a>1</a>...&nbsp;&nbsp;";
                for (var i = pageIndex - 2; i <= Number(pageIndex) + 2; i++) {
                    setPageList();
                }
                a[a.length] = "...&nbsp;&nbsp;<a>" + count + "</a>";
            }
        }

        if (pageIndex == count) {
            a[a.length] = "<a class='unclick'>下一页</a>";
        } else {
            a[a.length] = "<a>下一页</a>";
        }

        // 渲染分页条
        container.append(a.join(""));

        //事件点击（这里重新请求分页数据方法）
        var pageClick = function () {
            var oAlink = container.find("a");
            //console.log(container);
            //console.log(oAlink);
            var inx = pageIndex; //初始的页码
            oAlink[0].onclick = function () {                   //点击上一页
                if (inx == 1) {
                    return false;
                }
                inx--;
                params.push(inx);                               // 入参集合中最后一个元素是跳转的页数
                callback.apply(this, params);
                return false;
            }
            for (var i = 1; i < oAlink.length - 1; i++) {       // 点击页码
                oAlink[i].onclick = function () {

                    inx = parseInt(this.innerHTML);
                    params.push(inx);                           // 入参集合中最后一个元素是跳转的页数
                    callback.apply(this, params);
                    return false;
                }
            }
            oAlink[oAlink.length - 1].onclick = function () {   //点击下一页
                if (inx == count) {
                    return false;
                }
                inx++;
                params.push(inx);                               // 入参集合中最后一个元素是跳转的页数
                callback.apply(this, params);
                return false;
            }
        }()

    }
    return {
        setBasePageBar : setBasePageBar,
        showPageBar:showPageBar,
        setMatchTeacherPageBar:setMatchTeacherPageBar
    }

});