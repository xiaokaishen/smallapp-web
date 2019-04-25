<template>
  <div class="app-container">
    <div class="filter-container">
    </div>
    <table class="basic-information">
      <tbody>
      <tr>
        <td>艺术品id</td>
        <td>{{adoptDetail.customArtworkId}}</td>
        <td>艺术品名称</td>
        <td>{{adoptDetail.customArtworkName}}</td>
      </tr>
      <tr>
        <td>添加时间</td>
        <td>{{adoptDetail.customArtworkCreatetime}}</td>
        <td>更新时间</td>
        <td>{{adoptDetail.customArtworkUpdatetime}}</td>
      </tr>
      <tr>
        <td>艺术品长度</td>
        <td>{{adoptDetail.customArtworkHeight}} CM</td>
        <td>艺术品宽度</td>
        <td>{{adoptDetail.customArtworkWidth}} CM</td>
      </tr>
      <tr>
        <td>艺术品类别</td>
        <td>{{adoptDetail.customArtworkType}}</td>
        <td>艺术品年份</td>
        <td>{{adoptDetail.customArtworkYears}}</td>
      </tr>
      <tr>
        <td>艺术品重量</td>
        <td>{{adoptDetail.customArtworkWeight}}</td>
        <td>艺术品库存</td>
        <td>{{adoptDetail.customArtworkStock}}</td>
      </tr>
      <tr>
        <td>艺术品价格</td>
        <td colspan="3">{{adoptDetail.customArtworkRemark}}</td>
      </tr>
      <tr>
        <td>艺术品介绍</td>
        <td colspan="3">{{adoptDetail.customArtworkArtistSaid}}</td>
      </tr>
      <tr>
        <td>小程序码</td>
        <td colspan="3">
          <a :href="smallAppCodeUrl" download=""><img :src="smallAppCodeUrl"></a>
        </td>
      </tr>
      <tr>
        <td>艺术家图片</td>
        <td colspan="3"><img :src="adoptDetail.customArtworkArtistImg"></td>
      </tr>
      <tr>
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
      </tr>

      <tr>
        <td>艺术品图片</td>
        <td colspan="3">
          <div v-for="artWorkImg in customArtworkImgsList">
            <img :src="artWorkImg">
          </div>
        </td>
      </tr>
      </tbody>
    </table>


  </div>
</template>

<script>
  import {getDetailById} from '@/api/customArtwork'

  export default {
    data() {
      return {
        listLoading: false, //刷新加载框
        adoptDetail: {
          customArtworkId: '',   //艺术品id
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
          customArtworkRemark: '',//艺术品价格
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
        const id = this.$route.query.customArtworkId;
        this.listLoading = true;
        getDetailById(id).then(response => {
          console.log(response)
          this.adoptDetail = response.data.artworkWithBLOBs;
          this.customArtworkImgsList = response.data.imgs;
          this.smallAppCodeUrl="http://qiniu.qingyin-sh.com/smallAppCode_"+this.adoptDetail.customArtworkId+"?v=1";
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
    width: 25%;
  }

  .basic-information tbody tr:nth-child(even) {
    background: #f6f9ff;
  }

  .basic-information tbody tr td:nth-child(odd) {
    text-align: center;
  }
</style>
