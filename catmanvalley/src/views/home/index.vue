<!--
 * @Author: MrZhang
 * @Date: 2021-02-20 14:51:12
 * @Description: 首页
-->
<template>
    <div>
        <div class="grid-content">
            <a style="font-size: 0px;display: block;">
                <img src="@/assets/activity.png" alt width="100%" height="auto" />
            </a>
        </div>
        <div class="grid-content pb10">
            <!-- 数据展示 -->
            <div v-if="lists.length>=0">
                <div class="entrynum" v-for="item in lists" :key="item.id">
                    <div>
                        <div class="mb10 title">{{item.title}}</div>
                        <div class="her">{{item.details}}</div>
                    </div>
                    <!-- 功能面板 -->
                    <div class="flex mt10 functionalArea">
                        <div>
                            <i class="el-icon-chat-round ionCor"></i>
                            <span class="ionCor" @click="showNav(item.id)">{{ currentTab == item.id ? '关闭评论' : `${item.comment}评论`}}</span>
                        </div>
                        <div>
                            <i class="el-icon-star-on ionCor"></i>
                            <span class="ionCor">{{favorites[item.favorites]}}</span>
                        </div>
                    </div>
                    <div class="line m10"></div>
                    <!-- 回复 -->
                    <comment v-show="currentTab==item.id" :commentNum="item"></comment>
                </div>
            </div>
            <!-- 无数据展示 -->
            <div slot="empty" v-else>
                <div>
                    <img src="@/assets/empty.png" alt width="140" height="140" />
                </div>
                <p :style="{'marginTop': '20px'}">未有任何记录</p>
            </div>
        </div>
    </div>
</template>

<script>
import * as serve from "@/server/catmanvalley"

import comment from "@/components/comment"
export default {
    name: "",
    components: { comment },
    props: {},
    data() {
        return {
            favorites: {
                1: "收藏",
                2: "已收藏",
            },
            currentTab: "",
            lists: [],
            commentNum: "",
            input3: "",
        }
    },
    created() {
        this.entry()
    },
    methods: {
        async entry() {
            const result = await serve.entry()
            this.lists = result
        },
        showNav(tab) {
            this.currentTab = this.currentTab == tab ? "" : tab
        },
    },
}
</script>

<style scoped>
.title {
    font-size: 18px;
    font-weight: 700;
}
.her {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-height: 25px;
    -webkit-box-orient: vertical;
}
.entrynum {
    text-align: left;
    padding: 10px 10px 0 10px;
}
</style>
