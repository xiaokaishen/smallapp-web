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
      <el-table-column align="center" label="名称" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.artworkName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="作品类别" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.artworkType }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="长度（CM）" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.artworkHeight }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="宽度（CM）" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.artworkWidth }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="重量(KG)" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.artworkWeigth }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="年份" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.artworkYear }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="艺术家id" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.artworkAuthorid }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" class-name="status-col" label="操作">
        <template slot-scope="scope">
          <router-link :to="'/artWorkDetail?artworkId='+scope.row.artworkId">
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
  import {getAdoptList} from '@/api/artWork'

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
        let self = this;
        self.listLoading = true
        getAdoptList(self.page, self.rows).then(response => {
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


    }
  }
</script>

<style>
</style>
