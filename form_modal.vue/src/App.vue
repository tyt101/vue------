<template>
  <div id="app">
    <MyForm :model="form" :rules="rules" ref="myform">
      <MyFormItem label="账号：" prop="username">
        <MyInput v-model="form.username" placeholder="请输入账号"/>
      </MyFormItem>
      <MyFormItem label="密码" prop="password" placeholder="请输入密码">
        <MyInput v-model="form.password"/>
      </MyFormItem>
      <MyFormItem>
        <button type="submit" @click="handleValidate">校验</button>
      </MyFormItem>
    </MyForm>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import MyForm from './components/form.vue'
import MyFormItem from './components/form-item.vue'
import MyInput from "./components/input.vue";

export default {
  name: 'App',
  components: {
    MyForm,
    MyFormItem,
    MyInput,
  },
  
  data() {
    return {
      form:{
        username:'',
        password:''
      },
      rules:{
        username:[{required:true,message:'用户名不能为空'}],
        password:[{required:true,message:'密码不能为空'}],
      }
    }
  },
  methods:{
    handleValidate(){
      this.$refs['myform'].validate(valid=>{
        console.log("valid:",valid)
          const notice = this.$modal({
            title:"我的提示",
            message:valid?"请求登录":"校验失败",
            duration:1000
          })
          notice.show()
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
