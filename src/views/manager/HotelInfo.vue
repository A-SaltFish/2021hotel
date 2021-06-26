<template>
  <div class="info-wrap">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-fa fa-id-badge"></i> 酒店信息
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <el-form :model="entityForm" class="info-form" label-width="30%">
        <el-form-item label="酒店ID">
          <el-input disabled v-model="entityForm.hotelId"></el-input>
        </el-form-item>
        <el-form-item label="经理">
          <el-input disabled v-model="entityForm.managerId"></el-input>
        </el-form-item>
        <el-form-item label="酒店名称">
          <el-input v-model="entityForm.name"></el-input>
        </el-form-item>
        <el-form-item label="酒店售后电话">
          <el-input v-model="entityForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="当前是否营业">
          <el-switch v-model="entityForm.isOpen" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="entityForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="update" type="primary">确认更新</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import * as api from "../../api/manager/hotelinfo";

export default {
  name: "HotelInfo",
  data() {
    return {
      entityForm: {
        hotelId: "",
        managerId: "",
        tel: "",
        name: "",
        isOpen: true,
        password: ""
      },
    };
  },
  methods: {
    get() {
      api.get().then(res => {
        this.entityForm = res;
        console.log(this.entityForm);
        if (this.entityForm.isOpen===1)
          this.entityForm.isOpen=true;
        else this.entityForm.isOpen=false;
      });
    },
    update() {
      api.update(this.entityForm).then(() => {
        this.$message.success("更新信息成功!");
      });
    }
  },
  created() {
    this.get();
  }
};
</script>

<style scoped>
.info-form {
  min-width: 400px;
  width: 35%;
  margin: auto;
}
</style>
