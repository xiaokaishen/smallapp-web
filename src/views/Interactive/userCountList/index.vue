<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-upload"
        @click.prevent="openBrowse">导入excel
      </el-button>
      <!--<input type="button" name="button" value="浏览" @click="openBrowse">-->
      <input id="uploadExcel" type="file" style="display: none" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" @change="importf(this)" >

      <el-button class="filter-item" type="primary" icon="el-icon-download"
                 @click.prevent="getExcel">导出excel
      </el-button>
      <!--<input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" @change="importf(this)">-->

    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column align="center" label="ID" width="100">
        <template slot-scope="scope">
          {{ scope.row.reportId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="手机" width="160">
        <template slot-scope="scope">
          <!--<span><img :src="scope.row.reportPhone"></span>-->
          <span>{{ scope.row.reportPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="名称" width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.reportName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="邮箱" width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.reportMailbox }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="支付宝账号" width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.reportAlipay }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="试驾意向" width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.reportTestDrive==1?"是":"否" }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="更新时间" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.reportUpdateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.reportCreateTime }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column header-cell-style="background-color:red" align="center" label="审核状态" width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.examine ==1?'已审核':'未审核'}}</span>
        </template>
      </el-table-column>-->
      <!--<el-table-column align="center" class-name="status-col" label="操作">-->
        <!--<template slot-scope="scope">-->
          <!--&lt;!&ndash;<el-button size="small"-->
             <!--@click="handleDel(scope.row)" type="danger">刪除-->
          <!--</el-button>&ndash;&gt;-->
          <!--<router-link :to="'/userDetail?userId='+scope.row.id">-->
            <!--<el-button size="small" type="success">详情</el-button>-->
          <!--</router-link>-->
        <!--</template>-->
      <!--</el-table-column>-->
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="page" :page-sizes="[10,20,30, 50]" :page-size="rows" :total="total" background
                     layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"></el-pagination>
    </div>

  </div>
</template>

<script>
  import {getAdoptList,queryAllUserInfo,excelforDownload,withImport} from '@/api/interactive'
  // import {excelforDownload} from '@/api/customArtwork'
  export default {
    data() {
      return {
        page: 1,  //页数
        rows: 10, //每页显示行数
        total: null,
        list: null,  //数据列表
        user: { reportId: 1, reportPhone: 0, reportName: '',
          reportMailbox: '', reportAlipay: '', reportTestDrive: 0,
          reportUpdateTime: '', reportCreateTime: ''}, // 单个对象
        listLoading: false, //刷新加载框
        dialogStatus: '',//头部按钮跟踪
        dialogFormVisible: false, //表单是否展示
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      excelforDownload(){//导出excel
        excelforDownload().then(res=>{
          console.log(res)
        })
      },
      getExcel(){
        require.ensure([], () => {
          // 引入方法,路径为绝对路径
          const { export_json_to_excel } = require('../../../excel/Export2Excel')
          // 标题
          const tHeader = ['ID', '手机', '名称', '邮箱', '支付宝账号', '试驾意向', '更新时间', '创建时间', '审核状态']
          // 字段名称
          const filterVal = ['reportId', 'reportPhone', 'reportName', 'reportMailbox', 'reportAlipay',
            'reportTestDrive', 'reportUpdateTime', 'reportCreateTime', 'reportStatus']
          // 将状态数字改为汉字
          const list = this.updateList(this.list)
          // 数据处理
          const data = this.formatJson(filterVal, list)
          // 执行导出方法
          export_json_to_excel(tHeader, data, '用户信息')
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
          if (this.user.reportStatus === 1) {
            this.user.reportStatus = '已审核'
          } else {
            this.user.reportStatus = '未审核'
          }
          // 赋值回去
          list[i] = this.user
        }
        // 返回
        return list
      },
      fetchData() {//页面初始化加载数据
        console.log("fetchData:"  )
        let self = this;
        self.listLoading = true
        queryAllUserInfo(self.page, self.rows).then(response => {
          console.log(response);
          if (response.status == 200) {
            self.listLoading = false;
            self.list = response.data;
            self.list[0].examine =1;
            self.list[1].examine = 2;
          } else if (response.status == 400) {
            self.listLoading = false;
            self.list = null;
          }
        })
      },
      // 导入excel
      openBrowse() {
        // 获得file的id
        var f = document.getElementById('uploadExcel')
        // 触发事件
        f.click()
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
              obj.reportId = v.ID
              obj.reportPhone = v.手机
              obj.reportName = v.名称
              obj.reportMailbox = v.邮箱
              obj.reportAlipay = v.支付宝账号
              obj.reportUpdateTime = v.更新时间
              obj.reportCreateTime = v.创建时间
              obj.reportTestDrive = v.试驾意向 === '是' ? 1 : 0
              obj.reportStatus = v.审核状态 === '已审核' ? 1 : 0
              this.user = obj
              arr.push(this.user)
            })
            console.log(arr)

            var s = JSON.stringify(arr)
            // const para = {
            //   // withList: JSON.stringify(this.da)
            //   withList: arr
            // }

            console.log('数据:' + s)
            withImport(s).then(res => {
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
