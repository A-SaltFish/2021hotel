<template>
  <div>
    <MyHeadBar />
    <div class="top-part">

      <el-container class="topic">
        <el-main>
          <h1>{{hotel.hotel_name}}</h1>
            <p>{{hotel.ht_city}}  {{hotel.hotel_describe}}</p>
          <div class="icons">
            <span class="icon"><i class="el-icon-goods" /></span>
            <span class="icon"><i class="el-icon-s-flag" /></span>
            <span class="icon"><i class="el-icon-cold-drink" /></span>
            <span class="icon"><i class="el-icon-food" /></span>
          </div>
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
        </el-aside>
      </el-container>

      <HR/>

      <el-container class="images">
        <el-aside class="img-root">
          <img :src="hotel.img_link" alt="hotel_image" />
        </el-aside>
        <el-main class="img-right">
          <div class="img-l1">
            <div class="img-container0">
              <img :src="hotel.room_img1" alt="room img4" />
            </div>
            <div class="img-container1">
              <img :src="hotel.room_img2" alt="room img4" />
            </div>
          </div>
        </el-main>
      </el-container>
    </div>

    <HR />

  </div>

</template>

<script>
import MyHeadBar from "../components/MyHeadBar";
import axios from "axios";
export default {
  name: "HotelDetail",
  components: { MyHeadBar },
  modules: {
    MyHeadBar
  },
  props: ['hotel_id'],
  data() {
    return {
      rooms: [],
      hotel:{}
    }
  },
  methods: {
    async fetchHotels(id){
      const res = await axios.get('/api/hotels?' + new URLSearchParams({hotel_id: id}))
      this.hotel = res.data[0]
    }
  },
  created() {
    this.fetchHotels(this.hotel_id)
  }
}
</script>

<style scoped>
.top-part {
  margin: 0 40px;
  padding: 10px;
}
.topic h1 {
  font-size: xx-large;
  color: goldenrod;
}

.right {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.row-mid {
  color: crimson;
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
.images {
  height: 400px;
  overflow: hidden;
}
.img-l1 {
  display: flex;
  align-items: center;
}
.img-right {
  overflow: hidden;
}
.img-container0 {
  width: 60%;
  height: 70%;
  margin: 20px;
  border-radius: 20px;
  overflow: hidden;
}
.img-container1 {
  width: 35%;
  height: 90%;
  margin: 20px;
  border-radius: 20px;
  overflow: hidden;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.icon {
  margin: 5px;
  padding: 2px;
  border: goldenrod 3px;
  transform: scale(2);
}
</style>