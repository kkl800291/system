// 与商品相关的接口
import http from '@/utils/http'

export const api_goods_catelist = params => {
    return http({
        url: '/goods/catelist',
        method: 'get',
        params
    })
}
// 添加分类
export const api_goods_addcate = data => {
    return http({
        url: '/goods/addcate',
        method: 'post',
        data
    })
}

// 删除分类
export const api_goods_delcate = params => {
    return http({
        url: '/goods/delcate',
        method: 'get',
        params
    })
}

// 修改分类
export const api_goods_editcate = data => {
    return http({
        url: '/goods/editcate',
        method: 'post',
        data
    })
}