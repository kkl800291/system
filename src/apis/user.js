// 与账户相关的接口

import http from '@/utils/http'

// 登录
export const api_users_checkLogin = (data) => {
    return http({
        url: '/users/checkLogin',
        method: 'post',
        data
    })
}

// 账号列表
export const api_users_list = params => http({
    url: '/users/list',
    method: 'get',
    params
})

// 检查账号是否重复
export const api_users_repeat = data => {
    return http({
        url: '/users/repeat',
        method: 'post',
        data
    })
}

// 添加账号
export const api_users_add = data => {
    return http({
        url: '/users/add',
        method: 'post',
        data
    })
}

// 修改账号
export const api_users_edit = data => {
    return http({
        url: '/users/edit',
        method: 'post',
        data
    })
}

// 删除账号
export const api_users_del = params => http({
    url: '/users/del',
    method: 'get',
    params
})

// 批量删除账号
export const api_users_batchdel = data => http({
    url: '/users/batchdel',
    method: "post",
    data
})

// 检查旧密码是否正确
export const api_users_checkoldpwd = params => {
    return http({
        url: '/users/checkoldpwd',
        method: 'get',
        params
    })
}
// 修改密码
export const api_users_editpwd = data => {
    return http({
        url: '/users/editpwd',
        method: 'post',
        data
    })
}
// 获取个人中心数据
export const api_users_info = () => {
    return http({
        url: '/users/info',
        method: 'get'
    })
}
// 修改用户头像
export const api_users_avataredit = params => http({
    url: '/users/avataredit',
    method: 'get',
    params
})