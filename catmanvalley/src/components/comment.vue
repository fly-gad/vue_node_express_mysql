<!--
 * @Author: MrZhang
 * @Date: 2021-03-01 15:07:25
 * @Description: 
-->
<template>
    <div class="comment">
        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
                <span>{{commentNum.comment}}条评论</span>
                <span style="float: right; padding: 3px 0">{{commentNum.create_time}}</span>
            </div>
            <div>
                <div v-for="(item) in commentData" :key="item.id">
                    <div class="flex">
                        <img :src="item.fromAvatar" alt width="30" height="30" />
                        <div class="author">{{item.fromName}}:</div>
                    </div>
                    <div class="ml40">
                        <div class="m10">{{item.content}}</div>
                        <review :items="item"></review>
                        <div v-for="items in item.reply" :key="items.id">
                            <div class="flex">
                                <img :src="items.fromAvatar" alt width="30" height="30" />
                                <div class="author">{{items.fromName}} 回复 {{items.toName}}:</div>
                            </div>
                            <div class="ml40">
                                <div>{{items.content}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex m10 pb20 entrynum">
                    <el-input placeholder="请输入内容" v-model="input" type="textarea" autosize></el-input>
                    <el-button slot="append" class="release" type="primary" @click="release()">发布</el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import review from "@/components/review"
import * as CommentData from "@/components/mark"
export default {
    data() {
        return {
            commentData: [],
            input: "",
        }
    },
    props: ["commentNum"],
    created() {
        this.commentData = CommentData.comment.data
    },
    components: { review },
    methods: {
        release() {
            console.log("this.input: ", this.input)
        },
        showNav(tab) {
            this.currentTab = this.currentTab == tab ? "" : tab
        },
    },
}
</script>
<style scoped>
.author {
    line-height: 30px;
    margin-left: 10px;
}
</style>