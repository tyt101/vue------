import Link from './router-link'
import View from './router-view'
// 挂在Vue-router
let Vue;
class VueRouter {
    constructor(option) {
        this.$options = option

        // 实现监听hash模式下url的变化，然后改变current
        const initialHashPath = window.location.hash.slice(1)       //hash值: #及后面的部分。
        Vue.util.defineReactive(this, 'current', initialHashPath)   //响应式定义一个current,当current改变的时候路由会根据对应的path找到对应的component来局部更新页面
        Vue.util.defineReactive(this,'matched',[])                  //matched数组，用来存放当前路由以及前面所有的父级路由
        this.match()                                                //开始递归匹配路由
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
        routes = routes || this.$options.routes                                 //当routes不存在，默认为我们配置的所有routes(this.$options.routes)
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
VueRouter.install = function(_Vue) {
    // 保存构造函数，在VueRouter中使用 
    Vue = _Vue

    // 挂在$router
    // mixin混入可以获取所有的组件
    Vue.mixin({
        beforeCreate() {
            if (this.$options.router) {                             
                Vue.prototype.$router = this.$options.router            //将router挂载到Vue上(这样可以通过this.$router来访问router.router中包含了路由的)
            }
        },
    })

    Vue.component('router-link', Link)                                  //自定义router-link组件

    Vue.component('router-view', View)                                  //自定义router-view组件
}

export default VueRouter