<!--
 * @Author: MrZhang
 * @Date: 2021-02-24 16:21:46
 * @Description: 回答
-->
<template>
    <div class="grid-content pl10">
        <div class="pt20 t-a-l">
            <el-radio-group v-model="radio1">
                <el-radio-button label="1">为你推荐</el-radio-button>
                <el-radio-button label="2">人气问题</el-radio-button>
                <el-radio-button label="3">最新问题</el-radio-button>
            </el-radio-group>
        </div>
        <el-row :gutter="10" v-if="radio1==1">
            <el-col :span="24">
                <div>1</div>
            </el-col>
        </el-row>
        <el-row :gutter="10" v-if="radio1==2">
            <el-col :span="24">
                <div>1</div>
            </el-col>
        </el-row>
        <el-row :gutter="10" v-if="radio1==3">
            <el-col :span="24">
                <div>1</div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: "",
    components: {},
    props: {},
    data() {
        return { radio1: 1 }
    },
    methods: {},
}
</script>

<style >
.el-radio-button {
    /* border: 1px solid red !important; */
    margin-left: 10px !important;
}
.el-radio-button__inner {
    border: 1px solid #dcdfe6 !important;
    border-radius: 20px !important;
    box-shadow: none !important;
}
</style>
