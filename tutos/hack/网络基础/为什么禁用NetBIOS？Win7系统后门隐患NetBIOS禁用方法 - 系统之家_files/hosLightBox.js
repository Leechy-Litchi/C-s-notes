;(function($) {
    var LightBox = function (obj, opt) {
        this.$originImg = obj;
        this.defaults = {
            // 原图
            // $originImg: $(".m-art-cont img"),
            // 缩略图最大个数
            maxThumbCount: 7,
            showTips: true,
            thumbs: true
        };
        this.options = $.extend({}, this.defaults, opt);
        this.init();
    };
    LightBox.prototype.init = function() {
        var self = this;
        $(document).ready(function() {
            self.build();
        });
    };
    LightBox.prototype.build = function() {
        var self = this;
        var imgStr = '',
            thumbStr = '',
            thumbLiStr = '',
            smThumbStr = '',
            lbStr = '',
            winW = $(window).width(),
            winH = $(window).height();
        this.currIdx = 0,
        this.imgCount = this.$originImg.size();

        $('<div id="imgLightbox" unselectable="on" class="imgLightbox"></div>').appendTo('body');


        if (!this.options.thumbs) {
            smThumbStr+= '<div class="smThumb">\
                                <div class="lbThumbCover"></div>\
                                <div class="lbThumbIdx"></div>\
                            </div>';
        }
        // 初始化
        imgStr = '<div class="lbWrap">\
                      <div class="lbControl lbPrev"></div>\
                      <div class="lbControl lbNext"></div>\
                  	  <div class="lbContent">\
          		          <img class="lbImg" alt="">\
                  		  <div class="lbClose"></div>\
                          <div class="lbControl lbPrev"></div>\
                          <div class="lbControl lbNext"></div>'
                          +  smThumbStr  +
                  	  '</div>\
                  </div>\
                  <div class="lbControl lbPrev"></div>\
                  <div class="lbControl lbNext"></div>\
                  ';
        // 处理缩略图
        for (var i = 0; i < this.imgCount; i++) {
            thumbLiStr += '<li>\
                               <div class="lbThumbCover"></div>\
                               <img src="' + self.$originImg.eq(i).attr('src') + '" alt="">\
                               <div class="lbThumbIdx">' + (i + 1) + '/' + this.imgCount + '</div>\
                           </li>';
        }
        thumbStr = '<div class="lbThumb">\
                        <div class="lbThumbInner">\
                    		<ul>' +
                                thumbLiStr +
                            '</ul>\
                        </div>\
                	</div>';


        // 合并str
        lbStr = this.options.thumbs ? (imgStr + thumbStr) : imgStr;

        this.$lightbox = $('#imgLightbox');
        this.$lightbox.append(lbStr);

        // 缓存DOM
        this.$img = this.$lightbox.find('.lbImg');
        this.$thumbBox = this.$lightbox.find(".lbThumb");
        this.$thumbInner = this.$thumbBox.find('.lbThumbInner');
        this.$thumbUl = this.$thumbBox.find('ul');
        this.$thumbLi = this.$thumbBox.find('li');
        this.$close = this.$lightbox.find(".lbClose");
        this.$imgWrap = this.$lightbox.find(".lbWrap");
        this.$imgContent = this.$imgWrap.find(".lbContent");
        this.$next = this.$lightbox.find(".lbNext");
        this.$prev = this.$lightbox.find(".lbPrev");

        // 设置thumbbox的宽
        this.liW = this.$thumbLi.width() + 14;
        this.$thumbInner.css({
            width: this.liW * this.imgCount > this.options.maxThumbCount * this.liW ? this.options.maxThumbCount * this.liW : this.liW * this.imgCount
        })
        this.$thumbUl.css({
            width: this.liW * this.imgCount
        })

        // 缓存thumbbo的高
        var thumbH = this.$thumbBox.height();
        // 设置最大宽高 需减去白框 高需减去thumb的高 并留出close的高度
        this.maxW = this.$imgWrap.width() - 20;
        this.maxH = winH - thumbH - 40;

        // 设置imgWrap的高
        this.$imgWrap.css("height", this.maxH);

        // 初始化大图的marginTop 使居中
        // this.$imgContent.css({
        //     marginTop: this.maxH * 0.5
        // });

        // 初始化图片切换按钮区域
        this.$next.css("height", winH - thumbH);
        this.$prev.css("height", winH - thumbH);

        // 禁止选中
        this.$lightbox.bind('selectstart', function() {
            return false;
        });;

        //给图片添加外框 加入鼠标经过提示点击放大效果
        if(this.options.showTips){
            this.$originImg.wrap('<div class="oringImgBox"></div>');
            $('.oringImgBox').append('<span class="clickTips"></span>')
            $('.clickTips').on('click', function () {
                $(this).siblings('img').click();
            })
        }

        //点击图片事件
        this.$originImg.each(function(index) {
            $(this).on('click', function() {
                self.currIdx = index;
                self.changeImg();
                // 显示弹出层
                self.$lightbox.show();
            })
        });
        // 上一张点击事件
        this.$prev.on("click", function(){
            self.changeImg("prev");
        });
        // 下一张点击事件
        this.$next.on("click", function(){
            self.changeImg("next");
        })
        // 缩略图点击事件
        this.$thumbLi.each(function (index) {
            $(this).click(function () {
                self.currIdx = index;
                self.changeImg();
            })
        })
        //关闭弹出层
        this.$lightbox.on("click", ".lbClose", function() {
            self.$lightbox.hide();
        });
    };
    LightBox.prototype.changeImg = function(e) {
        var self = this;
        if (e == "prev") {
            if (this.currIdx == 0) {
                return;
            }
            this.currIdx--;
        }
        if (e == "next") {
            if (this.currIdx == (this.imgCount - 1)) {
                return;
            }
            this.currIdx++;
        }

        //隐藏关闭按钮
        this.$close.removeClass("show");

        this.$currImg = this.$originImg.eq(this.currIdx);

        var currW, currH, scale,
            natural = this.getNaturalSize(this.$currImg[0]);

        //处理图片缩放
        currW = natural.w;
        currH = natural.h;

        if (currW >= this.maxW) {
            scale = this.maxW / natural.w
            currW = this.maxW;
            currH = natural.h * scale;
        }
        if (currH >= this.maxH) {
            scale = this.maxH / natural.h;
            currH = this.maxH;
            currW = natural.w * scale;
        }

        // 设置大图路径
        this.$img.attr("src", this.$currImg.attr("src"));

        //设置大图居中
        this.$imgContent.stop().animate({
            width: currW,
            height: currH,
            marginTop: -(currH-30) * 0.5,
            marginLeft: -currW * 0.5
        }, 300, function() {
            // 动画结束后回调显示关闭按钮
            self.$close.addClass("show");
        });


        //设置thumb选中样式
        this.$thumbLi.removeClass("active").eq(this.currIdx).addClass("active");
        if (this.imgCount > this.options.maxThumbCount) {
            if (this.currIdx < parseInt(this.options.maxThumbCount/2)) {
                this.$thumbUl.stop().animate({
                    left: 0
                }, 300);
            } else if (this.currIdx >= this.imgCount - parseInt(this.options.maxThumbCount/2)) {
                this.$thumbUl.stop().animate({
                    left: -this.liW * (this.imgCount - this.options.maxThumbCount)
                }, 300);
            } else {
                this.$thumbUl.stop().animate({
                    left: -this.liW * (this.currIdx - parseInt(this.options.maxThumbCount/2))
                }, 300)
            }
        }

        if (!this.options.thumbs) {
            $('.smThumb').find('.lbThumbIdx').html(this.currIdx + 1  + '/' + this.imgCount)
        }
    };
    LightBox.prototype.getNaturalSize = function(img) {
        var image = new Image();
        image.src = img.src;
        var naturalSize = {
            w: image.width,
            h: image.height
        };
        return naturalSize;
    };
    $.fn.hosLightBox = function (options) {
        var hosLightBox = new LightBox($(this), options);
        return hosLightBox;
    }
})(jQuery);
