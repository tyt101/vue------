import create from './util/create'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false
Vue.use(create)
let vm = new Vue({
    router,
    store,
    render: h => h(App),
})
vm.$mount('#app')
console.log("main.js", vm)