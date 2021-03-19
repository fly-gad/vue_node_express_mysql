<!--
 * @Author: MrZhang
 * @Date: 2021-03-18 18:49:52
 * @Description: 上传
-->
<template>
    <div>
        <el-upload class="avatar-uploader" :action="actionUrl" :on-success="handleVideoSuccess" :before-upload="beforeUploadVideo" :show-file-list="false">
            <img v-if="showVideoPath" :src="showVideoPath" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
</template>

<script>
export default {
    props: {
        // 上传路径
        actionUrl: {
            type: String,
            default() {},
        },
        avatar: {
            type: String,
            default() {},
        },
    },
    data() {
        return {
            showVideoPath: "",
        }
    },
    watch: {
        avatar(value) {
            this.showVideoPath = value
        },
    },
    methods: {
        //上传函数
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
                    "image/bmp",
                    "image/jpg",
                    "image/jpeg",
                    "image/png",
                    "image/tif",
                    "image/gif",
                    "image/pcx",
                    "image/tga",
                    "image/exif",
                    "image/fpx",
                    "image/svg",
                    "image/psd",
                    "image/cdr",
                    "image/pcd",
                    "image/dxf",
                    "image/eps",
                    "image/bmp",
                    "image/raw",
                    "image/WMF",
                    "image/webp",
                    "image/avif",
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
        },
        //上传成功回调
        handleVideoSuccess(res) {
            //后台上传地址
            if (res.code == 200) {
                this.showVideoPath = res.path
                this.$emit("onSuccess", res.path)
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
}
</script>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>