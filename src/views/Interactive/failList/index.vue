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
      <el-table-column align="center" label="ID" width="40">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户id" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.interactiveMemberid }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="评论数量" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.interactiveCommentNumber }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="点赞数量" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.interactiveLikesNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="分享数量" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.interactiveShareNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="收藏数量" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.interactiveCollectionNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="分享时间" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.interactiveCreatetime }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" class-name="status-col" label="操作">
        <template slot-scope="scope">
          <el-button size="small"
                     @click="handleDel(scope.row)" type="danger">刪除
          </el-button>
          <router-link :to="'/InteractiveDetail?interactiveId='+scope.row.interactiveId">
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
  // import {getFailList} from '@/api/interactive'

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
      }
      ,
      handleDel(rows) {//删除某个在售艺术品
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
