<!--
 * @Author: MrZhang
 * @Date: 2021-02-19 14:54:43
 * @Description: 头部
-->
<template>
    <div class="header">
        <el-row :gutter="20">
            <el-col :span="7">
                <el-col :span="4">
                    <div v-html="err"></div>
                </el-col>
                <el-col :span="12">
                    <router-link to="/home">
                        <div class="logo">猫人谷</div>
                    </router-link>
                </el-col>
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
                            <div class="hig_ch" @click="settings">设置</div>
                            <div class="hig_ch" @click="cookieremove" v-loading.fullscreen.lock="fullscreenLoading">退出登录</div>
                        </div>
                        <el-avatar class="cur-p" slot="reference" shape="square" :size="40" :src="urlImg"></el-avatar>
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
import * as server from "@/server/catmanvalley"
export default {
    data() {
        return {
            err: "&#12288;",
            fullscreenLoading: false,
            show: true,
            urlImg: "",
        }
    },
    created() {
        this.accactInfo()
    },
    methods: {
        //退出
        cookieremove() {
            User.remove()
            User.localClear()
            this.fullscreenLoading = true
            setTimeout(() => {
                this.fullscreenLoading = false
                this.$router.push({
                    path: env.VUE_APP_Path_login,
                })
            }, 500)
        },
        //设置
        settings() {
            this.$router.push({
                path: "/settings",
            })
        },
        //搜索
        serach() {},
        async accactInfo() {
            const { data } = await server.accuntinfo({
                id: User.localgetItem("id"),
            })
            this.urlImg = data[0].userpic
        },
    },
}
</script>
<style scoped>
.el-row {
    line-height: 50px;
}
.logo {
    text-align: center;
    height: 50px;
    font-size: 24px;
    letter-spacing: 10px;
    font-weight: 800;
    color: rgb(97, 105, 128);
    font-family: "Lucida Console", "Courier New", monospace;
}
.el-popover {
    padding: 0px !important;
}
.hig {
    height: 80px;
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