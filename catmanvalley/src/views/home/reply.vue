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
                    action="http://127.0.0.1:8001/api/uploadImage"
                    drag
                    :on-progress="uploadVideoProcess"
                    :on-success="handleVideoSuccess"
                    :before-upload="beforeUploadVideo"
                    :show-file-list="false"
                >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                        将gif图片拖到此处，或
                        <em>点击上传</em>
                    </div>
                    <div class="el-upload__tip" slot="tip">只能上传gif图片文件，且不超过50MB</div>
                </el-upload>
            </div>
            <img v-if="videoForm.showVideoPath !='' && !videoFlag" :src="videoForm.showVideoPath" width="358" height="178" />
        </div>
        <el-button type="primary" @click="askVideo">提交</el-button>
    </div>
</template>
<script>
import * as serve from "@/server/catmanvalley"
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
            await serve.uploadImages({
                title: this.title,
                details: this.videoForm.showVideoPath,
                type:'image'
            })
            this.$router.push({
                path: "/home",
            })
        },
        //上传前
        beforeUploadVideo(file) {
            console.log("file: ", file.type)
            var fileSize = file.size / 1024 / 1024 < 50
            if (["image/gif"].indexOf(file.type) == -1) {
                this.$alert("请上传正确的gif图片格式", "提示", {
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
                this.$alert("图片大小不能超过50MB", "提示", {
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