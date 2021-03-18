<!--
 * @Author: MrZhang
 * @Date: 2021-02-24 16:21:46
 * @Description: imageUrl
-->
<template>
    <div class="image">
        <div class="grid-content pb20">
            <div class="pd10">
                <el-input placeholder="最多输入50个字符" v-model="title"></el-input>
            </div>
            <div class="pd10">上传</div>
            <el-button type="primary" @click="askQuestions">提交</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: "",
    components: {},
    props: {},
    data() {
        return {}
    },
    methods: {},
}
</script>

<style scoped>
.con_ {
    height: 200px;
}
</style>
