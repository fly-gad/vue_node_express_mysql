<!--
 * @Author: MrZhang
 * @Date: 2021-03-08 11:42:34
 * @Description: 收藏
-->
<template>
    <div class="favorites">
        <h3 class="mt20">以下是你的全部收藏呦~</h3>
        <div class="mt20">
            <el-input placeholder="请输入搜索内容" v-model="search" @keyup.enter.native="serach(search)" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="serach(search)"></el-button>
            </el-input>
        </div>
        <div>
            <!-- 数据展示 -->
            <div v-if="lists.length>=0">
                <div class="entrynum grid-content" v-for="item in lists" :key="item.id">
                    <div class="mb5 title cur-p" @click="detail(item.id)">{{item.title}}</div>
                    <div class="flex flex-jcsb mb10">
                        <div>
                            <span class="font-13">{{item.comm}}回复</span>
                            <span class="ml20 font-13">{{item.create_time}}</span>
                        </div>
                        <div>
                            <!-- <span class="font-13">{{favorites[item.favorites]}}</span> -->
                            <span class="ml20 font-13">{{item.browse}}浏览</span>
                        </div>
                    </div>
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
    data() {
        return {
            lists: [],
            search: "",
        }
    },
    created() {
        this.entry({ favorites: 2 })
    },
    methods: {
        async entry(value) {
            this.lists = await serve.entry(value)
        },
        detail(val) {
            this.$router.push({
                path: "/home/detail",
                query: {
                    id: val,
                },
            })
        },
        serach(search) {
            if (search) {
                this.entry({ search })
            } else {
                this.entry({ favorites: 2 })
            }
        },
    },
}
</script>

<style scoped>
.entrynum {
    text-align: left;
    padding: 5px 10px 2px 10px;
    border-radius: 5px;
    cursor: pointer;
}
</style>
