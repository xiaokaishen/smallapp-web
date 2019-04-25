<template>
  <div class="app-container">
    <div class="filter-container">

      <el-button v-if="adoptDetail.artworkExamineStatus==0" class="filter-item" style="margin-left: 10px;"
                 type="primary" @click="havingArtWork()">审核
      </el-button>
    </div>
    <table class="basic-information">
      <tbody>
      <tr>
        <td>艺术品主键</td>
        <td>{{adoptDetail.artworkId}}</td>
        <td>艺术品名称</td>
        <td>{{adoptDetail.artworkName}}</td>
      </tr>
      <tr>
        <td>艺术审核人</td>
        <td>{{adoptDetail.artworkAuditor}}</td>
        <td>艺术品作者</td>
        <td>{{adoptDetail.artworkAuthorid}}</td>
      </tr>
      <tr>
        <td>添加时间</td>
        <td>{{adoptDetail.artworkCreatetime}}</td>
        <td>更新时间</td>
        <td>{{adoptDetail.artworkUpdatetime}}</td>
      </tr>
      <tr>
        <td>艺术品长度</td>
        <td>{{adoptDetail.artworkHeight}} CM</td>
        <td>艺术品宽度</td>
        <td>{{adoptDetail.artworkWidth}} CM</td>
      </tr>
      <tr>
        <td>艺术品类别</td>
        <td>{{adoptDetail.artworkType}}</td>
        <td>艺术品年份</td>
        <td>{{adoptDetail.artworkYear}}</td>
      </tr>
      <tr>
        <td>艺术品阅读量</td>
        <td>{{adoptDetail.artworkBrowseNumber}}</td>
        <td>艺术品评论量</td>
        <td>{{adoptDetail.artworkCommentNumber}}</td>
      </tr>
      <tr>
        <td>艺术品点赞量</td>
        <td>{{adoptDetail.artworkLikesNumber}}</td>
        <td>艺术品分享量</td>
        <td>{{adoptDetail.artworkShareNumber}}</td>
      </tr>
      <tr>
        <td>艺术品标签</td>
        <td colspan="3">
          <el-tag :key="label" v-for="label in labelLists" type="warning">
            {{label}}
          </el-tag>
        </td>
      </tr>
      <tr>
        <td>艺术品介绍</td>
        <td colspan="3">{{adoptDetail.artworkIntroduce}}</td>
      </tr>
      <tr>
        <td>艺术品图片</td>
        <td colspan="3">
          <div v-for="artWorkImg in artworkImgsList">
            <img class="pageImage" :src="artWorkImg">
          </div>
        </td>
      </tr>
      </tbody>
    </table>
    <!--这里是审核的Form表单-->
    <el-dialog :title="textMap['having']" :visible.sync="havingFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="submitInfo" label-position="left"
               label-width="150px"
               style="width: 600px; margin-left:50px;">
        <el-form-item label="通过审核" prop="artworkExamineStatus">
          <el-radio class="radio" v-model="submitInfo.artworkExamineStatus" :label="1">是</el-radio>
          <el-radio class="radio" v-model="submitInfo.artworkExamineStatus" :label="-1">否</el-radio>
        </el-form-item>
        <el-form-item v-if="submitInfo.artworkExamineStatus==-1" label="未通过审核原因" prop="havingRemark">
          <el-input v-model="submitInfo.havingRemark"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="havingFormVisible = false">取消</el-button>
        <el-button type="primary" @click="havingData">提交
        </el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  import {getAdoptDetail,havingArtWork} from '@/api/artWork'

  export default {
    data() {
      return {
        listLoading: false, //刷新加载框
        adoptDetail: {
          artworkId: '',   //艺术品id
          artworkName: '',//艺术品名称
          artworkAuditor: '',//艺术品审核人id
          artworkAuthorid: '',//艺术品所属作家id
          artworkCreatetime: '',//艺术品添加时间
          artworkUpdatetime: '',//艺术品最后更新时间
          artworkHeight: '',//艺术品长
          artworkWeigth: '',//艺术品重量
          artworkWidth: '',//艺术品宽
          artworkIntroduce: '',//艺术品介绍
          artworkLabel: '',//艺术品标签
          artworkType: '',//艺术品所属类别
          artworkYear: '',//艺术品创作年份
          artworkImgs: '',//艺术品图片
          artworkExamineStatus: '',//艺术品审核状态   -1 未通过审核 0审核中  1已通过审核
          artworkBrowseNumber: 0,  //艺术品阅读量
          artworkCommentNumber: 0,//艺术品评论量
          artworkLikesNumber: 0,//艺术品点赞量
          artworkShareNumber: 0,//艺术品分享量
        },
        artworkImgsList: [],//图片数组
        labelLists: [],//标签数组
        havingFormVisible: false, //审核表单是否展示
        submitInfo: {//审核信息
          artworkExamineStatus: 1,
          havingRemark: '',
          artworkId: ''


        },
        rules: {
          havingRemark: [{required: true, message: '不通过审核必须填写原因', trigger: 'blur, change'}]
        },
        textMap: {
          having: '审核艺术品',
        }
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {//页面初始化加载数据
        let that = this;
        const id = this.$route.query.artworkId;
        this.listLoading = true;
        getAdoptDetail(id).then(response => {
          this.adoptDetail = response.data.artworkWithBLOBs;
          this.artworkImgsList = response.data.imgs;
          this.labelLists = response.data.labels;
          this.listLoading = false;
        })


      },
      havingArtWork() {

    //    this.submitInfo.artworkId = this.$route.params && this.$route.params.id
        this.submitInfo.artworkId = this.$route.query.artworkId
        this.havingFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      havingData() {//对艺术品进行审核
        console.log("进来审核了")
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            console.log(this.submitInfo)
            havingArtWork(this.submitInfo).then(response => {
              console.log(response)

              if (response.status == 200) {//添加成功
                this.havingFormVisible = false
                this.submitInfo.artworkExamineStatus = 1;//清空temp的值
                this.submitInfo.havingRemark = '';//清空temp的值
                this.submitInfo.artworkId = '';
                //调用初始化加载函数
                this.page = 1;
                this.fetchData();
                this.$notify({
                  title: '成功',
                  message: response.data,
                  type: 'success',
                  duration: 2000
                })

              }
            })
          }
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
    width: 25%;
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
