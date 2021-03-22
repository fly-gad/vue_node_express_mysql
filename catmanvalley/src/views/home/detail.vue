<!--
 * @Author: MrZhang
 * @Date: 2021-03-08 10:49:46
 * @Description: 文章细节
-->
<template>
    <div class="detail">
        <div class="grid-content pd10" v-for="item in detail" :key="item.id">
            <!-- 文章流量 -->
            <div>
                <span class="title">{{item.title}}</span>
            </div>
            <!-- 楼主信息 -->
            <div class="flex author">
                <img src="http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg" alt width="40" height="40" />
                <div class="author_ch">
                    <span>{{item.author}}</span>
                    <span class="ml20 poster">楼主</span>
                    <span class="ml20 font-13">{{item.create_time}}</span>
                </div>
            </div>
            <!-- 内容 -->
            <div>
                <div class="artic_details" v-if="item.type=='article'">{{item.details}}</div>
                <div class="author_details" v-if="item.type=='video'">
                    <video width="640" height="426" controls>
                        <source :src="item.details" type="video/mp4" />
                    </video>
                </div>
                <div class="author_details" v-if="item.type=='image'">
                    <img :src="item.details" />
                </div>
            </div>
            <!-- 评论 -->
            <div class="mt20">
                <el-collapse>
                    <el-collapse-item>
                        <template slot="title">
                            <span class="verticalbar"></span>
                            <span>全部回复</span>
                        </template>
                        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
    </div>
</template>

<script>
import * as serve from "@/server/catmanvalley"
export default {
    name: "",
    components: {},
    props: {},
    data() {
        return {
            detail: [],
        }
    },
    created() {
        this.entry()
    },
    methods: {
        async entry() {
            this.detail = await serve.entry({ id: this.$route.query.id })
        },
    },
}
</script>

<style scoped lang='scss'>
.detail {
    text-align: left;
}
.poster {
    margin: 0 8px;
    background: #d8d8d8;
    border-radius: 9px;
    color: #191c22;
    font-size: 12px;
    padding: 1px 6px;
    cursor: default;
}
.title {
    font-size: 18px;
    font-weight: 700;
}
.author {
    margin: 10px 0 10px 0;
}
.author_ch {
    line-height: 30px;
    margin-left: 10px;
}
.artic_details {
    background: #f9f9f9;
    padding: 20px;
    overflow: hidden;
    height: 100%;
    font-size: 14px;
}
.author_details {
    text-align: center;
    background: #f9f9f9;
    padding: 20px;
    overflow: hidden;
    height: 100%;
}
.author_comm {
    height: 200px;
    background: #f2f3f4;
    border: 1px solid #ccc;
}
/deep/.el-collapse{
    border:1px solid #ccc;
}
/deep/.el-collapse-item__header {
    background: #f2f3f4 !important;
    border-bottom: 1px solid #ccc;
    font-size: 16px;
    font-weight: 700;
}
/deep/.el-collapse-item__wrap{
    background: #f2f3f4 !important;
    border-bottom: 1px solid #ccc;
}
</style>
