/**
 * 扩展jquery 方法 初始化滚动条
 */
    $.fn.extend({
        _init_scroll: function () {
            var _this = $(this);
            var _y;//鼠标y方向的相对位置
            var _move = true;//移动标记
            var cont_t = 0;//滚轮用 内容top
            var scroll_t = 0;//滚轮用 滚动条top
            var scroll_bar_show;
            var rate, cont_long, scroll_bar_height, scroll_long;
            function calc_position(){
                rate = _this.find('.wrap').height() / _this.find('.cont').height();//外框与内容比率;
                cont_long = (_this.find('.cont').height() + 70) - _this.find('.wrap').height();//外框月内容长度差;
                scroll_bar_height = _this.find('.wrap').height() * rate;//滚动条高度
                scroll_long = _this.find('.wrap').height() - scroll_bar_height;//滚动条滚动距离;
                if (scroll_bar_height > _this.find('.wrap').height()) scroll_height = 0;
                _this.find('.scroll_bar').height(scroll_bar_height);
            }
            calc_position();

            if (rate > 1) {
                _this.find('.scroll_bar').hide();
            } else {
                _this.find('.cont').css('top', -cont_long);
                _this.find('.scroll_bar').css('top', scroll_long);
            }

            //显示滚动条
            _this.find('.wrap').hover(
                function () {
                    calc_position();
                    //$('.scroll_bar').hide();
                    if (rate > 1) {
                        _this.find('.scroll_bar').hide();
                    } else {
                        _this.find('.scroll_bar').show();
                    }
                },
                function () {
                    _this.find('.scroll_bar').hide();
                }
            );

            //滚轮操作
            _this.find('.wrap').mousewheel(function (event, delta, deltaX, deltaY) {
                //内容滚动
                calc_position();
                cont_t -= delta * 60;
                if (cont_t < 0) cont_t = 0;
                if (cont_t > cont_long)cont_t = cont_long;

                if (rate > 1) {
                    _this.find('.cont').css('top', 0);
                } else {
                    _this.find('.cont').css('top', -cont_t);

                }

                //滚动条滚动
                scroll_t = (cont_t / cont_long) * scroll_long;
                _this.find('.scroll_bar').css('top', scroll_t);
                return false;
            });

            //拖拽
            _this.find('.scroll_bar').mousedown(function (event) {
                calc_position();
                _move = true;
                _y = event.pageY - parseInt($(this).position().top);
                _this.mousemove(function (event) {
                    if (_move) {
                        var y = event.pageY - _y;

                        if (y < 0) y = 0;
                        if (y > scroll_long) y = scroll_long;

                        var scroll_rate = y / scroll_long;//滚动比率;
                        _this.find('.scroll_bar').css('top', y);
                        _this.find('.cont').css('top', -(cont_long * scroll_rate));
                    }
                    return false;

                }).mouseup(function () {
                    _move = false;
                    return true;
                });
            });

        },
        _start_scroll: function () {
            var _this = $(this);
            var rate = _this.find('.wrap').height() / _this.find('.cont').height();//外框与内容比率;
            var cont_long = (_this.find('.cont').height() + 70) - _this.find('.wrap').height();//外框月内容长度差;
            var scroll_bar_height = _this.find('.wrap').height() * rate;//滚动条高度
            var scroll_long = _this.find('.wrap').height() - scroll_bar_height;//滚动条滚动距离;
            _this.find('.cont').css('top', -cont_long);

            _this.find('.scroll_bar').css('top', scroll_long);
        },
        _div_move:function() {
            var _this = $(this);
            var oWin = _this.find(".consult_head")[0];
            var oWinp = _this[0];
            var bDrag = false;
            var disX = disY = 0;
            $(oWin).mousedown(function (event) {
                // 将其他聊天框置后
                $('.consult_person').css({zIndex:1});
                // 本聊天框在最前
                _this.css({zIndex:2}).show();

                bDrag = true;
                disX = event.clientX - oWinp.offsetLeft;
                disY = event.clientY - oWinp.offsetTop;

                $(document).mousemove(function (event) {
                    if (!bDrag)
                        return;
                    var iL = event.clientX - disX;
                    var iT = event.clientY - disY;

                    //把图层范围定在浏览器窗口内
                    var maxL = document.documentElement.clientWidth - oWinp.offsetWidth;
                    var maxT = document.documentElement.clientHeight - oWinp.offsetHeight;
                    //console.log(maxL+'------------'+maxT);
                    iL = iL < 0 ? 0 : iL;
                    iL = iL > maxL ? maxL : iL;
                    iT = iT < 0 ? 0 : iT;
                    iT = iT > maxT ? maxT : iT;

                    oWinp.style.marginTop = oWin.style.marginLeft = 0;
                    oWinp.style.left = iL + "px";
                    oWinp.style.top = iT + "px";
                    return false
                });
                $(document).mouseup(function () {
                    bDrag = false;
                    //$(oWinp).find('textarea').focus();
                });
            });
        }

    });
