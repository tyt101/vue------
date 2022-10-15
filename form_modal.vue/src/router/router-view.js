export default {
    render(h) {
        const { routeMap, current } = this.$router
        let Component = routeMap[current].component || null
        return h(Component)
    }
}