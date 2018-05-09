<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.username" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">欢迎登陆系统</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
// import Cookies from 'js-cookie';
//import axios from 'axios';
import api from '../api';

export default {
    data () {
        return {
            form: {
                username: 'iview_admin',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    let serverUrl = this.$store.state.app.serverUrl;
                    // 发送一个 POST 请求
                   const message = this.$Message;

                   api.post('http://localhost:8080/webLogin', this.form).then(function(response){
                      console.log('return:');
                      console.log(response.data.msg);
                     message.success(response.data.msg);
                    });




//                  api.post('http://10.10.13.35:8080/webLogin', {username: 'abc', password: 'abc'}).then().catch();
//                  api.post('http://10.10.13.57:8080/sys/login', {username: 'linhm', password: '123456'}).then().catch();


//                      Cookies.set('user', this.form.userName);
//                      Cookies.set('password', this.form.password);
//                      this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
//                      if (this.form.userName === 'iview_admin') {
//                          Cookies.set('access', 0);
//                      } else {
//                          Cookies.set('access', 1);
//                      }
//                      this.$router.push({
//                          name: 'home_index'
//                      });
                  }
            });
        }
    }
};
</script>

<style>

</style>
