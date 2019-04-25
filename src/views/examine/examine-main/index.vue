<template>
  <div class="app-container">
    <div class="filter-container">
<!--      <el-button class="filter-item" type="primary" icon="el-icon-download"
      >导出excle
      </el-button>-->
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column align="center" label="审核ID" width="160">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="优惠券验证码" width="160">
        <template slot-scope="scope">
          <!--<span><img :src="scope.row.reportPhone"></span>-->
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="审核门店" width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.auditingStores }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="审核用户id" width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.auditingUserId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户名称" width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户手机号码" width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.userPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户支付宝" width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.userAlipay }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="创建时间" width="110">-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{ scope.row.reportCreateTime }}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column header-cell-style="background-color:red" align="center" label="审核状态" width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.examine ==1?'已审核':'未审核'}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" class-name="status-col" label="操作">
        <template slot-scope="scope">
<!--      <el-button size="small"
                     @click="handleDel(scope.row)" type="danger">刪除
          </el-button>-->
          <router-link :to="'/userDetail?userId='+scope.row.id">
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
  import {getAdoptList,delInteractiveById,queryAllUserInfo} from '@/api/interactive'

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
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {//页面初始化加载数据
        console.log("fetchData:"  )
        let self = this;
        // self.listLoading = true
        let list = [
          {id:1,code:12345,auditingStores:'4s店1',
            auditingUserId:11,userName:'斯柯达',
            userPhone:12345678911,userAlipay:17456123781},
          {id:2,code:45678,auditingStores:'4s店2',
            auditingUserId:22,userName:'万斯达',
            userPhone:12765438911,userAlipay:17445612281}
        ]
        self.list = list;
        // queryAllUserInfo(self.page, self.rows).then(response => {
        //   console.log(response);
        //   if (response.status == 200) {
        //     self.listLoading = false;
        //     self.list = response.data;
        //     self.list[0].examine =1;
        //     self.list[1].examine = 2;
        //   } else if (response.status == 400) {
        //     self.listLoading = false;
        //     self.list = null;
        //   }
        // })
      },
      handleSizeChange(val) {
        this.rows = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.page = val
        this.fetchData()
      },
      handleDel(rows){//删除某个在售艺术品
        console.log(rows);
        delInteractiveById(rows.interactiveId).then(response => {
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
