(function(win,doc){
    var _num = 20;
    function myScroll(id,num){
        this.id = id;
        this.num = num || _num;
        this.flag = false;
        this.obj = '';   //当前元素
        this.cpro = '' ; //滚动的进度条
        this.progress_div = '';  //进度条父盒子
        this.mdiv = '' ; //内容盒子
        this.p_height = '' ; //滚动条高度
        this.ph = ''; //父盒子高度
        this.ah = ''; //实际内容高度
        this._init();    //初始化
        this._handleScroll(); 
        
    }
    myScroll.prototype = {
        // 初始化，判断是否有传入id,并获取高度
        _init : function(){     
            if(!this.id){
                throw new Error('"id" is necessary!');
            }
            this.obj = $('#'+this.id);
            // 若一开始是隐藏的，先取消隐藏
            if(this.obj.css('display') == 'none'){
                this.obj.css('display','block');

                if(this.obj.css('max-height') == 'none'){
                    this.ph = this.obj[0].clientHeight;
                }else{
                    this.ph = this._handlePx(this.obj.css('max-height'));
                }
                this.ah = this.obj[0].scrollHeight; //实际高度
                this.obj.css('display','none');
            }else{  //未隐藏的
                this.ph = this.obj[0].clientHeight;
                this.ah = this.obj[0].scrollHeight; //实际高度
            }
            this.obj.css('height',this.ph+'px');
            
        },
        // 处理添加元素
        _handleScroll : function(){
            if(this.ah > this.ph){
                this.obj.css({
                    'position' : 'relative',
                    'overflow' : 'hidden'
                });
                // 添加一个父盒子
                this._addPNode();
                // 添加进度条
                this._addProgress();
                // 滚轮事件
                this._handleWheel();
                this._handleChange();
            }else{
                return;
            }
        },
        // 添加父盒子
        _addPNode : function(){
            var _inner = this.obj[0].children;
            var _length = _inner.length;
            var _outerDiv = $('<div class="my-Outer-div"></div>');
            this.mdiv = _outerDiv;
            _outerDiv.append(_inner);
            this.obj.append(_outerDiv);
        },
        // 添加进度条
        _addProgress : function(){
            var _height =  this.ph/this.ah* this.ph;
            var _ipro = $('<div class="myScroll-progress-div"></div>');
            var _tspan = $('<span class="myScroll-progress-tspan"></span>');
            var _cspan = $('<span class="myScroll-progress-cspan"></span>');
            _cspan.css('height',_height+'px');
            this.p_height = _height;
            this.cpro = _cspan;
            this.progress_div = _ipro;
            _ipro.append(_tspan);
            _ipro.append(_cspan);
            this.obj.append(_ipro);
        },
        // 滚动条滚动事件
        _handleWheel : function(){
            var that = this;
            var be = 0;    //内容的高度和父盒子高度之间的差值
            var be1 = 0; //父盒子的高度与滚动条高度的差值
            

            // 滚轮事件
            this.obj.hover(function(){
                var H2 = that.ah; //内容高度
                if(that.flag){    //只有当内容改变是高度才变
                    H2 = that.mdiv.height(); //内容高度
                    that.flag = false;
                }
                var H1 = that.ph;   //父盒子高度
                var H3 = that.p_height;    //滚动条高度
                be = H2 - H1 ; //内容的高度和父盒子高度之间的差值
                be1 = H1 - H3 ; //父盒子的高度与滚动条高度的差值
                // 滚动条每次移动的距离为内容移动的距离/内容的高度和父盒子高度之间的差值 * 父盒子的高度与滚动条高度的差值
                var _step = that.num/be * be1;
                $('body').css({
                    '-moz-user-select': 'none',
                    '-webkit-user-select': 'none',
                    '-ms-user-select': 'none',
                    '-khtml-user-select': 'none',
                    'user-select': 'none'
                });
                $(this).on('mousewheel',function(e){
                    e.preventDefault();
                    var _val = e.originalEvent.wheelDelta;    //小于0向下滚动，大于0向上滚动
                    var _top = that.mdiv.position().top;    //盒子的top值
                    var _pro_top = that.cpro.position().top;    //滚动条的top值
                    if(_val < 0){       //向下滚动
                         _top = _top - that.num;
                         _pro_top = _pro_top + _step;
                        if(Math.abs(_top) > be){
                            _top = -be;
                        }
                        _pro_top = _pro_top > be1 ? be1 : _pro_top;
                    }else{          //向上滚动
                         _top = _top +  that.num;
                         _pro_top = _pro_top - _step;
                        if(_top > 0){
                            _top = 0;
                        }
                        _pro_top = _pro_top < 0 ? 0 : _pro_top;
                    }
                    that.mdiv.css('top',_top+'px');
                    that.cpro.css('top',_pro_top + 'px');
                });
            },function(){
                $('body').css({
                    '-moz-user-select': 'auto',
                    '-webkit-user-select': 'auto',
                    '-ms-user-select': 'auto',
                    '-khtml-user-select': 'auto',
                    'user-select': 'auto'
                });
                $(this).off('mousewheel')
            });

            // 鼠标拖拽事件
            that.progress_div.on('mousedown',function(e){
                var $that = $(this);
                var _startY = e.pageY;  //点击的点
                var _move = 0;  //移动的距离
                var _pro_move = 0;  //滚动条移动
                var _main_move = 0 ; //内容移动
                $(this).on('mousemove',function(e){
                    var _endY = e.pageY;  
                    _move = _endY - _startY;
                    _pro_move = that.cpro.position().top + _move/10;
                    _main_move =  that.mdiv.position().top - _move/(be1/be)/10;
                    if(_pro_move < 0){
                        that.cpro.css('top',0 + 'px');
                        that.mdiv.css('top',0+'px'); 
                    }else if(_pro_move > be1){
                        that.cpro.css('top',be1 + 'px');
                        that.mdiv.css('top',-be+'px');
                    }else{
                        that.cpro.css('top',_pro_move + 'px');
                        that.mdiv.css('top',_main_move+'px');
                    }
                })
            })
            .on('mouseout',function(){
                $(this).off('mousemove');
            })
            .on('mouseup',function(){
                $(this).off('mousemove');
            })
        },
        // 内容改变处理
        _handleChange : function(){
            var that = this;
            var i = 0;
            this.obj.on('DOMNodeRemoved',function(){
                setTimeout(function(){
                   if(that.mdiv.height() < that.ph){
                       that.progress_div.css('display','none');
                   }else{
                       var _nheight = that.ph / that.mdiv.height() *that.ph;
                       that.p_height = _nheight;
                       that.cpro.css('height',_nheight+'px');
                       that.progress_div.css('height',that.mdiv.height()+'px');
                       that.ah = that.mdiv.height();
                   }
                   that.flag = true;
                },1);
            });
            this.obj.on('DOMNodeInserted',function(e){
                setTimeout(function(){
                   if(that.mdiv.height() < that.ph){
                       that.progress_div.css('display','none');
                   }else{
                       var _nheight = that.ph / that.mdiv.height() *that.ph;
                       that.p_height = _nheight;
                       that.cpro.css('height',_nheight+'px');
                       that.progress_div.css('height',that.mdiv.height()+'px');
                       that.ah = that.mdiv.height();
                   }
                   that.flag = true;
                },0);
            })
        },
        // 数据处理
        _handlePx : function(str){
            var newStr = str.split('p')[0]-0;
            return newStr;
        }
    }

//兼容CommonJs规范
if (typeof module !== 'undefined' && module.exports) module.exports = myScroll;

//兼容AMD/CMD规范
if (typeof define === 'function') define(function() { return myScroll; });

    win.myScroll = myScroll;
}(window,document));