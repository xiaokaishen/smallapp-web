<template>
  <div class="app-container">
    <div class="filter-container">
    </div>
    <table class="basic-information">
      <tbody>
      <!--<tr>-->
        <!--<td>活动id</td>-->
        <!--<td>{{adoptDetail.activityOrderActivityId}}</td>-->
        <!--<td>活动名称</td>-->
        <!--<td>{{adoptDetail.activityName}}</td>-->
      <!--</tr>-->
      <!--<tr>-->
        <!--<td>活动开始时间</td>-->
        <!--<td>{{adoptDetail.activityBeginData}}</td>-->
        <!--<td>活动结束时间</td>-->
        <!--<td>{{adoptDetail.activityEndData}}</td>-->
      <!--</tr>-->
      <!--<tr>-->
        <!--<td>活动发起人</td>-->
        <!--<td>{{adoptDetail.activityOriginator}}</td>-->
        <!--<td>活动费用</td>-->
        <!--<td>{{adoptDetail.activityCost}}</td>-->
      <!--</tr>-->
      <!--<tr>-->
        <!--<td>活动参与人数</td>-->
        <!--<td>{{adoptDetail.activityBrowseNumber == null?0:adoptDetail.activityBrowseNumber}}</td>-->
        <!--<td>活动地址</td>-->
        <!--<td>{{adoptDetail.activityAddress}}</td>-->
      <!--</tr>-->
      <!--<tr>-->
        <!--<td>活动介绍</td>-->
        <!--<td colspan="3">{{adoptDetail.acitvityIntroduce}}</td>-->
      <!--</tr>-->
      <!--<tr>-->
        <!--<td>小程序码</td>-->
        <!--<td colspan="3">-->
          <!--<a :href="smallAppCodeUrl" download=""><img :src="smallAppCodeUrl"></a>-->
        <!--</td>-->
      <!--</tr>-->
      <tr>
        <td>活动ID</td>
        <td>{{adoptDetail.activityOrderActivityId}}</td>
        <td>报名人数</td>
        <td>{{adoptDetail.activityOrderNumber}}</td>
      </tr>
      <tr>
        <td>活动单价</td>
        <td>{{adoptDetail.activityOrderPrice}}</td>
        <td>活动总价</td>
        <td>{{adoptDetail.activityOrderSumPrice}}</td>
      </tr>
      <tr>
        <td>优惠券金额</td>
        <td>{{adoptDetail.activityOrderCouponPrice}}</td>
        <td>报名时间</td>
        <td>{{adoptDetail.activityOrderCreatetime}}</td>
      </tr>
      <tr>
        <td>选择活动的日期</td>
        <td>{{adoptDetail.activityActivityDate}}</td>
        <td>最后更新时间</td>
        <td>{{adoptDetail.activityOrderUpdatetime}}</td>
      </tr>
      <tr>
        <td>订单状态</td>
        <td>{{ismoney[adoptDetail.activityOrderStatus+1].label}}</td>
        <td colspan='2'></td>
      </tr>
      <!--<div v-for="item in adoptDetail.list">-->
        <!--<tr>-->
          <!--<td>姓名</td>-->
          <!--<td>{{item.activityContactName}}</td>-->
          <!--<td>性别</td>-->
          <!--<td>{{item.activityContactSex}}</td>-->
        <!--</tr>-->
        <!--<tr>-->
          <!--<td>联系电话</td>-->
          <!--<td>{{item.activityContactTel}}</td>-->
          <!--<td>身份证号</td>-->
          <!--<td>{{item.activityContactCodeNumber}}</td>-->
        <!--</tr>-->
      <!--</div>-->
      <!--      <tr>
              <td>艺术家说</td>
              <td colspan="3">{{adoptDetail.customArtworkIntroduce}}</td>
            </tr>

            <tr>
              <td>介绍视频</td>
              <td colspan="3">
                <video :src="adoptDetail.customArtworkVedio" controls="controls">
                  您的浏览器不支持 video 标签。
                </video>
              </td>
            </tr>-->
      <!--
            <tr>
              <td>艺术品图片</td>
              <td colspan="3">
                <div v-for="artWorkImg in customArtworkImgsList">
                  <img :src="artWorkImg">
                </div>
              </td>
            </tr>-->
      </tbody>
    </table>
    <table class="basic-information" v-for="(item,index) in adoptDetail.contactList">
      <tbody>
      <tr>
        <td>基本资料{{index+1}}</td>
      </tr>

      <tr>
        <td>姓名</td>
        <td>{{item.activityContactName}}</td>
        <td>性别</td>
        <td>{{item.activityContactSex}}</td>
      </tr>
      <tr>
        <td>联系电话</td>
        <td>{{item.activityContactTel}}</td>
        <td>身份证号</td>
        <td>{{item.activityContactCodeNumber}}</td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
  import {getDetailById,queryActivity,selectActivityOrderById} from '@/api/customArtwork'

  export default {
    data() {
      return {
        listLoading: false, //刷新加载框
        ismoney: [    //订单状态
          {
            value: '-1',
            label: '删除'
          }, {
            value: '0',
            label: '提交订单未支付'
          }, {
            value: '1',
            label: '已支付'
          }, {
            value: '2',
            label: '已发货'
          },
          {
            value: '3',
            label: '已退款'
          },],
        adoptDetail: {
          /*          customArtworkId: '',   //艺术品id
                    customArtworkName: '',//艺术品名称
                    customArtworkCreatetime: '',//艺术品添加时间
                    customArtworkUpdatetime: '',//艺术品最后更新时间
                    customArtworkHeight: '',//艺术品长
                    customArtworkWeight: '',//艺术品重量
                    customArtworkWidth: '',//艺术品宽
                    customArtworkArtistSaid: '',//艺术品介绍
                    customArtworkType: '',//艺术品所属类别
                    customArtworkYears: '',//艺术品创作年份
                    customArtworkIntroduce: '',//艺术家说
                    customArtworkArtistImg: '', //艺术家图片
                    customArtworkStock: 0,  //艺术品库存
                    customArtworkVedio: '',//艺术家介绍视频
                    customArtworkRemark: '',//艺术品价格*/
//          activityId:'',
//          activityAddress:'',
//          activityBeginData:'',
//          activityEndData:'',
//          activityOriginator:'',
//          activityName:'',
//          activityCost:'',
//          activityBrowseNumber:'',
//          acitvityIntroduce:'',
//          acitvityImg:'',
          activityOrderId:'',
          activityOrderActivityId:'',
          activityOrderNumber:'',
          activityOrderPrice:'',
          activityOrderSumPrice:'',
          activityOrderCouponPrice:'',
          activityOrderCreatetime:'',
          activityOrderUpdatetime:'',
          activityOrderStatus:'',
          activityOrderRemark:'',
          activityOrderComitPersonal:'',
          contactList:[]
        },
        customArtworkImgsList: [],//图片数组
        smallAppCodeUrl:'',//小程序二维码
        playerOptions: {
          playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: "",
            src: "http://qiniu.qingyin-sh.com/1536201007038707" //url地址
          }],
          poster: "", //你的封面地址
          // width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true  //全屏按钮
          },
        }
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {//页面初始化加载数据
        let self = this;
//        const activityId = this.$route.query.activityId;
//        this.listLoading = true;
//        queryActivity(activityId,0, 0).then(response => {
//          if(response.status == 200) {
//            console.log("详情是")
//            console.log(response.data)
//            self.adoptDetail = response.data.queryActivity;
//            this.smallAppCodeUrl="http://qiniu.qingyin-sh.com/smallAppCode_"+activityId+"?v=1";
//            console.log( self.adoptDetail.acitvityCreatedTime)
//          }
//          if(response.data == null || response.data.length == 0){
//            alert("没有更多数据");
//          }
//        })
        const orderId = this.$route.query.orderId;
        this.listLoading = true;
        selectActivityOrderById(orderId).then(response => {
          if(response.status == 200) {
            console.log("详情是")
            console.log(response.data)
            self.adoptDetail= response.data;
//            self.adoptDetail.list=response.data.contactList;
          }
          if(response.data == null || response.data.length == 0){
            alert("没有更多数据");
          }
        })

        /*        getDetailById(activityId).then(response => {
                  console.log(response)
                  this.adoptDetail = response.data.artworkWithBLOBs;

                  this.listLoading = false;
                })*/
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
</style>
