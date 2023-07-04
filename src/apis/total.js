// 统计
import http from '@/utils/http'

// 首页报表
export const api_order_totaldata = () => {
    return http({
        url: '/order/totaldata',
        method: 'get'
    })
}
// 订单报表
export const api_order_ordertotal = params => {
    return http({
        url: '/order/ordertotal',
        method: 'get',
        params
    })
}