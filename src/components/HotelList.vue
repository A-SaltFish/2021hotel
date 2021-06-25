<template>
  <el-container>
    <el-main>
      <Hotel v-for="hotel in hotels" :key="hotel.hotel_name" :hotel="hotel" @update-pos="updatePos"/>
    </el-main>
    <el-aside width="400px">
      <baidu-map class="bm-view" ak="a4bZsXqS2yx7z1VlXaNjI60lbV9DHbYP"
                 :center="mapCenter" :zoom="mapZoom" @ready="mapHandler"></baidu-map>
    </el-aside>
  </el-container>


</template>

<script>
import Hotel from "./Hotel";
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
export default {
  name: "HotelList",
  components:{
    Hotel,
    BaiduMap
  },
  props:{
    hotels:Array
  },
  data() {
    return {
      mapCenter: {lng: 0, lat: 0},
      mapZoom: 3
    }
  },
  methods: {
    mapHandler({BMap, map}) {
      console.log(BMap, map)
      this.mapCenter.lng = 116.404
      this.mapCenter.lat = 39.915
      this.mapZoom = 16
    },
    updatePos(lng, lat) {
      this.mapCenter = {lng: lng, lat: lat}
    }
  }
}
</script>

<style scoped>
el-container {
  height: 100vh;
}
.bm-view {
  width: 100%;
  height: 100%;
}
</style>