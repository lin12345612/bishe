(function(win,doc){
    var options = {
        hidden : true,
        bgColor : '#44646f',
        autoPlay : false
    }
    function MyVideo(opt){
        this.option = this._extend(options,opt);
        this.obj = '' ;  //本身
        this.parent_obj = '';   //父盒子
        this.inner_obj = '';    //播放器样式的父盒子
        this._changeSpan = '' ;  //走的时间元素
        this.totalSpan = '' ; //总的时间元素
        this._innerCPdiv = '';
        this.changeCP = ''; // 改变的进度条元素
        this.totalCP = '' ; //总的进度条元素
        this.screen = '' ;   //进入全屏
        this._sflag = true;   //全屏控件标识
        this.sumHeight = '';
        this._addClass();
        this._createParent();
        this._createControl();
        this._initControl();
        this._createTimeShow();
        this._getDuration(this.obj);
        this._createcpdiv();
        this._createProgress();
        this._createCprogress();
        this._createScreenControl();
        this._createVoiceControl();
    }
    MyVideo.prototype = {
        // 合并json数据
        _extend : function(target,source){
            for(var obj in source){
                target[obj] = source[obj];
            }
            return target;
        },

        // 给父盒子添加类名以及自身添加类   
        _addClass : function(){
            if(!this.option.el){
                throw new Error('the attr :"el" is need!');
            }
            var _element = document.querySelector(this.option.el);
            this.obj = _element;
            this.parent_obj = _element.parentNode;
            _element.parentNode.className = 'myvideo-top-div';
            _element.className = 'myvideo-create-video';
            if(!this.option.src){
                throw new Error('the attr :"src" is need!')
            }
            _element.src = this.option.src;
        },
        // 生成包含控制栏的父盒子 父盒子隐藏显示
        _createParent : function(){
            var _controlPar = document.createElement('div');
            _controlPar.className = 'myVideo-total-div';
            this.parent_obj.appendChild(_controlPar);
            this.inner_obj = _controlPar;
            if(this.option.hidden == false){
                _controlPar.style.opacity = 1;
            }else if(this.option.hidden){
                _controlPar.style.opacity = 0;
            }
            this.parent_obj.addEventListener('mouseover',function(){
                _controlPar.style.opacity = 1;
            });
            this.parent_obj.addEventListener('mouseout',function(){
                _controlPar.style.opacity = 0;
            });
        },
        // 制作暂停开始按钮、
        _createControl : function(){
            var that = this;
            var CS = document.createElement('section');
            CS.className = 'myVideo-control-sec';
            var CS_em = document.createElement('em');
            CS_em.className = 'myVideo-control-em';
            CS.appendChild(CS_em);
            this.inner_obj.appendChild(CS);
            var _flag = this.option.auto;
            CS_em.addEventListener('click',function(){
                if(_flag){
                    that.obj.pause();
                    this.classList.remove('myVideo-control-em-play');
                    this.classList.add('myVideo-control-em-stop');
                }
                else{
                    that.obj.play();
                    this.classList.remove('myVideo-control-em-stop');
                    this.classList.add('myVideo-control-em-play');
                }
                _flag = !_flag;
            });
            this.obj.onended = function(){
                CS_em.className = 'myVideo-control-em myVideo-control-em-stop';
            }
        },
        //暂停按钮的初始样式以及是否自动播放
        _initControl : function(){
            var _em =  this.inner_obj.children[0].children[0];
            if(this.option.autoPlay){
                _em.classList.add('myVideo-control-em-play');
                this.obj.autoplay = true;
            }else if(!this.option.autoPlay){
                _em.classList.add('myVideo-control-em-stop');
            }
        },
        // 获取视频总长
        _getDuration : function(obj){
            var that = this;
            obj.onloadedmetadata = function(){
                var _duration = Math.round(this.duration);
                var _min =Math.floor( _duration / 60);
                _min = _min < 10 ? '0'+_min : _min;
                var _sec = _duration % 60;
                _sec = _sec < 10 ? '0'+_sec : _sec;
                that.totalSpan.innerHTML = _min + ':' + _sec;
                that._changeTimeShow(this,_duration);
                that._handleClick(that.totalCP,_duration);
                that._handleClick(that.changeCP,_duration);
            }
        },
        // 创建时间事件
        _createTimeShow : function(){
            var _timeShow = document.createElement('p');
            _timeShow.className = 'myVideo-timeShow-p';

            var _changeTime = document.createElement('span');
            _changeTime.innerHTML = '00:00';
            _timeShow.appendChild(_changeTime);

            var __ = document.createElement('span');
            __.innerHTML = '/';
            _timeShow.appendChild(__);

            var _allTime = document.createElement('span');
            _timeShow.appendChild(_allTime);

            this._changeSpan = _changeTime;
            this.totalSpan = _allTime;
            this.inner_obj.appendChild(_timeShow);
        },
        // 时间改变事件
        _changeTimeShow : function(obj,val){
            var that = this;
            obj.ontimeupdate = function(){
                var _currentTime = Math.round(this.currentTime);
                var _cmin = Math.floor( _currentTime / 60) ;
                _cmin = _cmin < 10 ? '0'+_cmin : _cmin;
                var _csec = _currentTime % 60;
                _csec = _csec < 10 ? '0'+ _csec : _csec;
                that._changeSpan.innerHTML = _cmin + ':' + _csec;
                var _width = _currentTime / val *100;
                that.changeCP.style.width =_width+'%';
            }
        },
        // 创建进度条父盒子
        _createcpdiv : function(){
            var _innerDiv = document.createElement('div');
            this._innerCPdiv = _innerDiv;
            _innerDiv.className = 'myVideo-inner-div';
            this.inner_obj.appendChild(_innerDiv);
        },
        // 创建总进度条
        _createProgress : function(){
            var _totalProgress = document.createElement('span');
            this.totalCP = _totalProgress;
            _totalProgress.className = 'myVideo-common-progress myVideo-total-progress ';
            this._innerCPdiv.appendChild(_totalProgress);
        },
        // 创建动态进度条
        _createCprogress : function(){
            var _changeProgress = document.createElement('span');
            this.changeCP = _changeProgress;
            _changeProgress.className = 'myVideo-common-progress myVideo-change-progress';
            this._innerCPdiv.appendChild(_changeProgress);
            _changeProgress.style.background = this.option.bgColor;
        },
        // 进度条点击事件
        _handleClick : function(obj ,val){
            var that = this;
            obj.addEventListener('click',function(e){
                var _click_length = e.pageX - that.parent_obj.offsetLeft;
                var _total_length = that.parent_obj.offsetWidth;
                that.changeCP.style.width = _click_length / _total_length * 100 +'%';
                that.obj.currentTime = _click_length/_total_length * val;
            });
        },
        // 创建全屏控件
        _createScreenControl : function(){
            var that = this;
            var _allScreen = document.createElement('section');
            _allScreen.className = 'myVideo-common-sec';
            var _inner_control = document.createElement('span');
            this.screen = _inner_control;
            _inner_control.className = 'myVideo-common-span myVideo-screenControl-span-enlarge'
            _allScreen.appendChild(_inner_control);
            this.inner_obj.appendChild(_allScreen);
            _inner_control.addEventListener('click',function(){
                if(that._sflag){
                    var docElm = document.documentElement;
                    if (docElm.requestFullscreen) {
                        that.parent_obj.requestFullscreen();
                    }
                    else if (docElm.msRequestFullscreen) {
                        this.setAttribute('class','myVideo-common-span myVideo-screenControl-span-out');
                        that.parent_obj.msRequestFullscreen();
                    }
                    else if (docElm.mozRequestFullScreen) {
                        that.parent_obj.mozRequestFullScreen();
                    }
                    else if (docElm.webkitRequestFullScreen) {
                        that.parent_obj.webkitRequestFullScreen();
                    }
                    this.classList = 'myVideo-common-span myVideo-screenControl-span-out';
                    that._sflag = !that._sflag; 
                }else{
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                       }
                    else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                       }
                    else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                       }
                    else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                       }
                    this.setAttribute('class','myVideo-common-span myVideo-screenControl-span-enlarge');
                    that._sflag = !that._sflag; 
                }
            })
        },
        // 声音控制部分
        _createVoiceControl : function(){
            var that = this ;
            var _innerFlag = false;

            var _control = document.createElement('section');    //最外层
            _control.className = 'myVideo-common-sec myVideo-voice-common-sec';

            var _innerControl = document.createElement('div');  //里层
            _innerControl.className = 'myVideo-voice-innerControl';

            var _voiceControl = document.createElement('span');   //图标
            _voiceControl.className = 'myVideo-voice-common-span myVideo-voice-control-up';
            _innerControl.appendChild(_voiceControl);

            var _outDiv = document.createElement('div');   //进度条控制
            _outDiv.className = 'myVideo-voice-outer-div'
            
            var _totalPC = document.createElement('span');    //总的进度条
            _totalPC.className = 'myVideo-voice-common-pg-span myVideo-voice-total-pg' ;

            var _changePC = document.createElement('span');   //改变的进度条
            _changePC.className = 'myVideo-voice-common-pg-span myVideo-voice-change-pg'

            var _dragEm = document.createElement('em');    //小圆点
            _dragEm.className = 'myVideo-voice-drag-em'

            _outDiv.appendChild(_totalPC);
            _outDiv.appendChild(_changePC);
            _outDiv.appendChild(_dragEm);

            _innerControl.appendChild(_outDiv);
            _control.appendChild(_innerControl);
            this.inner_obj.appendChild(_control);

            // 事件
            
            _voiceControl.onmouseover = function(){
                _outDiv.style.opacity = 1;
            }
            _voiceControl.onmouseout = function(){
                _outDiv.style.opacity = 0;
            }
            _voiceControl.addEventListener('click',function(){
                    if(this.classList == 'myVideo-voice-common-span myVideo-voice-control-up'){
                        this.setAttribute('class','myVideo-voice-common-span myVideo-voice-control-mute');
                        that.obj.muted = true;
                    }else{
                        this.setAttribute('class','myVideo-voice-common-span myVideo-voice-control-up');
                        that.obj.muted = false;
                    }
            });
            this._handleVoiceClick(_totalPC,_changePC,_dragEm,_voiceControl);
            this._handleVoiceClick(_changePC,_changePC,_dragEm,_voiceControl);
            this._handlevocieDrag(_dragEm,_totalPC,_changePC);
            _outDiv.onmouseover = function(){
                this.style.opacity = 1;
            }
            _outDiv.onmouseout = function(){
                this.style.opacity = 0;
            }
            
        },
        // 声音进度条点击事件
        _handleVoiceClick : function(obj,obj2,obj3,obj4){
            var that = this;
            obj.addEventListener('click',function(e){
                var _innerPar = this.parentNode;
                var _in_outPar = _innerPar.parentNode.parentNode.parentNode;
                var _outerPar = _in_outPar.parentNode;
                // 进度条距离顶部的距离
                var _totalHeight = _outerPar.offsetTop + _in_outPar.offsetTop - _innerPar.clientHeight + this.offsetTop;
                that.sumHeight = _totalHeight;
                var _height = this.clientHeight;
                // 新的高度
                var _newHeight = e.pageY - _totalHeight;
                obj4.setAttribute('class','myVideo-voice-common-span myVideo-voice-control-up')
                if(_newHeight < 0){
                    _newHeight = 0 ;
                }else if(_newHeight > _height){
                    _newHeight = _height;
                    obj4.setAttribute('class','myVideo-voice-common-span myVideo-voice-control-mute')
                }
                obj2.style.height = _newHeight + 'px';
                obj3.style.top = _newHeight - 5 + 'px';
                that.obj.volume = 1 - (_newHeight / _height);
            })
        },
        // 小黄点移动
        _handlevocieDrag : function(obj,obj1,obj2){
            var that = this;
            var _start = '';
            var _end = '';
            var _move = '';
            var _sumHeight = obj1.offsetHeight;
            var _hflag = false;
            obj.onmousedown = function(e){
                _start = e.pageY;
                _hflag = true;
                obj.onmousemove = function(e){
                    var _top = this.offsetTop;
                    var _newTop = 0;
                    if(_hflag){
                        _end = e.pageY;
                        _move = _end - _start;
                        _newTop =_top + _move;
                        if(_newTop > 90){
                            _newTop = 90;
                        }else if(_newTop < 5){
                            _newTop = 5;
                        }
                        obj2.style.height = _newTop + 'px';
                        this.style.top = _newTop +'px';
                        if(_newTop == 5){
                            that.obj.volume = 1 ;
                        }else if(_newTop == 90){
                            that.obj.volume = 0;
                        }else{
                            that.obj.volume = 1 - (_newTop/_sumHeight);
                        }
                        _start = e.pageY;
                    }
                }
            };
           document.onmouseup = function(){
                _hflag = false;
                obj.onmousemove = null;
            }
        }
    }

    function myVideo(opt){
        var _myvideo = new MyVideo(opt);
        var _theScreen = _myvideo.screen;
        window.onresize = function(){
            if(!_myvideo._sflag){
                if(!checkFull()){
                _theScreen.setAttribute('class','myVideo-common-span myVideo-screenControl-span-enlarge');
                _myvideo._sflag = !_myvideo._sflag;
            }
            }
        }
        function checkFull(){
            var isFull =  document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
            //to fix : false || undefined == undefined
            if(isFull === undefined) 
                isFull = false;
            return isFull;
        }
    }
    //兼容CommonJs规范
    if (typeof module !== 'undefined' && module.exports) module.exports = myVideo;

    //兼容AMD/CMD规范
    if (typeof define === 'function') define(function() { return myVideo; });
    win.myVideo = myVideo;
    
}(window,document))