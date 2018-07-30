(function(win,doc){
    function cEffect(opt){
        var options = {
            color : 'rgba(255,255,255,.3)',
            width : 20
        }
        this.option = this._extend(options,opt);
        this.$main = '';
        this._class = ''
        this._init();
        this.$i = $('.'+this._class);
        this._setSyle();
        this._handleEff();
    }
    cEffect.prototype = {
        // 合并json数据
        _extend : function(target,source){
            
            for(var obj in source){
                target[obj] = source[obj];
            }
            return target;
        },


        _init : function(){
            this.$main = $(this.option.el);
            // console.log(this.$main);
            // 判断父盒子是否设置定位
            if(this.$main.css('position') == 'static'){
                this.$main.css('position','relative');
            }
            this._class = 'cEff-i-' +Math.ceil( Math.random()*100);
            this.$main.prepend('<i class="'+ this._class +'"></i>');
        },
        // 设置样式
        _setSyle : function(){
            // 获取父盒子的宽高等
            var _width = 0;
            _width = this.$main.width() + this.option.width; //设置宽和高
            var _height = 0;
            _height = this.$main.height() + this.option.width;

            // console.log(_width);s
            var _radius = this.$main.css('border-radius'); //判断是否有圆角
            this.$i.css({
                "display":"block",
                "position":"absolute",
                "top"    : -this.option.width/2 + 'px',
                "left"   : -this.option.width/2 + 'px',
                "box-sizing" : "border-box",
                "border" : "10px solid " + this.option.color, 
                "width"  : _width,
                "height" : _height,
                "opacity" : 0
            });
            if(_radius != '0px'){
                this.$i.css({
                    "border-radius" : _radius,
                    "-webkit-border-radius" : _radius
                }) 
            }
        },
        // 处理动作
        _handleEff: function(){
            this.$main.on("click",function(){
                    $($(this).children()[0]).addClass('clickEffect');
                    
                    var that = this;
                    setTimeout(function(){
                        $(that).children().removeClass('clickEffect');
                    },1000);
            })
        }
    }
    window.cEffect = cEffect;


}(window,document))