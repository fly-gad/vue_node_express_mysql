<!--
 * @Author: MrZhang
 * @Date: 2021-02-20 14:51:12
 * @Description: 首页
-->
<template>
    <div id="div1">
        <!-- 活动图片 -->
        <div class="grid-content">
            <a style="font-size: 0px;display: block;">
                <img src="@/assets/activity.png" alt width="100%" height="auto" />
            </a>
        </div>
        <!-- tab导航 -->
        <div class="grid-content tab" :class="navBarFixed == true ? 'navBarWrap' :''">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-radio-group v-model="radio1">
                        <el-radio-button label="1">为你推荐</el-radio-button>
                        <el-radio-button label="2">沙雕图</el-radio-button>
                    </el-radio-group>
                </el-col>
                <el-col :span="8"></el-col>
                <el-col :span="8">
                    <el-input placeholder="请输入搜索内容" v-model="search" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="serach"></el-button>
                    </el-input>
                </el-col>
            </el-row>
        </div>
        <!-- 为你推荐 -->
        <div class="grid-content pb10" v-if="radio1==1">
            <!-- 数据展示 -->
            <div v-if="lists.length>=0">
                <div class="entrynum" v-for="item in lists" :key="item.id">
                    <div class="mb5 title cur-p" @click="detail(item.id)">{{item.title}}</div>
                    <div class="flex flex-jcsb mb10">
                        <div>
                            <span class="font-13">{{item.comm}}回复</span>
                            <span class="ml20 font-13">{{item.create_time}}</span>
                        </div>
                        <div>
                            <span class="cur-p">
                                <i class="el-icon-star-off" @click="openfavorites(2,item.id)" v-show="item.favorites==1">
                                    <span class="font-13">收藏</span>
                                </i>
                            </span>
                            <span class="cur-p">
                                <i class="el-icon-star-on" @click="openfavorites(1,item.id)" v-show="item.favorites==2" style="color:#5e5ee5;font-size:18px">
                                    <span class="font-13">丢弃</span>
                                </i>
                            </span>
                            <!-- <span class="font-13">{{favorites[item.favorites]}}</span> -->
                            <span class="ml20 font-13">{{item.browse}}浏览</span>
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
        <!-- 沙雕图 -->
        <div v-if="radio1==2">
            <div class="grid-content pd10">
                <!-- 沙雕图数据展示 -->
                <div v-if="listss.length>=0">
                    <div class="entrynum t-a-l" v-for="item in listss" :key="item.id">
                        <div class="mb5 title cur-p" @click="detail(item.id)">{{item.title}}</div>
                        <div class="mb5 title t-a-c">
                            <img :src="item.details" alt />
                        </div>
                        <div class="flex flex-jcsb mb10">
                            <div>
                                <span class="font-13">{{item.comm}}回复</span>
                                <span class="ml20 font-13">{{item.create_time}}</span>
                            </div>
                            <div>
                                <span class="cur-p">
                                    <i class="el-icon-star-off" @click="openfavorites(2,item.id)" v-show="item.favorites==1">
                                        <span class="font-13">收藏</span>
                                    </i>
                                </span>
                                <span class="cur-p">
                                    <i
                                        class="el-icon-star-on"
                                        @click="openfavorites(1,item.id)"
                                        v-show="item.favorites==2"
                                        style="color:#5e5ee5;font-size:18px"
                                    >
                                        <span class="font-13">丢弃</span>
                                    </i>
                                </span>
                                <!-- <span class="font-13">{{favorites[item.favorites]}}</span> -->
                                <span class="ml20 font-13">{{item.browse}}浏览</span>
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
            radio1: 1,
            favorites: {
                1: "收藏",
                2: "已收藏",
            },
            currentTab: "",
            lists: [],
            commentNum: "",
            input3: "",
            search: "",
            showOff: true,
            showOn: false,
            navBarFixed: false,
        }
    },
    created() {
        this.entry({})
        this.imagearticle({})
    },
    mounted() {
        window.addEventListener("scroll", this.watchScroll)
    },
    methods: {
        //收藏列表
        async entry(value) {
            this.lists = await serve.entry(value)
        },
        //收藏列表
        async imagearticle(value) {
            this.listss = await serve.imagearticle(value)
        },
        //收藏
        async editCollection(value) {
            await serve.editCollection(value)
        },
        //详情
        detail(val) {
            this.$router.push({
                path: "/home/detail",
                query: {
                    id: val,
                },
            })
        },
        //搜索
        serach() {
            this.entry({ search: this.search })
        },
        openfavorites(value, index) {
            this.editCollection({ favorite: value, id: index })
            setTimeout(() => {
                this.entry({})
            }, 13)
        },
        //监听
        watchScroll() {
            var scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop
            if (scrollTop > 120) {
                this.navBarFixed = true
            } else {
                this.navBarFixed = false
            }
        },
    },
}
</script>

<style scoped>
.tab {
    height: 60px;
    line-height: 60px;
    overflow: hidden;
}
.title {
    font-size: 15px;
    font-weight: 700;
}
.entrynum {
    text-align: left;
    padding: 10px 10px 0 10px;
}
.navBarWrap {
    position: fixed;
    top: 41px;
    background: #fff;
    z-index: 9999;
    width: 61.7%;
}
</style>
