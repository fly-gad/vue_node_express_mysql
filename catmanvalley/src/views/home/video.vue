<!--
 * @Author: MrZhang
 * @Date: 2021-03-08 11:40:31
 * @Description: 视频
-->
<template>
    <div class="video">
        <div class="grid-content">
            <el-form>
                <el-form-item label="上传视频介绍：" prop="videoIntroduce" style="margin-top:20px">
                    <el-input v-model="temp.videoIntroduce" type="text" style="display:none"></el-input>
                    <el-upload
                        ref="upload"
                        :headers="headers"
                        action="/tools/oss/uploadVideo"
                        :before-upload="onBeforeUpload"
                        :on-success="uploadSuccess"
                        :on-remove="handleRemoveVideo"
                        :on-progress="handProgress"
                        :file-list="fileList"
                        :show-file-list="false"
                        :auto-upload="true"
                        :accept="'.mp4'"
                        :limit="2"
                    >
                        <el-button slot="trigger" size="small" type="primary" plain>上传视频</el-button>
                        <el-button size="small" type="danger" @click="clearUpload">移除</el-button>
                    </el-upload>
                    <video
                        v-if="temp.videoIntroduce"
                        ref="videoBox"
                        id="testVideo"
                        class="video-js"
                        height="300px"
                        preload="auto"
                        controls
                        :src="temp.videoIntroduce"
                    ></video>
                    <el-progress :text-inside="true" :stroke-width="16" :percentage="uploadProgress" v-show="uploadProgress"></el-progress>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: "",
    components: {},
    props: {},
    data() {
        return {
            preventSumit: false,
            progressFactor: 0.96,
            uploadProgress: 0,
            headers: {},
            fileList: [],
            temp: { videoIntroduce: "" },
        }
    },
    methods: {
        //上传视频
        onBeforeUpload(file) {
            console.log("file: ", file)
            this.progressFactor = Math.random(1)
            this.preventSumit = true
        },
        uploadSuccess(response, file, fileList) {
            console.log("fileList: ", fileList)
            console.log("file: ", file)
            let {
                code,
                data: { picUrlList },
                message,
            } = response
            if (code == 0) {
                this.fileList = [{ name: picUrlList[0], url: picUrlList[0] }]
                this.uploadProgress = 100
                this.preventSumit = false
                this.temp.videoIntroduce = this.fileList[0].url
                setTimeout(() => {
                    this.uploadProgress = 0
                }, 1000)
            } else {
                this.$refs.upload.clearFiles()
                this.$notify({
                    title: "失败",
                    message: message,
                    type: "error",
                    duration: 3000,
                })
                this.preventSumit = false
            }
        },
        handleRemoveVideo(file) {
            console.log("file: ", file)
            this.$refs.upload.clearFiles()
            this.fileList = []
            this.temp.videoIntroduce = ""
        },
        handProgress(file) {
            this.uploadProgress = parseInt(file.percent * this.progressFactor)
        },
        clearUpload() {
            if (!this.fileList.length) return false
            this.$refs.upload.clearFiles()
            this.fileList = []
            this.temp.videoIntroduce = ""
        },
    },
}
</script>

<style scoped lang="scss">

</style>
