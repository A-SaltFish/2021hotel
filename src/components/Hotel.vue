<template>
  <div class="hotel-root">
    <div class="img-root">
      <img :src="imgLink" alt="HotelImage" />
    </div>
    <div class="description">
      <h2><el-link href="https://element.eleme.io" target="_blank">{{name}}</el-link></h2><br/>
      <p>地址：{{position}}</p>
    </div>
    <div class="other-info">
      <b>{{rank}}</b>/5星<br/>
      <h1>¥ {{price}}</h1>
      <el-button>查看详情   \></el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Hotel",
  props:{
    hotel: Object
  },
  data(){
    return {
      imgLink:'',
      name: '',
      position: '',
      rank: '',
      price: ''
    }
  }
}
</script>

<style scoped>

</style>