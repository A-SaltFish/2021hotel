<template>
<div>
  <MyHeadBar/>
  <ImgCarousel/>
  <SearchBar />
</div>
</template>

<script>
import MyHeadBar from "../components/MyHeadBar";
import ImgCarousel from "../components/ImgCarousel";
import SearchBar from "../components/SearchBar";

export default {
  name: "Index",
  components: {
    MyHeadBar,
    ImgCarousel,
    SearchBar
  }
};
</script>

<style scoped>

</style>