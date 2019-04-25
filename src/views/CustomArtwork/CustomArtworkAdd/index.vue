<template>
  <div class="app-container">
    <div class="filter-container">
    </div>
    <el-form ref="customArtWorkForm" v-loading="listLoading" :model="customArtWorkForm" :rules="rules"
             label-width="200px" class="el-Form-my">
      <el-form-item label="艺术品名称" prop="customArtworkName">
        <el-input class="form-size" v-model="customArtWorkForm.customArtworkName"
        ></el-input>
      </el-form-item>
      <el-form-item label="艺术品所属类别" prop="customArtworkType">
        <el-select class="form-size1" v-model="customArtWorkForm.customArtworkType" @change="selectValue"
                   placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.workTypeId"
            :label="item.workTypeName"
            :value="item.workTypeId">
            <!--:key="item.value"-->
            <!--:label="item.label"-->
            <!--:value="item.value">-->
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="顶部banner图" prop="customArtworkBannerimg">
        <el-upload class="upload-demo"
                   :action="uploadUrl"
                   :on-remove="handlePictureRemove"
                   :before-upload="beforeAvatarUpload"
                   :on-success="getPictureInfo"
                   :file-list="bannerPictureAddress" :multiple="uploadMultiple" list-type="picture-card">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M，图片尺寸：建议宽度为750</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="艺术品作家名称" prop="customArtworkAuthname">
        <el-input size="large" class="form-size1" v-model="customArtWorkForm.customArtworkAuthname"></el-input>

      </el-form-item>
      <el-form-item label="艺术品价格" prop="customArtworkRemark">
        <el-input size="large" class="form-size1" v-model="customArtWorkForm.customArtworkRemark"></el-input>
        元
      </el-form-item>

      <el-form-item label="艺术品长度" prop="customArtworkHeight">
        <el-input size="large" class="form-size1" v-model="customArtWorkForm.customArtworkHeight"></el-input>
        CM
      </el-form-item>

      <el-form-item label="艺术品宽度    " prop="customArtworkWidth">
        <el-input size="large" class="form-size1" v-model="customArtWorkForm.customArtworkWidth"></el-input>
        CM
      </el-form-item>

      <el-form-item label="艺术品重量" prop="customArtworkWeight">
        <el-input size="large" class="form-size1" v-model="customArtWorkForm.customArtworkWeight"></el-input>
        KG
      </el-form-item>

      <el-form-item label="艺术品创作年份" prop="customArtworkYears">
        <div class="block">
          <el-date-picker
            v-model="customArtWorkForm.customArtworkYears"
            type="year"
            value-format="yyyy"
            placeholder="选择日期时间">
          </el-date-picker>
        </div>
      </el-form-item>

      <el-form-item label="艺术品库存" prop="customArtworkStock">
        <el-input size="large" class="form-size1" v-model="customArtWorkForm.customArtworkStock"></el-input>
      </el-form-item>
      <el-form-item label="艺术品介绍" prop="customArtworkIntroduce">
        <el-input type="textarea" :autosize="{ minRows: 5 }" class="form-size"
                  v-model="customArtWorkForm.customArtworkIntroduce"></el-input>
      </el-form-item>
      <el-form-item label="艺术品艺术家图片">
        <!-- action必选参数, 上传的地址 -->
        <el-upload class="avatar-uploader el-upload--text" :action="uploadUrl" :show-file-list="false"
                   :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="customArtWorkForm.customArtworkArtistImg !=''" :src="customArtWorkForm.customArtworkArtistImg"
               class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <P class="text">只能上传jpg/png文件，且不超过2M</P>
      </el-form-item>
      <el-form-item label="艺术品艺术家说">
        <el-input type="textarea" :autosize="{ minRows: 5 }" class="form-size"
                  v-model="customArtWorkForm.customArtworkArtistSaid"></el-input>
      </el-form-item>
      <el-form-item label="艺术品艺术家视频">
        <!-- action必选参数, 上传的地址 -->
        <el-upload class="avatar-uploader el-upload--text" :action="uploadUrl" :show-file-list="false"
                   :on-success="handleVideoSuccess" :before-upload="beforeUploadVideo"
                   :on-progress="uploadVideoProcess">
          <video v-if="customArtWorkForm.customArtworkVedio !='' && videoFlag == false"
                 :src="customArtWorkForm.customArtworkVedio" class="avatar"
                 controls="controls">您的浏览器不支持视频播放
          </video>
          <i v-else-if="customArtWorkForm.customArtworkVedio =='' && videoFlag == false"
             class="el-icon-plus avatar-uploader-icon"></i>
          <el-progress v-if="videoFlag == true" type="circle" :percentage="videoUploadPercent"
                       style="margin-top:30px;"></el-progress>
        </el-upload>
        <P class="text">请保证视频格式正确，且不超过10M</P>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {addCustomArtwork, getDetailById, selectAllWorkType, updateCustomerArtWork} from '@/api/customArtwork'

  export default {
    data() {
      return {
        customArtWorkForm: {//艺术品表单数据
          customArtworkName: '',//艺术品名称
          customArtworkType: '',//艺术品所属类别
          customArtworkBannerimg: '',//艺术品图片英文,隔开
          customArtworkHeight: '',//艺术品高
          customArtworkWidth: '',//艺术品宽
          customArtworkWeight: 0,//艺术品重量
          customArtworkYears: '',//创作年份
          customArtworkStock: '',//艺术品库存
          customArtworkIntroduce: '',//艺术品介绍
          customArtworkArtistImg: '',//艺术品艺术家图片
          customArtworkArtistSaid: '',//艺术品艺术家说
          customArtworkVedio: '',//艺术家说视频地址URL
          customArtworkRemark: '',//艺术品价格
          customArtworkAuthname: ''//艺术品作家名称
        },
        bannerPictureAddress: [],//图片数组
        uploadUrl: process.env.BASE_API + "/qiniuUpload",//图片上传
        uploadMultiple: false,         //是否可以多张上传
        videoFlag: false,             //视频是否在上传
        videoUploadPercent: 0,
        listLoading: false, //刷新加载框
        value: '',                //下拉菜单默认值
        options: [    //艺术品类别下拉框
//          {
//            value: '1',
//            label: '绘画类艺术品'
//          }, {
//            value: '2',
//            label: '青铜器艺术品'
//          }, {
//            value: '3',
//            label: '书籍类艺术品'
//          }, {
//            value: '4',
//            label: '雕塑类艺术品'
//          }, {
//            value: '5',
//            label: '织印染绣类艺术品'
//          },
//          {
//            value: '6',
//            label: '票据类艺术品'
//          },
//          {
//            value: '7',
//            label: '票据类艺术品'
//          },
//          {
//            value: '8',
//            label: '服饰类艺术品'
//          },
//          {
//            value: '9',
//            label: '民间工艺品'
//          },
//          {
//            value: '10',
//            label: '文房四宝类艺术品'
//          },
//          {
//            value: '11',
//            label: '家具类艺术品'
//          },
//          {
//            value: '12',
//            label: '摄影类艺术品'
//          },
//          {
//            value: '13',
//            label: '玉器类艺术品'
//          },
//          {
//            value: '14',
//            label: '珠宝首饰类艺术品'
//          },
//          {
//            value: '15',
//            label: '传统工艺品'
//          },
//          {
//            value: '16',
//            label: '陶瓷类工艺品'
//          },
        ],
        rules: {                      //表单校验规则
          customArtworkName: [
            {required: true, message: '请输入售卖艺术品名称', trigger: 'change'},
            {max: 50, message: '长度小于50个字符', trigger: 'change'}
          ],
          customArtworkType: [
            {required: true, message: '请选择售卖艺术品所属类别', trigger: 'change'},
          ],
          customArtworkAuthname: [
            {required: true, message: '请填写艺术家名称', trigger: 'change'},
          ],
          customArtworkBannerimg: [
            {required: true, message: '请上传售卖艺术品图片', trigger: 'blur'}
          ],
          customArtworkHeight: [
            {required: true, message: '请填写艺术品长度', trigger: 'change'},
            {
              validator(r, v, b) {
                (/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/).test(v) ? b() : b(new Error('请填写大于0的最多两位小数的价格'))
              }
            }
          ],
          customArtworkWidth: [
            {required: true, message: '请填写艺术品宽度', trigger: 'change'},
            {
              validator(r, v, b) {
                (/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/).test(v) ? b() : b(new Error('请填写大于0的最多两位小数'))
              }
            }
          ],
          customArtworkYears: [
            {required: true, message: '请选择创作年份', trigger: 'change'}
          ],
          customArtworkStock: [
            {required: true, message: '请填写库存', trigger: 'change'},
            {
              validator(r, v, b) {
                (/^[\d]*$/).test(v) ? b() : b(new Error('请填写大于0的数字'))
              }
            }
          ],
          customArtworkIntroduce: [
            {required: true, message: '请填写艺术品介绍信息', trigger: 'change'}
          ],
          customArtworkRemark: [
            {required: true, message: '请填写艺术品售卖价格', trigger: 'change'},
            {
              validator(r, v, b) {
                (/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/).test(v) ? b() : b(new Error('请填写大于0的最多两位小数的价格'))
              }
            }
          ],

        },
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {//页面初始化加载数据
        const id = this.$route.query.customArtworkId
        console.log(id)
        if (undefined != id) {
          this.listLoading = true;
          getDetailById(id).then(response => {
            console.log(response)
            this.customArtWorkForm = response.data.artworkWithBLOBs;
            console.log( this.customArtWorkForm)
            for (let i = 0; i < response.data.imgs.length; i++) {                      //获取多张图片地址
              let setPicture = {url: response.data.imgs[i]};
              this.bannerPictureAddress.push(setPicture);
            }
            console.log(this.bannerPictureAddress);
            this.listLoading = false;
          })
        }
        selectAllWorkType().then(response => {
          console.log(response);
          this.options = response.data;
        })
      },

      submitForm() {
        this.listLoading = true;
        this.$refs['customArtWorkForm'].validate((valid) => {
          console.log(valid);
          if (valid) {//验证通过
            const id = this.$route.query.customArtworkId
            console.log(id)
            if (undefined != id) {

              updateCustomerArtWork(this.customArtWorkForm).then(response => {
                console.log(response)
                if (response.status == 200) {//更新成功
                  this.listLoading = false;
                  this.$notify({
                    title: '成功',
                    message: response.data,
                    type: 'success',
                    duration: 2000
                  })
                  //跳转到列表页面
                  this.$router.push('/customArtworkAdoptList');
                } else if (response.status == 400) {//更新失败
                  this.$notify({
                    title: '失败',
                    message: response.data,
                    type: 'fail',
                    duration: 2000
                  })
                }
              })

            } else {
              addCustomArtwork(this.customArtWorkForm).then(response => {
                console.log(response)
                if (response.status == 200) {//添加成功
                  this.listLoading = false;
                  this.$notify({
                    title: '成功',
                    message: response.data,
                    type: 'success',
                    duration: 2000
                  })
                  //跳转到列表页面
                  this.$router.push('/customArtworkAdoptList');
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
          }
        });
      },
      selectValue(val) {

      },
      beforeAvatarUpload(file) {//图片上传之前验证
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';

        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG && !isPNG) {
          this.$notify({
            title: '失败',
            message: '上传图片必须是JPG/PNG 格式!',
            type: 'fail',
            duration: 2000
          })
        }
        if (!isLt2M) {
          this.$notify({
            title: '失败',
            message: '上传图片大小不能超过 2MB!',
            type: 'fail',
            duration: 2000
          })
        }
        return (isJPG || isPNG) && isLt2M;

      },
      handlePictureRemove(file, fileList) {          //删除图片
        this.bannerPictureAddress = [];
        for (var i = 0; i < fileList.length; i++) {

          console.log(fileList[i])
          let setPicture = {url: fileList[i].url};
          this.bannerPictureAddress.push(setPicture);
        }

        let customArtworkBannerimg = '';
        for (var i = 0; i < this.bannerPictureAddress.length; i++) {
          customArtworkBannerimg += this.bannerPictureAddress[i].url + ",";
        }
        customArtworkBannerimg = customArtworkBannerimg.substr(0, customArtworkBannerimg.length - 1);
        this.customArtWorkForm.customArtworkBannerimg = customArtworkBannerimg;
      },
      getPictureInfo(file, fileList) {    //获取到表单数据
        let setPicture = {url: file.data};
        this.bannerPictureAddress.push(setPicture);
        let customArtworkBannerimg = '';
        for (var i = 0; i < this.bannerPictureAddress.length; i++) {
          customArtworkBannerimg += this.bannerPictureAddress[i].url + ",";
        }
        customArtworkBannerimg = customArtworkBannerimg.substr(0, customArtworkBannerimg.length - 1);
        this.customArtWorkForm.customArtworkBannerimg = customArtworkBannerimg;
      },
      beforeUploadVideo(file) {//视频上传之前验证
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'].indexOf(file.type) == -1) {
          this.$notify({
            title: '失败',
            message: '请上传正确的视频格式',
            type: 'fail',
            duration: 2000
          })
          return false;
        }
        if (!isLt10M) {
          this.$notify({
            title: '失败',
            message: '上传视频大小不能超过10MB哦!',
            type: 'fail',
            duration: 2000
          })
          return false;
        }
      },
      handleVideoSuccess(res, file) {                               //获取视频上传地址
        this.videoFlag = false;
        this.videoUploadPercent = 0;
        if (res.status == 200) {
          this.customArtWorkForm.customArtworkVedio = res.data;
        } else {
          this.$notify({
            title: '失败',
            message: '视频上传失败，请重新上传！',
            type: 'fail',
            duration: 2000
          })
        }
      },
      uploadVideoProcess(event, file, fileList) {
        console.log(file)
        this.videoFlag = true;
        this.videoUploadPercent = file.percentage;
      },
      handleAvatarSuccess(res, file) {                               //获取上传图片地址
        if (res.status == 200) {
          this.customArtWorkForm.customArtworkArtistImg = res.data;
        } else {
          this.$notify({
            title: '失败',
            message: '视频上传失败，请重新上传！',
            type: 'fail',
            duration: 2000
          })
        }
      },
    }
  }
</script>

<style scoped>

  .el-upload--text {
    border: 1px dashed #888;
    width: 196px;
  }

  .form-size {
    width: 50%;
  }

  .form-size1 {
    width: 220px;
  }

  * {
    max-width: 100%;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
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

</style>
