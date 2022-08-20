//cnzz统计
document.writeln("<script type=\"text/javascript\">var cnzz_protocol = ((\"https:\" == document.location.protocol) ? \" https://\" : \" http://\");document.write(unescape(\"%3Cspan id=\'cnzz_stat_icon_1279401153\'%3E%3C/span%3E%3Cscript src=\'\" + cnzz_protocol + \"s5.cnzz.com/z_stat.php%3Fid%3D1279401153\' type=\'text/javascript\'%3E%3C/script%3E\"));</script>");

//百度统计
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?d3036868b5efcd31197e54916da44e61";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();

//专题百度统计
var pathname = window.location.pathname;
var pathnameArr = pathname.split("/");
if(pathnameArr[1] == 'zt'){
    var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?e9e5d7b6880fd68ffef2a10ba97f1b06";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
}

//追踪下载按钮点击事件
/*
if (location.href.split('/')[3] === 'soft') {
    $(".local_download").on("click", function() {
        _hmt.push(['_trackEvent', 'softdown', 'click']);
    });
}else if(location.href.split('/')[3] === 'win7' || location.href.split('/')[3] === 'windows8' || location.href.split('/')[3] === 'win10' || location.href.split('/')[3] === 'linux' || location.href.split('/')[3] === 'xp' || location.href.split('/')[3] === 'up'){
    $(".local_download").on("click", function() {
        _hmt.push(['_trackEvent', 'windowsdown', 'click']);
    });
}

$("#xunleidown").on("click", function() {
    _hmt.push(['_trackEvent', 'xunleidown', 'click']);
});

$(".local_download_xzq").on("click", function() {
    _hmt.push(['_trackEvent', 'gaosudown', 'click']);
});
$(".btn-dl_swift").on("click", function() {
    _hmt.push(['_trackEvent', 'gaosudown', 'click']);
});
*/

//百度主动推送
(function(){
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    }
    else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();
