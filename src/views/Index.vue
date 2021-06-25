<template>
<div class="element-root" >
  <MyHeadBar/>
  <ImgCarousel/>
  <SearchBar @search-hotels="fetchHotels" />
  <HotelList :hotels="hotels"/>
  <baidu-map class="bm-view" ak="a4bZsXqS2yx7z1VlXaNjI60lbV9DHbYP"
             :center="mapCenter" :zoom="mapZoom" @ready="mapHandler"></baidu-map>
</div>
</template>

<script>
import MyHeadBar from "../components/MyHeadBar";
import ImgCarousel from "../components/ImgCarousel";
import SearchBar from "../components/SearchBar";
import HotelList from "../components/HotelList";
import axios from "axios";
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'


export default {
  name: "Index",
  components: {
    MyHeadBar,
    ImgCarousel,
    SearchBar,
    HotelList,
    BaiduMap
  },
  data() {
    return {
      hotels:[],
      mapCenter: {lng: 0, lat: 0},
      mapZoom: 3
    }
  },
  methods:{
    async fetchHotels(city){
      const res = await axios.get('/api/hotels?' + new URLSearchParams({ht_city: city}))
      this.hotels = res.data
    },
    mapHandler({BMap, map}) {
      console.log(BMap, map)
      this.center.lng = 116.404
      this.center.lat = 39.915
      this.zoom = 15
    }
  }
};
</script>

<style scoped>
.element-root {
 overflow: auto;
}
.bm-view {
  width: 100%;
  height: 300px;
}
</style>