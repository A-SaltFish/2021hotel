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
            <el-input @keyup.enter.native="query" placeholder="订单ID" v-model="queryForm.orderId"/>
          </el-col>
          <el-col :span="3">
            <el-input @keyup.enter.native="query" placeholder="酒店名" v-model="queryForm.hotelName"/>
          </el-col>
          <el-col :span="3">
            <el-button @click="query" icon="el-icon-search" type="primary">搜索
            </el-button>
          </el-col>
        </el-row>
      </div>

      <el-row justify="center" type="flex">
        <el-pagination :current-page.sync="pageIndex" :page-size="pageSize"
                       :total="pageSize * pageCount" @current-change="getPage"
                       background layout="prev, pager, next"
        >
        </el-pagination>
      </el-row>

      <div class="table">
        <el-table :data="tableData" stripe>
          <el-table-column label="订单ID" prop="orderId" width="80em"/>
          <el-table-column label="房间类型" prop="roomType" width="200em" />
          <el-table-column label="当前花费" prop="precost" width="100em" />
          <el-table-column align="center"  label="创建时间" prop="createTime" width="250em"/>
          <el-table-column label="支付方式" prop="payment" width="80em"/>
          <el-table-column label="订单状态" prop="status" width="80em"/>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="showOrder(scope.$index)">查看评价</el-button>
              <el-button type="success" size="mini" @click="deleteOrder(scope.$index)">联系客户</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="订单详情" :visible.sync="dialogTableVisible">
          <el-form ref="form"  label-width="80px">
            <el-form-item label="订单ID">
              <el-input v-model="oid_value" disabled></el-input>
            </el-form-item>
            <el-form-item label="用户ID">
              <el-input v-model="cid_value" disabled></el-input>
            </el-form-item>
            <el-form-item label="用户评论">
              <el-input type="textarea" v-model="comment_value" disabled rows="4"></el-input>
            </el-form-item>
            <el-form-item label="用户评级">
              <el-rate v-model="rank_value" disabled show-score text-color="#ff9900" style="margin-top:1em">
              </el-rate>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  import * as api from "../../api/manager/aftersales";

  export default {
    name: "customerOrderSelect",
    data() {
      return {
        queryForm: {
          orderId: "",
          hotelName:"",
        },
        dialogTableVisible: false,
        tableData: [],
        pageSize: api.pageSize,
        pageCount: 1,
        pageIndex: 1,
        oid_value:"",
        cid_value:"",
        rank_value:0,
        comment_value:""
      };
    },
    methods: {
      //初始化查询
      query() {
        api.getPageCount(this.queryForm.orderId,this.queryForm.hotelName).then(res => {
          this.pageCount = res;
          this.pageIndex = 1;
          this.getPage(1);
        });
      },
      //获取页面
      getPage(pageIndex) {
        api.getPage(pageIndex, this.queryForm.customerId).then(res => {
          this.tableData = res;
          for(let i=0;i<this.tableData.length;i++){
            switch (this.tableData[i].status) {
              case 0:this.tableData[i].status="待付款"; break;
              case 1:this.tableData[i].status="进行中"; break;
              case 2:this.tableData[i].status="待评价"; break;
              case 3:this.tableData[i].status="已完成"; break;
              case 4:this.tableData[i].status="退单中"; break;
              case 5:this.tableData[i].status="已退单"; break;
            }
          }
        });
      },
      //展示订单详细信息
      showOrder(id) {
        this.dialogTableVisible =true;
        this.oid_value=this.tableData[id].orderId;
        this.cid_value=this.tableData[id].customerId;
        if(this.tableData[id].comment!=null)
          this.comment_value=this.tableData[id].comment;
        else this.comment_value="暂未评论";
        if(this.tableData[id].rank!=null)
          this.rank_value=this.tableData[id].rank;
        else this.rank_value="暂未评星";
      },
      showTel(id) {
        this.$notify({
          title: '提示：请保证客户的隐私，勿将手机号码泄露给第三方',
          message: this.tableData[id].customerTel,
          duration:7000,
        });
      },
      //顾客订单不可视化
      deleteOrder(id) {
        this.$confirm('您正在试图查询用户的手机号，您将保证用户隐私的安全, 侵权将受到法律制裁', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.showTel(id);
        })
      }
    },
    created() {
      this.query();
    }
  };
</script>

<style scoped>
  .bg-purple {
    background: #B4DCED;
  }
  .grid-content {
    padding-top:5%;
    font-weight: bolder;
    font-size:16px;
    margin:auto;
    min-height: 3em;
  }

</style>
