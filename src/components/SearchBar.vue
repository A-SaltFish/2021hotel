<template>
  <div class="search-root">
    <div class="topic">
      <h2>酒店预订：</h2>
    </div>
    <div class="select-root">
      <el-select v-model="city" placeholder="请选择城市">
        <el-option v-for="item in citys"
                   :key="item.id"
                   :label="item.name"
                   :value="item.name"></el-option>
      </el-select>
    </div>
    <div class="button">
      <el-button type="primary" @click="OnClick">查询</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SearchBar",
  data() {
    return {
      city: '',
      citys: []
    }
  },
  methods: {
    async fetchCitys() {
      const res = await axios.get("/api/citys");
      this.citys = res.data;
    },
  OnClick() {
      this.$emit("search-hotels", this.city);
  }
  },
  created() {
    this.fetchCitys();
  }
};
</script>

<style scoped>
.search-root {
  margin: 10px;
  padding: 10px;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
}

.topic {
  color: white;
  align-self: flex-start;
}


</style>