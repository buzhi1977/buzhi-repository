<template>
    <div class="main">
        <div class="login-header">
            <div class="header-content">通用后台管理系统</div>
        </div>
        <div class="login-content">
            <div class="login-left"></div>
            <div class="login-right">
                <div class="right-content">
                    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="form.username" placeholder="用户名为admin/user"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="form.password" type="password" @keyup.enter="onSubmit"
                                placeholder="密码无校验"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button style="width: 100%;" type="primary" @click="onSubmit">登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>

            </div>
        </div>
    </div>
</template>
<script>

import {menuAll} from './routerData.js'
import {menuDataAdmin} from './routerData.js'

import {menuDataUser} from './routerData.js'
export default {
    data() {
        return {
            form: {
                username: "",
                password: ""
            },
            rules: {
                username: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                ],
                password: [{ required: true, message: "请输入密码", trigger: "blur" }],
            },

        }
    },
    methods: {
        onSubmit() {
            console.log("=========login", this.form);
            // console.log("==========menuData", menuDataAdmin, menuDataUser)
            this.$refs.form.validate((valid) => {
                if (valid) {
                    //接口返回true则跳转，否则提示错误
                    if (this.form.username == 'admin' || this.form.username == 'user') {
                        //请求后端登录接口获取token
                        const token = Math.round(Math.random() * (100000000 - 10000000)) + 100000000;
                        localStorage.setItem("token", token);
                        localStorage.setItem('username',this.form.username)
                        if (this.form.username == 'admin') this.$store.commit('setMenu', menuDataAdmin)
                        else this.$store.commit('setMenu', menuDataUser)
                        this.$store.commit("addMenu", this.$router);
                        this.$router.push('/home')
                    }
                    else
                        this.$message.error("用户名或密码错误")
                }
            })

        }
    }
}
</script>
<style lang="less" scoped>
.main {
    margin: 0;
    padding: 0;
    background-image: url(../assets/image/login.png);
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
}

.login-header {
    width: 100%;
    height: 300px;

    .header-content {
        position: absolute;
        left: 40%;
        top: 25%;
        color: #fff;
        font-size: 36px;
        font-weight: bold;
    }
}

.login-content {
    width: 100%;
    height: 500px;

    .login-left {
        // width: 30%;
        // height: 100%;
    }

    .login-right {
        .right-content {
            position: absolute;
            left: 55%;
            top: 60%;
            width: 25%;

            .el-button {
                background-image: linear-gradient(to right, #c3e3f8, #095ba0);
            }
        }
    }
}
</style>