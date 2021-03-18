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
                <el-aside width="200px"></el-aside>
                <el-main>
                    <el-row>
                        <el-col :span="4">
                            <settingside />
                        </el-col>
                        <el-col :span="20">
                            <router-view />
                        </el-col>
                    </el-row>
                </el-main>
                <el-aside width="200px"></el-aside>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import settingside from "@/components/settingside"
import headers from "@/components/header"
export default {
    components: {
        settingside,
        headers,
    },
    created() {},
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

.el-main {
    background-color: #ffffff;
    text-align: center;
    padding: 10px;
}
</style>

