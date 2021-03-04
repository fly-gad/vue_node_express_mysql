<!--
 * @Author: MrZhang
 * @Date: 2021-02-20 14:29:35
 * @Description: 布局
-->
<template>
    <div>
        <el-container>
            <el-header height="50px">
                <headers />
            </el-header>
            <el-container>
                <el-main>
                    <el-row :gutter="10">
                        <el-col :span="4">
                            <div v-html="err"></div>
                        </el-col>
                        <el-col :span="16">
                            <el-col :span="16">
                                <router-view />
                            </el-col>
                            <el-col :span="8">
                                <menus></menus>
                            </el-col>
                        </el-col>
                        <el-col :span="4">
                            <div v-html="err"></div>
                        </el-col>
                    </el-row>
                    <el-backtop :bottom="60"></el-backtop>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import headers from "@/components/header"
import menus from "@/components/menu"
export default {
    components: {
        headers,
        menus,
    },
    data() {
        return {
            err: "&#12288;",
        }
    },
}
</script>
<style  scoped>
.el-header {
    box-shadow: 0 1px 3px rgb(18 18 18 /10%);
    background: #fff;
    color: #333;
    text-align: center;
    height: 100%;
    position: sticky;
    z-index: 9999;
    top: 0px;
}

.el-main {
    text-align: center;
    margin-top: 5px;
    padding: 0px;
    height: 100%;
    overflow: hidden;
}
</style>

