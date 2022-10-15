<template>
  <div>
    This is My Home Components
    <p @click="$store.commit('add',1)">"count:"{{$store.state.count}}</p>
    <p @click="$store.dispatch('add',1)">"async count:"{{$store.state.count}}</p>
    <p >"getters count:"{{$store.getters.doubleCount}}</p>
  </div>
</template>

<script>
export default {
  name:'MyHome'
}
</script>

<style>

</style>