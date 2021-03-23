<!--
 * @Author: MrZhang
 * @Date: 2021-03-01 16:50:28
 * @Description: 功能面板-点赞-回复
-->
<template>
    <div class="review">
        <div class="flex mt10 functionalArea">
            <div>
                <i class="el-icon-sugar ionCor"></i>
                <span class="ionCor" @click="zam()">赞({{items[0].likes}})</span>
            </div>
            <div>
                <i class="el-icon-chat-dot-round ionCor"></i>
                <span class="ionCor" @click="show =!show">{{ show == true ? '关闭评论' : '评论'}}</span>
            </div>
            <!-- <div>
                <i class="el-icon-delete ionCor"></i>
                <span class="ionCor" @click="zam()">踩</span>
            </div>-->
            <div>
                <i class="el-icon-collection-tag ionCor"></i>
                <span class="ionCor" @click="dialogVisible=true">举报</span>
            </div>
        </div>
        <div class="flex m10 pb20 entrynum" v-if="show">
            <el-input placeholder="请输入内容" v-model="input" type="textarea" autosize></el-input>
            <el-button slot="append" class="release" type="primary" @click="release(items[0].id,input)">发布</el-button>
        </div>
        <div class="line mb10"></div>
        <el-dialog title="举报" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" :close-on-click-modal="false">
            <div>请详细写出举报理由</div>
            <div slot="footer" class="dialog-foote">
                <el-input placeholder="请输入内容" v-model="inputs" type="textarea" :rows="10"></el-input>
                <div class="mt20">
                    <el-button type="primary" @click="report(items[0].id,inputs,)">举报</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import * as serve from "@/server/catmanvalley"
import moment from "moment"
import * as User from "@/util/user/user"
export default {
    props: ["items"],
    data() {
        return {
            currentTab: "",
            input: "",
            inputs: "",
            show: false,
            dialogVisible: false,
        }
    },
    created() {},
    methods: {
        //评论
        async release(tab, cont) {
            await serve.discuss({
                id: tab,
                substance: cont,
                create_time: moment(new Date()).format("YYYY-MM-DD HH:mm"),
                user_id: this.$route.query.user_id,
            })
            this.show = false
            this.input = ""
        },
        zam(tab) {
            if (tab == 2) {
                this.items.l
            }
        },
        handleClose() {
            this.dialogVisible = false
        },
        async report(entry_id, contants) {
            this.dialogVisible = false
            await serve.reportNum({
                contants,
                create_time: moment(new Date()).format("YYYY-MM-DD HH:mm"),
                user_id: User.localgetItem("id"),
                entry_id,
            })
        },
    },
}
</script>
<style>
.functionalArea {
    padding: 0px 0 10px 0;
    justify-content: center;
}
.functionalArea div {
    margin-right: 20px;
}
.ionCor {
    color: #76839b;
    margin-left: 2px;
    cursor: pointer;
}
.imgUrl {
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #f6f6f6;
    border-radius: 5px;
    background-image: linear-gradient(#db9494, #9198e5);
}
.release {
    min-height: 33px;
    height: 33px;
    margin-left: 10px;
}
</style>