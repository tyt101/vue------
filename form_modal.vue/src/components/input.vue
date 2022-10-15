<template>
  <div>
    <input :type="type" :value="value" @input="onInput" v-bind="$attrs" />
  </div>
</template>

<script>
import emitter from '@/mixins/emitter'
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
    mixins:[emitter],
    methods: {
        onInput(e){
            this.$emit('input',e.target.value)
            // 派发事件让form-item进行校验
            // 是否可以用this.$emit???  不行：因为slot是个坑，没 法接收呀
            // 使用$parent造成了一个耦合，当MyInput的外层组件不是MyFormItem的时候，就会引起功能丧失，所以引起了耦合
            // 通过源码，我们知道官方实现是通过混入了一个emitters，然后通过dispatch派发事件。
            // this.$parent.$emit('validate')
            this.dispatch("MyFormItem","validate")
        }
    },
}
</script>

<style>

</style>