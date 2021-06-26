<template>
  <div class="room-root">
    <el-container>
      <el-aside class="img-root" width="200px">
        <img :src="room.room_img" alt="roomImage" />
      </el-aside>

      <el-main>
        <h2 class="room-name" >{{room.room_describe}}</h2>
        <div class="room-infos">
          <p class="room-info">{{room.room_type}}</p>
          <i v-if="room.rm_breakfast_type == 0 ? false:true" class="el-icon-food room-info"></i>
          <i v-if="room.rm_breakfast_type == 2 ? true:false" class="el-icon-dish room-info"></i>
        </div>

      </el-main>

      <el-aside class="right" >
        <el-row type="flex" class="row-bg" justify="end">

        </el-row>
        <el-row type="flex" class="row-mid" justify="center">
          <el-col :span="2">¥</el-col>
          <el-col :span="6"><b>{{room.room_price}}</b></el-col>
        </el-row>
        <el-row type="flex" justify="center" align="bottom">
          <el-col :span="6">
            <el-button type="warning" @click="$router.push('/hotel/' + hotel.hotel_id)">预订   ></el-button>
          </el-col>
        </el-row>
      </el-aside>

    </el-container>
    <HR />
  </div>



</template>

<script>
export default {
  name: "Room",
  props:{
    room: Object
  }
}
</script>

<style scoped>
.room-root {
  margin: 5px;
  padding: 10px;
}
.room-name {
  font-size: xx-large;
  color: goldenrod;
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
.room-infos {
  display: flex;
  align-items: center;
  background: aliceblue;
}
.room-info {
  margin: 10px;
  border: 2px goldenrod;
  border-radius: 5px;

}
</style>