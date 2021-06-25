<template>
  <div class="course-wrap">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-fa fa-book"></i> 房间管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <div class="table">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="房间ID" width="180" prop="roomId"/>
            <el-table-column label="房间类型" width="180">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>房间描述: {{ scope.row.name }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.name }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="房间状态" prop="status" />
            <el-table-column label="早餐类型" prop="breakfast" />
            <el-table-column label="房间价格" prop="price" />
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import * as api from "../../api/manager/htroom";

  export default {
    name: "HotelRoom",
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
