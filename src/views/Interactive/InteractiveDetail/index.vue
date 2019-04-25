<template>
  <div class="app-container">
    <div class="filter-container">
    </div>
    <table class="basic-information">
      <tbody>
      <tr>
        <td>用户id</td>
        <td>{{adoptDetail.interactiveMemberid}}</td>
      </tr>
      <tr>
        <td>创建时间</td>
        <td>{{adoptDetail.interactiveCreatetime}}</td>
      </tr>
      <tr>
        <td>评论数量</td>
        <td>{{adoptDetail.interactiveCommentNumber}}</td>
      </tr>
      <tr>
        <td>点赞数量</td>
        <td>{{adoptDetail.interactiveLikesNumber}}</td>
      </tr>
      <tr>
        <td>分享数量</td>
        <td>{{adoptDetail.interactiveShareNumber}}</td>
      </tr>
      <tr>
        <td>收藏数量</td>
        <td>{{adoptDetail.interactiveCollectionNumber}}</td>
      </tr>
      <tr>
        <td>发表状态</td>
        <td>
          <span v-if="adoptDetail.interactiveExamineStatus==1">发表成功</span>
          <span v-else-if="adoptDetail.interactiveExamineStatus==1">发表失败</span>
        </td>
      </tr>

      <tr>
        <td>用户位置</td>
        <td>
          <span v-if="adoptDetail.interactivePosition==''">未填写位置</span>
          <span v-else>{{adoptDetail.interactivePosition}}</span>
        </td>
      </tr>

      <tr>
        <td>互动标签</td>
        <td>
          <el-tag :key="label" v-for="label in labelLists" type="warning">
            {{label}}
          </el-tag>
        </td>
      </tr>
      <tr>
        <td>互动内容</td>
        <td>{{adoptDetail.interactiveBody}}</td>
      </tr>
      <tr>
        <td>互动图片</td>
        <td>
          <div v-for="interactiveImg in interactiveImgsList">
            <img class="pageImage" :src="interactiveImg">
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import {getAdoptDetail} from '@/api/interactive'

  export default {
    data() {
      return {
        listLoading: false, //刷新加载框
        adoptDetail: {
          interactiveMemberid: '',   //用户id
          interactiveLabel: '',//标签
          interactivePosition: '',//位置
          interactiveCreatetime: '',//创建时间建
          interactiveCommentNumber: '',//评论数量
          interactiveLikesNumber: '',//点赞数量
          interactiveShareNumber: '',//分享数量
          interactiveCollectionNumber: '',//收藏数量
          interactiveExamineStatus: '',//审核状态
          interactiveBody: '',//内容
        },
        interactiveImgsList: [],//图片数组
        labelLists: [],//标签数组
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {//页面初始化加载数据
        const id = this.$route.query.interactiveId;
        this.listLoading = true;
        getAdoptDetail(id).then(response => {
          console.log(response)
          this.adoptDetail = response.data.interactiveWithBLOBs;
          this.interactiveImgsList = response.data.imgs;
          this.labelLists = response.data.labels;
          this.listLoading = false;
        })
      }
    }
  }
</script>

<style scoped>

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

  .pageImage{
    width:75%;
  }
</style>
