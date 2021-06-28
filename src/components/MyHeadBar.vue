<template>
  <div class="head-bar-root">
    <el-menu
        :default-active="activeIndex"
        class="menu-root"
        mode="horizontal"
        @select="handleSelect"
    >
      <div class="logo">
        <router-link id="logo" to="/index">
          <img src="../assets/img/logo.png" alt="Logo" />
        </router-link>
        <h2>SCU_Hotel</h2>
      </div>
      <el-menu-item index="1">酒店预订</el-menu-item>
      <el-menu-item index="2" ><router-link to="/register/customer">顾客注册</router-link>></el-menu-item>
      <el-menu-item index="3" ><router-link to="/register/manager">经理注册</router-link>></el-menu-item>
      <el-menu-item index="4"><router-link to="/about">关于我们</router-link> </el-menu-item>

      <div class="login">
        <el-menu-item index="5" v-show="!isLogin"><router-link to="/login">Login</router-link> </el-menu-item>

        <el-menu-item index="6" v-show="isLogin">
          <router-link to="/user"><i class="fas fa-user"></i> {{uname}}</router-link>
        </el-menu-item>

      </div>
    </el-menu>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  name: "MyHeadBar",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  props:{
    isLogin: Boolean,
    uname: String
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
.menu-root {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 10px;
}

img {
  height: 75px;
  width: auto;
}
.logo {
  display: flex;
  justify-content: space-between;
  margin: 0 25px ;
}

.login{
  position: absolute;
  right: 100px;
}
</style>
