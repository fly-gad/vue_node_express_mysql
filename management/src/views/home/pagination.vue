<!--
 * @Author: MrZhang
 * @Date: 2021-02-20 14:51:12
 * @Description: 分页
-->
<template>
    <div class="pagination">
        <div class="mt20">
            <el-form :model="ruleForm">
                <div class="flex">
                    <el-form-item>
                        <el-input placeholder="输入名称" v-model="ruleForm.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="filters">筛选</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <div class="mt20">
            <el-table :data="tableData" style="width: 100%" border size="small">
                <el-table-column prop="id" label="ID" width="180"></el-table-column>
                <el-table-column prop="name" label="名称" width="180"></el-table-column>
                <el-table-column prop="features" label="功能"></el-table-column>
                <el-table-column prop="desc" label="描述"></el-table-column>
                <el-table-column prop="create_time" label="时间"></el-table-column>
            </el-table>
        </div>
        <div class="mt20">
            <el-pagination
                @size-change="pageSizeChange"
                @current-change="pageChange"
                :current-page="page"
                :page-size="page_size"
                layout="total, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
import * as serve from "@/server/index"
// import * as serve from "@/server/api"
export default {
    data() {
        return {
            ruleForm: {
                name: "",
            },
            tableData: [],
            page: 1,
            page_size: 10,
            total: 0,
        }
    },
    created() {
        this.lists()
    },
    methods: {
        // 获取任务列表
        async lists(query) {
            const param = Object.assign(
                {},
                { page: 1, page_size: this.page_size },
                query || {}
            )
            const result = await serve.lists(param)
            const { page, page_size, total, list } = result
            const $data = {
                page,
                total,
                tableData: list,
                page_size,
            }
            Object.assign(this.$data, $data)
        },
        // 分页发生变化时
        pageChange(page) {
            this.lists({ page })
        },
        pageSizeChange(page_size) {
            this.lists({ page: 1, page_size })
        },
        //筛选
        filters() {
            this.lists({ name: this.ruleForm.name })
        },
    },
}
</script>

<style scoped lang="scss">
</style>
