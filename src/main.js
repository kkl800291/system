import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';

// 引入字体图标的css样式
import './assets/iconfont/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/style/normalize.css'

import '@/filters/index'

Vue.use(ElementUI, {
  size: 'small'
})

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
