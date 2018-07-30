(function(win,doc){
    function LSwiper(id){
        this.id = id;
        this.obj = '' ;  //存储父盒子
        this._parent = '' ; //图片盒子的父盒子
        this._circle = '' ; //小圆圈
        this.length = 0; //用于设置圆圈个数
        this._width = 0;
        this._index = -1;
        this._cIndex = 0;
        this._init();
        this._setObj();
        this._addCircle(this._parent);
        this._setClock();
        this._handleClick();
    }

    LSwiper.prototype = {
        // 初始化
        _init : function(){
            this.obj = $(this.id);
            this._parent = this.obj.parent();
            this.length = this.obj.children().length;
        },
        // 获取孩子并设置样式
        _setObj : function(){
            var _first = $(this.obj.children()[0]).clone(true);   //克隆第一个孩子
            var _last = $(this.obj.children()[this.length - 1]).clone(true); // 克隆最后一个孩子
            this._width = this.obj.children()[0].clientWidth;    //获取一个图片的宽度

            this.obj.prepend(_last);   //最后一个孩子插入第一个位置
            this.obj.append(_first) ; //第一个孩子插入最后一个位置

            this.obj.css({
                width : this._width * (this.length + 2) +'px',
                left : -this._width + 'px'
            });
            var _child = this.obj.children();
            var _childLength = _child.length;
            _child.each(function(){
                $(this).css('width',1/_childLength*100+'%');  
            });

            // 先判断父盒子是否有定位，若无为父盒子添加定位
            this._parent.css({
                'overflow' :'hidden'
            });
            // console.log(this._parent.css('position'));
            if(this._parent.css('position') == 'static'){
                this._parent.css({
                'position' :'relative'
            });
            }
        },
        // 添加小圆圈
        _addCircle : function(obj){
            var _html = '';
            _html += '<div class="lswiper-circle-div"><ul class="lswiper-circle-ul">'
            for(var _r = 0 ; _r < this.length ; _r++){
                _html += '<li></li>'
            }
            _html += '</ul></div>'

            obj.append(_html);
        },
        // 设置定时器
        _setClock : function(){
            this._circle = $('.lswiper-circle-ul li');
            var that = this;
            var _timer = setInterval(function(){
                if(that._index == -(that.length+1)){
                    that._index = -1;
                    that.obj.css('left' , that._width * that._index);
                }
                that._index--;
                that.obj.stop().animate({'left': that._width * that._index + 'px'});

                that._cancelChose();
                that._cIndex++;
                if(that._cIndex == that.length){
                    that._cIndex = 0;
                }
                $(that._circle[that._cIndex]).addClass('lswiper-li-chose');

            } ,3000);
        },
        // 小圆圈点击事件函数
        _handleClick : function(){
            var that = this;
            var _li = $('.lswiper-circle-ul li');
            _li.each(function(index){
                $(this).on('click',function(){
                    $(this).addClass('lswiper-li-chose').siblings('li').removeClass('lswiper-li-chose');
                    that.obj.stop().animate({'left': that._width * (-1-index) + 'px'});
                    that._cIndex = index;
                    that._index = -1-index;
                })  
            });
        },
        // 小圆圈取消选中事件
        _cancelChose: function(){
            for(var _f = 0 ; _f < this._circle.length ; _f++){
                $(this._circle[_f]).removeClass('lswiper-li-chose')  ;
            }
        }
    }
    function lSwiper(id){
        var _swiper = new LSwiper(id);
        var _lis = $('.lswiper-circle-ul li');
        $(_lis[0]).addClass('lswiper-li-chose');
    }

    //兼容CommonJs规范
    if (typeof module !== 'undefined' && module.exports) module.exports = lSwiper;

    //兼容AMD/CMD规范
    if (typeof define === 'function') define(function() { return lSwiper; });
    win.lSwiper = lSwiper;
})(window,document);