<template>
  <div class="app-container">
    <div class="filter-container">
    </div>
    <!-- :rules="rules"-->
    <el-form ref="customArtWorkForm" v-loading="listLoading" :model="customArtWorkForm"
             label-width="200px" class="el-Form-my" :rules="rules">
      <el-form-item label="活动名称" prop="activityName">
        <el-input class="form-size"  v-model="customArtWorkForm.activityName"
        ></el-input>
      </el-form-item>
<!--      <el-form-item label="艺术品所属类别" prop="customArtworkType">
        <el-select class="form-size1" v-model="customArtWorkForm.customArtworkType" @change="selectValue"
                   placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
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
      </el-form-item>-->
      <el-form-item label="活动开始时间" prop="activityBeginData">
        <div class="block">
          <el-date-picker
            v-model="customArtWorkForm.activityBeginData"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm"
            placeholder="选择日期时间"
          id="activityBeginData">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="活动结束时间" prop="activityEndData">
        <div class="block">
          <el-date-picker
            v-model="customArtWorkForm.activityEndData"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm"
            placeholder="选择日期时间">
          </el-date-picker>
        </div>
      </el-form-item>

      <el-form-item label="活动费用" prop="activityCost">
        <el-input size="large" class="form-size1" v-model="customArtWorkForm.activityCost"></el-input>
        元
      </el-form-item>

      <el-form-item label="活动规模" prop="activityScale">
        <el-input size="large" class="form-size1" v-model="customArtWorkForm.activityScale"></el-input>
        人
      </el-form-item>

      <el-form-item label="活动最多参与人数" prop="activityMaxNumber">
        <el-input size="large" class="form-size1" v-model="customArtWorkForm.activityMaxNumber"></el-input>
        人
      </el-form-item>

      <el-form-item label="活动发起人姓名" prop="activityOriginator">
        <el-input size="large" class="form-size1" v-model="customArtWorkForm.activityOriginator"></el-input>
      </el-form-item>

      <el-form-item label="活动地址" prop="activityAddress">
        <el-input size="large" class="form-size1" v-model="customArtWorkForm.activityAddress"></el-input>
      </el-form-item>

      <el-form-item label="活动介绍" prop="acitvityIntroduce">
        <el-input type="textarea" :autosize="{ minRows: 5 }" class="form-size"
                  v-model="customArtWorkForm.acitvityIntroduce"></el-input>
      </el-form-item>

      <el-form-item label="活动简介" prop="activityIntroduction" class="unneed">
        <el-input type="textarea" :autosize="{ minRows: 5 }" class="form-size"
                  v-model="customArtWorkForm.activityIntroduction" placeholder="如不填，默认与活动名称相同" ></el-input>
      </el-form-item>
<!--      <el-form-item label="艺术品介绍" prop="customArtworkIntroduce">
        <el-input type="textarea" :autosize="{ minRows: 5 }" class="form-size"
                  v-model="customArtWorkForm.customArtworkIntroduce"></el-input>
      </el-form-item>

      <el-form-item label="艺术品简介" prop="customArtworkIntroduce">
        <el-input type="textarea" :autosize="{ minRows: 5 }" class="form-size" v-model="customArtWorkForm.customArtworkIntroduce"></el-input>
      </el-form-item>-->

      <el-form-item label="活动图片" prop="acitvityImg">
        <!-- action必选参数, 上传的地址 -->
        <el-upload class="avatar-uploader el-upload--text" :action="uploadUrl" :show-file-list="false"
                   :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="customArtWorkForm.acitvityImg !=''" :src="customArtWorkForm.acitvityImg"
               class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <P class="text">只能上传jpg/png文件，且不超过2M</P>
      </el-form-item>
 <!--     <el-form-item label="艺术品艺术家说">
        <el-input type="textarea" :autosize="{ minRows: 5 }" class="form-size"
                  v-model="customArtWorkForm.customArtworkArtistSaid"></el-input>
      </el-form-item>
      <el-form-item label="艺术品艺术家视频">
        &lt;!&ndash; action必选参数, 上传的地址 &ndash;&gt;
        <el-upload class="avatar-uploader el-upload&#45;&#45;text" :action="uploadUrl" :show-file-list="false"
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
      </el-form-item>-->


      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button  @click="cancalit">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style>
  .el-form-item.is-required .el-form-item__label .unneed:before{
  content:"";
  }

</style>
<script>
  import {addCustomArtwork, getDetailById, updateCustomerArtWork,addActivity} from '@/api/customArtwork'

  export default {
    data() {
      return {
        customArtWorkForm: {//艺术品表单数据
          activityName:'',
          activityBeginData:'',
          activityEndData:'',
          activityCost:'',
          activityOriginator:'',
          activityAddress:'',
          acitvityIntroduce:'',
          activityIntroduction:'',
          acitvityImg:'',
          activityScale:'',
          activityMaxNumber:''
        },
        bannerPictureAddress: [],//图片数组
        uploadUrl: process.env.BASE_API + "/qiniuUpload",//图片上传
        uploadMultiple: false,         //是否可以多张上传
        videoFlag: false,             //视频是否在上传
        videoUploadPercent: 0,
        listLoading: false, //刷新加载框
        value: '',                //下拉菜单默认值
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
          },
        ],
        rules: {                      //表单校验规则
          activityName: [
            {required: true, message: '请输入活动名称', trigger: 'change'},
            {max:50, message: '长度大于50个字符', trigger: 'change'}
          ],
          activityBeginData: [
            {required: true, message: '请输入活动开始时间', trigger: 'change'},
            {max: 100, message: '长度大于100个字符', trigger: 'change'}
          ],
          activityEndData: [
            {required: true, message: '请输入活动结束时间', trigger: 'change'},
            {max: 100, message: '长度大于100个字符', trigger: 'change'},
            {
              validator(r, v, b) {
                (v > window.activityBeginData.value) ? b() : b(new Error('结束日期时间不可在开始日期时间前'));
              }
            }
          ],
          activityCost: [
            {required: true, message: '请输入活动费用', trigger: 'change'},
            {max: 8, message: '长度小于8个字符', trigger: 'change'},
            {
              validator(r, v, b) {
                (/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/).test(v) ? b() : b(new Error('请填写大于等于0的最多两位小数的价格'))
              }
            }
          ],
          activityScale: [
            {required: true, message: '请输入活动规模', trigger: 'change'},
            {max: 20, message: '长度大于20个字符', trigger: 'change'}
           ],
          activityMaxNumber: [
            {required: true, message: '请输入活动最多参与人数', trigger: 'change'},
            {max: 8, message: '长度小于8个字符', trigger: 'change'},
            {
              validator(r, v, b) {
                (/^[0-9]{1,8}$/).test(v) ? b() : b(new Error('请填写小于8位的正整数'))
              }
            }
          ],
          activityOriginator: [
            {required: true, message: '请输入活动发起人姓名', trigger: 'change'},
            {max: 50, message: '长度大于50个字符', trigger: 'change'}
          ],
          activityAddress: [
            {required: true, message: '请输入活动地址', trigger: 'change'},
            {max: 255, message: '长度大于255个字符', trigger: 'change'}
          ],
          acitvityIntroduce: [
            {required: true, message: '请输入活动介绍', trigger: 'change'},
            {max: 300, message: '长度大于300个字符', trigger: 'change'}
          ],
          activityIntroduction: [
            {required: true, message: '请输入活动简介', trigger: 'change'},
            {max: 300, message: '长度大于300个字符', trigger: 'change'}
          ],
          acitvityImg: [
            {required: true, message: '请上传图片', trigger: 'change'}
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
/*        if (undefined != id) {
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
        }*/
      },

      submitForm() {

        this.$refs['customArtWorkForm'].validate((valid) => {
          console.log(valid);
          if (valid) {//验证通过
            this.listLoading = true;
              addActivity(this.customArtWorkForm).then(response => {
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
                  this.$router.push('/ActionList');
                } else{//更新失败
                  this.listLoading = false;
                  this.$notify({
                    title: '失败',
                    message: response.data,
                    type: 'fail',
                    duration: 2000
                  })
                }
              })
          }
        });
      },
      cancalit() {
        this.$router.push('/ActionList');
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

          this.customArtWorkForm.acitvityImg = res.data;
          console.log("图片地址是")
          console.log(res.data)
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
