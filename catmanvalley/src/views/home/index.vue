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
                    <div class="mb5 title cur-p" @click="detail(item.id)">{{item.title}}</div>
                    <div class="flex flex-jcsb mb10">
                        <div>
                            <span class="font-13">5420回复</span>
                            <span class="ml20 font-13">12小时前</span>
                        </div>
                        <div>
                            <span class="font-13">收藏</span>
                            <span class="ml20 font-13">评论</span>
                        </div>
                    </div>
                    <div class="line mb10"></div>
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
export default {
    name: "",
    components: {},
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
        detail(val) {
            this.$router.push({
                path: "/home/detail",
                query: {
                    id: val,
                },
            })
        },
    },
}
</script>

<style scoped>
.title {
    font-size: 15px;
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
