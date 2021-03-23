<!--
 * @Author: MrZhang
 * @Date: 2021-02-19 14:54:43
 * @Description: 入口页面
-->
<template>
    <div id="app">
        <router-view v-if="isRouterAlive" />
    </div>
</template>

<script>
export default {
    name: "App",
    provide() {
        return {
            reload: this.reload,
        }
    },
    data() {
        return {
            isRouterAlive: true,
        }
    },
    methods: {
        reload() {
            this.isRouterAlive = false
            this.$nextTick(function () {
                this.isRouterAlive = true
            })
        },
    },
}
</script>

<style>
body {
    background: #f6f6f6;
}
</style>