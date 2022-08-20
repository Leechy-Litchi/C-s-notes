$(function(){
	// 获取焦点
	$(document).on("focus",".textarea", function(){
		$(".verification").show();
	})
	
	// 评论点赞
	$(document).on("click",".give_a_like", function(){
		if($(this).hasClass("current")){
			return false;
		}
		var commentid = $(this).attr('data-commentid');
		var dataCount = $(this).attr("data-count");
		var host = $("#host").val();
		var thisone = $(this);
		$.ajax({
	        type: 'POST',
	        url:  host+"/plus/ajax_commentlist.php",
	        data: {
	            'id': commentid,
	            'zan':parseInt(dataCount)+1,
				'datatype':'zan',
	        },
	        dataType: 'json',
	        success: function (json) {
	        	if(json.code == 200){
					thisone.attr("data-count", parseInt(dataCount)+1);
					thisone.addClass("current");
					thisone.find(".count").text(parseInt(dataCount)+1);
					thisone.attr("data-attr", 1);
				}else{
					alert(json.msg);
				}
	        },
	        complete: function () {

	        },
	        error: function () {
	            alert('网络错误');
	        }
	    });
		
	})
	
	// 评论验证码
	var show_num = [];
	draw(show_num);	
	$(document).on('click',"#canvas",function(){
	    draw(show_num);
	})
	$(document).on('click',".submit_comment", function(){
		var textareaVal = $(".textarea").val();
		var val = $(".input_val").val().toLowerCase();
		var num = show_num.join("");
		var that = $(this);
		if(textareaVal==""){
			publicHintPopup('评论内容不能为空哦！')
		}
		else if(val==''){
			publicHintPopup('请输入验证码！');
		}else if(val == num){
			
		    $(".input_val").val('');
		    $(".textarea").val('');
		    draw(show_num);
			
			// 获取浏览器
			var receptionVal = getBrowser();
			//console.log(receptionVal)
			// 城市ip
			var ip = returnCitySN['cip'];
			var city = returnCitySN['cname'];
			var aid = $("#aid").val();
			var commentid = $("#commentid").val();
			var host = $("#host").val();

			$.ajax({
		        type: 'POST',
		        url:  host+"/plus/ajax_commentlist.php",
		        data: {
		            'aid': aid,
					'commentid': commentid,
					'content': textareaVal,
					'uip': ip,
					'ucity': city,
					'browser': receptionVal,
					'datatype':'addcomment',
		        },
		        dataType: 'json',
		        success: function (json) {
		        	if(json.code == 200){
			            // 时间格式化
						var date = new Date;
						var y = date.getFullYear();
						var m = date.getMonth() + 1;
						m = m < 10 ? ('0' + m) : m;
						var d = date.getDate();
						d = d < 10 ? ('0' + d) : d;			
						var dateVal = y + '-' + m + '-' + d;
						var html = "";
						var defaultBox = $('<div class="default_box mb30"></div>');console.log(defaultBox);
						var revertBox = $('<div class="default_box revert_box mb30"></div>');
						html += '<div class="head_portrait fl">'+
									'<img src="/uploads/theme/2020/images/head.png" alt="">'+
								'</div>'+
								'<div class="comment_cont fl">'+
									'<p class="text"> '+ textareaVal +'</p>'+
									'<div class="info">'+
										'<p>发表于：'+ dateVal +'</p>'+
										'<p>来自：'+ city +'</p>'+
										'<p class="browser">'+ receptionVal +'</p>'+
									'</div>'+
									'<div class="popup_review_audit">'+
										'<i class="iconfont iconjinggao"></i>'+
										'<div class="content">评论审核中</div>'+
									'</div>'+
								'</div>'
								
						var attrClass = that.parents(".comment_input").attr("class");
						if(attrClass == 'comment_input default_input'){
							defaultBox.append(html)
							$(".default_input_box").append(defaultBox)
						}
						else{
							revertBox.append(html)
							that.parents(".comment_item").append(revertBox)
						}
					}else{
						alert(json.msg);
					}
		        },
		        complete: function () {

		        },
		        error: function () {
		            alert('网络错误');
		        }
		    });
			
		}else{
			publicHintPopup('验证码错误！请重新输入！')
		    $(".input_val").val('');
		    draw(show_num);
		}
	})
	
	// 回复
	$(".comment_list").on("click",".revert", function(){
		$(".default_input,.revert_input").remove();
		$(".comment_hint, .on_earth").hide();
		/*alert($(this).attr('data-commentid'));*/
		$('#commentid').val($(this).attr('data-commentid'));
		var html = "";
		html += '<div class="comment_input revert_input">'+
					'<div class="head_portrait fl">'+
						'<img src="/uploads/theme/2020/images/head.png" alt="">'+
					'</div>'+
					'<div class="input_box fl">'+
						'<textarea  class="textarea" placeholder="您的评论会经编辑或作者筛选后显示，全站可见，请文明发言。"></textarea>'+
						'<div class="verification">'+
							'<label>验证码</label>'+
							'<div class="code">'+
								'<input type="text" class="input_val" placeholder="请输入验证码">'+
								'<canvas id="canvas" width="120" height="50"></canvas>'+
							'</div>'+									
						'</div>'+
						'<i class="iconfont iconguanbi comment_close"></i>'+
						'<input type="submit" class="submit_comment" value="提交评论">'+
					'</div>'+
				'</div>'
				
		$(this).parents(".comment_item").append(html);
		draw(show_num);
		// 关闭回复
		$(".comment_list").on("click",".comment_close", function() {
			$(this).parents(".revert_input").remove();
			$(".default_input").remove();
			$(".comment_hint, .on_earth").show();
			var html = "";
			html += '<div class="comment_input default_input">'+
						'<div class="head_portrait fl">'+
							'<img src="/uploads/theme/2020/images/head.png" alt="">'+
						'</div>'+
						'<div class="input_box fl">'+
							'<textarea  class="textarea" placeholder="您的评论会经编辑或作者筛选后显示，全站可见，请文明发言。"></textarea>'+
							'<div class="verification">'+
								'<label>验证码</label>'+
								'<div class="code">'+
									'<input type="text" class="input_val" placeholder="请输入验证码">'+
									'<canvas id="canvas" width="120" height="50"></canvas>'+
								'</div>'+									
							'</div>'+
							'<input type="submit" class="submit_comment" value="提交评论">'+
						'</div>'+
					'</div>'					
			$(".default_input_box").prepend(html);
			draw(show_num);
		})
	})
	
})


// 评论验证码
function draw(show_num) {
	var canvas_width = $('#canvas').width();
	var canvas_height = $('#canvas').height();
	var canvas = document.getElementById("canvas"); //获取到canvas的对象，演员
	var context = canvas.getContext("2d"); //获取到canvas画图的环境，演员表演的舞台
	canvas.width = canvas_width;
	canvas.height = canvas_height;
	var sCode = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
	var aCode = sCode.split(",");
	var aLength = aCode.length; //获取到数组的长度		        
	for (var i = 0; i <= 3; i++) {
		var j = Math.floor(Math.random() * aLength); //获取到随机的索引值
		var deg = Math.random() * 30 * Math.PI / 180; //产生0~30之间的随机弧度
		var txt = aCode[j]; //得到随机的一个内容
		show_num[i] = txt.toLowerCase();
		var x = 10 + i * 20; //文字在canvas上的x坐标
		var y = 20 + Math.random() * 8; //文字在canvas上的y坐标
		context.font = "bold 23px 微软雅黑";
		context.translate(x, y);
		context.rotate(deg);
		context.fillStyle = randomColor();
		context.fillText(txt, 0, 0);
		context.rotate(-deg);
		context.translate(-x, -y);
	}
	for (var i = 0; i <= 5; i++) { //验证码上显示线条
		context.strokeStyle = randomColor();
		context.beginPath();
		context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
		context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
		context.stroke();
	}
	for (var i = 0; i <= 30; i++) { //验证码上显示小点
		context.strokeStyle = randomColor();
		context.beginPath();
		var x = Math.random() * canvas_width;
		var y = Math.random() * canvas_height;
		context.moveTo(x, y);
		context.lineTo(x + 1, y + 1);
		context.stroke();
	}
}
function randomColor() { //得到随机的颜色值
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + "," + g + "," + b + ")";
}

//公用渐隐提示弹窗  
function publicHintPopup(content) {
    var top = arguments[1];
    var po = $('<div class="popup_dialog"></div>');
    var co = $('<i class="iconfont iconjinggao"></i><div class="content">' + content + '</div>');
    po.append(co)
    $('body').append(po);
    $('.popup_dialog').css({"top": top + "%"})
        .fadeOut(2500, function () {
            $('.popup_dialog').remove();
        })
}

// 浏览器 
function getBrowser() {
  var ua = navigator.userAgent.toLocaleLowerCase();
  var Browser = null;
  if (ua.match(/msie/) != null || ua.match(/trident/) != null) {
    Browser = "IE";
    browserVersion =
      ua.match(/msie ([\d.]+)/) != null
        ? ua.match(/msie ([\d.]+)/)[1]
        : ua.match(/rv:([\d.]+)/)[1];
    return "IE浏览器";
  } else if (ua.match(/firefox/) != null) {
    Browser = "火狐";
    return "火狐浏览器";
  } else if (ua.match(/ubrowser/) != null) {
    Browser = "UC";
    return "UC浏览器";
  } else if (ua.match(/opera/) != null) {
    Browser = "欧朋";
    return "OP浏览器";
  } else if (ua.match(/bidubrowser/) != null) {
    Browser = "百度";
    return "baidu浏览器";
  } else if (ua.match(/metasr/) != null) {
    Browser = "搜狗";
    return "搜狗浏览器";
  } else if (
    ua.match(/tencenttraveler/) != null ||
    ua.match(/qqbrowse/) != null
  ) {
    Browser = "QQ";
    return "QQ浏览器";
  } else if (ua.match(/maxthon/) != null) {
    Browser = "遨游";
    return "遨游浏览器";
  } else if (ua.match(/chrome/) != null) {
    var is360 = _mime("type", "application/vnd.chromium.remoting-viewer");
    function _mime(option, value) {
      var mimeTypes = navigator.mimeTypes;
      for (var mt in mimeTypes) {
        if (mimeTypes[mt][option] == value) {
          return true;
        }
      }
      return false;
    }
    if (is360) {
      Browser = "360";
      return "360浏览器";
    } else {
      return "Chrome浏览器";
    }
  } else if (ua.match(/safari/) != null) {
    Browser = "Safari";
	return "Safari浏览器";
  }
}

function commentList(host,aid){
	var host = host;
    var aid = aid;
    $.ajax({
        type: 'POST',
        url:  host+"/plus/ajax_commentlist.php",
        data: {
            'aid': aid,
            'datatype':'getlist',
        },
        dataType: 'json',
        success: function (json) {
            var list = json;
            var str = '';
            if (list == undefined) {
                return false;
            }
            $('#total_comment').text(json.length);
            $.each(list, function (index, array) {
            	str += '<div class="comment_item level_0">';
					str += '<div class="default_box mb30">';
						str += '<div class="head_portrait fl">';
							str += '<img src="'+array['photo']+'" alt="">';
						str += '</div>';
						str += '<div class="comment_cont fl">';
							str += '<p class="text">'+array['content']+'</p>';
							str += '<div class="info">';
								str += '<p>发表于：'+array['commenttime']+'</p>';
								str += '<p>来自：'+array['ucity']+'</p>';
								str += '<p>'+array['browser']+'</p>';
								str += '<span class="revert" data-commentid="'+array['id']+'">回复</span>';
								str += '<span class="give_a_like" data-attr="0" data-count="'+array['zan']+'" data-commentid="'+array['id']+'">点赞<i class="count">'+array['zan']+'</i></span>';
							str += '</div>';
						str += '</div>';
					str += '</div>';
				str += '</div>';
					/*var comment_list = array['comment_list'];*/
				$.each(array['comment_list'], function (index1, arr) {
					/*console.log(arr);return false;*/
					str += '<div class="comment_item level_1">';
					str += '<div class="default_box revert_box mb30">';
						str += '<div class="head_portrait fl">';
							str += '<img src="'+arr['photo']+'" alt="">';
						str += '</div>';
						str += '<div class="comment_cont fl">';
							str += '<p class="text">'+arr['content']+'</p>';
							str += '<div class="info">';
								str += '<p>发表于：'+arr['commenttime']+'</p>';
								str += '<p>来自：'+arr['ucity']+'</p>';
								str += '<p>'+arr['browser']+'</p>';
								str += '<span class="give_a_like" data-attr="0" data-count="'+arr['zan']+'" data-commentid="'+arr['id']+'">点赞<i class="count">'+arr['zan']+'</i></span>';
							str += '</div>';
						str += '</div>';
					str += '</div>';
					str += '</div>';
				});	
				
                
            });
            $('#comment_list').html(str);
        },
        complete: function () {

        },
        error: function () {
            //$('#getmore_' + columnid).hide();
            alert('网络错误');
        }
    });
}
