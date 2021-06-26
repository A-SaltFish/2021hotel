<template>
    <div class="course-wrap">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-fa fa-book"></i> 当前订单
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container">
            <div class="table">
                <el-table :data="tableData" stripe>
                    <el-table-column label="订单ID" prop="orderId" />
                    <el-table-column label="房间ID" prop="roomId" />
                    <el-table-column label="用户ID" prop="customerId" />
                    <el-table-column label="用户手机" prop="customerTel" />
                    <el-table-column label="房间类型" prop="roomType" />
                    <el-table-column label="当前花费" prop="precost" />
                    <el-table-column label="创建时间" prop="createTime" />
                    <el-table-column label="订单状态" prop="status" />
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    import * as api from "../../api/manager/preorder";

    export default {
        name: "TeacherCourse",
        data() {
            return {
                tableData: []
            };
        },
        methods: {
            getList() {
                api.list().then(res => {
                    this.tableData = res;
                    for(let i=0;i<this.tableData.length;i++){
                        if(this.tableData[i].status===0){
                            this.tableData[i].status="待付款";
                        }
                        else{
                            this.tableData[i].status="进行中";
                        }
                    }
                });
            }
        },
        created() {
            this.getList();
        }
    };
</script>

<style scoped></style>
