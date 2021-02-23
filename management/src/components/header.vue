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
                            <div class="hig_ch">个人信息</div>
                            <div class="hig_ch">帐号管理</div>
                            <div class="hig_ch">退出登录</div>
                        </div>
                        <el-avatar class="cur-p" slot="reference" shape="square" :size="40"></el-avatar>
                    </el-popover>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            err: "&#12288;",
        }
    },
}
</script>
<style>
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