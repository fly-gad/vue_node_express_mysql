<!--
 * @Author: MrZhang
 * @Date: 2021-03-08 11:42:12
 * @Description: 富文本编辑器组件
-->
<template>
    <quill-editor class="editor" ref="myTextEditor" v-model="content" :options="editorOption" @change="onEditorChange($event)"></quill-editor>
</template>
<script>
export default {
    data() {
        return {
            content: null,
            editorOption: {
                modules: {
                    toolbar: [
                        ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
                        [{ header: 1 }, { header: 2 }], // 1、2 级标题
                        [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
                        [{ color: [] }], // 字体颜色、字体背景颜色
                        [{ align: [] }], // 对齐方式
                    ], //工具菜单栏配置
                },
                placeholder: "请输入正文", //提示
                readyOnly: false, //是否只读
                theme: "snow", //主题 snow/bubble
                syntax: true, //语法检测
            },
        }
    },
    methods: {
        // 值发生变化
        onEditorChange(editor) {
            this.content = editor.html
            this.$emit("input", editor)
        }
    },
    computed: {
        editor() {
            return this.$refs.myTextEditor.quillEditor
        },
    }
}
</script>
<style>
.editor {
    height: 460px !important;
}
.ql-container {
    height: 400px !important;
}
</style>