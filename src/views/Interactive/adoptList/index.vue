<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-download"
      >导出excle
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
      <el-table-column align="center" label="ID" width="40">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="互动id" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.interactiveId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户id" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.interactiveMemberid }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="评论数量" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.interactiveCommentNumber }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="点赞数量" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.interactiveLikesNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="分享数量" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.interactiveShareNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="收藏数量" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.interactiveCollectionNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="分享时间" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.interactiveCreatetime }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否为活动" width="100">
        <template slot-scope="scope">
          <span>{{(scope.row.interactiveActivity == null ||  scope.row.interactiveActivity == 0)?'否':'是'}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" class-name="status-col" label="操作">
        <template slot-scope="scope">
          <el-button size="small"
                     @click="handleDel(scope.row)" type="danger">刪除
          </el-button>
          <router-link :to="'/InteractiveDetail?interactiveId='+scope.row.interactiveId">
            <el-button size="small" type="success">详情</el-button>
          </router-link>
            <el-button size="small" type="primary" @click="havingArtWork(scope.row.interactiveId)">分享列表</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="page" :page-sizes="[10,20,30, 50]" :page-size="rows" :total="total" background
                     layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"></el-pagination>
    </div>
        <el-dialog :title="textMap['having']" :visible.sync="havingFormVisible">
          <div class="share-list">
           <div style="border:1px solid #000">
             <div>
              <div class="share-title">
                <span>分享人</span>
              </div>
              <div :class="index == shareIndex ?shareActive:shareCenterRow" v-for="(share,index) in shareList" @click="getShareToUser(index,share.shareUserid)">
                  <div>
                    <img class="hearder-img" :src="share.shareUser.headPortraitUrl" />
                  </div>
                  <div>
                    <p>{{share.shareUser.wxname}}</p>
                    <p>{{share.shareCreatedTime}}</p>
                  </div>
              </div>
             </div>
           </div>
           <div style="border:1px solid #000">
             <div>
              <div class="share-title">
                <span>被分享人</span>
              </div>
              <div :class="shareCenterRow" v-for="(share,index) in shareToList">
                  <div>
                    <img class="hearder-img" :src="share.shareToUser.headPortraitUrl" />
                  </div>
                  <div>
                    <p>{{share.shareToUser.wxname}}</p>
                    <p>{{share.shareCreatedTime}}</p>
                  </div>
              </div>
             </div>
           </div>
          </div>
        </el-dialog>
  </div>

</template>

<script>
  import {getAdoptList,delInteractiveById,selectShare} from '@/api/interactive'

  export default {
    data() {
      return {
        shareActive:"share-center-row share-active",
        shareCenterRow:"share-center-row",
        shareIndex:0,
        shareToList:null,
        shareList:null,
        shareObj:{
          shareUserid:0,
          shareToUserid:0,
          shareObjectId:0,
          shareObjectType:0
        },
        havingFormVisible: false,
        textMap: {
          having: '分享列表',
        },
        page: 1,  //页数
        rows: 10, //每页显示行数
        total: null,
        list: null,  //数据列表
        listLoading: false, //刷新加载框
        dialogStatus: '',//头部按钮跟踪
        dialogFormVisible: false, //表单是否展示
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {//页面初始化加载数据
        let self = this;
        self.listLoading = true
        getAdoptList(self.page, self.rows).then(response => {
          console.log(response);
          if (response.status == 200) {
            console.log(response.data);
            self.listLoading = false;
            self.list = response.data.rows;

          } else if (response.status == 400) {
            self.listLoading = false;
            self.list = null;
          }
        })
      },
      havingArtWork(interactiveId) {
      this.shareIndex = 0;
      this.shareObj ={
        shareUserid:0,
        shareToUserid:0,
        shareObjectId:0,
        shareObjectType:0
       };
        console.log("interactiveId:",interactiveId)
        this.havingFormVisible = true
        this.shareObj.shareObjectId =interactiveId;
        this.selectShareUserList();
      },
      getShareToUser(index,shareUserid){
        console.log("getShareToUser:",shareUserid)
        this.shareIndex = index;
        this.shareObj.shareUserid = shareUserid;
        this.selectShareToUserList();
      },
      //查询分享人列表
      selectShareUserList(){
        let self = this;
        let shareObj = self.shareObj;
        selectShare(shareObj.shareUserid,shareObj.shareToUserid,shareObj.shareObjectId,shareObj.shareObjectType)
        .then(response =>{
          console.log("selectShareUserList:",response);
          if(response.status ==200){
            self.shareList = response.data;
            self.shareObj.shareUserid = response.data[0].shareUserid;
            self.selectShareToUserList();
          }else{
            self.shareList = null;
            self.shareToList =null;
          }
        })
      },
      //查询被分享人列表
      selectShareToUserList(){
        let self = this;
        let shareObj = self.shareObj;
        selectShare(shareObj.shareUserid,shareObj.shareToUserid,shareObj.shareObjectId,shareObj.shareObjectType)
        .then(response =>{
          console.log("selectShareToUserList:",response);
          self.shareToList = response.data;
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
      handleDel(rows){//删除某个在售艺术品
        console.log(rows);
        delInteractiveById(rows.interactiveId).then(response => {
          console.log(response);
          if (response.status == 200) {
            this.fetchData();
            this.$notify({
              title: '成功',
              message: response.data,
              type: 'success',
              duration: 2000
            })
          }
        })
      },


    }
  }
</script>

<style scoped>
.share-active{
  background: rebeccapurple;
}
.share-title{
  text-align: center;
}
.hearder-img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
.share-center-row{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.share-list{
  display: flex;
  justify-content: space-around;
}
.basic-information {
    width: 100%;
    background: #fff;
    border: solid 1px #dfe6ec;
    border-collapse: collapse;
  }

  .basic-information td {
    border: solid 1px #dfe6ec;
    padding: 10px;
    font-size: 14px;
  }
  .basic-information tr td:nth-child(1) {
    width:25%;
  }

  .basic-information tbody tr:nth-child(even) {
    background: #f6f9ff;
  }

  .basic-information tbody tr td:nth-child(odd) {
    text-align: center;
  }
</style>
