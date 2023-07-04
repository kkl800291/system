import Vue from 'vue'
import Dayjs from 'dayjs'

export const forMateTime = (v, format = 'YYYY-MM-DD HH:mm:ss') => {
    return Dayjs(v).format(format)
}
export const toFixed2 = function (v, format = 2) {
    return v.toFixed(format)
}

export const forMateMoney = (v) => {
    return String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

let filters = {
    // 对象的简写 key -> forMateTime   value -> function() {}
    forMateTime,
    toFixed2,
    forMateMoney,
}
// 全局过滤器
// Vue.filter('forMateTime', forMateTime)
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

// let obj = {
//     name: '111'
// }

// let a = 'name'
// obj.name
// obj[a]