$(function(){
    
    var $myVideo_top_div = $('#myVideo_top_div');
    var $inner_section = $('#inner_section') ;
    var $inner_em_control = $('#inner_em_control');
    var $myvideo = $('#myvideo');
    // 显示隐藏
    $myVideo_top_div.on('mouseover',function(){
        // $inner_section.css('display','block');
    }).
    on('mouseout',function(){
        // $inner_section.css('display','none');
    });
    // 播放或停止
    $inner_em_control.on('click',function(){
        if($myvideo[0].paused){
            $myvideo[0].play();
            $(this).removeClass('inner-control-em-pause').addClass('inner-control-em-play');
        }else{
            $myvideo[0].pause();
            $(this).removeClass('inner-control-em-play').addClass('inner-control-em-pause');
        }
    });

    // 时间部分
    var $showtime_changetime = $('#showtime_changetime');   //改变的时间
    var $showtime_totaltime = $('#showtime_totaltime');   //总时间
    var $change_progress_em = $('.change-progress-em');    //时间进度条
    var _totalTime = '';
    $myvideo.on('loadedmetadata',function(){
        _totalTime = this.duration;
        $showtime_totaltime.text('00:'+Math.ceil(_totalTime));
    })
    .on('timeupdate',function(){
        var _currenttime = Math.ceil(this.currentTime);
        var _changetime = _currenttime > 9 ? _currenttime : '0'+_currenttime
        $showtime_changetime.text('00:'+_changetime);
        $change_progress_em.css('width',this.currentTime/_totalTime*100+'%');
    })
    .on('pause',function(){
        $inner_em_control.removeClass('inner-control-em-play').addClass('inner-control-em-pause');
    })

    // 点击进度条
    var $total_progress_em = $('.total-progress-em');
    var _total_length = $total_progress_em[0]. offsetWidth;
    $total_progress_em.on('click',function(e){
        var _click_length = e.pageX - $(this).offset().left;
        // _total_length = this.offsetWidth;
        $change_progress_em.css('width',_click_length/_total_length*100+'%');
        $myvideo[0].currentTime = _click_length/_total_length * _totalTime;
    });
    $change_progress_em.on('click',function(e){
        var _new_click_length = e.pageX - $(this).offset().left;
        $(this).css('width',_new_click_length/_total_length*100+'%');
        $myvideo[0].currentTime =  _new_click_length/_total_length*_totalTime;
    });

    /*声音部分*/ 
    var _inner_voice_progress = $('#inner_voice_progress');  //声音部分
    var _inner_voice_drag_em = $('#inner_voice_drag_em');  //可拖动小圆球
    var _inner_voice_progress = $('.inner-voice-progress'); //进度条父盒子
    var _inner_voice_control = $('.inner-voice-control') ;//声音父盒子
    var $inner_voice_change_progress  = $('.inner-voice-change-progress'); //进度条
    var _show_i = $('#show_i');
    _inner_voice_drag_em.on('mousedown',function(e){
        var _parent_height = $(this).parent()[0].clientHeight;
        var _self_height = this.clientHeight;
        // console.log(_self_width);
        var _flag_height = _parent_height -  _self_height;
        var _top  = this.offsetTop;
        $that = $(this);
        var _start = e.pageY;
        _inner_voice_progress.on('mousemove',function(e){
            var  _end = e.pageY;
            var _move = _end - _start;
            var _newTop = _top+_move;

            _show_i.addClass('fa-volume-up').removeClass('fa-volume-off');
            if(_newTop < 0) {
                _newTop = 0;
                $myvideo[0].volume = 1;
            }else if(_newTop > _flag_height){
                _newTop = _flag_height;
                _show_i.addClass('fa-volume-off').removeClass('fa-volume-up');
                $myvideo[0].volume = 0;
            }else{
                $myvideo[0].volume =1 - _newTop / _parent_height;
            }
            $that.css('top',_newTop +'px');
            $inner_voice_change_progress.css('height' ,_newTop / _parent_height*100 +'%' );
        })
    })
    $(document).on('mouseup',function(e){
        _inner_voice_progress.unbind('mousemove');
    })
    _inner_voice_control.on('mouseover',function(){
        _inner_voice_progress.css('display','block');
    }).on('mouseout',function(){
        _inner_voice_progress.css('display','none');
    });

})