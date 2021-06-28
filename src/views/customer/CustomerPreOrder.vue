<template>
  <div class="course-wrap">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-fa fa-edit"></i> 当前订单
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-dialog :visible.sync="refunding" title="编辑" width="30%">
      <el-form :model="refundTable" label-width="70px" ref="form">
        <el-form-item label="订单Id">
          <el-input v-model="refundTable.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="退单理由">
          <el-input type="textarea" v-model="refundTable.reason"></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer" slot="footer">
          <el-button @click="refund()" type="primary">确 定</el-button>
          <el-button @click="refunding = false">取 消</el-button>
        </span>
    </el-dialog>

    <el-dialog :visible.sync="commiting" title="编辑" width="30%">
      <el-form :model="remarkTable" label-width="70px" ref="form">
        <el-form-item label="订单Id">
          <el-input v-model="remarkTable.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="评价订单">
          <el-input type="textarea" v-model="remarkTable.comment"></el-input>
        </el-form-item>
        <el-form-item label="服务评级">
          <el-rate v-model="remarkTable.rank" show-text></el-rate>
        </el-form-item>
      </el-form>
      <span class="dialog-footer" slot="footer">
          <el-button @click="comment()" type="primary">确 定</el-button>
          <el-button @click="commiting = false">取 消</el-button>
        </span>
    </el-dialog>

    <div class="container">
      <div class="table">
        <el-collapse v-model="activeOrder">
          <el-collapse-item name="1">
            <template slot="title">
              待支付 Waiting For Pay<i class="el-icon-bank-card"></i>
            </template>
            <el-collapse v-model="payingOrder" accordion style="width:90%;padding-left:5%">
              <div v-for="(odata,index) in payingOrderData" :key="index" >
                <el-collapse-item v-bind:name="odata.index" >
                  <!--订单详细内容-->
                  <div slot="title" style="background:#F7F7F7;padding-left:2%;
                      width:100%;font-weight: bolder;color:#DABCE6;font-size:1.5em">
                    <span style="color:#CABAA6">NO.{{odata.index}} OrderId：</span>{{odata.id}}
                  </div>
                  <div v-for="item in odata.data" :key="item.title">
                    <el-form label-width="30%"  style="background:#FCFCFC;width:90%;margin:auto">
                      <el-form-item><div slot="label" style="font-size:1.3em;font-weight:bolder">{{item.title}}</div>
                        <el-row>{{item.content}}</el-row>
                      </el-form-item>
                    </el-form>
                  </div>
                  <el-button type="primary" plain @click="pay(odata.id)" style="margin-left: 20%">前往支付</el-button>
                  <el-button type="danger" plain @click="cancel(odata.id)" style="margin-left: 20%">取消订单</el-button>
                </el-collapse-item>
              </div>
            </el-collapse>
          </el-collapse-item>
          <el-collapse-item name="2">
            <template slot="title">
              进行中 Processing<i class="el-icon-loading"></i>
            </template>
            <el-collapse v-model="ongoingOrder" accordion style="width:90%;padding-left:5%">
              <div v-for="(odata,index) in ongoingOrderData" :key="index" >
                <el-collapse-item v-bind:name="odata.index" >
                  <!--订单详细内容-->
                      <div slot="title" style="background:#F7F7F7;padding-left:2%;
                      width:100%;font-weight: bolder;color:#DABCE6;font-size:1.5em">
                        <span style="color:#CABAA6">NO.{{odata.index}} OrderId：</span>{{odata.id}}
                      </div>
                    <div v-for="item in odata.data" :key="item.title">
                      <el-form label-width="30%"  style="background:#FCFCFC;width:90%;margin:auto">
                        <el-form-item><div slot="label" style="font-size:1.3em;font-weight:bolder">{{item.title}}</div>
                          <el-row>{{item.content}}</el-row>
                        </el-form-item>
                      </el-form>
                    </div>
                  <el-button type="danger" plain @click="showRefund(odata.id)" style="margin-left: 40%">申请退单</el-button>
                </el-collapse-item>

              </div>
            </el-collapse>
          </el-collapse-item>
          <el-collapse-item name="3">
            <template slot="title">
              待评价 Waiting For Comment<i class="el-icon-chat-line-round"></i>
            </template>
            <el-collapse v-model="commentOrder" accordion style="width:90%;padding-left:5%">
              <div v-for="(odata,index) in waitcommentOrderData" :key="index" >
                <el-collapse-item v-bind:name="odata.index" >
                  <!--订单详细内容-->
                  <div slot="title" style="background:#F7F7F7;padding-left:2%;
                      width:100%;font-weight: bolder;color:#DABCE6;font-size:1.5em">
                    <span style="color:#CABAA6">NO.{{odata.index}} OrderId：</span>{{odata.id}}
                  </div>
                  <div v-for="item in odata.data" :key="item.title">
                    <el-form label-width="30%"  style="background:#FCFCFC;width:90%;margin:auto">
                      <el-form-item><div slot="label" style="font-size:1.3em;font-weight:bolder">{{item.title}}</div>
                        <el-row>{{item.content}}</el-row>
                      </el-form-item>
                    </el-form>
                  </div>
                  <el-button type="primary" plain @click="showComment(odata.id)" style="margin-left: 40%">进行评价</el-button>
                </el-collapse-item>
              </div>
            </el-collapse>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from "../../api/student/preOrder";

export default {
  name: "StudentCourse",
  data() {
    return {
      tableData: [],
      //控制小折叠
      payingOrder:"1",
      ongoingOrder: '1',
      commentOrder:"1",
      //控制大折叠
      activeOrder:"1",
      refunding:false,
      commiting:false,
      refundTable:{
        id:"",
        reason:"",
      },
      remarkTable:{
        id:"",
        comment:"",
        rank:0,
      },
      orderLabel: [
        {tindex:"hotelName",
          tname:"酒店名称："
        },{tindex:"roomName",
          tname:"房间类型："
        },{tindex:"cTime",
          tname:"创建时间："
        },{tindex:"orderCost",
          tname:"订单金额："
        },{tindex:"status",
          tname:"订单状态："
        },{tindex:"customerId",
          tname:"用户ID："
        },{tindex:"hotelTel",
          tname:"商家电话："
        }
    ],
      payingOrderData:[], //待支付订单
      ongoingOrderData:[],  //正在进行中的订单
      waitcommentOrderData:[], //待评价的订单
    };
  },
  methods: {
    showRefund(id){
      this.refunding=true;
      this.refundTable.id=id;
    },
    showComment(id){
      this.commiting=true;
      this.remarkTable.id=id;
    },
    getList() {
      api.list().then(res => {
        this.tableData = res;
        this.payingOrderData=[];
        this.ongoingOrderData=[];
        this.waitcommentOrderData=[];
        let pindex=1,oindex=1,windex=1;
        for(let i=0;i<this.tableData.length;i++){
          let odata=[];
          let oid=this.tableData[i]["orderId"];
          for(let j=0;j<7;j++){
            odata.push({title:this.orderLabel[j].tname,content:this.tableData[i][this.orderLabel[j].tindex]})
          }
          if(this.tableData[i]["status"]==="0") {
            this.payingOrderData.push({index: pindex, id: oid, data: odata});
            pindex=pindex+1;
          }
          else if(this.tableData[i]["status"]==="1") {
            this.ongoingOrderData.push({index: oindex, id: oid, data: odata});
            oindex=oindex+1;
          }
          else {
            this.waitcommentOrderData.push({index: windex, id: oid, data: odata});
            windex=windex+1;
          }
        }
      });
    },
    pay(orderId){
      alert("前往支付订单号为"+orderId+"的订单？");
      alert("欸嘿，暂无支付功能~");
    },
    cancel(orderId) {
      this.$confirm('您真的要取消单号为:'+orderId+'的订单吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.cancel(orderId).then(() => {
          this.$message({
            type: 'success',
            message: '退单成功！!'
          });
          this.getList();
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '退单取消！'
        });
      });
    },
    refund() {
      this.$confirm('您真的要申请退款单号为:'+this.refundTable.id+'的订单吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.refund(this.refundTable.id,this.refundTable.reason).then(() => {
          this.$message({
            type: 'success',
            message: '申请成功！!'
          });
          this.getList();
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '申请失败！'
        });
      });
    },
    comment() {
      api.remark(this.remarkTable.id,this.remarkTable.comment,this.remarkTable.rank).then((res) => {
        this.$message(res);
        this.getList();
      })
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style scoped>
  .item {
    margin-top: 10px;
    margin-right: 40px;
  }
</style>
