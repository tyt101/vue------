let Vue;
class Store {
    constructor(options) {
        this._mutations = options.mutations
        this._actions = options.actions
        this._getters = options.getters

        // 通过new Vue直接实现了响应式
        // 通过Vue.util.defineReactive实现响应式
        // 通过Vue.$set的方式实现响应式
        this.state = new Vue({
            data: options.state,
        })

        // 改变this指向，指向Store。
        this.commit = this.commit.bind(this)
        this.dispatch = this.dispatch.bind(this)
        this.getters = this.getters.apply(this)
    }
    commit(type, payload) {
        const entry = this._mutations[type]
        if (!entry) {
            console.error("没有 mutations type")
            return
        }
        entry(this.state, payload)
    }
    dispatch(type, payload) {
        const entry = this._actions[type]
        if (!entry) {
            console.error("没有 actions type")
            return
        }
        // 这里是直接把整个Store传入给entry，因为actions中第一个参数是可以通过解构来获取的
        entry(this, payload)
    }
    getters() {
        const allGetter = this._getters
        console.log("allGetter", allGetter)
        return allGetter
    }
}

function install(_Vue) {
    Vue = _Vue

    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store
                console.log("Vuex", this)
            }
        },
    })
}
export default {
    Store,
    install
}