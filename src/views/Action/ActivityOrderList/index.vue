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
      <el-table-column align="center" label="订单ID" width="80">
        <template slot-scope="scope">
          {{ scope.row.activityOrderId}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="活动ID" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.activityOrderActivityId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="报名人数" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.activityOrderNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="活动单价" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.activityOrderPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="活动总价" width="150">
        <template slot-scope="scope">
          <span>{{scope.row.activityOrderSumPrice}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="优惠券金额" width="150">
        <template slot-scope="scope">
          <span>{{scope.row.activityOrderCouponPrice}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="报名时间" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.activityOrderCreatetime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="选择的活动日期" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.activityActivityDate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单状态" width="120">
        <template slot-scope="scope">
          <span>{{ ismoney[scope.row.activityOrderStatus+1].label }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="提交人id" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.activityOrderComitPersonal }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column align="center" label="库存" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.customArtworkStock }}</span>
        </template>
      </el-table-column>-->

           <el-table-column align="center" class-name="status-col" label="操作">
            <template slot-scope="scope">
              <!--<router-link :to="'/ActionEdit?activityId='+scope.row.activityId">-->
                <!--<el-button size="small" type="warning">编辑</el-button>-->
              <!--</router-link>-->
              <!--<el-button size="small"-->
                         <!--@click="handleDel(scope.row.activityId)" type="danger">刪除-->
              <!--</el-button>-->
              <el-button size="small" v-if="scope.row.activityOrderStatus== 0"
              @click="handleOrderStatus(scope.row.activityOrderId, -1)" type="danger">取消订单
              </el-button>
              <el-button size="small" v-if="scope.row.activityOrderStatus== -1"
                         @click="handleOrderStatus(scope.row.activityOrderId, 0)" type="primary">恢复订单
              </el-button>
              <el-button size="small"  v-if="scope.row.activityOrderStatus== 1"
              @click="returnPayActivityOrder(scope.row.activityOrderId)" type="danger">退款
              </el-button>
              <router-link :to="'/ActivityOrderDetail?orderId='+scope.row.activityOrderId">
                <el-button size="small" type="success">详情</el-button>
              </router-link>
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
  import {getList,delCustomerArtWorkById,queryActivity,updateActivity,handleOrderStatus,selectAllOrder,returnPayActivityOrder} from '@/api/customArtwork'
  import {queryOrderInfo} from '@/api/customArtwork'
  import {excelforDownload} from '@/api/customArtwork'
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
        ismoney: [    //订单状态
          {
            value: '-1',
            label: '已取消'
          }, {
            value: '0',
            label: '提交订单未支付'
          }, {
            value: '1',
            label: '已支付'
          }, {
            value: '2',
            label: '已发货'
          }, {
            value: '3',
            label: '已退款'
          },],
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {//页面初始化加载数据
        let self = this;
        self.listLoading = true
        console.log("页数")
        console.log(self.page)
        console.log("行数")
        console.log(self.rows)
        let activityId = 0;
        selectAllOrder(self.page, self.rows).then(response => {
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
      handleOrderStatus(activityOrderId, activityOrderStatus){//取消或恢复某个订单
        handleOrderStatus(activityOrderId, activityOrderStatus).then(response => {
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
      returnPayActivityOrder(activityOrderId){
        let self = this;
        self.listLoading = true
        returnPayActivityOrder(activityOrderId).then(response =>{
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
      }
    }
  }
</script>

<style>
</style>
