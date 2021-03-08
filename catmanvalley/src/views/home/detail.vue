<!--
 * @Author: MrZhang
 * @Date: 2021-03-08 10:49:46
 * @Description: 文章细节
-->
<template>
    <div class="detail">
        <div class="grid-content pd10">
            <div>
                <span class="title">这女司机停车技术什么水平</span>
                <span class="font-13 ml20">193回复</span>
                <span class="font-13 ml20">306836浏览</span>
            </div>
            <div class="flex author">
                <img src="http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg" alt width="40" height="40" />
                <div class="author_ch">
                    <span>洪世贤吖</span>
                    <span class="ml20 poster">楼主</span>
                    <span class="ml20 font-13">2021-03-08 01:00:35</span>
                </div>
            </div>
            <div style="height:200px; background: #f9f9f9;">内容</div>
            <div style="height:200px; background: #f2f3f4;border:1px solid #ccc" class="mt20">评论</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "",
    components: {},
    props: {},
    data() {
        return {}
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {},
}
</script>

<style scoped>
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
</style>
