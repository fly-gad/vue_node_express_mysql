<!--
 * @Author: MrZhang
 * @Date: 2021-02-20 16:31:21
 * @Description: 侧边栏
-->
<template>
    <div class="menu">
        <el-menu
            default-active="2"
            @open="handleOpen"
            @close="handleClose"
            router
        >
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>功能</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/home/test1">表单</el-menu-item>
                    <el-menu-item index="/home/pagination">分页</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-s-data"></i>
                    <span>帐号管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/system/modifypass">修改密码</el-menu-item>
                    <el-menu-item index="/system/index">个人信息</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
    created(){
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath)
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath)
        },
    },
}
</script>

<style scoped lang="scss">
</style>
