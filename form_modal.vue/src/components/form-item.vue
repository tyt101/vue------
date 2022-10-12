<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <p v-if="error">{{error}}</p>
  </div>
</template>

<script>
import Schema from 'async-validator'
export default {
    name:'MyFormItem',
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
    },
}
</script>

<style>

</style>