//监听input的focus事件
let input = document.querySelectorAll('input')
for (let i = 0; i < input.length / 2; i++) {
    input[i].addEventListener('focus', function () {
        input[i].classList.add("signupGetFocus")
    })
    input[i].addEventListener('blur', function () {
        input[i].classList.remove("signupGetFocus");
    })
}
for (let i = parseInt(input.length / 2) + 1; i < input.length; i++) {
    input[i].addEventListener('focus', function () {
        input[i].classList.add("loginGetFocus")
    })
    input[i].addEventListener('blur', function () {
        input[i].classList.remove("loginGetFocus");
    })
}
//切换注册登陆
let $loginmark = $('#loginmark>.mark')
let $pink = $('#pink')
let $blue = $('#blue')
let $wrap = $('#wrap')
let $logo = $('#logo')
let $signupform = $('form[name=signup]')
let $loginform = $('form[name=login]')
let $pinkol = $('#pink>ol')
let $blueol = $('#blue>ol')
let $signupmark = $('#signupmark>.mark')
//切换到登录
$loginmark.on('click', function () {
    $pink.removeClass('hidden')
    $blueol.css({ "transform": "translateX(0)" })
    //蓝色的logo移到左边，right被覆盖为27.9vh
    $blueol.css({ "right": "27.9vh" })
    $blue.addClass('hidden')
    //文字隐藏
    $loginmark.children("span").addClass('hidden')
    $loginmark.css({
        //扩大15倍
        "transition-property": "transform",
        "transform": "scale(15)",
        "transition": "all 0.3s"
    })
    $loginmark.fadeOut(300)
    //3秒后，把loginmark缩小到原来的大小，并左移100%
    //此时loginmark距离wrap左边界2vh，left:-2vh,translateX(-100%)
    setTimeout(function () {
        $loginmark.css({
            "transform": "scale(1)",
            "transform": "translateX(-100%)",
            "transtion": "all 0.1s",
        })
        $loginmark.fadeIn(300)
        loginstatus()
    }, 300)
})
//登录状态
function loginstatus() {
    $wrap.addClass('wlogin')
    $logo.addClass('llogin')
    $signupform.addClass('hidden')
    $loginform.removeClass('hidden')
    $pinkol.css({
        //粉色的logo向左移动，此时的位置为：translateX(-23.3vh);right: 4.6vh;
        'transform': 'translateX(-23.3vh)',
        'transition': 'all 0.4s',
        'transition-timing-function': 'cubic-bezier(0.1,1.5,0.58,1)'
    })
    $signupmark.css({
        //signupmark向左移动，位置为：right:-25.3vh;translateX(-23.3vh);
        'transform': 'translateX(-23.3vh)',
        'transition': 'all 0.3s',
        'transition-timing-function': 'cubic-bezier(0.1,1.5,0.58,1'
    })
    $signupmark.children("span").removeClass('hidden')
}
//切换到注册
$signupmark.on('click', function () {
    $pink.addClass('hidden')
    //红色的logo移到右边,此时位置为：right：4.6vh
    $pinkol.css({ "transform": "translateX(0)" })
    $blue.removeClass('hidden')
    $signupmark.children('span').addClass('hidden')
    $signupmark.css({
        "transform": "scale(15)",
        "transition": "all 0.3s"
    })
    $signupmark.fadeOut(300)
    setTimeout(function () {
        $signupmark.css({
            //把signupmark放回原来的位置
            "transform": "scale(1)",
            "transtion": "all 0.1s"
        })
        signupstatus()
        $signupmark.fadeIn(300)
    }, 300)
})
//注册状态
function signupstatus() {
    $wrap.removeClass('wlogin')
    $logo.removeClass('llogin')
    $signupform.removeClass('hidden')
    $loginform.addClass('hidden')
    $blueol.css({
        'transform': 'translateX(23.3vh)',
        'transition': 'all 0.4s',
        'transition-timing-function': 'cubic-bezier(0.1,1.5,0.58,1)'
    })
    $loginmark.css({
        //把loginmark的traslate变为0，仅剩left:-2vh
        "transform": "translateX(0vh)",
        "transition": "0.3s",
        "transition-timing-function": "cubic-bezier(0.1,1.5,0.58,1)"
    })
    $loginmark.children("span").removeClass('hidden')
}
//leancloud登陆注册
var APP_ID = 'FXkT7c6Att6L6vCWsgXFTSJn-gzGzoHsz';
var APP_KEY = 'MSrguBIv3oIp2JBdbaNFzNFk';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

let signupForm = document.querySelector('form[name=signup]')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let user = new AV.User();
    user.setUsername(signupForm.username.value);
    user.setEmail(signupForm.email.value);
    user.setPassword(signupForm.password.value);
    user.signUp().then(function (loginedUser) {
        // welcomeUser()
        alert('您已注册成功')
    }, (function (error) {
        alert(JSON.stringify(error));
    }));
})
let welcomeUser = function () {
    let currentUser = AV.User.current()
    welcome.textContent = '你好' + currentUser.attributes.username
    logout.removeAttribute('hidden')
}
logout.onclick = (e) => {
    AV.User.logOut();
    window.location.reload();
}
let loginForm = document.querySelector('form[name=login]')
loginForm.onsubmit = (e) => {
    e.preventDefault()
    let username = loginForm.username.value
    let password = loginForm.password.value
    AV.User.logIn(username, password).then(function (loginedUser) {
        // welcomeUser()
        alert('您已登录成功')
    }, function (error) {
        if (error.code === 210) {
            alert('用户名和密码不匹配')
        } else if (error.code === 211) {
            alert('用户名不存在')
        }
    });
}