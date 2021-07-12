import Vue from 'vue' // 通过ES6模块化语法引入vue
import App from './App'

Vue.config.productionTip = false

new Vue({
  el: "#app",
  render: h => h(App)
})
