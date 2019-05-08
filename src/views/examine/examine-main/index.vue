<template>
  <div class="app-container">
    <!--<div class="filter-container">-->
<!--&lt;!&ndash;      <el-button class="filter-item" type="primary" icon="el-icon-download"-->
      <!--&gt;导出excle-->
      <!--</el-button>&ndash;&gt;-->
    <!--</div>-->
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-download"
                 @click='getExcel'>导出excle
      </el-button>
      <input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" @change="importf(this)">
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column align="center" label="审核ID" width="100">
        <template slot-scope="scope">
          {{ scope.row.examineId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="审核门店" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.examineStoreName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="审核用户id" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.examineUserId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户名称" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.examineUserName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户手机号码" width="130">
        <template slot-scope="scope">
          <span>{{ scope.row.examineUserPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户支付宝" width="130">
        <template slot-scope="scope">
          <span>{{ scope.row.examineUserAlipay }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.examineEstablishTime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改时间" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.examineModifyTime }}</span>
        </template>
      </el-table-column>
      <el-table-column header-cell-style="background-color:red" align="center" label="审核状态" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.examineState == 1?'已审核':'未审核'}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="支付情况" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.paymentState == 1?'已支付':'未支付'}}</span>
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
  import {findAllExamine,withImportExamine} from '@/api/interactive'

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
        examine: { examineId: 1, examineStoreName: '', examineUserId: 0,
          examineUserName: '',examineUserPhone:'', examineUserAlipay: '', examineEstablishTime: '',
          examineModifyTime: '', examineState: 0, paymentState: 0}, // 单个对象
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
        self.listLoading = true
        findAllExamine(self.page, self.rows).then(response => {
          console.log(response);
          if (response.status == 200) {
            self.listLoading = false;
            self.list = response.data;
          } else if (response.status == 400) {
            self.listLoading = false;
            self.list = null;
          }
        })
      },
      //导出excel
      getExcel(){
        require.ensure([], () => {
          // 引入方法,路径为绝对路径
          const { export_json_to_excel } = require('../../../excel/Export2Excel')
          // 标题
          const tHeader = ['审核ID', '审核门店', '审核用户ID', '用户名称', '用户手机号码', '用户支付宝', '创建时间', '修改时间', '审核状态', '支付情况']
          // 字段名称
          const filterVal = ['examineId', 'examineStoreName', 'examineUserId', 'examineUserName', 'examineUserPhone',
            'examineUserAlipay', 'examineEstablishTime', 'examineModifyTime', 'examineState', 'paymentState']
          // 将状态数字改为汉字
          const list = this.updateList(this.list)
          // 数据处理
          const data = this.formatJson(filterVal, list)
          // 执行导出方法
          export_json_to_excel(tHeader, data, '审核信息')
        })
      },
      // 数据处理
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      // 将状态转为汉字(在data中新增了一个user对象)
      updateList(list) {
        for (var i = 0; i < list.length; i++) {
          this.user = list[i]
          if (this.user.paymentState === 1) {
            this.user.paymentState = '已支付'
          } else {
            this.user.paymentState = '未支付'
          }
          if (this.user.examineState === 1) {
            this.user.examineState = '已审核'
          } else {
            this.user.examineState = '未审核'
          }
          // 赋值回去
          list[i] = this.user
        }
        // 返回
        return list
      },
      importf(obj) {
        const _this = this
        const inputDOM = this.$refs.inputer
        // 通过DOM取文件数据
        this.file = event.currentTarget.files[0]
        var rABS = false // 是否将文件读取为二进制字符串
        var f = this.file
        var reader = new FileReader()
        // if (!FileReader.prototype.readAsBinaryString) {
        FileReader.prototype.readAsBinaryString = function(f) {
          var binary = ''
          var rABS = false // 是否将文件读取为二进制字符串
          var pt = this
          var wb // 读取完成的数据
          var outdata
          var reader = new FileReader()
          reader.onload = function(e) {
            var bytes = new Uint8Array(reader.result)
            var length = bytes.byteLength
            for (var i = 0; i < length; i++) {
              binary += String.fromCharCode(bytes[i])
            }
            var XLSX = require('xlsx')
            // if (rABS) {
            //   wb = XLSX.read(btoa(fixdata(binary)), { // 手动转化
            //     type: 'base64'
            //   })
            // } else {
            wb = XLSX.read(binary, {
              type: 'binary'
            })
            // }
            outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])// outdata就是你想要的东西
            this.da = [...outdata]
            const arr = []
            this.da.map(v => {
              const obj = {}
              obj.examineId = v.审核ID
              obj.examineStoreName = v.审核门店
              obj.examineUserId = v.审核用户ID
              obj.examineUserName = v.用户名称
              obj.examineUserPhone = v.用户手机号码
              obj.examineUserAlipay = v.用户支付宝
              obj.examineEstablishTime = v.创建时间
              obj.examineModifyTime = v.修改时间
              obj.examineState = v.审核状态 === '已审核' ? 1 : 0
              obj.paymentState = v.支付情况 === '已支付' ? 1 : 0
              this.examine = obj
              arr.push(this.examine)
            })
            console.log(arr)

            var s = JSON.stringify(arr)
            // const para = {
            //   // withList: JSON.stringify(this.da)
            //   withList: arr
            // }

            console.log('数据:' + s)
            withImportExamine(s).then(res => {
              console.log(res)
              if (res.status === 200) {
                // 重载页面
                window.location.reload()
              } else {
                _this.$message({
                  message: '导入失败',
                  type: 'error'
                })
              }
            })
          }
          reader.readAsArrayBuffer(f)
        }
        if (rABS) {
          reader.readAsArrayBuffer(f)
        } else {
          reader.readAsBinaryString(f)
        }
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
