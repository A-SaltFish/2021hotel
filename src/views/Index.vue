<template>
<div>
  <MyHeadBar/>
  <ImgCarousel/>
  <SearchBar :citys="citys" :ranks="ranks"/>
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
  },
  data() {
    return {
      citys: [],
      ranks: [1, 2, 3, 4, 5]
    }
  },
  methods:{
    async fetchCity() {
      const res = fetch('/api/citys')
      const data = (await res).json()
      return data
    }
  },
  async created() {
    this.citys = await this.fetchCity()
  }
}
</script>

<style scoped>

</style>