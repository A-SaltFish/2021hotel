<template>
  <div class="course-wrap">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-fa fa-book"></i> 房间管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 这里是遮罩 -->
    <el-dialog  :visible.sync="createVisible" >
      <el-form>
        <el-form-item label="房间类型">
          <el-input v-model="createForm.type"></el-input>
        </el-form-item>
        <el-form-item label="早餐类型">
          <el-radio-group v-model="createForm.breakfast">
            <el-radio label="经济型"></el-radio>
            <el-radio label="豪华型"></el-radio>
            <el-radio label="总统型"></el-radio>
          </el-radio-group>
          <el-form-item label="房间价格">
            <el-input v-model="createForm.price"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="房间描述">
          <el-input type="textarea" v-model="createForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createRoom">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 这里是遮罩 -->
    <!-- 这里是遮罩2 -->
    <el-dialog  :visible.sync="editVisible" >
      <p style="margin-left: 40%;font-size:24px;font-weight:bold">房间ID：{{editForm.roomId}}</p>
      <el-form>
        <el-form-item label="房间类型">
          <el-input v-model="editForm.type"></el-input>
        </el-form-item>
        <el-form-item label="早餐类型">
          <el-radio-group v-model="editForm.breakfast">
            <el-radio label="经济型"></el-radio>
            <el-radio label="豪华型"></el-radio>
            <el-radio label="总统型"></el-radio>
          </el-radio-group>
          <el-form-item label="房间价格">
            <el-input v-model="editForm.price"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="房间描述">
          <el-input type="textarea" v-model="editForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateRoom">更新房间</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 这里是遮罩2 -->
    <div class="container">
      <div class="table">
          <span style="font-size:1.5vw;margin-left:30vw;font-weight:bold">房间信息表
            <el-button type="info" style="margin-left: 30vw;" @click="showCreate">新增房间</el-button>
          </span>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="房间ID" width="80" prop="roomId"/>
            <el-table-column label="房间类型" width="200">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>房间描述:</p><p> {{ scope.row.description }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.roomType }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="房间状态" prop="status" width="150"/>
            <el-table-column label="早餐类型" prop="breakfast" width="100" />
            <el-table-column label="房间价格" prop="price" />
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="showEdit(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="deleteRoom(scope.row.roomId)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import * as api from "../../api/manager/htroom";

  export default {
    name: "HotelRoom",
    data() {
      return {
        tableData: [],
        createForm: {
          type: "经济套房A型",
          breakfast:"经济型",
          desc:"简单实惠还管饱",
          price:"100",
        },
        editForm: {
          type: "经济套房A型",
          breakfast:"经济型",
          desc:"简单实惠还管饱",
          price:"100",
          status:"",
          roomId:"",
        },
        editVisible:false,
        createVisible:false
      };
    },
    methods: {
      getList() {
        api.list().then(res => {
          this.tableData = res;
          for(let i=0;i<this.tableData.length;i++){
            if(this.tableData[i].status===0){
              this.tableData[i].status="已空闲";
            }
            else{
              this.tableData[i].status="进行中";
            }
          }
        });
      },
      showCreate(){
        this.createVisible=true;
      },
      createRoom(){
        if(this.createForm.breakfast==="经济型")
          this.createForm.breakfast=1;
        else if(this.createForm.breakfast==="豪华型")
          this.createForm.breakfast=2;
        else this.createForm.breakfast=3;
        console.log(this.createForm);
        api.createRoom(this.createForm).then(()=>{
          this.createVisible=false;
          this.getList();
        })
      },
      showEdit(row){
        this.editVisible=true;
        this.editForm.roomId=row.roomId;
        this.editForm.type=row.roomType;
        this.editForm.price=row.price;
        this.editForm.status=row.status;
        this.editForm.desc=row.description;
        switch (row.breakfast) {
          case 1:this.editForm.breakfast="经济型";break;
          case 2:this.editForm.breakfast="豪华型";break;
          case 3:this.editForm.breakfast="总统型";break;
        }
      },
      updateRoom(){
        this.$confirm('请确认已核对好房间信息',"提示",{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          //转换类型
          switch (this.editForm.breakfast) {
            case "经济型":this.editForm.breakfast=1;break;
            case "豪华型":this.editForm.breakfast=2;break;
            case "总统型":this.editForm.breakfast=3;break;
          }
          switch (this.editForm.status) {
            case "进行中":this.editForm.status=1;break;
            case "已空闲":this.editForm.status=0;break;
          }
          api.editRoom(this.editForm).then((res) => {
            this.$message({
              type: 'info',
              message: res
            });
            this.editVisible=false;
            this.getList();
          })
        })
      },
      deleteRoom(roomId){
        this.$confirm('确认进行房间删除操作？', '警告：此操作不可逆', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.deleteRoom(roomId).then((res) => {
            this.$message({
              type: 'info',
              message: res
            });
            this.getList();
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消房间删除'
          });
        });
      },
    },
    created() {
      this.getList();
    }
  };
</script>

<style scoped>
</style>
