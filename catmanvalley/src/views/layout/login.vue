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
            <el-tabs type="border-card">
                <el-tab-pane label="免密登录">
                    <el-form :model="ruleFormCode" :rules="rulesCode" ref="ruleFormCode" autocomplete="off" class="demo-ruleForm">
                        <el-form-item prop="phone">
                            <el-input placeholder="手机号" v-model="ruleFormCode.phone" autocomplete="off"></el-input>
                        </el-form-item>
                        <div class="flex">
                            <el-form-item prop="code">
                                <el-input placeholder="验证码" v-model="ruleFormCode.code" autocomplete="off"></el-input>
                            </el-form-item>
                            <div>
                                <div class="seconds" v-show="show" @click="getCode">获取验证码</div>
                                <div class="seconds" v-show="!show">{{count}} s</div>
                            </div>
                        </div>
                        <el-form-item>
                            <el-button class="btn" type="primary" @click="freeLogin('ruleFormCode')" v-loading.fullscreen.lock="fullscreenLoading">注册/登录</el-button>
                        </el-form-item>
                        <el-form-item>
                            <div class="protocol">
                                <span>未注册手机验证后自动登录，注册即代表同意</span>
                                <span class="plcolor">《猫人谷协议》</span>
                                <span class="plcolor">《隐私保护指引》</span>
                            </div>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="密码登录">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" autocomplete="off" class="demo-ruleForm">
                        <el-form-item prop="username">
                            <el-input placeholder="手机号" v-model="ruleForm.username" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" placeholder="密码" v-model="ruleForm.password" autocomplete="off"></el-input>
                        </el-form-item>
                        <div class="mb20 flex flex-jcsb">
                            <div v-html="err"></div>
                            <div class="forget" @click="fogret">忘记密码？</div>
                        </div>
                        <el-form-item>
                            <el-button class="btn" type="primary" @click="submitForm('ruleForm')">登录</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import { env } from "@/util/env/index"
import * as User from "@/util/user/user"
import * as server from "@/server/index"
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
        var validateCode = (rule, value, callback) => {
            if (!value) {
                callback(new Error("请输入短信验证码"))
            } else {
                callback()
            }
        }
        return {
            err: "&#12288;",
            fullscreenLoading: false,
            show: true,
            count: "",
            timer: null,
            ruleFormCode: {
                phone: "",
                code: "",
            },
            rulesCode: {
                phone: [{ validator: validateUsername, trigger: "blur" }],
                code: [{ validator: validateCode, trigger: "blur" }],
            },
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
        //60秒倒计时
        async getCode() {
            this.$refs["ruleFormCode"].validateField("phone")
            if (this.ruleFormCode.phone) {
                this.ruleFormCode.code = await server.sendCode({
                    phone: this.ruleFormCode.phone,
                })
                const TIME_COUNT = 60
                if (!this.timer) {
                    this.count = TIME_COUNT
                    this.show = false
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= TIME_COUNT) {
                            this.count--
                        } else {
                            this.show = true
                            clearInterval(this.timer)
                            this.timer = null
                        }
                    }, 1000)
                }
            }
        },
        //忘记密码
        fogret() {
            this.$router.push({
                path: "/forget",
            })
        },
        //免密登录
        freeLogin(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    const { token, id } = await server.login(this.ruleFormCode)
                    console.log(token)
                    console.log(id)
                    User.set(token)
                    this.fullscreenLoading = true
                    setTimeout(() => {
                        this.fullscreenLoading = false
                        this.$router.push({
                            path: env.VUE_APP_Path_dashboard,
                        })
                    }, 500)
                } else {
                    return false
                }
            })
        },
        //账户登录
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    const { token, id } = await server.accountPassWordlogin(
                        this.ruleForm
                    )
                    console.log(token)
                    console.log(id)
                    User.set(token)
                    this.fullscreenLoading = true
                    setTimeout(() => {
                        this.fullscreenLoading = false
                        this.$router.push({
                            path: env.VUE_APP_Path_dashboard,
                        })
                    }, 500)
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
.forget {
    color: grey;
    cursor: pointer;
}
.protocol {
    font-size: 13px;
}
.plcolor {
    color: cornflowerblue;
    cursor: pointer;
}
.login {
    width: 350px;
    height: 400px;
    position: absolute;
    top: 20%;
    left: 40%;
}
.seconds {
    width: 110px;
    height: 39px;
    text-align: center;
    line-height: 39px;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    color: #fff;
    font-size: 14px;
    background: #409eff;
    cursor: pointer;
}
</style>
