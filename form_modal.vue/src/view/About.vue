<template>
  <div>
    <p>This is My About Component</p>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name:'MyAbout'
}
</script>

<style scoped>
    div{
        font-size: 30px;
        font-weight: bold;
    }
</style>