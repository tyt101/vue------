import Vue from "vue";
import Vuex from './vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        add(state, payload) {
            state.count += payload
        }
    },
    actions: {
        add({ commit }, payload) {
            setTimeout(() => {
                commit('add', payload)
            }, 1 * 1000)
        }
    },
    getters: {
        doubleCount(state) {
            return state.count * 2
        }
    }
})