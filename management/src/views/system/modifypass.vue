<!--
 * @Author: MrZhang
 * @Date: 2021-02-24 10:25:23
 * @Description: 修改密码
-->
<template>
    <div class="modifypass">
        <el-card>
            <div slot="header">
                <span>修改密码</span>
            </div>
            <div>
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
                    <el-form-item prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" placeholder="新密码" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="checkPass">
                        <el-input type="password" v-model="ruleForm.checkPass" placeholder="确认新密码" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="btn" v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import _ from "lodash"
import { env } from "@/util/env/index"
import * as User from "@/util/user/user"
import * as server from "@/server/index"
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"))
            } else {
                if (this.ruleForm.checkPass !== "") {
                    this.$refs.ruleForm.validateField("checkPass")
                }
                callback()
            }
        }
        var validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"))
            } else if (value !== this.ruleForm.pass) {
                callback(new Error("两次输入密码不一致!"))
            } else {
                callback()
            }
        }
        return {
            fullscreenLoading: false,
            ruleForm: {
                pass: "",
                checkPass: "",
            },
            rules: {
                pass: [{ validator: validatePass, trigger: "blur" }],
                checkPass: [{ validator: validatePass2, trigger: "blur" }],
            },
        }
    },
    created() {
        this.accactInfo()
    },
    methods: {
        async accactInfo() {
            const { data } = await server.accuntinfo({ id: 34 })
            const { id } = _.head(data)
            this.id = id
        },
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    await server.modifypassword({
                        id: this.id,
                        password: this.ruleForm.pass,
                    })
                    User.remove()
                    this.fullscreenLoading = true
                    setTimeout(() => {
                        this.fullscreenLoading = false
                        this.$router.push({
                            path: env.VUE_APP_Path_login,
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
.modifypass {
    width: 350px;
    height: 400px;
    position: absolute;
    top: 20%;
    left: 40%;
}
</style>
