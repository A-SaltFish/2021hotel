<template>
  <div class="login-wrap">
    <MyHeadBar />
    <div class="login-form">
      <div class="form-title">酒店经理注册</div>
      <el-form
          :model="formData"
          :rules="rules"
          class="form-content"
          label-width="0px"
          ref="form"
      >
        <el-form-item prop="name">
          <el-input placeholder="请输入用户名，长度不超过20个字符" v-model="formData.name">
            <span slot="prepend"><i class="el-icon-user"></i></span>
          </el-input>
        </el-form-item>

        <el-form-item prop="email">
          <el-input placeholder="请输入您的邮箱" v-model="formData.email">
            <span slot="prepend"><i class="el-icon-message"></i></span>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
              placeholder="请输入密码"
              type="password"
              v-model="formData.password"
          >
            <span slot="prepend"><i class="el-icon-edit"></i></span>
          </el-input>
        </el-form-item>

        <el-form-item prop="password2">
          <el-input
              placeholder="请再次输入密码"
              type="password"
              v-model="password2"
          >
            <span slot="prepend"><i class="el-icon-edit"></i></span>
          </el-input>
        </el-form-item>

        <el-form-item prop="tel">
          <el-input placeholder="请输入您的手机号" v-model="formData.tel">
            <span slot="prepend"><i class="el-icon-phone"></i></span>
          </el-input>
        </el-form-item>

        <el-form-item prop="hotel_name">
          <el-input placeholder="请输入您的酒店名称" v-model="hotelData.name">
            <span slot="prepend"><i class="el-icon-house"></i></span>
          </el-input>
        </el-form-item>

        <el-form-item prop="tel">
          <el-input placeholder="请输入酒店售后电话" v-model="hotelData.tel">
            <span slot="prepend"><i class="el-icon-phone"></i></span>
          </el-input>
        </el-form-item>

        <el-form-item prop="hotel_describe">
          <el-input placeholder="请输入酒店简介" v-model="hotelData.desc">
            <span slot="prepend"><i class="el-icon-info"></i></span>
          </el-input>
        </el-form-item>

        <el-form-item >
          <el-input placeholder="请输入酒店所在城市" v-model="hotelData.city">
            <span slot="prepend"><i class="el-icon-position"></i></span>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-input placeholder="请输入酒店推荐入住价格" v-model="hotelData.minprice">
            <span slot="prepend"><i class="el-icon-money"></i></span>
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
import MyHeadBar from "../../components/MyHeadBar";

export default {
  name: "ManagerRegister",
  components: {MyHeadBar},
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      password2: "",
      formData:{
        name: "",
        password: "",
        email: "",
        tel: "",
      },
      hotelData: {
        name: "",
        tel: "",
        desc: "",
        city: "",
        minprice: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        tel: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "手机号位数必须为11位！", trigger: "blur"}
        ],
        notNull: [
          { required: true, message: "信息禁止为空", trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          axios.put('/api/admin/manager/create/manager', this.formData)
              .then((res) => {
                this.$message(res.data);
                axios.put('/api/admin/manager/create/hotel?',this.hotelData)
                        .then((res) => {
                          this.$message(res.data);
                          this.$router.push('/login')});
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
  height: 70vh;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.6);
  overflow: scroll;
/* Hide scrollBar */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.login-form::-webkit-scrollbar {
  display: none;
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