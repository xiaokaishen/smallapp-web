<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate"
      >添加
      </el-button>
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
      <el-table-column align="center" label="banner图" width="180">
        <template slot-scope="scope">
          <img :src="scope.row.bannerImg" class="picture-display"/>
        </template>
      </el-table-column>
      <el-table-column label="链接地址" width="220" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.bannerUrl }}</span>
        </template>
      </el-table-column>
      <el-table-column label="添加时间" width="180" align="center">
        <template slot-scope="scope">
          <span> {{ scope.row.bannerCreatetime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.bannerUpdatetime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="显示" width="60" align="center" prop="heardPictureDisplay">
        <template slot-scope="scope">
          <span v-if="scope.row.bannerIsshow==1">是</span>
          <span v-else="scope.row.bannerIsshow==1">否</span>
        </template>
      </el-table-column>
      <el-table-column align="center" class-name="status-col" label="操作">
        <template slot-scope="scope">
          <el-button size="small"
                     @click="handleEdit(scope.row)" type="primary">
            编辑
          </el-button>
          <el-button size="small"
                     @click="handleDel(scope.row)" type="danger">刪除
          </el-button>
        </template>
      </el-table-column>
    </el-table>


    <!--这里是更新与添加的Form表单-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="150px"
               style="width: 600px; margin-left:50px;">
        <el-form-item label="banner图片" prop="bannerImg">
          <!-- action必选参数, 上传的地址 -->
          <el-upload class="avatar-uploader el-upload--text" :action="uploadUrlBanner" :on-success="handleAvatarSuccess"
                     :show-file-list="false"
                     :before-upload="beforeAvatarUpload">
            <img v-if="temp.bannerImg !=''" :src="temp.bannerImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <P class="text">只能上传jpg/png文件，且不超过2M，图片尺寸：750*350</P>
        </el-form-item>
        <el-form-item label="点击图片跳转url" prop="bannerUrl">
          <el-input v-model="temp.bannerUrl"/>
        </el-form-item>
        <!--<span style="color: red;text-align: center;"> 提示:输入的格式如下所示   ../activity/activity?id=69&interactiveId=69<br/>id代表活动列表中活动ID,interactiveId代表互动专区中互动ID
        </span>-->
        <span style="color: red;text-align: center;">提示:输入的格式如下所示：https://mp.weixin.qq.com/s/GcazUVAfVqmPlMSK7Ebhyw 或者 ../activity/activity?id=69<br/>id代表活动列表中活动ID</span>
        <el-form-item label="是否显示" prop="bannerIsshow">
          <el-radio class="radio" v-model="temp.bannerIsshow" :label="1">是</el-radio>
          <el-radio class="radio" v-model="temp.bannerIsshow" :label="0">否</el-radio>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">提交
        </el-button>
        <el-button v-else-if="dialogStatus=='update'" type="primary" @click="updateDate">更新</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getList, createArticle, updateArticle, deleteArticle} from '@/api/banner'

  export default {
    data() {
      return {
        page: 1,  //页数
        rows: 0, //每页显示行数
        list: null,  //数据列表
        listLoading: false, //刷新加载框
        dialogStatus: '',//头部按钮跟踪
        dialogFormVisible: false, //表单是否展示
        textMap: {
          update: '编辑banner',
          create: '新增banner'
        },
        rules: {
          bannerImg: [{required: true, message: '图片不能为空', trigger: 'change'}],
        },
        temp: {
          bannerImg: '',//banner图片URL
          bannerUrl: '',//banner图片URL
          bannerIsshow: 1,//banner图片URL
        },
        selectId: '',//点击编辑选中的id
        uploadUrlBanner: process.env.BASE_API + "/qiniuUpload"


      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        let self = this;
        self.listLoading = true
        getList(self.page, self.rows).then(response => {
          console.log(response);
          if (response.status == 200) {
            self.listLoading = false;
            self.list = response.data.rows;

          } else if (response.status == 400) {
            self.listLoading = false;
          }
        })
      },
      handleCreate() {
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (['image/jpeg', 'image/jpg', 'image/png'].indexOf(file.type) == -1) {
          this.$notify({
            title: '失败',
            message: '请上传正确的图片格式',
            type: 'fail',
            duration: 2000
          })
          return false;
        }
        if (!isLt2M) {
          this.$notify({
            title: '失败',
            message: '上传图片大小不能超过 2MB哦!',
            type: 'fail',
            duration: 2000
          })
          return false;
        }
      },
      handleAvatarSuccess(res, file) {//图片上传成功之后数据回显
        console.log(res)
        //获取上传图片地址
        if (res.status == 200) {
          this.temp.bannerImg = "";
          this.temp.bannerImg = res.data;
        } else {
          this.$notify({
            title: '失败',
            message: '图片上传失败，请重新上传！',
            type: 'fail',
            duration: 2000
          })
        }
      },
      createData() {//提交一个banner图
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            console.log(this.temp)
            createArticle(this.temp).then(response => {
              console.log(response)

              if (response.status == 200) {//添加成功
                this.dialogFormVisible = false
                this.temp.bannerImg = '';//清空temp的值
                this.temp.bannerUrl = '';//清空temp的值
                //调用初始化加载函数
                this.page = 1;
                this.fetchData();
                this.$notify({
                  title: '成功',
                  message: response.data,
                  type: 'success',
                  duration: 2000
                })
              } else if (response.status == 400) {//添加失败
                this.$notify({
                  title: '失败',
                  message: response.data,
                  type: 'fail',
                  duration: 2000
                })

              }
            })
          }
        })
      },
      updateDate() {//更新一个banner信息
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if (this.selectId != '') {
              this.temp.bannerId = this.selectId;
              updateArticle(this.temp).then(response => {
                console.log(response)

                if (response.status == 200) {//更新成功
                  this.dialogFormVisible = false
                  this.temp.bannerImg = '';//清空temp的值
                  this.temp.bannerUrl = '';//清空temp的值
                  this.temp.bannerId = '';
                  this.selectId = '';
                  //调用初始化加载函数
                  this.page = 1;
                  this.fetchData();
                  this.$notify({
                    title: '成功',
                    message: response.data,
                    type: 'success',
                    duration: 2000
                  })
                } else if (response.status == 400) {//更新失败
                  this.$notify({
                    title: '失败',
                    message: response.data,
                    type: 'fail',
                    duration: 2000
                  })

                }

              })
            }
          }
        })
      },
      handleEdit(rows) {//点击进行编辑
        console.log(rows)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        //將信息添加到表單中
        this.temp.bannerImg = rows.bannerImg;
        this.temp.bannerIsshow = rows.bannerIsshow;
        this.temp.bannerUrl = rows.bannerUrl;
        this.selectId = rows.bannerId;
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      handleDel(rows) {//删除一个banner
        console.log(rows)
        deleteArticle({bannerId: rows.bannerId}).then(response => {
          console.log(response)
          if (response.status == 200) {//删除成功
            //调用初始化加载函数
            this.fetchData();
            this.$notify({
              title: '成功',
              message: response.data,
              type: 'success',
              duration: 2000
            })
          } else if (response.status == 400) {//删除失败
            this.$notify({
              title: '失败',
              message: response.data,
              type: 'fail',
              duration: 2000
            })
          }
        })
      }

    }
  }
</script>

<style scoped>
  .el-upload--text {
    border: 1px dashed #888;
    width: 200px;
  }

  .avatar {
    width: 360px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: start;

  }

  .avatar {
    max-width: 100%;
    max-height: 100%;
    height: auto;
    display: block;
  }

  .picture-display {
    max-width: 120px;
    max-height: 40px;
    display: block;
    margin: 5px auto;
  }

</style>
