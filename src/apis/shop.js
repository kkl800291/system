import http from '@/utils/http'

// 获取店铺详情
export const api_shop_info = () => {
    return http({
        url: '/shop/info',
        method: 'get'
    })
}

// 店铺内容修改
export const api_shop_edit = data => {
    return http({
        url: '/shop/edit',
        method: 'post',
        data
    })
}