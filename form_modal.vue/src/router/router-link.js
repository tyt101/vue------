export default {
    render(h) {
        // h('标签','属性','内容')
        console.log('router-link', this, this.$attrs.to)
        return h('a', { attrs: { href: '#' + this.$attrs.to } }, [this.$slots.default])
    },
}