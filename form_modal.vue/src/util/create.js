import Vue from "vue";
import MyModal from "../components/modal.vue"

function create(Component, props) {
    const vm = new Vue({
        render: h => h(Component, { props })
    }).$mount()
    document.body.append(vm.$el)

    const comp = vm.$children[0]

    // 删除，释放内存
    comp.remove = function() {
        document.body.removeChild(vm.$el)
        vm.$destory()
    }
    console.log("create.js", vm)
    return comp
}

// Vue.extend用法？
// function createExtendWay(Component, props) {
//     const Ctor = Vue.extend(Component)
//     const comp = new Ctor({ propsData: props })
//     comp.$mount()
//     document.body.appendChild(comp.$el)
//     comp.remove = function() {
//         document.body.removeChild(comp.$el)
//         comp.$destory()
//     }
// }
// export default { create, createExtendWay }
export default {
    install(Vue) {
        Vue.prototype.$modal = function(options) {
            return create(MyModal, options)
        }
    }
}