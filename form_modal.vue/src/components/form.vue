<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
    name:'MyForm',
    componentName:'MyForm',
    provide(){
        return{
            myform:this
        }
    },
    props:{
        model:{
            type:Object,
            required:true
        },
        rules:{
            type:Object,
        }
    },
    created() {
        this.fields = []
        this.$on('kkb.form.addField',item=>{
            this.fields.push(item)
        })
    },
    methods:{
        validate(cb){
            // 获取所有的孩子MyFormItem
            // const tasks = this.$children.filter(item=>item.prop).map(row=>{
            //     return row.validate()
            // })
            const tasks = this.fields.map(item=>item.validate())
            Promise.all(tasks).then(()=>{
                console.log('isOk')
                cb(true)
            }).catch(()=>{
                console.log("error")
                cb(false)
            })
        }
    }
}
</script>

<style>

</style>