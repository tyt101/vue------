<template>
  <div>
    <input :type="type" :value="value" @input="onInput" v-bind="$attrs" />
  </div>
</template>

<script>
export default {
    name:'MyInput',
    inheritAttrs:false,
    props:{
        value:{
            type:String,
            default:''
        },
        type:{
            type:String,
            default:'text'
        }
    },
    methods: {
        onInput(e){
            this.$emit('input',e.target.value)
            // 派发事件让form-item进行校验
            // 是否可以用this.$emit???  不行：因为slot是个坑，没法接收呀
            this.$parent.$emit('validate')
        }
    },
}
</script>

<style>

</style>