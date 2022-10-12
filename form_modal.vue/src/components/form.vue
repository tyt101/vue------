<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
    name:'MyForm',
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
    methods:{
        validate(cb){
            const tasks = this.$children.filter(item=>item.prop).map(row=>{
                return row.validate()
            })
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