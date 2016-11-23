/*进度条插件*/
/**
 * [ringLoader description]
 *     options = {          [默认配置]
 *       width: 400,        [进度条圆的最大半径，即为画布的宽]
 *       lineWidth: 20,     [进度条的弧线宽度]
 *       start: 5/6,        [进度条开始位置，弧度制]
 *       end: 1/6,          [进度条结束位置，弧度制]
 *       easing:'easeInQuad',          [进度条动画]
 *       bgcolor: '#e1e1e1',   [进度条底色]
 *       ptcolor: '#fe7a28'    [进度条完成时的颜色]
 *   };
 */
$.fn.ringLoader = function(option) {
    var options,remInit,drawArc,drawPross,init,d,ctx,_this,inittimer,init,tween,
        opts_bg = {},opts_pt = {};
    tween = {
                easeInQuad: function(pos){
                    return Math.pow(pos, 2);
                },

                easeOutQuad: function(pos){
                    return -(Math.pow((pos-1), 2) -1);
                },

                easeInOutQuad: function(pos){
                    if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,2);
                    return -0.5 * ((pos-=2)*pos - 2);
                },

                easeInCubic: function(pos){
                    return Math.pow(pos, 3);
                },

                easeOutCubic: function(pos){
                    return (Math.pow((pos-1), 3) +1);
                },

                easeInOutCubic: function(pos){
                    if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,3);
                    return 0.5 * (Math.pow((pos-2),3) + 2);
                },

                easeInQuart: function(pos){
                    return Math.pow(pos, 4);
                },

                easeOutQuart: function(pos){
                    return -(Math.pow((pos-1), 4) -1)
                },

                easeInOutQuart: function(pos){
                    if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,4);
                    return -0.5 * ((pos-=2)*Math.pow(pos,3) - 2);
                },

                easeInQuint: function(pos){
                    return Math.pow(pos, 5);
                },

                easeOutQuint: function(pos){
                    return (Math.pow((pos-1), 5) +1);
                },

                easeInOutQuint: function(pos){
                    if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,5);
                    return 0.5 * (Math.pow((pos-2),5) + 2);
                }
          }
    _this = this;
    if($(_this).length <= 0){
        return true;
    }
    ctx = $(_this)[0].getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.translate(0.5, 0.5);
    if(!$(_this).attr("data-percent")){
        $(_this).attr("data-percent","0");
    }
    options = {
        width: 400,
        lineWidth: 20,
        start: 5/6,
        end: 1/6,
        easing:'easeInOutQuint',
        bgcolor: '#e1e1e1',
        ptcolor: '#fe7a28'
    };
    if (option !== undefined) {
        $.extend(options, option);
    };
    remInit = function(n,dpr){
        /*dpr: true || false*/
        var font = parseInt($("html").css("font-size"));
            n = n/64*font;
            n = dpr?n*window.devicePixelRatio:n;
        return n;
    };
    opts_bg = {
        width: remInit(options.width,true),
        lineWidth: remInit(options.lineWidth,true),
        start: options.start,
        end: options.end,
        color: options.bgcolor
    };
    opts_pt = {
        width: remInit(options.width,true),
        lineWidth: remInit(options.lineWidth,true),
        start: options.start,
        end: options.end,
        color: options.ptcolor
    };
    console.log(opts_pt.lineWidth);
    drawArc = function(opts){
        ctx.beginPath();
        ctx.strokeStyle = opts.color;
        /*中心坐标加5修正*/
        ctx.arc(remInit(options.width+10,true)/2, remInit(options.width+10,true)/2, opts.width/2-opts.lineWidth, Math.PI*opts.start, Math.PI*opts.end, false);
        ctx.lineWidth = remInit(opts.lineWidth)*2;
        ctx.lineCap = "round";
        ctx.stroke();
    };
    drawPross = function(){
        d=parseFloat($(_this).attr("data-percent"));
        if(d >= 101){
            clearInterval(inittimer);
            opts_pt.end = 13/6;
            drawArc(opts_bg);
            drawArc(opts_pt);
            return false;
        }
        ctx.clearRect(0,0,remInit(options.width,true),remInit(options.width,true));
        opts_pt.end = (5+8*tween[options.easing](d/100))/6;
        drawArc(opts_bg);
        drawArc(opts_pt);
        $(_this).attr("data-percent",d+1);
    };
    init = function(){
        /*大小加10修正*/
        $(_this).attr('width',remInit(options.width+20,true)).attr('height',remInit(options.width+20,true));
        $(_this).css('width',remInit(options.width+20)).css('height',remInit(options.width+20));
        inittimer = setInterval(function(){drawPross();},10);
    };
    init(); 
}