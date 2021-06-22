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
                   :value="item.id"></el-option>
      </el-select>
    </div>
    <div class="select-root">
      <el-select v-model="rank" placeholder="请选择星级（可选）">
        <el-option v-for="item in ranks"
                   :key="item"
                   :label="item"
                   :value="item"></el-option>
      </el-select>
    </div>
    <div class="button">
      <el-button type="primary" @click="Onclick" >查询</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  props:{
    citys: Array,
    ranks: Array
  },
  data() {
    return {
      city: '',
      rank: ''
    }
  },
  methods:{
    Onclick(){
      console.log(this.city, this.rank)
    }
  }
}
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