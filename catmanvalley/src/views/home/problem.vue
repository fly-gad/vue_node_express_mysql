<!--
 * @Author: MrZhang
 * @Date: 2021-03-08 11:42:12
 * @Description: 问题
-->
<template>
    <div class="grid-content pb20">
        <div class="pd10">
            <el-input placeholder="最多输入50个字符" v-model="title"></el-input>
        </div>
        <div class="pd10">
            <quillEditor @input="quillEditor"></quillEditor>
        </div>
        <el-button type="primary">提交</el-button>
    </div>
</template>
<script>
import quillEditor from "@/components/quillEditor"
export default {
    data() {
        return {
            title: "",
        }
    },
    components: { quillEditor },
    methods: {
        quillEditor(editor) {
            console.log("editor: ", editor)
        },
    },
    mounted() {},
}
</script>