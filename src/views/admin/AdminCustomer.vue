<template>
  <div class="department-wrap">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-fa fa-fort-awesome"></i> 顾客管理
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
              placeholder="用户名"
              v-model="queryForm.name"
            />
          </el-col>
          <el-col :span="3">
            <el-input
                    @keyup.enter.native="query"
                    placeholder="用户ID"
                    v-model="queryForm.id"
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
          <el-table-column label="用户ID" prop="id" />
          <el-table-column label="用户姓名" prop="name" />
          <el-table-column label="用户邮箱" prop="email" />
          <el-table-column label="用户电话" prop="tel" />
          <el-table-column label="用户性别" prop="sex" />
          <el-table-column label="创建时间" prop="birthday" />
          <el-table-column label="最后登录" prop="lastLogin" />
          <el-table-column align="center" label="操作" width="200px">
            <template slot-scope="scope">
              <el-button
                @click="deleteItem(scope.row.id)"
                size="mini"
                type="danger"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-dialog :visible.sync="creating" title="编辑" width="30%">
        <el-form :model="createForm" label-width="70px" ref="form">
          <el-form-item label="用户名">
            <el-input v-model="createForm.name"></el-input>
          </el-form-item>
          <el-form-item label="用户电话">
            <el-input v-model="createForm.tel"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱">
            <el-input v-model="createForm.email"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="createForm.sex">
              <el-radio label="0">保密</el-radio>
              <el-radio label="1">男性</el-radio>
              <el-radio label="2">女性</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="用户密码">
            <el-input v-model="createForm.password"></el-input>
          </el-form-item>
          <el-form-item label="再次确认">
            <el-input v-model="createForm.password1"></el-input>
          </el-form-item>
        </el-form>
        <span class="dialog-footer" slot="footer">
          <el-button @click="create" type="primary">确 定</el-button>
          <el-button @click="creating = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import * as api from "../../api/admin/adminCustomer";

export default {
  name: "AdminCustomer",
  data() {
    return {
      queryForm: {
        name: "",
        id:""
      },
      entityForm: {},
      tableData: [],
      createForm:{
        name:"user",
        tel:"",
        email:"",
        sex:"0",
        password:"123456",
        password1:"123456",
      },
      pageSize: api.pageSize,
      pageCount: 1,
      pageIndex: 1,
      creating: false
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
          if(this.createForm.password!==this.createForm.password1){
            this.$message.success("两次密码不匹配！");
          }
          else{
            api.createCustomer(this.createForm).then((res) => {
              this.$message.success(res);
              this.creating = false;
              this.getPage(1);
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
