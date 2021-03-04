<!--
 * @Author: MrZhang
 * @Date: 2021-02-24 16:21:46
 * @Description: 右侧边
-->
<template>
    <div>
        <div class="grid-content">
            <div class="flex flex-jcsa pb20">
                <div v-for="(item, index) in list" :key="index">
                    <router-link :to="item.to">
                        <div class="levercen cur-p">
                            <div class="imgUrl">{{item.imgUrl}}</div>
                        </div>
                        <div class="imgTit cur-p">{{item.name}}</div>
                    </router-link>
                </div>
            </div>
            <div class="flex flex-jcsa dsc">
                <div>稍后作答</div>
                <div>草稿箱</div>
            </div>
        </div>
        <div class="grid-content advertising">广告</div>
        <div class="advertising">
            <div class="foor mt20">
                <a href="#">猫人谷指南猫人谷协议猫人谷隐私保护指引</a>
                <a href="#">应用工作申请开通猫人谷机构号</a>
                <a href="#">侵权举报网上有害信息举报专区</a>
                <a href="#">京 ICP 证 110745 号</a>
                <a href="#">京 ICP 备 13052560 号 - 1</a>
                <a href="#">京公网安备 11010802020088 号</a>
                <a href="#">互联网药品信息服务资格证书</a>
                <a href="#">（京）- 非经营性 - 2017 - 0067违法和不良信息举报：010-82716601</a>
                <a href="#">儿童色情信息举报专区</a>
                <a href="#">证照中心</a>
                <a href="#">联系我们 © 2021 猫人谷</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "",
    components: {},
    props: {},
    data() {
        return {
            list: [
                {
                    name: "回答问题",
                    imgUrl: "回",
                    to: "/home/pagination",
                },
                {
                    name: "发视频",
                    imgUrl: "发",
                    to: "/home/pagination",
                },
                {
                    name: "写文章",
                    imgUrl: "写",
                    to: "/home/pagination",
                },
                {
                    name: "写想法",
                    imgUrl: "写",
                    to: "/home/pagination",
                },
            ],
        }
    },
    created() {},
    methods: {},
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
.fulltext {
    color: #409eff;
    margin-top: 5px;
}
.entrynum {
    text-align: left;
    padding: 10px 10px 0 10px;
}
.ionCor {
    color: #76839b;
    margin-left: 2px;
    cursor: pointer;
}
.functionalArea {
    padding: 0px 0 10px 0;
}
.functionalArea div {
    margin-right: 20px;
}
.imgUrl {
    width: 40px;
    height: 40px;
    border: 1px solid #f6f6f6;
    margin: 20px 0 10px 0;
    border-radius: 5px;
    line-height: 40px;
    background-image: linear-gradient(#db9494, #9198e5);
}
.imgTit {
    font-size: 13px;
}
.dsc {
    border-top: 1px solid #f6f6f6;
}
.dsc div {
    border-right: 1px solid #f6f6f6;
    width: 100%;
    height: 51px;
    line-height: 51px;
}
.advertising {
    height: 300px;
}
.foor {
    text-align: left;
    font-size: 13px;
    color: #8590a6;
}
.foor a {
    margin-top: 10px;
    display: block;
}
</style>
