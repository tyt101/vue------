import Vue from 'vue'
import VueRouter from './vue-router'
import Home from '../view/Home.vue'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
}, {
    path: '/about',
    name: 'about',
    component: () =>
        import ('../view/About.vue'),
    children:[{
        path:'/about/info',
        name:'info',
        component:{
            render(h){
                return h('div','tyt')
            }
        }
    }]
}]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router