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
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="作品名称" width="260">
        <template slot-scope="scope">
          <span>{{ scope.row.customArtworkName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="作品类别" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.customArtworkType }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="作品长度（CM）" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.customArtworkHeight }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="作品宽度（CM）" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.customArtworkWidth }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="作品重量(KG)" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.customArtworkWeight }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创作年份" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.customArtworkYears }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="剩余库存" width="260">
        <template slot-scope="scope">
          <span>{{ scope.row.customArtworkStock }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" class-name="status-col" label="操作">
        <template slot-scope="scope">
          <router-link :to="'/CustomArtwork/customArtworkDetail/'+scope.row.customArtworkId">
            <el-button size="small" type="success">查看详情</el-button>
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
  import {getList} from '@/api/customArtwork'

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
        getList(self.page, self.rows).then(response => {
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
