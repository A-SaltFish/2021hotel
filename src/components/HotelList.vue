<template>
  <div>
    <h3 v-for="hotel in hotels" :key="hotel.hotel_name">{{hotel.hotel_name}}</h3>
  </div>
</template>

<script>
export default {
  name: "HotelList",
  components:{
  },
  props:{
    hotels:Array
  }
}
</script>

<style scoped>

</style>