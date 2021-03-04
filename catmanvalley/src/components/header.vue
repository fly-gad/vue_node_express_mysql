<!--
 * @Author: MrZhang
 * @Date: 2021-02-19 14:54:43
 * @Description: 头部
-->
<template>
    <div class="header">
        <el-row :gutter="20">
            <el-col :span="7">
                <div v-html="err"></div>
            </el-col>
            <el-col :span="7">
                <div v-html="err"></div>
            </el-col>
            <el-col :span="6">
                <div v-html="err"></div>
            </el-col>
            <el-col :span="4">
                <div class="mt5">
                    <el-popover width="50" trigger="click">
                        <div class="hig">
                            <div class="hig_ch" @click="homepage">我的主页</div>
                            <div class="hig_ch" @click="settings">设置</div>
                            <div class="hig_ch" @click="cookieremove" v-loading.fullscreen.lock="fullscreenLoading">退出登录</div>
                        </div>
                        <el-avatar class="cur-p" slot="reference" shape="square" :size="40"></el-avatar>
                    </el-popover>
                </div>
            </el-col>
        </el-row>
        <transition name="bounce">
            <div v-if="show"></div>
        </transition>
    </div>
</template>

<script>
import { env } from "@/util/env/index"
import * as User from "@/util/user/user"
export default {
    data() {
        return {
            err: "&#12288;",
            fullscreenLoading: false,
            show: true,
        }
    },
    methods: {
        //退出
        cookieremove() {
            User.remove()
            this.fullscreenLoading = true
            setTimeout(() => {
                this.fullscreenLoading = false
                this.$router.push({
                    path: env.VUE_APP_Path_login,
                })
            }, 500)
        },
        //主页
        homepage() {
            this.$router.push({
                path: "/home",
            })
        },
        //设置
        settings() {
            this.$router.push({
                path: "/settings",
            })
        },
    },
}
</script>
<style scoped>
.el-popover {
    padding: 0px !important;
}
.hig {
    height: 120px;
}
.hig_ch {
    height: 35px;
    line-height: 35px;
    margin-top: 5px;
    text-align: center;
}
.hig_ch:hover {
    background-color: #f5f7fa;
    cursor: pointer;
    color: #000;
}
</style>