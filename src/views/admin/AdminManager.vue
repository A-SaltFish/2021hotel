<template>
  <div class="department-wrap">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-fa fa-fort-awesome"></i> 经理管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <div class="query-form">
        <el-row :gutter="20">
          <el-col :span="2">
            <el-button @click="showCreate" icon="el-icon-plus">创建</el-button>
          </el-col>
          <el-col :offset="13" :span="3">
            <el-input
                    @keyup.enter.native="query"
                    placeholder="经理ID"
                    v-model="queryForm.id"
            />
          </el-col>
          <el-col :span="3">
            <el-input
                    @keyup.enter.native="query"
                    placeholder="经理名"
                    v-model="queryForm.name"
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
          <el-table-column label="经理ID" prop="managerId" />
          <el-table-column label="酒店ID" prop="hotelId" />
          <el-table-column label="经理姓名">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>经理简介:</p><p> {{ scope.row.desc }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.name }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="经理电话" prop="tel" />
          <el-table-column label="经理邮箱" prop="email" />
          <el-table-column label="是否任职" prop="available" />
        </el-table>
      </div>

      <el-dialog :visible.sync="creating" title="编辑" width="30%">
        <template>
          <el-tabs v-model="activeName">
            <el-tab-pane label="经理表单" name="first">
              <el-form :model="managerForm" label-width="70px" ref="form">
                <el-form-item label="经理名称">
                  <el-input v-model="managerForm.name"></el-input>
                </el-form-item>
                <el-form-item label="经理电话">
                  <el-input v-model="managerForm.tel"></el-input>
                </el-form-item>
                <el-form-item label="经理邮箱">
                  <el-input v-model="managerForm.email"></el-input>
                </el-form-item>
                <el-form-item label="经理密码">
                  <el-input v-model="managerForm.password"></el-input>
                </el-form-item>
                <el-form-item label="再次确认">
                  <el-input v-model="managerForm.password1"></el-input>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="酒店表单" name="second">
              <el-form :model="hotelForm" label-width="70px" ref="form">
                <el-form-item label="酒店名称">
                  <el-input v-model="hotelForm.name"></el-input>
                </el-form-item>
                <el-form-item label="售后电话">
                  <el-input v-model="hotelForm.tel"></el-input>
                </el-form-item>
                <el-form-item label="酒店描述">
                  <el-input type="textarea" v-model="hotelForm.desc"></el-input>
                </el-form-item>
                <el-form-item label="城市所在">
                  <el-input v-model="hotelForm.city"></el-input>
                </el-form-item>
                <el-form-item label="最低价格">
                  <el-input v-model="hotelForm.minprice"></el-input>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </template>
        <span class="dialog-footer" slot="footer">
          <el-button @click="create" type="primary">确 定</el-button>
          <el-button @click="creating = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import * as api from "../../api/admin/adminManager";

  export default {
    name: "AdminManager",
    data() {
      return {
        queryForm: {
          name: "",
          id:""
        },
        entityForm: {},
        tableData: [],
        //经理表单
        managerForm:{
          name:"manager",
          tel:"",
          email:"",
          password:"123456",
          password1:"123456",
        },
        //酒店表单
        hotelForm:{
          name:"hotel",
          tel:"",
          desc:"这是一个普通的酒店",
          city:"成都",
          minprice:"100",
        },
        pageSize: api.pageSize,
        pageCount: 1,
        pageIndex: 1,
        creating: false,
        activeName: 'first'
      };
    },
    methods: {
      query() {
        api.getPageCount(this.queryForm.id,this.queryForm.name).then(res => {
          this.pageCount = res;
          this.pageIndex = 1;
          this.getPage(1);
        });
      },
      getPage(pageIndex) {
        api.getPage(pageIndex, this.queryForm.id,this.queryForm.name).then(res => {
          this.tableData = res;
        });
      },
      showCreate() {
        this.entityForm = {};
        this.creating = true;
      },
      create(){
        this.$confirm('请确认核对用户信息',"提示",{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          if(this.managerForm.password!==this.managerForm.password1){
            this.$message.success("经理两次密码不匹配！");
          }
          else{
            api.createManager(this.managerForm).then((res) => {
              this.$message.success(res);
              api.createHotel(this.hotelForm).then(()=>{
                this.$message.success(res);
                this.creating = false;
                this.getPage(1);
              })
            })
          }
        });
      },
      deleteItem(id) {
        this.$confirm('确认删除该用户？',"提示此操作不可逆",{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          api.deleteItem(id).then(() => {
            this.$message.success("删除成功");
            this.getPage(this.pageIndex);
          });
        })
      }
    },
    created() {
      this.query();
    }
  };
</script>

<style scoped></style>
