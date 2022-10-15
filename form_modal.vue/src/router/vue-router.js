import Link from './router-link'
import View from './router-view'
// 挂在Vue-router
let Vue;
class ViewRouter {
    constructor(option) {
        this.$options = option

        // 实现监听hash模式下url的变化，然后改变current
        const initialHashPath = window.location.hash.slice(1)
        Vue.util.defineReactive(this, 'current', initialHashPath)
        Vue.util.defineReactive(this,'matched',[])
        this.match()
        window.addEventListener('hashchange', this.onHashChange.bind(this))
        window.addEventListener('load', this.onHashChange.bind(this))

        // 将路由path和Component做一个映射
        // this.routeMap = {}
        // this.$options.routes.forEach(route => {
        //     this.routeMap[route.path] = route
        // })
    }
    onHashChange() {
        this.current = window.location.hash.slice(1)
        this.matched = []
        this.match()
    }
    match(routes){
        routes = routes || this.$options.routes
        for (const route of routes) {
            if(route.path === '/' && this.current === '/'){
                this.matched.push(route)
                return
            }
            if(route.path !== '/' && this.current.indexOf(route.path)!==-1){
                this.matched.push(route)
                if(route.children){
                    this.match(route.children)
                }
            }
        }
    }
}
ViewRouter.install = function(_Vue) {
    // 保存构造函数，在VueRouter中使用 
    Vue = _Vue

    // 挂在$router
    // mixin混入可以获取所有的组件
    Vue.mixin({
        beforeCreate() {
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router
            }
        },
    })

    Vue.component('router-link', Link)

    Vue.component('router-view', View)
}

export default ViewRouter