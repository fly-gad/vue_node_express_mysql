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
        <el-button type="primary" @click="askQuestions">提交</el-button>
    </div>
</template>
<script>
import quillEditor from "@/components/quillEditor"
import * as serve from "@/server/catmanvalley"
import moment from "moment"
export default {
    data() {
        return {
            title: "",
            editor: "",
        }
    },
    components: { quillEditor },
    created() {
        console.log()
    },
    methods: {
        //方法回调
        quillEditor(editor) {
            this.editor = editor
        },
        //提问题
        async askQuestions() {
            await serve.submitAQuestion({
                title: this.title,
                details: this.editor.text,
                type: "article",
                create_time: moment(new Date()).format("YYYY-MM-DD HH:mm"),
            })
            this.$router.push({
                path: "/home",
            })
        },
    },
    mounted() {},
}
</script>