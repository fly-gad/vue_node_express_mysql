<!--
 * @Author: MrZhang
 * @Date: 2021-02-24 15:17:13
 * @Description: 账户与密码
-->
<template>
    <div class="account">
        <!-- 修改头像 -->
        <div class="mb20">
            <span class="see pb20">修改头像</span>
            <upload @onSuccess="modify" :actionUrl="url" :avatar="urlImg"></upload>
        </div>
        <div class="line"></div>
        <!-- 修改密码 -->
        <div class="mb20 pt10">
            <span class="see">修改密码</span>
            <div class="flex mt20 flex-jcsb">
                <div class="fs">{{account.password===''?'未设置':'已设置'}}</div>
                <div class="fb" @click="dialogVisible = true">编辑</div>
                <el-dialog title="修改密码" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" :close-on-click-modal="false">
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
                </el-dialog>
            </div>
        </div>
        <div class="line"></div>
        <!-- 绑定手机 -->
        <div class="mb20 pt10">
            <span class="see">绑定手机</span>
            <div class="flex mt20 flex-jcsb">
                <div class="fs">{{account.phone===''?'未绑定':account.phone}}</div>
                <div class="fb">编辑</div>
            </div>
        </div>
        <div class="line"></div>
        <!-- 绑定邮箱 -->
        <div class="mb20 pt10">
            <span class="see">绑定邮箱</span>
            <div class="flex mt20 flex-jcsb">
                <div class="fs">{{account.email===''?'未绑定':account.email}}</div>
                <div class="fb">编辑</div>
            </div>
        </div>
    </div>
</template>

<script>
import upload from "../../components/upload.vue"
import * as server from "@/server/catmanvalley"
import * as User from "@/util/user/user"
import { env } from "@/util/env/index"
export default {
    name: "",
    components: { upload },
    props: {},
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
            url: "http://127.0.0.1:8001/api/uploadImage",
            urlImg: "",
            account: {},
            dialogVisible: false,
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
    mounted() {
        this.accactInfo()
    },
    methods: {
        //上传回调函数
        async modify(value) {
            console.log("value: ", value)
            await server.editUserImg({
                user_id: User.localgetItem("id"),
                imgUrl: value,
            })
        },
        //用户信息获取
        async accactInfo() {
            const { data } = await server.accuntinfo({
                id: User.localgetItem("id"),
            })
            this.account = data[0]
            this.urlImg = data[0].userpic
        },
        //关闭
        handleClose() {
            this.dialogVisible = false
        },
        //提交
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    await server.modifypassword({
                        id: User.localgetItem("id"),
                        password: this.ruleForm.pass,
                    })
                    User.remove()
                    this.fullscreenLoading = true
                    setTimeout(() => {
                        this.fullscreenLoading = false
                        this.dialogVisible = false
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
.account {
    text-align: left;
    padding: 10px;
}
.see {
    display: inline-block;
    font-weight: 700;
}
.fs {
    color: #8590a6;
    font-size: 14px;
}
.fb {
    color: #6d97eb;
    font-size: 14px;
    cursor: pointer;
}
</style>
