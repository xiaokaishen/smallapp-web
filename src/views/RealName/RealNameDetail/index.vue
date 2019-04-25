<template>
  <div class="app-container">
    <div class="filter-container">

      <el-button v-if="adoptDetail.realNameStatus==0" class="filter-item" style="margin-left: 10px;"
                 type="primary" @click="havingRealName(adoptDetail.realNameUserid)">审核
      </el-button>
    </div>
    <table class="basic-information">
      <tbody>
      <tr>
        <td>会员号</td>
        <td>{{adoptDetail.realNameUserid}}</td>
        <td>用户姓名</td>
        <td>{{adoptDetail.realNameUsername}}</td>
      </tr>
      <tr>
        <td>用户手机</td>
        <td>{{adoptDetail.realNameDocumentTel}}</td>
        <td>用户邮箱</td>
        <td>{{adoptDetail.realNameEmail}}</td>
      </tr>
      <tr>
        <td>证件类型</td>
        <td>{{adoptDetail.realNameDocumenttype}}</td>
        <td>证件号码</td>
        <td>{{adoptDetail.realNameDocumentNum}}</td>
      </tr>
      <tr>
        <td>所在国家</td>
        <td>{{adoptDetail.realNameCountry}}</td>
        <td>所在省/直辖市</td>
        <td>{{adoptDetail.realNameCity}}</td>
      </tr>
      <tr>
        <td>所在城市</td>
        <td>{{adoptDetail.realNameProvince}}</td>
        <td>审核状态</td>
        <td>
          <span v-if="adoptDetail.realNameStatus==-1" style="color: red">未通过审核</span>
          <span v-else-if="adoptDetail.realNameStatus==0" style="color: blue">审核中</span>
          <span v-else-if="adoptDetail.realNameStatus==1" style="color: green">已通过审核</span>
        </td>
      </tr>
      <tr>
        <td>认证时间</td>
        <td>{{adoptDetail.realNameCreatetime}}</td>
        <td>更新时间</td>
        <td>{{adoptDetail.realNameUpdatetime}}</td>
      </tr>
      <tr>
        <td>身份证正面</td>
        <td colspan="3">
          <img class="pageImage" :src="adoptDetail.documentFront"/>
        </td>
      </tr>
      <tr>
        <td>身份证反面</td>
        <td colspan="3"><img class="pageImage" :src="adoptDetail.documentBack"/></td>
      </tr>
      </tbody>
    </table>
    <!--这里是审核的Form表单-->
    <el-dialog :title="textMap['having']" :visible.sync="havingFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="submitInfo" label-position="left"
               label-width="150px"
               style="width: 600px; margin-left:50px;">
        <el-form-item label="通过审核" prop="realNameStatus">
          <el-radio class="radio" v-model="submitInfo.realNameStatus" :label="1">是</el-radio>
          <el-radio class="radio" v-model="submitInfo.realNameStatus" :label="-1">否</el-radio>
        </el-form-item>
        <el-form-item v-if="submitInfo.realNameStatus==-1" label="未通过审核原因" prop="havingRemark">
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
  import {getAdoptDetail, havingArtWork} from '@/api/realName'

  export default {
    data() {
      return {
        listLoading: false, //刷新加载框
        adoptDetail: {
          realNameUserid: '',      //实名认证用户id
          realNameUsername: '',      //实名认证用户姓名
          realNameStatus: '',      //实名认证用户审核状态
          realNameCountry: '',      //实名认证用户国家
          realNameCity: '',      //实名认证用户省/直辖市
          realNameProvince: '',      //实名认证用户所在市
          realNameDocumenttype: '',      //实名认证用户证件类型
          realNameDocumentNum: '',      //实名认证用户证件号码
          realNameDocumentTel: '',      //实名认证用户手机号码
          realNameEmail: '',      //实名认证用户邮箱
          realNameCreatetime: '',      //实名认证用户提交认证时间
          realNameUpdatetime: '',      //实名认证用户最后更新时间
          documentFront: '',      //实名认证用户证件正面
          documentBack: '',      //实名认证用户证件正面


        },
        havingFormVisible: false, //审核表单是否展示
        submitInfo: {//审核信息
          realNameUserid: '',
          realNameStatus: 1,
          havingRemark: ''


        },
        rules: {
          havingRemark: [{required: true, message: '不通过审核必须填写原因', trigger: 'blur, change'}]
        },
        textMap: {
          having: '实名审核',
        }
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {//页面初始化加载数据
        const id = this.$route.query.realNameUserid;

        console.log("id==="+id)
        this.listLoading = true;
        getAdoptDetail(id).then(response => {
          console.log(response)
          this.adoptDetail = response.data;

        })


      },
      havingRealName(realNameUserid) {
//        this.submitInfo.realNameUserid = this.$route.params && this.$route.params.id
        this.submitInfo.realNameUserid = realNameUserid
        this.havingFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      havingData() {//对实名进行审核
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            console.log(this.submitInfo)
            havingArtWork(this.submitInfo).then(response => {
              console.log(response)
              if (response.status == 200) {//添加成功
                this.havingFormVisible = false
                this.submitInfo.realNameStatus = 1;//清空temp的值
                this.submitInfo.havingRemark = '';//清空temp的值
                this.submitInfo.realNameUserid = '';
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
