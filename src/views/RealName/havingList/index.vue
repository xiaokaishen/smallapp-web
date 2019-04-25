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
                     type="primary" @click="havingRealName(scope.row.realNameUserid)">
            审核
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--这里是审核的Form表单-->
    <el-dialog :title="textMap['having']" :visible.sync="havingFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="submitInfo" label-position="left"
               label-width="150px"
               style="width: 600px; margin-left:50px;">
        <el-form-item label="通过审核" prop="realNameStatus">
          <el-radio class="radio" v-model="submitInfo.realNameStatus" :label="1">是</el-radio>
          <el-radio class="radio" v-model="submitInfo.realNameStatus" :label="-1">否</el-radio>
        </el-form-item>
        <el-form-item v-if="submitInfo.realNameStatus==-1" label="未通过审核原因" prop="havingRemark">
          <el-input v-model="submitInfo.havingRemark"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="havingFormVisible = false">取消</el-button>
        <el-button type="primary" @click="havingData">提交
        </el-button>
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
  import {getHavingList, havingArtWork} from '@/api/realName'

  export default {
    data() {
      return {
        page: 1,  //页数
        rows: 10, //每页显示行数
        total: null,
        list: null,  //数据列表
        listLoading: false, //刷新加载框
        havingFormVisible: false, //审核表单是否展示
        submitInfo: {//审核信息
          realNameUserid: '',
          realNameStatus: 1,
          havingRemark: ''
        },
        rules: {
          havingRemark: [{required: true, message: '不通过审核必须填写原因', trigger: 'blur, change'}]
        },
        textMap: {
          having: '实名审核',
        }
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {//页面初始化加载数据
        let self = this;
        self.listLoading = true
        getHavingList(self.page, self.rows).then(response => {
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
      havingRealName(realNameUserid) {
        this.submitInfo.realNameUserid = realNameUserid
        this.havingFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      havingData() {//对实名进行审核
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            console.log(this.submitInfo)
            havingArtWork(this.submitInfo).then(response => {
              console.log(response)
              if (response.status == 200) {//添加成功
                this.havingFormVisible = false
                this.submitInfo.realNameStatus = 1;//清空temp的值
                this.submitInfo.havingRemark = '';//清空temp的值
                this.submitInfo.realNameUserid = '';
                //调用初始化加载函数
                this.page = 1;
                this.fetchData();
                this.$notify({
                  title: '成功',
                  message: response.data,
                  type: 'success',
                  duration: 2000
                })

              }
            })
          }
        })
      }


    }
  }
</script>

<style>
</style>
