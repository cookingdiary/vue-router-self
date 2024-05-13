import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


//前端路由 routes
//hash模式 根据hash不同渲染不同的组件，可以通过windows.addEventListener('hashchange')可以监听到hash值的变化。
//hash问题， 1.所有路径都有‘#’锚点，2.服务端无法获取锚点，无法根据对应的路径去解析内容，无法实现seo优化，不需要服务端支持。
//history模式，h5提供的api，好处是没有#，可以改变路径，同时强制刷新的时候会带上路径，服务端可以解析次路径，支持seo优化，需要服务端支持。

//Node中没有前端url地址，所以内部采用的是memeryHistory node + vue中实现路由跳转。