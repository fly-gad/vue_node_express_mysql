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
                <img :src="item.userpic" alt width="40" height="40" />
                <div class="author_ch">
                    <span>{{item.alias}}</span>
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
            <!-- 点赞回复 -->
            <div>
                <review :items="detail"></review>
            </div>
            <!-- 评论 -->
            <div class="mt20">
                <el-collapse v-model="activeName">
                    <el-collapse-item name="1">
                        <template slot="title">
                            <span class="verticalbar"></span>
                            <span>全部评论</span>
                        </template>
                        <!-- 评论内容 -->
                        <div v-if="discuss_list.length>0">
                            <div v-for="item in discuss_list" :key="item.id" class="pd10">
                                <!-- 评论者信息 -->
                                <div class="flex author">
                                    <img :src="item.userpic" alt width="40" height="40" />
                                    <div class="author_ch">
                                        <span>{{item.alias}}</span>
                                        <span class="ml20 font-13">{{item.create_time}}</span>
                                    </div>
                                </div>
                                <!-- 评论的内容 -->
                                <div class="substance_details">{{item.substance}}</div>
                            </div>
                        </div>
                        <!-- 无数据展示 -->
                        <div v-else class="t-a-c">
                            <div class="pt20">
                                <img src="@/assets/nodata.png" alt width="250" height="250" />
                            </div>
                            <p :style="{'marginTop': '20px'}">未有任何评论</p>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
    </div>
</template>

<script>
import * as serve from "@/server/catmanvalley"
import review from "@/components/review"
export default {
    name: "",
    components: { review },
    props: {},
    data() {
        return {
            activeName: "1",
            detail: [],
            discuss_list: [],
        }
    },
    created() {
        this.entry()
        this.discussList()
    },
    methods: {
        //列表
        async entry() {
            this.detail = await serve.entry({ id: this.$route.query.id })
        },
        //评论列表
        async discussList() {
            this.discuss_list = await serve.discussList({
                id: this.$route.query.id,
            })
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
.substance_details {
    // background: #f9f9f9;
    padding: 10px 0px 10px 50px;
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
