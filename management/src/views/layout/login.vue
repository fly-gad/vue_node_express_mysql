<!--
 * @Author: MrZhang
 * @Date: 2021-02-20 09:56:38
 * @Description: 登录
-->
<template>
    <div>
        <vue-particles
            color="#000"
            :particleOpacity="0.7"
            :particlesNumber="120"
            shapeType="circle"
            :particleSize="4"
            linesColor="#fff"
            :linesWidth="1"
            :lineLinked="true"
            :lineOpacity="0.4"
            :linesDistance="150"
            :moveSpeed="2"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="push"
            class="lizi"
        ></vue-particles>
        <div class="login">
            <el-card class="box-card">
                <div slot="header">
                    <span class="font-20">登录</span>
                </div>
                <div>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" autocomplete="off" class="demo-ruleForm">
                        <el-form-item prop="username">
                            <el-input placeholder="帐号" v-model="ruleForm.username" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" placeholder="密码" v-model="ruleForm.password" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="btn" type="primary" @click="submitForm('ruleForm')">登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import { env } from "@/util/env/index"
import * as User from "@/util/user/user"
export default {
    data() {
        var validateUsername = (rule, value, callback) => {
            if (!value) {
                callback(new Error("请输入帐号"))
            } else {
                callback()
            }
        }
        var validatePassword = (rule, value, callback) => {
            if (!value) {
                callback(new Error("请输入密码"))
            } else {
                callback()
            }
        }
        return {
            ruleForm: {
                username: "",
                password: "",
            },
            rules: {
                username: [{ validator: validateUsername, trigger: "blur" }],
                password: [{ validator: validatePassword, trigger: "blur" }],
            },
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const { username, password } = this.ruleForm
                    if ((username === "admin", password === "123456")) {
                        // 写入 cookie
                        const tokenValue = "1234564"
                        User.set(tokenValue)
                        setTimeout(() => {
                            // 跳转到首页
                            this.$router.push({
                                path: env.VUE_APP_Path_dashboard,
                            })
                        })
                    } else {
                        return false
                    }
                } else {
                    return false
                }
            })
        },
    },
}
</script>
<style scoped>
.lizi {
    position: relative;
    height: 100vh;
}
.login {
    width: 350px;
    height: 400px;
    position: absolute;
    top: 20%;
    left: 40%;
}
.btn {
    width: 100%;
}
</style>
