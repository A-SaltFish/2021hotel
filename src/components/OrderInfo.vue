<template>
<div>
  <div class="headBar">
    <el-avatar class="barElement" :size="50" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-avatar>
    <h2 class="barElement">{{username}}</h2>
  </div>

  <div class="book-info">
    <el-row :gutter="20">
      <el-col :span="6" class="bg-grey">
        酒店名称：
      </el-col>
      <el-col :span="12">
        {{hotel.hotel_name}}
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6" class="bg-grey">
        预订日期：
      </el-col>
      <el-col :span="12">
        <div class="select-root">
          <el-dropdown>
        <span class="el-dropdown-link">
          <el-input v-model="date" placeholder="请选择日期"></el-input>
        </span>
            <el-dropdown-menu slot="dropdown" class="calenderContainer">
                <el-calendar v-model="date" class="calender"></el-calendar>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6" class="bg-grey">
        支付金额：
      </el-col>
      <el-col :span="12">
        {{room.room_price}}
      </el-col>
    </el-row>
  </div>

  <span slot="footer" class="dialog-footer">
    <el-button type="danger" @click="$emit('close-tab')">取消</el-button>
    <el-button type="success" @click="submitOrder">确认</el-button>
  </span>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "OrderInfo",
  computed: {
    username() {
      return this.$store.state.status.username;
    }
  },
  props: {
    hotel:Object,
    room: Object
  },
  data() {
    return {
      date: new Date()
    }
  },
  methods: {
    dateCheck() {
      if(this.date < Date.now() || this.date == '') {
        let currentDate = new Date()
        const day = currentDate.getDate()
        const month = currentDate.getMonth() + 1
        const year = currentDate.getFullYear()
        this.date = year + '-' + month + '-' + day
      }
      else {
        const day = this.date.getDate()
        const month = this.date.getMonth() + 1
        const year = this.date.getFullYear()
        this.date = year + '-' + month + '-' + day
      }
    },
    async submitOrder() {
      this.dateCheck()
      axios.post('/api/orders', {
        hotel_id:this.hotel.hotel_id,
        room_id: this.room.room_id,
        ctime: this.date,
        cost: this.room.room_price,
        status:0,
        ifshow:1
      })
    }
  }
}
</script>

<style scoped>
.headBar {
  width: 100%;
  height: 60px;
  background: linen;
  display: flex;
  align-items: center;
  border-radius: 20px;
  margin-bottom: 40px;
}
.headBar .barElement {
  margin: 20px;
  padding: 5px;
}
.el-row {
  height: 30px ;
  margin-bottom: 10px;
}
.bg-grey {
  height: 90%;
  border-radius: 20px;
  background: #F7F7F7;
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-button {
  margin: 0 20px
}
.calenderContainer {
  width: 50vw;
  height: 40vh;
  position: absolute;
  left: 50%;
  top: 30%;
  overflow: scroll;
}
.calender {
  object-fit: contain;
  width: 100%;
  height: 100%;
}
.login-form {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.6);
  overflow: hidden;
}
.calender el-calender {
  object-fit: contain;
}

</style>