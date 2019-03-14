import Vue from 'vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//import '@/styles/index.scss' // global css
import VueSvgGauge from 'vue-svg-gauge';

import App from './App.vue'
import router from './router.js'
import './plugins/element.js'
import VueChartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.use(ElementUI);
Vue.use(VueSvgGauge);
Vue.use(VueChartkick, {adapter: Chart})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})