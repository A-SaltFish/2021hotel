<template>
  <div>
    <Hotel v-for="hotel in hotels" :key="hotel.hotel_name" :hotel="hotel"/>
  </div>
</template>

<script>
import Hotel from "./Hotel";
export default {
  name: "HotelList",
  components:{
    Hotel
  },
  props:{
    hotels:Array
  }
}
</script>

<style scoped>

</style>