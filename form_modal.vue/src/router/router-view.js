export default {
    render(h) {
        this.$vnode.data.routerView = true
        let dept = 0
        let parent = this.$parent
        while(parent){
            const vNodeData = parent.$vnode ? parent.$vnode.data:{}
            if(vNodeData){
                if(vNodeData.routerView){
                    dept ++
                }
            }
            parent = parent.$parent
        }
        console.log("dept",dept)

        // const { routeMap, current } = this.$router
        let Component =  null
        let route = this.$router.matched[dept]
        if(route){
            Component = route.component
        }
        return h(Component)
    }
}