;
// 解密方法
function decrypt(word, key) {
	key = CryptoJS.enc.Utf8.parse(key);
	var data = CryptoJS.AES.decrypt(word, key, {
		iv: key,
		padding: CryptoJS.pad.Pkcs7
	}).toString(CryptoJS.enc.Utf8);
	return data;
}

let axiosBaseUrl = "";
if(window.location.hostname == '127.0.0.1') {
	axiosBaseUrl = "https://mianshuixing.com";
}



// 获取url参数
function getQueryVariable(paraName) {
	var url = document.location.toString();
	var arrObj = url.split("?");
	if (arrObj.length > 1) {
		var arrPara = arrObj[1].split("&");
		var arr;
		for (var i = 0; i < arrPara.length; i++) {
			arr = arrPara[i].split("=");
			if (arr != null && arr[0] == paraName) {
				return arr[1];
			}
		}
		return "";
	} else {
		return "";
	}
}

function isWeiXin() {
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		return 'weixin'; //是微信浏览器
	} else if(ua.match(/Alipay/i)=="alipay") {
		return 'zhifubao'; //其他设备
	} else {
		return 'other'
	}
}

// 话费百度代码
{
	var _hmt = _hmt || [];
	(function() {
		var hm = document.createElement("script");
		hm.src = "https://hm.baidu.com/hm.js?a5420aa4952752cadc7e9f20c8c0f5a3";
		var s = document.getElementsByTagName("script")[0];
		s.parentNode.insertBefore(hm, s);
	})();
}
