var closeAble = false;
let orderId = '';
var timer;
$(function () {

    orderId = storage.getItem('orderId')

    fetchInit()
    // 获取当前页面链接 让手表页返回支付页
    let urls = window.location.href
    // console.log(urls);
    storage.setItem('urls', urls)
    // 如果是1就证明点击过立即领取

    // 走查询
    if (storage.getItem("tj") == 1) {
        _checkIsPayed()
    }

    document.addEventListener("visibilitychange", function () {
        let hiddent = document.hidden;
        if (!hiddent) {
            window.location.reload()
        }
    });

    // 点击活动规则里的确认领取
    $('.ljlq-button').click(function () {
        createOrder()
    })
    //点击图片拉起支付
    $('.tpzf').click(function () {
        createOrder()

    })

    var retain = function () {
        var orderId = storage.getItem('orderId')
        if (!closeAble && !orderId) {
            _showlimitedTimeReward()
        } else {
            window.history.back()
        }
    }
    setTimeout(function () {
        window.removeEventListener("popstate", retain, !1)
        window.addEventListener("popstate", retain, !1)
    }, 200)

    // 关闭按钮
    $('#goodsContainer').find('.close').on('click', function () {
        $('#goodsContainer').hide()
    })
    $('#xiadan').click(function () {
        // console.log("111");
        createOrder()
    })

})
storage.setItem('sourceId', 1)   // 设置sourceId
// 业务相关参数
var requestUrl = 'https://api.laiesi.com',
    price = 0,
    isRetain = 0,
    discountPrice = 0,
    jumpType = 0,
    aliType = 0,
    wxType = 0,
    payType = 1,
    waitTime = 30;

// UI 相关参数
var isSubmit = false,
    checking = false,
    showlimitedTimeRewardTimeout = null,
    countdownnumber = 60.0;

// 检查是否支付
var _checkIsPayed = function () {

    var orderId = storage.getItem('orderId')
    if (orderId) {
        console.log(orderId);
        $('.modal-cx').show()
        // 点击已付款
        $('#payfinish').click(function () {
            $('#payfinish').html('查询中...')
            // alert('准备走接口')
            $.ajax({
                type: 'GET',
                url: requestUrl + '/api/wxPay/' + orderId,
                success: function (res) {
                    if (res.data == 'SUCCESS') {
                        window.location.href = './success.html'
                    } else {
                        toast('未查询到付款记录，请稍后重试')
                    }
                },
                error: function () {
                    toast('接口请求失败，请稍后重试')
                },
                complete: function () {
                    $('#payfinish').html('已完成')
                }
            })
        })

        $('#unpay').click(function () {	// 点击未支付
            createOrder()
        })
    }
}

// 初始化
var fetchInit = function (callback) {
    getFakeUserId()
    // 获取推啊参数
    var code = getQueryVariable('code')
    var a_oId =  getQueryVariable('a_oId') // 推啊
    var qcjParamStr = getQueryVariable('qcjParamStr') 
    var nadkey = getQueryVariable('nadkey') // 诺何
    var userkey = getQueryVariable('userkey') // xmob
    var sz_rli = getQueryVariable('sz_rli') // 索知优聚
    var bxm_id = getQueryVariable('bxm_id') // 变现猫
    if (code) {
        storage.setItem('code', code)
        if (code == 'FLiuNT' || code == 'jlSyqC') {
            $('.company').hide()
        }
        if (code == 'zzaWSS') {
            $('.company:eq(0)').text('南京智云天下软件科技有限公司')
            $('.r_company').text('南京智云天下软件科技有限公司')
            $('.company:eq(1)').text('苏ICP备2020055186号-3')
        }
        if (code == 'dgZFCZ') {
            $('.company').text('')
            $('.r_company').text('')
           
        }
    }
    if(a_oId) {
        storage.setItem('a_oId', a_oId)
        storage.removeItem('qcjParamStr')
        storage.removeItem('nadkey')
        storage.removeItem('userkey')
        storage.removeItem('sz_rli')
        storage.removeItem('bxm_id')
    }  
    
    if(qcjParamStr) {
        storage.setItem('qcjParamStr', qcjParamStr)
        storage.removeItem('a_oId')
        storage.removeItem('nadkey')
        storage.removeItem('userkey')
        storage.removeItem('sz_rli')
        storage.removeItem('bxm_id')
    }
    if(nadkey) {
        storage.setItem('nadkey', nadkey)
        storage.removeItem('qcjParamStr')
        storage.removeItem('a_oId')
        storage.removeItem('userkey')
        storage.removeItem('sz_rli')
        storage.removeItem('bxm_id')
    }
    if(userkey) {
        storage.setItem('userkey', userkey)
        storage.removeItem('qcjParamStr')
        storage.removeItem('a_oId')
        storage.removeItem('nadkey')
        storage.removeItem('sz_rli')
        storage.removeItem('bxm_id')
    }
    if(sz_rli) {
        storage.setItem('sz_rli', sz_rli)
        storage.removeItem('userkey')
        storage.removeItem('qcjParamStr')
        storage.removeItem('a_oId')
        storage.removeItem('nadkey')
        storage.removeItem('bxm_id')
    }
    if(bxm_id) {
        storage.setItem('bxm_id', bxm_id)
        storage.removeItem('userkey')
        storage.removeItem('qcjParamStr')
        storage.removeItem('a_oId')
        storage.removeItem('nadkey')
        storage.removeItem('sz_rli')
    }
   console.log(a_oId);

    document.addEventListener("visibilitychange", function () {
        let hiddent = document.hidden;
        if (!hiddent) {
            window.location.reload()
        }
    });

    var formPrice = storage.getItem('price')
    $('.formPrice').html(formPrice)
    // 初始化请求页面信息
    $.ajax({
        // url: requestUrl + '/api/link/getLinkInfo?linkPath=' + code,
        url: requestUrl + '/api/getMedia/' + code,
        success: function (res) {
            if (res.data) {
                console.log(res.data.ad);
                ad = res.data.ad
                storage.setItem('ad', ad)
                caId = res.data.caId
                storage.setItem('caId', caId)
                id = res.data.id
                storage.setItem('id', id)
                jumpType = res.data.jumpType
                storage.setItem('jumpType', jumpType)
                jumpUrl = res.data.jumpUrl
                storage.setItem('jumpUrl', jumpUrl)
                payId = res.data.payId
                storage.setItem('payId', payId)
                payType = res.data.payType
                storage.setItem('payType', payType)
                price = res.data.chargeAmount
                storage.setItem('price', price)
                storage.setItem('redPacket',  res.data.redPacket)

                $('.jine').html(price)
                $('.hdje').html(price)

                if (storage.getItem('ureId')) {
                    console.log(storage.getItem('urlId'));
                } else {
                    // long()
                }
                // if (storage.getItem('price') > 40) {
                //     $('.redPacket').html('888')
                // } else {
                //     $('.redPacket').html('188')
                // }
            }

        },

    })
}

$('input[type=radio][name=payType]').change(function () {
    storage.setItem('payType', this.value)
});


// 登录接口
var long = function () {
    var long = {
        mobile: '13273749523',
        caId: storage.getItem('caId'),
        caLinkId: storage.getItem('id'),
        aoId: storage.getItem('a_oId')
    }

    $.ajax({
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(long),
        url: requestUrl + '/api/userClient/login',
        contentType: "application/json; charset=utf-8",
        success: function (res) {
            if (res.code == 200) {
                let ureId = res.data
                // 用户Id
                storage.setItem('ureId', ureId)

            } else {
                toast('注册/登录失败，请稍后重试')
            }
        },
        error: function () {
            toast('接口请求失败，请重试')
        },
        complete: function () {
            isSubmit = false
        }
    })
}


// 判断微信内置浏览器
var isWeiXin = false
var ua = window.navigator.userAgent.toLowerCase();
if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    isWeiXin = true
} else {
    isWeiXin = false
}
//下单
var createOrder = function () {
    // $('#loader').show();
    storage.setItem('tj', 1)
    // console.log(payType)
    var orderJson = {
        payType: storage.getItem('payType'),
        price: storage.getItem('price'),
        payPrice: storage.getItem('price'),
        mobile: storage.getItem("ureId"),
        wxInside: isWeiXin ? 1 : 0,
        orderType: 0,
        caId: storage.getItem('caId'),
        caLinkId: storage.getItem('id'),
        aoId: storage.getItem('a_oId'),
        channelCode: storage.getItem('code'),
        qcjParamStr: storage.getItem('qcjParamStr'),
        nadkey: storage.getItem('nadkey'),
        xmobId: storage.getItem('userkey'),
        szRli: storage.getItem('sz_rli'),
        bxmId: storage.getItem('bxm_id'),
        fakeUserId: getFakeUserId()
    }
    $.ajax({
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(orderJson),
        // url: requestUrl + '/api/aliPayConfig/aliPay',
        url: requestUrl + '/api/wxPay/create',
        contentType: "application/json; charset=utf-8",
        success: function (res) {
            // $('#loader').hide();
            console.log(res, '下单返回数据');
            if (res.code != 200) {
                toast(res.msg)
                return
            }
            var orderId = res.data.orderNo
            storage.setItem('orderId', orderId)
            if (res.data.wxDomain) {
                window.location.href = res.data.wxDomain + '?mwebUrl=' + encodeURIComponent(res.data.mwebUrl) + '&mwebForm' + encodeURIComponent(res.data.mwebForm)
                return false
            }
            // 微信内外
            if (res.data.webUrl) {
                window.location.href = res.data.webUrl
                // location.replace(res.data.mwebUrl)
                return false
            }
            // 支付宝
            if (res.data.mwebForm) {
                $('body').append(res.data.mwebForm)
                return false
            }
        },
        error: function () {
            // $('#loader').hide();
            toast('接口请求失败，请重试')
        }
    })
}

var countDown = function () {
    if (countdownnumber > 0) {
        countdownnumber = countdownnumber - 0.1
        $('#countDown').html(countdownnumber.toFixed(1))
        setTimeout(countDown, 100)
    } else {
        $('#popContainer').hide()
        var price = storage.getItem('servicePrice')
        storage.setItem('price', price)
        storage.setItem('isRetain', 0)
    }
}
var toast = function (msg, time) {
    // 1. 创建要添加的 DOM 元素
    const toast = document.createElement('div');
    toast.className = 'am-toast am-toast-mask';
    toast.innerHTML = '<span><span class="am-toast-notice-content">' + msg + '</span></span>';

    // 2. 添加元素到 body 标签中
    document.body.appendChild(toast);

    setTimeout(function () {
        $(".am-toast").fadeOut()
    }, time ? time : 1500)
}

//获取url参数
var getQueryVariable = function (variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return ('');
}

var isIOS = function () {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
        return "android";
    }
    if (isiOS) {
        return "ios";
    }
    return false;
}

// url解码
var UrlDecode = function (zipStr) {
    var uzipStr = '';
    for (var i = 0; i < zipStr.length; i += 1) {
        var chr = zipStr.charAt(i);
        if (chr === '+') {
            uzipStr += ' ';
        } else if (chr === '%') {
            var asc = zipStr.substring(i + 1, i + 3);
            if (parseInt('0x' + asc) > 0x7f) {
                uzipStr += decodeURI('%' + asc.toString() + zipStr.substring(i + 3, i + 9).toString());
                i += 8;
            } else {
                uzipStr += AsciiToString(parseInt('0x' + asc));
                i += 2;
            }
        } else {
            uzipStr += chr;
        }
    }

    return uzipStr;
}

var StringToAscii = function (str) {
    return str.charCodeAt(0).toString(16);
}

var AsciiToString = function (asccode) {
    return String.fromCharCode(asccode);
}

var getFakeUserId = function () {
    let fakeUserId = storage.getItem('fakeUserId')
    if (fakeUserId == null || fakeUserId == 'undefined') {
        fakeUserId = generateRandomString()
        storage.setItem('fakeUserId', fakeUserId)
    }
    return fakeUserId
}

function generateRandomString() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
  
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  }

// 所有弹窗绑定关闭按钮
$('#popContainer').find('.close').on('click', function () {
    $('#popContainer').hide()
    var price = storage.getItem('servicePrice')
    storage.setItem('price', price)
    storage.setItem('isRetain', 0)
})

$('.pop-mask').click(function () {
    if ($(this).parent().attr('id') == 'popContainer') {
        $('#popContainer').hide()
    } else {
        $(this).parent().hide()
    }
})

$('#customerService').click(function () {
    $('#customerServiceContainer').show()
    $('#customerServiceContainer').find('.close').on('click', function () {
        $('#customerServiceContainer').hide()
    })
})

var winHeight = $(window).height();
// console.log(winHeight);
$(window).resize(function () {
    var thisHeight = $(this).height();
    if (winHeight - thisHeight > 50) {
        //软键盘弹出
        $('.diog-content').css({ 'top': '-160px', 'position': "absolute" });
    }
})
