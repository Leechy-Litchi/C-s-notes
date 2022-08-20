function isMatch(str1,str2){ 
	var index = str1.indexOf(str2);
	if(index==-1) return false;
	return true;
}

if (isMatch(window.location.hostname,'xitongzhijia.net') == false){
	window.location.href="http://www.xitongzhijia.net/";
}



mUrl = "http://m.xitongzhijia.net/"; //2015-01-14  版本二没有分页
var pathname = window.location.pathname;
var pathnameArr = pathname.split("/");
if(pathnameArr[1] == 'android' || pathnameArr[1] == 'ios' || pathnameArr[1] == 'gonglue'){
	var oDiv = document.createElement("div");
	var text = document.createTextNode("很抱歉，您访问的页面不存在！")
	oDiv.style.cssText = "position:fixed;left:0;top:0;width:100%;height:100%;z-index:999;font-size:20px;background:#fff;text-align:center ";
	oDiv.appendChild(text);
	document.head.parentNode.insertBefore(oDiv,document.head)
	var time = setInterval(function () {
		if (document.body){
			document.body.style.overflowY = "hidden";
			clearInterval(time);
		}
	},50);
}

if(urlStyle == ''){ 
	urlStyle = 'article'; 
}
if( channelStyle == ''){ 
	if(mc>0){
		if(mp){
			mUrl=mUrl+"channel/"+mc+"/";
		}else{
			mUrl=mUrl+"channel/"+mc+"/";
		}
	}else{
		if(ma>0){
			mUrl=mUrl+urlStyle+"/"+ma+".html";
		}else{
			mUrl=mUrl;
		}
	}
}else{
	mUrl=mUrl+channelStyle;
}

if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
	if(window.location.href.indexOf("?mobile")<0){
		try{
			if(/Android|webOS|iPhone|iPod|BlackBerry|iPad/i.test(navigator.userAgent)){
				window.location.href=mUrl;
			}
		}catch(e){}
	}
}