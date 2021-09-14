import Vue from 'vue';
import App from './App.vue';
import store from './store';
import design from './design';

Vue.config.productionTip = false

new Vue({
  store,
  design,
  render: h => h(App)
}).$mount('#app')
