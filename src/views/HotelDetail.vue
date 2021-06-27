<template>
  <div>
    <MyHeadBar />
    <div class="top-part">

      <el-container class="topic">
        <el-main>
          <h1>{{hotel.hotel_name}}</h1>
            <p>{{hotel.ht_city_name}}  {{hotel.hotel_describe}}</p>
          <div class="icons">
            <span class="icon"><i class="el-icon-goods" /></span>
            <span class="icon"><i class="el-icon-s-flag" /></span>
            <span class="icon"><i class="el-icon-cold-drink" /></span>
            <span class="icon"><i class="el-icon-food" /></span>
            <span class="rate">
              <el-rate
                  v-model="hotel.hotel_rank"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}">
            </el-rate>
            </span>
          </div>
        </el-main>
        <el-aside class="right" >
          <el-row type="flex" class="row-bg" justify="end">
            <el-col :span="6" class="rank">
              <b>{{hotel.hotel_rank}} </b>/5星<br/>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-mid" justify="center">
            <el-col :span="2">¥</el-col>
            <el-col :span="6"><b>{{hotel.hotel_min_price}}</b></el-col>
          </el-row>
        </el-aside>
      </el-container>

      <HR/>

      <el-container class="images">
        <el-aside class="img-root">
          <img :src="hotel.hotel_img" alt="hotel_image" />
        </el-aside>
        <el-main class="img-right">
          <div class="img-l1">
            <div class="img-container0">
              <img :src="hotel.room_img1" alt="room img1" />
            </div>
            <div class="img-container1">
              <img :src="hotel.room_img2" alt="room img2" />
            </div>
          </div>
        </el-main>
      </el-container>
    </div>

    <HR />

    <div class="room-list">
      <Room v-for="room in rooms" :key="room.room_id" :room="room" @book-hotel="bookHotel"/>
    </div>

    <el-dialog title="确认订单" :visible.sync="dialogVisable">
      <OrderInfo :hotel="hotel" :room="bookroom" center="true" @close-tab="dialogVisable=false"/>
    </el-dialog>
  </div>

</template>

<script>
import MyHeadBar from "../components/MyHeadBar";
import axios from "axios";
import Room from "../components/Room";
import OrderInfo from "../components/OrderInfo";

export default {
  name: "HotelDetail",
  components: {OrderInfo, Room, MyHeadBar },
  modules: {
    MyHeadBar,
    Room,
    OrderInfo
  },
  props: ['hotel_id'],
  data() {
    return {
      rooms: [],
      hotel:{},
      dialogVisable: false,
      bookroom: {}
    }
  },
  methods: {
    async fetchHotel(id){
      const res = await axios.get('/api/search/hotel_id?' + new URLSearchParams({hotel_id: id}))
      this.hotel = res.data[0]
    },
    async fetchRooms(id) {
      const res = await axios.get('/api/roominfo/rooms?' + new URLSearchParams({rm_hotel_id: id}))
      this.rooms = res.data
    },
    bookHotel(room_id) {
      this.bookroom = this.rooms.filter((room)=>room.room_id === room_id)[0]
      this.dialogVisable = true
    }
  },
  created() {
    this.fetchHotel(this.hotel_id)
    this.fetchRooms(this.hotel_id)
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
  margin: 0 20px;
  padding: 2px;
  border: goldenrod 3px;
  transform: scale(1.5);
}
.rate {
  margin: 0 40px;
  transform: scale(1.5);
}
.icons {
  display: flex;

}
</style>