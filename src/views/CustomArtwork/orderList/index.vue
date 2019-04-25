<template>
  <div class="app-container">
    <div class="filter-container">
        <el-button class="filter-item" type="primary" icon="el-icon-download"
        @click='excelforDownload'>导出excle
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
      <el-table-column align="center" label="订单ID" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.customartworkOrderId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="在售作品ID" width="150">
        <template slot-scope="scope">
          <span>{{scope.row.customartworkOrderShopid}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="在售作品名称" width="150">
        <template slot-scope="scope">
          <span>{{scope.row.ysspCustomArtwork.customArtworkName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="买家ID" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.customartworkOrderUserid }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="买家姓名" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.customartworkOrderContactsname }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="买家地址" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.customartworkOrderContactsaddress }}</span>
        </template>
      </el-table-column>
     <el-table-column align="center" label="手机号" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.customartworkOrderContactstel }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单价格(单价)" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.customartworkOrderPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="下单时间" width="120">
      <template slot-scope="scope">
        <span>{{ scope.row.customartworkOrderCreatetime }}</span>
      </template>
    </el-table-column>
      <el-table-column align="center" label="是否付款" width="120">

        <template slot-scope="scope">
          <span>{{ismoney[scope.row.customartworkOrderStatus+1].label}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="购买数量" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.customartworkOrderNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="买家留言信息" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.customartworkOrderBuymessage }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column align="center" label="库存" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.customArtworkStock }}</span>
        </template>
      </el-table-column>-->

      <el-table-column align="center" class-name="status-col" label="操作">
        <template slot-scope="scope">
          <el-button size="small" v-if="scope.row.customartworkOrderStatus== 0"
                     @click="handleCustomArtworkOrderStatus(scope.row.customartworkOrderId, -1)" type="danger">取消订单
          </el-button>
          <el-button size="small" v-if="scope.row.customartworkOrderStatus== -1"
                     @click="handleCustomArtworkOrderStatus(scope.row.customartworkOrderId, 0)" type="primary">恢复订单
          </el-button>
          <el-button size="small"  v-if="scope.row.customartworkOrderStatus== 1"
                     @click="returnPayArtworkOrder(scope.row.customartworkOrderId)" type="danger">退款
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="page" :page-sizes="[10,20,30, 50]" :page-size="rows" :total="total" background
                     layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"></el-pagination>
    </div>

  </div>
</template>

<script>
  import {getList,delCustomerArtWorkById,returnPayArtworkOrder} from '@/api/customArtwork'
  import {queryOrderInfo} from '@/api/customArtwork'
  import {excelforDownload} from '@/api/customArtwork'
  import {handleCustomArtworkOrderStatus} from '@/api/customArtwork'
  import axios from 'axios'
  import request from '@/utils/request'
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
        ismoney: [    //艺术品类别下拉框
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
          },
          ],
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
    },
    methods: {
      returnPayArtworkOrder(orderId){
       let self = this;
        self.listLoading = true
        returnPayArtworkOrder(orderId).then(response =>{
        console.log("returnPayActivityOrder===")
        console.log(response);
          if (response.status == 200) {
            this.fetchData();
            this.$notify({
              title: '成功',
              type: 'success',
              duration: 2000
            })
            self.listLoading = false
          }else{
          self.listLoading = false
          }
        })
      },
      fetchData() {//页面初始化加载数据
        let self = this;
        self.listLoading = true
        console.log("页数")
        console.log(self.page)
        console.log("行数")
        console.log(self.rows)
        queryOrderInfo(self.page, self.rows).then(response => {
          if(response.status == 200) {
            console.log("返回的值得集合是")
            console.log(response);
            self.list = response.data;
          }
          if(response.data == null || response.data.length == 0){
            alert("没有更多数据");
          }
          self.listLoading = false
        })
      },
      handleDel(rows){//删除某个在售艺术品
        delCustomerArtWorkById(rows.customArtworkId).then(response => {
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
      handleSizeChange(val) {
        this.rows = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.page = val
        this.fetchData()
      },
      excelforDownload(){
        console.log("进来了下载方法")
        excelforDownload().then(response => {
          console.log("正常进入了")
//          let blob = new Blob([response.data],{type:"application/vnd.ms-excel"});
//          let bojcetUrl = URL.createObjectURL(blob)
//          window.location.href = bojcetUrl;
//            var url = window.URL.createObjectURL(data);
//            var $a = document.createElement('a');
//            $a.setAttribute("href", url);
//            $a.setAttribute("download", "aaa.xls");//需要加上后缀名
//            document.body.appendChild($a);
//            $a.click();
 //           document.body.removeChild($a);
          }).catch(function (xhr, errorType, error) {
              console.log("进入了错误")
     //     console.log(res)
          alert('Ajax request error, errorType: ' + errorType +  ', error: ' + error)
          });
      },
      handleCustomArtworkOrderStatus(customArtworkOrderId, customArtworkOrderStatus){//取消或恢复某个订单
        handleCustomArtworkOrderStatus(customArtworkOrderId, customArtworkOrderStatus).then(response => {
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

<style>
</style>
