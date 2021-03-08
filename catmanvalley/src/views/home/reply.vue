<!--
 * @Author: MrZhang
 * @Date: 2021-02-24 16:21:46
 * @Description: 回答
-->
<template>
    <div class="grid-content pl10">
        <div class="pt20 t-a-l hers">
            <el-radio-group v-model="radio1">
                <el-radio-button label="1">为你推荐</el-radio-button>
                <el-radio-button label="2">人气问题</el-radio-button>
                <el-radio-button label="3">最新问题</el-radio-button>
            </el-radio-group>
        </div>
        <el-row :gutter="10" v-if="radio1==1">
            <el-col :span="24">
                <div v-for="item in recommend" :key="item.id" class="mb20 t-a-l">
                    <div class="mt10 mb10 ratit">{{item.title}}</div>
                    <div class="mt10 mb10">
                        <el-button type="primary" icon="el-icon-edit" size="small">写回答</el-button>
                        <span class="font-13 ml10">{{item.huida}}回答</span>
                        <span class="font-13 ml10">{{item.guanzhu}}关注</span>
                    </div>
                    <div class="line mb10"></div>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="10" v-if="radio1==2">
            <el-col :span="24">
                <div v-for="item in popularity" :key="item.id" class="mb20 t-a-l">
                    <div class="mt10 mb10 ratit">{{item.title}}</div>
                    <div class="mt10 mb10">
                        <el-button type="primary" icon="el-icon-edit" size="small">写回答</el-button>
                        <span class="font-13 ml10">{{item.huida}}回答</span>
                        <span class="font-13 ml10">{{item.guanzhu}}关注</span>
                    </div>
                    <div class="line mb10"></div>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="10" v-if="radio1==3">
            <el-col :span="24">
                <div v-for="item in newList" :key="item.id" class="mb20 t-a-l">
                    <div class="mt10 mb10 ratit">{{item.title}}</div>
                    <div class="mt10 mb10">
                        <el-button type="primary" icon="el-icon-edit" size="small">写回答</el-button>
                        <span class="font-13 ml10">{{item.huida}}回答</span>
                        <span class="font-13 ml10">{{item.guanzhu}}关注</span>
                    </div>
                    <div class="line mb10"></div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: "",
    components: {},
    props: {},
    data() {
        return {
            radio1: 1,
            recommend: [
                {
                    id: 1,
                    title: "上一个好高中真的有那么重要吗?",
                    huida: "125",
                    guanzhu: "3456",
                },
                {
                    id: 2,
                    title: "努力就是比别人优秀吗？？",
                    huida: "6533",
                    guanzhu: "552",
                },
            ],
            popularity: [
                {
                    id: 1,
                    title: "你觉得学习快乐吗？?",
                    huida: "125",
                    guanzhu: "3456",
                },
                {
                    id: 2,
                    title: "怎么能忍住联系一个很想念的人？",
                    huida: "6533",
                    guanzhu: "552",
                },
            ],
            newList: [
                {
                    id: 1,
                    title: "你最喜欢的男明星是谁？只能说一个哦?",
                    huida: "125",
                    guanzhu: "3456",
                },
                {
                    id: 2,
                    title: "忘记一个人，你们用了多久时间？",
                    huida: "6533",
                    guanzhu: "552",
                },
            ],
        }
    },
    methods: {},
}
</script>

<style>
.hers {
    border-bottom: 1px solid #ccc;
    padding-bottom: 20px;
}
.huidas {
    width: 80px;
    height: 28px;
    line-height: 26px;
    border-radius: 3px;
    color: #fff;
    border: 1px solid #06f;
    background: #06f;
    display: inline-block;
    text-align: center;
    font-size: 16px;
}
.ratit {
    font-size: 18px;
    font-weight: 700;
}
.el-radio-button {
    /* border: 1px solid red !important; */
    margin-left: 10px !important;
}
.el-radio-button__inner {
    border: 1px solid #dcdfe6 !important;
    border-radius: 20px !important;
    box-shadow: none !important;
}
</style>
