;(function($, win){
    var handler = {
        init: function(el) {
            this.$el = $(el);
            this.$mode = $('.photo-mode', this.$el);
            this.scroll = null;
            this.imgPop = null;

            this.popInfo();
            this.scrollHandle();
            this.choosePhotoAndVideo();
            // this.photoHandle();
        },
        // 页面滚动优化
        scrollHandle: function() {
            var _this = this,
                $wrap = $('.sys-main-wrap', _this.$el);
            _this.scroll = new IScroll($wrap.get(0), {
                click: _this._iScrollClick(),
                scrollY: true,
                scrollX: false
            });
        },
        _iScrollClick: function () {
            if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) return false;
            if (/Chrome/i.test(navigator.userAgent)) return (/Android/i.test(navigator.userAgent));
            if (/Silk/i.test(navigator.userAgent)) return false;
            if (/Android/i.test(navigator.userAgent)) {
                var s = navigator.userAgent.substr(navigator.userAgent.indexOf('Android') + 8, 3);
                return parseFloat(s[0] + s[3]) < 44 ? false : true
            }
        },
         // 选择视频或图片
        choosePhotoAndVideo: function() {
            var _this = this,
                $btn = $btn = $('.add-btn', _this.$mode),
                $ul = $('<ul class="media-ul">'),
                liHtml = '<li class="m-photo">照片</li><li class="m-video">视频</li>',
                choosePop = null;

            $ul.append(liHtml);
            // 实例化选择视频或图片的弹窗
            choosePop = new MLayer({
                model: 'lay',
                type: 1,
                skin: 'media-choose',
                header: false,
                closBtn: false,
                maskHideCont: true,
                posit: 'bottom', 
                content: $ul
            });
            // 创建预览大图弹出层
            _this.imgPop = new MLayer({
                model: 'win',
                type: 1,
                skin: 'photo-pop',
                area: ['100%', 'auto'],
                header: false,
                closBtn: false,
                maskHideCont: true
            });

            $btn.on('click', function () {
                choosePop.show();
            });
            $ul.on('click', '>li', function(){
                var $this = $(this);
                if ($this.hasClass('m-photo')) {
                    _this._photoHandle(1);
                } else if ($this.hasClass('m-video')) {
                    _this._photoHandle(2);
                }
                choosePop.hide();
            });
            _this.$mode.on('click', '.pic img', function () {
                _this.imgPop.upDateCont($(this).clone());
                _this.imgPop.show();
            });
            _this.$mode.on('click', '.pic .close', function () {
                
                if($(this).parent().siblings('div').length == 0 ){
                    $(this).closest('.pic').remove();
                }
                $(this).closest('.img-outer-div').remove();
            });
        },
        _photoHandle: function(type) {
            var _this = this,
                $input = null,
                $pic = $('<div class="pic">'),
                $closeBtn = $('<button class="close">');

            if (type === 1) {
                $input = $('<input type="file" accept="image/*" class="p" multiple="multiple" /> ');
                // 
            }else if (type === 2) {
                $input = $('<input type="file" accept="video/*" class="p" multiple="multiple">');
            }
            $input.trigger('click');
            $pic.append($input);
            _this.$mode.prepend($pic);
            
            $input.on('change', function () {
                var _type = this.accept;   //用于判断是图片还是视频
                var _flag = 0,
                    $this = $(this),
                    $img = null,
                    file = $this.get(0).files;
                    
                var reader = new FileReader();
                reader.readAsDataURL(file[_flag]);
                reader.onload = function(e){
                    $img_div = $('<div class="img-outer-div"><button class="close"></div>');
                    if(_type == 'video/*'){    //视频
                        $img = $('<img src="../images/feedback/icon.png" class="video-pic" > ');
                        $img_div.append($img)
                        $pic.prepend($img_div);
                        setTimeout(function () {
                            _this.scroll.refresh();
                        }, 300);
                    }else{                           //图片
                        imgFile = e.target.result;
                        $img = $('<img src="'+ imgFile +'">');
                        $img_div.append($img)
                        $pic.prepend($img_div);
                        setTimeout(function () {
                            _this.scroll.refresh();
                        }, 300);
                    }
                    _flag++;
                    if(_flag < file.length){
                        reader.readAsDataURL(file[_flag]);
                    }else{
                        $pic.addClass('show')
                    }
                }
            });
        },
        // 加载完成后弹出提示框
        popInfo: function() {
            var _this = this,
                pop = null,
                html = '';

            html += ''
                + '<div class="feedback-infos">'
                    + '<p class="font-15">1、受理范围：单位和个人存在公款吃喝、公款旅游、公车私用、吃拿卡要、不作为、乱作为等违规违纪行为；</p>'
                    + '<p class="font-15">2、举报对象为深圳市龙岗区各级党政机关、国有企事业单位及其公职人员；</p>'
                    + '<p class="font-15">3、反映内容真实客观、简明扼要、说清事实，不得歪曲或捏造事实，以文字、图片为主；</p>'
                    + '<p class="font-15">4、为提高举报效率，鼓励实名举报，并留下真实联系信息，区纪委将会对所有举报人的个人信息进行严格保密。</p>'
                + '</div>';
            pop = new MLayer({
                model: 'win',
                type: 1,
                skin: 'info-pop',
                area: ['9rem', '10.4rem'],
                title: '温馨提示',
                content: html,
                header: true,
                closBtn: true
            });
            setTimeout(function(){
                pop.show();
            }, 500);
        }
    };
    $(function(){
        handler.init($('#container'));
    });
}(jQuery, window));