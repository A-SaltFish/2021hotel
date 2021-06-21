<template>
  <div class="course-select-wrap">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-fa fa-book"></i> 历史订单
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <div class="query-form">
        <el-row :gutter="20">
          <el-col :offset="15" :span="3">
            <el-input
              @keyup.enter.native="query"
              placeholder="订单ID"
              v-model="queryForm.customerId"
            />
          </el-col>
          <el-col :span="3">
            <el-input
              @keyup.enter.native="query"
              placeholder="酒店名"
              v-model="queryForm.hotelName"
            />
          </el-col>
          <el-col :span="3">
            <el-button @click="query" icon="el-icon-search" type="primary"
              >搜索
            </el-button>
          </el-col>
        </el-row>
      </div>

      <el-row justify="center" type="flex">
        <el-pagination
          :current-page.sync="pageIndex"
          :page-size="pageSize"
          :total="pageSize * pageCount"
          @current-change="getPage"
          background
          layout="prev, pager, next"
        >
        </el-pagination>
      </el-row>

      <div class="table">
        <el-table :data="tableData" stripe>
          <el-table-column label="订单ID" prop="orderId" width="250em"/>
          <el-table-column label="酒店名" prop="hotelName" width="200em" />
          <el-table-column label="花费" prop="cost" />
          <el-table-column align="center"  label="创建时间" prop="createTime" width="250em"/>
          <el-table-column label="支付方式" prop="payment" width="80em"/>
          <el-table-column label="订单状态" prop="status" width="80em"/>
          <el-table-column align="center" label="操作" width="200px">
            <template slot-scope="scope">
              <el-button
                      @click="showOrder(scope.row.orderId)"
                      size="mini"
                      type="primary"
                      icon="el-icon-edit" circle>
              </el-button>
              <el-dialog title="订单详情" :visible.sync="dialogTableVisible">
                <div style="background-color:#E8F8FF;padding:1em">
                  <div style="child-align:left;border:2px solid #91C9E8" v-for="(item,index) of tableItems" :key="index">
                    <el-row :gutter="10">
                      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11" style="width:30%">
                        <div class="grid-content bg-purple">{{item.text}}</div></el-col>
                      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11" style="width:69%">
                        <div class="grid-content">{{item.data}}</div></el-col>
                    </el-row>
                  </div>
                </div>
              </el-dialog>
              <el-button
                @click="deleteOrder(scope.row.orderId)"
                size="mini"
                type="success"
                icon="el-icon-delete"
                style="background: #48D1CC;border-color:#48D1CC;color:#fff;"
                circle>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from "../../api/student/customerOrderSelect";

export default {
  name: "customerOrderSelect",
  data() {
    return {
      queryForm: {
        customerId: "",
        hotelName:"",
      },
      tableItems:[{
        text:"订单号", id:1,data:"",title:"orderId"
      },{
        text:"酒店名称", id:2,data:"",title:"hotelName"
      },{
        text:"房间类型", id:3,data:"",title:"roomName"
      },{
        text:"创建时间",id:4,data:"",title:"cTime"
      },{
        text:"订单金额",id:5,data:"",title:"orderCost"
      },{
        text:"支付方式",id:6,data:"",title:"payment"
      },{
        text:"订单状态",id:7,data:"",title:"status"
      },{
        text:"用户ID",id:8,data:"",title:"customerId"
      }],
      tableItemsData:[],
      dialogTableVisible: false,
      tableData: [],
      pageSize: api.pageSize,
      pageCount: 1,
      pageIndex: 1
    };
  },
  methods: {
    //初始化查询
    query() {
      api.getPageCount(this.queryForm.customerId).then(res => {
        this.pageCount = res;
        this.pageIndex = 1;
        this.getPage(1);
      });
    },
    //获取页面
    getPage(pageIndex) {
      api.getPage(pageIndex, this.queryForm.customerId).then(res => {
        this.tableData = res;
      });
    },
    //展示订单详细信息
    showOrder(id) {
      this.tableItems.forEach((item)=>{
        item.data="";
      });
      this.dialogTableVisible =true;
      api.showOrder(id).then(res=>{
        this.tableItemsData=res;
        this.tableItems.forEach((item)=>{
          item.data=this.tableItemsData[item.title]
        });
      });
    },
    //顾客订单不可视化
    deleteOrder(id) {
      this.$confirm('此操作将永久删除该记录'+id+', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.deleteOrder(id).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getPage(this.pageIndex);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },
  created() {
    this.query();
  }
};
</script>

<style scoped>
  .el-col {
    border-radius: 4px;
  }
  .bg-purple {
    background: #B4DCED;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    padding-top:5%;
    font-weight: bolder;
    font-size:16px;
    margin:auto;
    min-height: 3em;
  }

</style>
