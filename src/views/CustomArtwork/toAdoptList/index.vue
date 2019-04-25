<template>
  <div class="app-container">
    <div class="filter-container">
      <input style="height: 30px;width: 80%;" id='searchArt' placeholder="请输入作品名称" @keyup.enter="searchByName" type="text" v-model="artName"/><el-button class="filter-item" type="success"  @click="searchByName(13)"
      >确认搜索
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column align="center" label="ID" width="50">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="名称" width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.artworkName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="作品介绍" width="500">
        <template slot-scope="scope">
        <!-- <span>{{ options[scope.row.artworkType-1].label}}</span>-->
          <span>{{scope.row.artworkIntroduce}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="年份" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.artworkYear }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="艺术家id" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.artworkAuthorid }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" class-name="status-col" label="操作">
        <template slot-scope="scope">
          <!--<router-link :to="'/artWorkDetail?artworkId='+scope.row.customArtworkId">-->
          <!--<span>当前绑定物品的ID：{{isbang}},当前栏物品的ID{{scope.row.artworkId}}</span>-->
          <el-button  style="background-color: #dd6161"  v-if="isbang == scope.row.artworkId" size="small" type="success"  @click="bindingAction(0)">已与该商品绑定</el-button>
          <el-button  style="background-color: #889aa4"  v-if="isbangList.includes(scope.row.artworkId) &&isbang != scope.row.artworkId" size="small" type="success">已与其他商品已经绑定</el-button>
          <el-button v-if="(!isbangList.includes(scope.row.artworkId))&&(isbang != scope.row.artworkId)" size="small" type="success" @click="bindingAction(scope.row.artworkId)">绑定</el-button>
          <!--<el-button v-if="scope.row.customArtworkArtId != null" size="small" type="success" @click="bindingAction(scope.row.artworkId)">已绑定</el-button>-->
          <!--</router-link>-->

        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="searchPage" :page-sizes="[10,20,30, 50]" :page-size="searchRows" :total="searchTotal" background
                     layout="total, sizes, prev, pager, next, jumper" @size-change="searchhandleSizeChange"
                     @current-change="searchhandleCurrentChange"></el-pagination>
    </div>

  </div>
</template>

<script>
  import {getAdoptList} from '@/api/artWork'
  import {selectAllArtWorkByName} from '@/api/artWork'
  import {updateCustomerArtWork} from '@/api/artWork'
  import {queryAllBind} from '@/api/artWork'
  export default {
    data() {
      return {
        page: 1,  //页数
        rows: 10, //每页显示行数
        total: null,
        list: null,  //数据列表
        listLoading: false, //刷新加载框
        dialogStatus: '',//头部按钮跟踪
        dialogFormVisible: false, //表单是否展示
        artName:'',
        searchPage:1,
        searchRows:10,
        searchTotal: null,
        isbang:"",
        isbangList:[],
        options: [    //艺术品类别下拉框
          {
            value: '1',
            label: '绘画类艺术品'
          }, {
            value: '2',
            label: '青铜器艺术品'
          }, {
            value: '3',
            label: '书籍类艺术品'
          }, {
            value: '4',
            label: '雕塑类艺术品'
          }, {
            value: '5',
            label: '织印染绣类艺术品'
          },
          {
            value: '6',
            label: '票据类艺术品'
          },
          {
            value: '7',
            label: '票据类艺术品'
          },
          {
            value: '8',
            label: '服饰类艺术品'
          },
          {
            value: '9',
            label: '民间工艺品'
          },
          {
            value: '10',
            label: '文房四宝类艺术品'
          },
          {
            value: '11',
            label: '家具类艺术品'
          },
          {
            value: '12',
            label: '摄影类艺术品'
          },
          {
            value: '13',
            label: '玉器类艺术品'
          },
          {
            value: '14',
            label: '珠宝首饰类艺术品'
          },
          {
            value: '15',
            label: '传统工艺品'
          },
          {
            value: '16',
            label: '陶瓷类工艺品'
          },]
      }
    },
    created() {
      this.fetchData();
      this.queryAllBind();
      this.isbang = this.$route.query.isbang
    },
    methods: {
      fetchData() {//页面初始化加载数据
        console.log("进入数据加载页面了")
        let self = this;
        self.listLoading = true
        getAdoptList(self.page, self.rows).then(response => {
          console.log(response);
          if (response.status == 200) {
            self.listLoading = false;
            self.list = response.data.rows;

          } else if (response.status == 400) {
            self.listLoading = false;
            self.list = null;
          }
        })
      },
      queryAllBind(){
        let that = this
        queryAllBind().then(response => {
          console.log(response);
          if (response.status == 200) {
            that.isbangList= [];
            if(response.data != null && response.data.length >0){

              for(let item of response.data) {
                that.isbangList.push(item.customArtworkArtId);
              }
              console.log("查出所有艺术品的售卖信息")
              console.log(that.isbangList)
            }
          }
        })
      },
      handleSizeChange(val) {
        this.rows = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.page = val
        this.fetchData()
      },

      searchByName(e){

        var keyCode = window.event? e.keyCode:e.which;
    if(e == 13 || keyCode == 13) {
      let self = this;
      self.listLoading = true
      selectAllArtWorkByName(self.artName, self.searchPage, self.searchRows).then(response => {
        console.log(response);
        if (response.status == 200) {
          self.listLoading = false;
          console.log("查询结果")
          console.log(response.data)
          self.list = response.data.rows;

        } else if (response.status == 400) {
          self.listLoading = false;
          self.list = null;
        }
      })
    }
      },

      searchhandleSizeChange(val) {
        this.searchRows = val
        this.searchByName(13)
      },
      searchhandleCurrentChange(val) {
        this.searchPage = val
        this.searchByName(13)
      },
      bindingAction(val) {
      console.log("进入绑定了")
        console.log(val);
      console.log("在售艺术品的ID");
      let that = this;
        console.log(this.$route.query.customArtworkId);
        let submitInfo ={
          customArtworkId:this.$route.query.customArtworkId,
          customArtworkArtId:val
        }
        updateCustomerArtWork(submitInfo).then(response => {
            if(response.status ==200) {
              if (val != 0) {
                alert("绑定成功")
                this.isbang = val;
                console.log("当前绑定物品的ID")
                console.log(this.isbang)
                this.fetchData()
                this.queryAllBind()
              }
              else {
                alert("已取消绑定")
                this.isbang = 0;
                this.fetchData()
                this.queryAllBind()
              }
            }
        });
  },
    },

  }
</script>

<style>
</style>
