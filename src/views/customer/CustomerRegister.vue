<template>
  <div class="login-wrap">
    <div class="login-form">
      <div class="form-title">用户注册</div>
      <el-form
          :model="formData"
          :rules="rules"
          class="form-content"
          label-width="0px"
          ref="form"
      >
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名，长度不超过20个字符" v-model="formData.username">
            <span slot="prepend"><i class="el-icon-user"></i></span>
          </el-input>
        </el-form-item>

        <el-form-item prop="email">
          <el-input placeholder="请输入您的邮箱" v-model="formData.email">
            <span slot="prepend"><i class="el-icon-user"></i></span>
          </el-input>
        </el-form-item>

        <el-form-item prop="password1">
          <el-input
              placeholder="请输入密码"
              type="password"
              v-model="formData.password1"
          >
            <span slot="prepend"><i class="el-icon-edit"></i></span>
          </el-input>
        </el-form-item>

        <el-form-item prop="password2">
          <el-input
              placeholder="请再次输入密码"
              type="password"
              v-model="formData.password2"
          >
            <span slot="prepend"><i class="el-icon-edit"></i></span>
          </el-input>
        </el-form-item>

        <el-form-item prop="tel">
          <el-input placeholder="请输入您的手机号" v-model="formData.tel">
            <span slot="prepend"><i class="el-icon-user"></i></span>
          </el-input>
        </el-form-item>

        <div class="login-btn" v-loading="this.$store.state.loading">
          <el-button @click="submit()" type="primary">注册</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "CustomerRegister",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.formData.password2 !== '') {
          this.$refs.form.validateField('password2');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.formData.password1) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      formData:{
        username: "",
        password1: "",
        password2: "",
        email: "",
        tel: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password1: [
          { validator: validatePass, trigger: 'blur' }
        ],
        password2: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        tel: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "手机号位数必须为11位！", trigger: "blur"}
        ]
      }
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          axios.post('/api/customers', this.formData)
          .then(res => {
            this.$message.success("注册成功: " + res.username);
            this.$router.push({ name: "login" });
          });
        }
      });
    }
  }
}
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/img/register_background.jpeg");
  background-size: cover;
}

.form-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}

.login-form {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.6);
  overflow: hidden;
}

.form-content {
  padding: 30px 30px;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
}

</style>