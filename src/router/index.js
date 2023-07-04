import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

import Login from '@/views/login'  // 登录页面
import Layout from '@/views/layout/Layout.vue' // 主界面

// 配置路由
// const routes = [
//   // {
//   //   path: '/',
//   //   redirect: '/login',
//   // },
//   // 登录
//   {
//     path: '/login',
//     component: Login,
//   },
//   // 后台首页
//   {
//     path: '/',
//     component: Layout,
//     redirect: '/home',
//     // 路由元信息
//     meta: { title: '后台首页' },
//     children: [
//       {
//         path: '/home',
//         component: () => import('@/views/home/Home.vue')
//       }
//     ]
//   },
//   // 订单管理
//   {
//     path: '/',
//     component: Layout,
//     redirect: '/order',
//     meta: { title: '订单管理' },
//     children: [
//       {
//         path: '/order',
//         component: () => import('@/views/order/Order.vue')
//       },
//       {
//         path: '/detail/:id',
//         meta: { title: '订单详情' },
//         component: () => import('@/views/order/detail')
//       }
//     ]
//   },
//   // 商品管理
//   {
//     path: '/goods',
//     component: Layout,
//     redirect: '/goods/list',
//     meta: { title: '商品管理' },
//     children: [
//       {
//         path: '/goods/list',
//         meta: { title: '商品列表' },
//         component: () => import('@/views/goods/GoodsList.vue')
//       },
//       {
//         path: '/goods/add',
//         meta: { title: '商品添加' },
//         component: () => import('@/views/goods/GoodsAdd.vue')
//       },
//       {
//         path: '/goods/category',
//         meta: { title: '商品分类' },
//         component: () => import('@/views/goods/GoodsCategory.vue')
//       },
//     ]
//   },
//   // 店铺管理
//   {
//     path: '/',
//     component: Layout,
//     redirect: '/shop',
//     meta: { title: '店铺管理' },
//     children: [
//       {
//         path: '/shop',
//         component: () => import('@/views/shop/Shop.vue')
//       }
//     ]
//   },
//   // 账号管理
//   {
//     path: '/account',
//     component: Layout,
//     redirect: '/account/list',
//     meta: { title: '账号管理' },
//     children: [
//       {
//         path: '/account/list',
//         meta: { title: '账号列表' },
//         component: () => import('@/views/account/AccountList.vue')
//       },
//       {
//         path: '/account/add',
//         meta: { title: '账号添加' },
//         component: () => import('@/views/account/AccountAdd.vue')
//       },
//       {
//         path: '/account/modifypwd',
//         meta: { title: '修改密码' },
//         component: () => import('@/views/account/ModifyPassword.vue')
//       },
//     ]
//   },
//   // 销售统计
//   {
//     path: '/total',
//     component: Layout,
//     redirect: '/total/goods',
//     meta: { title: '销售统计' },
//     children: [
//       {
//         path: '/total/goods',
//         meta: { title: '商品统计' },
//         component: () => import('@/views/total/GoodsTotal.vue')
//       },
//       {
//         path: '/total/order',
//         meta: { title: '订单统计' },
//         component: () => import('@/views/total/OrderTotal.vue')
//       },
//     ]
//   },
//   // 个人中心
//   {
//     path: '/',
//     component: Layout,
//     redirect: '/personal',
//     meta: { title: '个人中心' },
//     children: [
//       {
//         path: '/personal',
//         component: () => import('@/views/personal')
//       }
//     ]
//   }
// ]

// 基础路由（所有的权限下都有这些路由）
const baseRoutes = [
  // 登录
  {
    path: '/login',
    component: Login,
  },
  // 个人中心
  {
    path: '/personal',
    component: Layout,
    redirect: '/personal',
    meta: { title: '个人中心' },
    children: [
      {
        path: '/personal',
        component: () => import('@/views/personal')
      }
    ]
  }
]

// 动态路由（通过权限从动态路由中筛选出你应该有的路由）
const dynamicRoutes = [
  // 后台首页
  {
    path: '/home',
    component: Layout,
    redirect: '/home',
    // 路由元信息
    meta: { title: '后台首页', roles: ['super', 'normal'], level: 1 },
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/Home.vue'),
        meta: { roles: ['super', 'normal'] }
      }
    ]
  },
  // 订单管理
  {
    path: '/order',
    component: Layout,
    redirect: '/order',
    meta: { title: '订单管理', roles: ['super', 'normal'], level: 1 },
    children: [
      {
        path: '/order',
        component: () => import('@/views/order/Order.vue'),
        meta: {
          roles: ['super', 'normal']
        }
      },
      {
        path: '/detail/:id',
        meta: { title: '订单详情', roles: ['super', 'normal'] },
        component: () => import('@/views/order/detail'),
      }
    ]
  },
  // 商品管理
  {
    path: '/goods',
    component: Layout,
    redirect: '/goods/list',
    meta: { title: '商品管理', roles: ['super', 'normal'], level: 2 },
    children: [
      {
        path: '/goods/list',
        meta: { title: '商品列表', roles: ['super', 'normal'] },
        component: () => import('@/views/goods/GoodsList.vue')
      },
      {
        path: '/goods/add',
        meta: { title: '商品添加', roles: ['super'] },
        component: () => import('@/views/goods/GoodsAdd.vue')
      },
      {
        path: '/goods/category',
        meta: { title: '商品分类', roles: ['super'] },
        component: () => import('@/views/goods/GoodsCategory.vue')
      },
    ]
  },
  // 店铺管理
  {
    path: '/shop',
    component: Layout,
    redirect: '/shop',
    meta: { title: '店铺管理', roles: ['super'], level: 1 },
    children: [
      {
        path: '/shop',
        component: () => import('@/views/shop/Shop.vue'),
        meta: { roles: ['super'] }
      }
    ]
  },
  // 账号管理
  {
    path: '/account',
    component: Layout,
    redirect: '/account/list',
    meta: { title: '账号管理', roles: ['super', 'normal'], level: 2 },
    children: [
      {
        path: '/account/list',
        meta: { title: '账号列表', roles: ['super', 'normal'] },
        component: () => import('@/views/account/AccountList.vue')
      },
      {
        path: '/account/add',
        meta: { title: '账号添加', roles: ['super'] },
        component: () => import('@/views/account/AccountAdd.vue')
      },
      {
        path: '/account/modifypwd',
        meta: { title: '修改密码', roles: ['super', 'normal'] },
        component: () => import('@/views/account/ModifyPassword.vue')
      },
    ]
  },
  // 销售统计
  {
    path: '/total',
    component: Layout,
    redirect: '/total/goods',
    meta: { title: '销售统计', roles: ['super'], level: 2 },
    children: [
      {
        path: '/total/goods',
        meta: { title: '商品统计', roles: ['super'] },
        component: () => import('@/views/total/GoodsTotal.vue')
      },
      {
        path: '/total/order',
        meta: { title: '订单统计', roles: ['super'] },
        component: () => import('@/views/total/OrderTotal.vue')
      },
    ]
  },
]

const router = new VueRouter({
  routes: baseRoutes
})
// 引入lodash
import _ from 'lodash'
import Store from '@/store'
// 计算出此权限下拥有的路由
export const calcRoute = () => {
  // 从本地获取权限
  let role = localStorage.getItem('role') // normal
  // 先将 dynamicRoutes 深拷贝（刷新后就不用拷贝了）
  // let copyDynamicRoutes = _.cloneDeep(dynamicRoutes)
  // 过滤一级路由
  let leve1Routes = dynamicRoutes.filter(item => {
    if (item.meta && item.meta.roles && item.meta.roles.includes(role)) {
      return true
    }
    return false
  })
  // 过滤二级路由
  leve1Routes.forEach(route => {
    // 判断一级路由下是否有二级路由
    if (route.children && route.children.length) {
      // 过滤二级路由
      let leve2Routes = route.children.filter(item => {
        // 判断二级路由是否包含此权限
        if (item.meta && item.meta.roles && item.meta.roles.includes(role)) {
          return true
        }
        return false
      })
      route.children = leve2Routes
    }
  })
  console.log('leve1Routes:', leve1Routes);
  // 将过滤好的路由追加到路由实例上
  leve1Routes.forEach(route => {
    router.addRoute(route)
  })
  // localStorage.setItem('leve1Routes', JSON.stringify(leve1Routes))
  console.log(11, Store);
  Store.commit('SET_NAV_LIST', leve1Routes)
}
calcRoute()

// 全局路由守卫
router.beforeEach((to, from, next) => {
  // to：你的目标路由对象（你要去哪儿）
  // from：你从哪个路由对象来（你从哪儿来）
  // next：放行
  let token = localStorage.getItem('token')
  // 判断token是否存在
  if (token) {
    // 直接放行
    next()
  } else {
    // 去除login路径
    if (to.path === '/login') {
      next()
    } else {
      // 跳转登录
      next('/login')
    }

  }
})

export default router
