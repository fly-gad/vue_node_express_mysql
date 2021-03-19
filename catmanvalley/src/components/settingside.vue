<!--
 * @Author: MrZhang
 * @Date: 2021-02-20 16:31:21
 * @Description: 设置侧边栏
-->
<template>
    <div class="menu">
        <el-menu default-active="/settings/account" router>
            <el-menu-item index="/settings/account">
                <i class="el-icon-user-solid"></i>
                <span slot="title">帐号与密码</span>
            </el-menu-item>
            <el-menu-item index="/settings/filter">
                <i class="el-icon-s-help"></i>
                <span slot="title">屏蔽</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    created() {},
    methods: {},
}
</script>

<style scoped>
.menu {
    text-align: left;
}
.el-menu {
    height: 90vh;
}
</style>
