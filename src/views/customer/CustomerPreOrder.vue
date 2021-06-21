<template>
  <div class="course-wrap">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-fa fa-edit"></i> 学生课程
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <div class="table">
        <el-collapse v-model="activeOrder">
          <el-collapse-item name="1">
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
                    <tamplate v-for="item in odata.data" :key="item">
                      <el-form ref="form" :model="form" label-width="30%"  style="background:#FCFCFC;width:90%;margin:auto">
                        <el-form-item><div slot="label" style="font-size:1.3em;font-weight:bolder">{{item.title}}</div>
                          <el-row>{{item.content}}</el-row>
                        </el-form-item>
                      </el-form>
                    </tamplate>
                  <el-button type="primary" plain style="margin-left: 40%" @click="deleteItem(odata.id)">退单</el-button>
                </el-collapse-item>
              </div>
            </el-collapse>
          </el-collapse-item>
          <el-collapse-item v-model="waitOrder" name="2">
            <template slot="title">
              待评价 Waiting<i class="el-icon-loading"></i>
            </template>
            <el-collapse v-model="processingOrder" accordion style="width:90%;padding-left:5%">
              <el-collapse-item title="订单1" name="1">
                <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
              </el-collapse-item>
            </el-collapse>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from "../../api/student/course";

export default {
  name: "StudentCourse",
  data() {
    return {
      tableData: [],
      ongoingOrder: '1',
      waitOrder:'1',
      activeOrder:'1',
      orderLabel: [
      "酒店名称：",
      "房间类型：",
      "创建时间：",
      "订单金额：",
      "订单状态：",
      "用户ID：",
      "商家电话："
    ],
      ongoingOrderData:[
        { index:"1",
          id:"124346525",
          data:[{
            title:"酒店名称：",
            content:"儒雅随和大酒店"
          }, {
            title:"房间类型：",
            content:"你再骂总统套房"
          },{
            title:"创建时间：",
            content:"2021-6-21"
          },{
            title:"订单金额：",
            content:"993"
          },{
            title:"订单状态：",
            content:"已付款"
          },{
            title:"用户ID：",
            content:"114514"
          },{
            title:"商家电话：",
            content:"134765204112"
          }
          ]
        },
        { index:"2",
          id:"34653",
          data:[{
            title:"酒店名称：",
            content:"文明大酒店"
          }, {
            title:"房间类型：",
            content:"你的态度能不能好一点套房"
          },{
            title:"创建时间：",
            content:"2021-6-21"
          },{
            title:"订单金额：",
            content:"993"
          },{
            title:"订单状态：",
            content:"已付款"
          },{
            title:"用户ID：",
            content:"114514"
          },{
            title:"商家电话：",
            content:"134765204112"
          }
          ]
        }
      ]
    };
  },
  methods: {
    getList() {
      api.list().then(res => {
        this.tableData = res;
      });
    },
    deleteItem(orderId) {
      alert(orderId);
      api.deleteItem(orderId).then(() => {
        this.$message.success("退课成功!");
        this.getList();
      });
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style scoped>
  .order-font{
    color:#DABCE6;
    font-weight:bolder;
    font-size:1.5em;
    letter-spacing:1px;
    background:#F7F7F7;
    padding-left:1em;
    border-radius:0.5em;
    border:1px dotted grey;
    height:70%;
  }
  .order-font:hover{
    background:#C7F7F7;
  }

</style>
