import http from '@/utils/http'


// 获取订单列表
export const api_order_list = params => {
    return http({
        url: '/order/list',
        method: 'get',
        params
    })
}

// 获取订单详情
export const api_order_detail = params => {
    return http({
        url: '/order/detail',
        method: 'get',
        params
    })
}

// 修改订单
export const api_order_edit = data => {
    return http({
        url: '/order/edit',
        method: 'post',
        data
    })
}