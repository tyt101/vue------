<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <p v-if="error">{{error}}</p>
  </div>
</template>

<script>
import Schema from 'async-validator'
import emitter from '@/mixins/emitter'
export default {
    name:'MyFormItem',
    mixins:[emitter],
    inject:{
        myform:{
            default:{}
        }
    },
    props:{
        label:{
            type:String
        },
        prop:{
            type:String
        }
    },
    data() {
        return {
            error:''
        }
    },
    methods: {
        validate(){
            const rules = this.myform.rules[this.prop]
            const value = this.myform.model[this.prop]
            const desc = {[this.prop]:rules}
            const schema = new Schema(desc)
            return schema.validate({[this.prop]:value},errors=>{
                if(errors){
                    this.error = errors[0].message
                }else{
                    this.error = ""
                }
            })
        }
    },
    mounted() {
        this.$on('validate',()=>{
            this.validate()
        })
        if(this.prop){
            // 派发事件，通过MyForm新增一个字段
            this.dispatch('MyForm','kkb.form.addField',[this])
        }
    },
}
</script>

<style>

</style>