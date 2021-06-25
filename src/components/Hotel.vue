<template>
  <div class="hotel-root">
    <el-container>
      <el-aside class="img-root" width="200px">
        <img :src="hotel.img_link" alt="HotelImage" />
      </el-aside>

      <el-main>
        <el-link class="hotel-name" href="https://element.eleme.io" target="_blank">{{hotel.hotel_name}}</el-link>><br/>
        <p>地址：{{hotel.ht_city}}</p>
      </el-main>

      <el-aside class="right" >
        <el-row type="flex" class="row-bg" justify="end">
          <el-col :span="6" class="rank">
            <b>{{hotel.rank}} </b>/5星<br/>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-mid" justify="center">
          <el-col :span="2">¥</el-col>
          <el-col :span="6"><b>{{hotel.price}}</b></el-col>
        </el-row>
        <el-row type="flex" justify="center" align="bottom">
          <el-col :span="6">
            <el-button>查看详情   ></el-button>
          </el-col>
        </el-row>
      </el-aside>

    </el-container>
    <HR />
  </div>



</template>

<script>
export default {
  name: "Hotel",
  props:{
    hotel: Object
  }
}
</script>

<style scoped>
.hotel-root {
  margin: 5px;
  padding: 10px;
}
.hotel-name {
  font-size: xxx-large;
}
.right {
  background: #f0f0f0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.row-mid {
  color: red;
  font-size: xx-large;
}
.row-mid b {
  font-size: xxx-large;
}

.rank b {
  font-size: x-large;
  color: goldenrod;
}

el-container {
  height: 200px;
}

.img-root {
  overflow: hidden;
  border-radius: 20px;

}
img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>