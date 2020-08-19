$(function () {
    // 获取用户信息
    getUserInof();

    // 退出
    var layer = layui.layer;
    $("#btnLogout").on('click', function () {
        layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 清空本地token
            localStorage.removeItem('token');
            location.href = "/login.html";
            layer.close(index);
        });
    })

});

// 获取信息（全局变量）
// 后面其他页面要调用
function getUserInof() {
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ""
        // },
        success: function (res) {
            console.log(res);

            // 判断状态码
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data);
        }
    })
}

// 用户头像渲染函数
function renderAvatar(user) {
    var name = user.nickname || user.username;
    $('#welcome').html("欢迎&nbsp;&nbsp;" + name);
    if (user.user_pic !== null) {
        // 有头像
        $('.layui-nav-img').show().attr("src", user.user_pic);
        $('.user-avatar').hide();
    } else {
        // 没头像
        $('.layui-nav-img').hide();
        var text = name[0].toUpperCase();
        $(".user-avatar").show().html(text);
    }
}
