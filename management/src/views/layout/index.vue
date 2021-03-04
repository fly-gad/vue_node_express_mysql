<!--
 * @Author: MrZhang
 * @Date: 2021-02-20 14:29:35
 * @Description: 首页
-->
<template>
    <div>
        <el-container>
            <el-header height="50px">
                <headers />
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <menus />
                </el-aside>
                <el-main>
                    <div class="main_con">
                        <div class="breadcrumb pl5">
                            <el-breadcrumb separator-class="el-icon-arrow-right">
                                <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">{{ item.name }}</el-breadcrumb-item>
                            </el-breadcrumb>
                        </div>
                        <div>
                            <router-view />
                        </div>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import menus from "@/components/menu"
import headers from "@/components/header"
export default {
    components: {
        menus,
        headers,
    },
}
</script>
<style  scoped>
.el-header {
    background-color: #e9eaec;
    color: #333;
    border-bottom: 1px solid #d3d4d6;
    text-align: center;
    height: 100%;
}

.el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    height: 93vh;
}

.el-main {
    background-color: #ffffff;
    text-align: center;
    padding: 10px;
}

.breadcrumb {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 0 rgba(0, 0, 0, 0.04);
    height: 30px;
}
.el-breadcrumb {
    line-height: 2;
}
</style>

