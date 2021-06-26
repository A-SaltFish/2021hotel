<template>
<div class="element-root" >
  <MyHeadBar/>
  <ImgCarousel/>
  <SearchBar @search-hotels="fetchHotels" />
  <HotelList :hotels="hotels"/>
</div>
</template>

<script>
import MyHeadBar from "../components/MyHeadBar";
import ImgCarousel from "../components/ImgCarousel";
import SearchBar from "../components/SearchBar";
import HotelList from "../components/HotelList";
import axios from "axios";


export default {
  name: "Index",
  components: {
    MyHeadBar,
    ImgCarousel,
    SearchBar,
    HotelList
  },
  data() {
    return {
      hotels:[],
      date:''
    }
  },
  methods:{
    async fetchHotels(city, date){
      const res = await axios.get('/api/hotels?' + new URLSearchParams({ht_city: city}))
      this.hotels = res.data
      this.date = date
    }
  }
};
</script>

<style scoped>
.element-root {
 overflow: auto;
}

</style>