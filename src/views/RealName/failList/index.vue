<template>
  <div class="app-container">
    <div class="filter-container">
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
      <el-table-column align="center" label="ID" width="50">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户id" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.realNameUserid }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户姓名" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.realNameUsername }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="证件类型" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.realNameDocumenttype }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="证件号码" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.realNameDocumentNum }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="手机号码" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.realNameDocumentTel }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="邮箱" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.realNameEmail }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="认证时间" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.realNameCreatetime }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" class-name="status-col" label="操作">
        <template slot-scope="scope">
            <router-link :to="'/RealNameDetail?realNameUserid='+scope.row.realNameUserid">
              <el-button size="small" type="success">详情</el-button>
            </router-link>
          <el-button size="small"
                     type="warning" @click="failRecord(scope.row.realNameUserid)">
            信息
          </el-button>

        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap['fail']" :visible.sync="failFormVisible">
      <el-table
        v-loading="listLoading"
        :data="realNameRecordList"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        style="width: 100%;">
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="recordScope">
            {{ recordScope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作人类型" width="120">
          <template slot-scope="recordScope">
            <span v-if="recordScope.row.recordUsertype==2">管理员</span>
            <span v-else-if="recordScope.row.recordUsertype==1">用户</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作类型" width="120">
          <template slot-scope="recordScope">
            <span v-if="recordScope.row.recordType==-1">审核失败</span>
            <span v-else-if="recordScope.row.recordType==0">提交审核</span>
            <span v-else-if="recordScope.row.recordType==1">审核成功</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="审核信息" width="400">
          <template slot-scope="recordScope">
            {{ recordScope.row.recordInfo}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="时间">
          <template slot-scope="recordScope">
            {{ recordScope.row.recordTime}}
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="failFormVisible = false">关闭</el-button>
      </div>
    </el-dialog>

    <div class="pagination-container">
      <el-pagination :current-page="page" :page-sizes="[10,20,30, 50]" :page-size="rows" :total="total" background
                     layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"></el-pagination>
    </div>

  </div>
</template>

<script>
  import {getFailList, recordList} from '@/api/realName'

  export default {
    data() {
      return {
        page: 1,  //页数
        rows: 10, //每页显示行数
        total: null,
        list: null,  //数据列表
        listLoading: false, //刷新加载框
        dialogStatus: '',//头部按钮跟踪
        failFormVisible: false, //表单是否展示
        textMap: {
          fail: '失败原因',
        },
        realNameRecordList: null
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {//页面初始化加载数据
        let self = this;
        self.listLoading = true
        getFailList(self.page, self.rows).then(response => {
          console.log(response);
          if (response.status == 200) {
            self.listLoading = false;
            self.list = response.data.rows;

          } else if (response.status == 400) {
            self.listLoading = false;
            self.list = null;
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
      failRecord(realNameUserid) {

        recordList(realNameUserid).then(response => {
          console.log(response);
          this.failFormVisible = true
          this.listLoading = true
          if (response.status == 200) {
            this.listLoading = false;
            this.realNameRecordList = response.data.rows;

          } else if (response.status == 400) {
            this.listLoading = false;
            this.realNameRecordList = null;
          }
        })


      }


    }
  }
</script>

<style>
</style>
