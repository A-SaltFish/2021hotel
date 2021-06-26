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
    <div class="select-root">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-input v-model="date" placeholder="请选择日期"></el-input>
        </span>
        <el-dropdown-menu slot="dropdown">
          <div class="calender">
            <el-calendar v-model="date"></el-calendar>
          </div>
        </el-dropdown-menu>
      </el-dropdown>
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
      date: '',
      citys: []
    }
  },
  methods: {
    async fetchCitys() {
      const res = await axios.get("/api/citys");
      this.citys = res.data;
    },
  OnClick() {
      if(this.date < Date.now() || this.date == '') {
        let currentDate = new Date()
        const day = currentDate.getDate()
        const month = currentDate.getMonth() + 1
        const year = currentDate.getFullYear()
        this.date = year + '-' + month + '-' + day
      }
      this.$emit("search-hotels", this.city, this.date);
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
.calender {
  width: 50vw;
  height: 50vh;
}
.calender el-calender {
  object-fit: contain;
}

</style>