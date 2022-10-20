export default {
    render(h) {
        this.$vnode.data.routerView = true                                  //通过routerView来记录是否已经被访问
        let dept = 0                                                        //当前路由深度
        let parent = this.$parent                                           //获取当前路由组件的父路由组件，直到找到parent为undefined则深度寻找完毕，并且通过dept来记录深度
        while(parent){
            const vNodeData = parent.$vnode ? parent.$vnode.data:{}
            if(vNodeData){
                if(vNodeData.routerView){
                    dept ++
                }
            }
            parent = parent.$parent
        }

        // const { routeMap, current } = this.$router
        let Component =  null                                               //初始化要渲染出来的component为null
        let route = this.$router.matched[dept]                              //获取对应深度的路由
        if(route){
            Component = route.component                                     //根据路由定位到组件
        }   
        return h(Component)                                                 //render渲染虚拟DOM
    }
}

// history模式下刷新为什么会出现404的情况：因为重新刷新，http server会直接从当前url下寻找资源，但是spa(单页面应用)的路由是虚拟的，所以找不到资源(404)。那么就需要重定位让他从根路径下寻找
// history模式下避免404解决方式：
module.exports = {
    publicPath: '/', //这个必须，引入静态资源需要从根路径引入，否则会找不到静态资源
    devServer: {
        // history模式下的url会请求到服务器端，但是服务器端并没有这一个资源文件，就会返回404，所以需要配置这一项
        historyApiFallback: {
            index: '/index.html' //与output的publicPath
        },
    },
}