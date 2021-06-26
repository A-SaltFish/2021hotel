<template>
<div>
  <div class="headBar">
    <el-avatar class="barElement" :size="50" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-avatar>
    <h2 class="barElement">{{username}}</h2>
  </div>

  <div class="book-info">
    <el-row :gutter="20">
      <el-col :span="6" class="bg-grey">
        酒店名称：
      </el-col>
      <el-col :span="12">
        {{hotel.hotel_name}}
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6" class="bg-grey">
        预订日期：
      </el-col>
      <el-col :span="12">
        {{createTime}}
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6" class="bg-grey">
        支付金额：
      </el-col>
      <el-col :span="12">
        {{room.room_price}}
      </el-col>
    </el-row>
  </div>

  <div class="buttons">
    <el-button type="danger">取消</el-button>
    <el-button type="success">确认</el-button>
  </div>
</div>
</template>

<script>
export default {
  name: "OrderInfo",
  computed: {
    username() {
      return this.$store.state.status.username;
    }
  },
  props: {
    hotel:Object,
    room: Object
  },
  data() {
    return {
      createTime:""
    }
  }
}
</script>

<style scoped>
.headBar {
  width: 100%;
  height: 100px;
  background-image: url("https://tse4-mm.cn.bing.net/th/id/OIP-C.dhdizGOgXHwFgAxnATC6PwHaE7?pid=ImgDet&rs=1");
  background-size: cover;
  display: flex;
  align-items: center;
}
.headBar .barElement {
  margin: 20px;
  padding: 5px;
}
</style>