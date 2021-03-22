<!--
 * @Author: MrZhang
 * @Date: 2021-03-08 11:42:12
 * @Description: 发视频
-->
<template>
    <div class="grid-content pb20">
        <div class="pd10">
            <el-input placeholder="最多输入50个字符" v-model="title"></el-input>
        </div>
        <div class="pd10">
            <div v-if="videoForm.showVideoPath ==''">
                <el-upload
                    action="http://127.0.0.1:8001/api/uploadVideo"
                    drag
                    :on-progress="uploadVideoProcess"
                    :on-success="handleVideoSuccess"
                    :before-upload="beforeUploadVideo"
                    :show-file-list="false"
                >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                        将视频拖到此处，或
                        <em>点击上传</em>
                    </div>
                    <div class="el-upload__tip" slot="tip">只能上传视频文件，且不超过500MB</div>
                </el-upload>
            </div>
            <video
                v-if="videoForm.showVideoPath !='' && !videoFlag"
                width="358"
                height="178"
                :src="videoForm.showVideoPath"
                class="avatar video-avatar"
                controls="controls"
            >您的浏览器不支持视频播放</video>
        </div>
        <el-button type="primary" @click="askVideo">提交</el-button>
    </div>
</template>
<script>
import * as serve from "@/server/catmanvalley"
import moment from "moment"
export default {
    data() {
        return {
            title: "",
            editor: "",
            //参数
            videoFlag: false,
            //是否显示进度条
            videoUploadPercent: "",
            //进度条的进度，
            isShowUploadVideo: false,
            //显示上传按钮
            videoForm: {
                showVideoPath: "",
            },
        }
    },
    created() {},
    methods: {
        //提问题
        async askVideo() {
            await serve.releaseVideo({
                title: this.title,
                details: this.videoForm.showVideoPath,
                type: "video",
                create_time: moment(new Date()).format("YYYY-MM-DD HH:mm"),
            })
            this.$router.push({
                path: "/home",
            })
        },
        //上传前
        beforeUploadVideo(file) {
            var fileSize = file.size / 1024 / 1024 < 500
            if (
                [
                    "video/mp4",
                    "video/ogg",
                    "video/flv",
                    "video/avi",
                    "video/wmv",
                    "video/rmvb",
                    "video/mov",
                ].indexOf(file.type) == -1
            ) {
                this.$alert("请上传正确的视频格式", "提示", {
                    confirmButtonText: "确定",
                    callback: (action) => {
                        this.$message({
                            type: "info",
                            message: `action: ${action}`,
                        })
                    },
                })
                return false
            }
            if (!fileSize) {
                this.$alert("视频大小不能超过500MB", "提示", {
                    confirmButtonText: "确定",
                    callback: (action) => {
                        this.$message({
                            type: "info",
                            message: `action: ${action}`,
                        })
                    },
                })
                return false
            }
            this.isShowUploadVideo = false
        },
        //进度条
        uploadVideoProcess(event, file) {
            this.videoFlag = true
            this.videoUploadPercent = file.percentage.toFixed(0) * 1
        },
        //上传成功回调
        handleVideoSuccess(res) {
            this.isShowUploadVideo = true
            this.videoFlag = false
            this.videoUploadPercent = 0
            //后台上传地址
            if (res.code == 200) {
                this.videoForm.showVideoPath = res.path
            } else {
                this.$alert("上传失败！！", "提示", {
                    confirmButtonText: "确定",
                    callback: (action) => {
                        this.$message({
                            type: "info",
                            message: `action: ${action}`,
                        })
                    },
                })
            }
        },
    },
    mounted() {},
}
</script>