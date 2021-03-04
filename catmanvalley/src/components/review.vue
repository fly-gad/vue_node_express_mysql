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
                <span class="ionCor" @click="zam(1)">赞({{items.likeNum}})</span>
            </div>
            <div>
                <i class="el-icon-chat-dot-round ionCor"></i>
                <span class="ionCor" @click="show =!show">{{ show == true ? '关闭回复' : '回复'}}</span>
            </div>

            <div>
                <i class="el-icon-delete ionCor"></i>
                <span class="ionCor" @click="zam(items.stepOn)">踩({{items.stepOn}})</span>
            </div>
            <div>
                <i class="el-icon-collection-tag ionCor"></i>
                <span class="ionCor">举报</span>
            </div>
        </div>
        <div class="flex m10 pb20 entrynum" v-if="show">
            <el-input placeholder="请输入内容" v-model="input" type="textarea" autosize></el-input>
            <el-button slot="append" class="release" type="primary" @click="release(items)">发布</el-button>
        </div>
        <div class="line mb10"></div>
    </div>
</template>

<script>
export default {
    props: ["items"],
    data() {
        return {
            currentTab: "",
            input: "",
            show: false,
        }
    },
    created() {},
    methods: {
        release(tab) {
            console.log("tab: ", tab)
        },
        zam(tab) {
            if (tab ==2) {
                this.items.l
            }
        },
    },
}
</script>
<style>
.functionalArea {
    padding: 0px 0 10px 0;
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