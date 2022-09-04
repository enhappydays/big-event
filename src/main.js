import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 1. 全部导入-ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 注意：element ui的样式往前放，自定义的global样式往后放， 保证global权重高
// 导入全局样式
import '@/styles/global.css'
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
