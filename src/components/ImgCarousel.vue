<template>
<div>
  <carousel class="slide-container" autoplay="true" :perPage="1" >
    <slide>
      <div class="img-container">
        <img src="../assets/img/scene1.jpeg" />
      </div>

    </slide>
    <slide>
      <div class="img-container">
        <img src="../assets/img/scene2.jpeg" />
      </div>
    </slide>
  </carousel>
</div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';

export default {
  name: "ImgCarousel",
  components: {
    Carousel,
    Slide
  }
}
</script>

<style scoped>
.img-container{
  float: left;
  width: 100vw;
  display: flex;
  justify-content: center;
}
.img-container img{

  object-fit: cover;
  width: 100vw;
}
.slide-container {
  display: flex;
  justify-content: center;
}
</style>

