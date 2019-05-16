<template>
  <div class="app-container">
    <!--<div class="filter-container">-->
<!--&lt;!&ndash;      <el-button class="filter-item" type="primary" icon="el-icon-download"-->
      <!--&gt;导出excle-->
      <!--</el-button>&ndash;&gt;-->
    <!--</div>-->
    <div class="filter-container">
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-upload"
        @click.prevent="openBrowse">导入excel
      </el-button>
      <!--<input type="button" name="button" value="浏览" @click="openBrowse">-->
      <input id="uploadExcel" type="file" style="display: none" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" @change="importf(this)" >
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column align="center" label="门店ID" width="120">
        <template slot-scope="scope">
          {{ scope.row.storeId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="省份" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.storeProvince }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="城市" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.storeCity }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="区域" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.storeRegion }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="经销商简称" width="130">
        <template slot-scope="scope">
          <span>{{ scope.row.storeDistributorJc }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="经销商全称" width="170">
        <template slot-scope="scope">
          <span>{{ scope.row.storeDistributorQc }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="电话" width="130">
        <template slot-scope="scope">
          <span>{{ scope.row.storePhone }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="地址" width="130">
        <template slot-scope="scope">
          <span>{{ scope.row.storeAddress }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" class-name="status-col" width="200" label="操作">
        <template slot-scope="scope">
          <el-button size="small"
                     @click="handleDel(scope.row.storeId)" type="danger">刪除
          </el-button>
          <!--<router-link :to="'/userDetail?userId='+scope.row.id">-->
            <!--<el-button size="small" type="success">详情</el-button>-->
          <!--</router-link>-->
          <el-button size="small" type="success" @click.prevent="getE(scope.row.storeId)">二维码</el-button>
        </template>
      </el-table-column>
      <!--<el-table-column align="center" class-name="status-col" label="二维码">-->
        <!--<template slot-scope="scope">-->
          <!--<el-button size="small" type="success" @click.prevent="getE(scope.row.storeId)">二维码</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
    <!--弹框-start-->
    <el-dialog
      :visible.sync="centerDialogVisible"
      title="--二维码--"
      width="30%"
      center>
      <span slot="footer" class="dialog-footer">
        <img :src="qrurl">
        <!--<el-button type="primary">-->
          <!--上线-->
          <a :href="downurl">
            <el-button type="primary">下载二维码</el-button>
          </a>
          <!--本地-->
          <!--<a href="https://www.baidu.com">下载二维码</a>-->
        <!--</el-button>-->
      </span>
    </el-dialog>
    <!--弹框-end-->

    <div class="pagination-container">
      <el-pagination :current-page="page" :page-sizes="[10,20,30, 50]" :page-size="rows" :total="total" background
                     layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"></el-pagination>
    </div>

  </div>
</template>

<script>
  import {findAllStore,withImportStore,delStoreById,getE} from '@/api/interactive'

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
        examine: { storeId: 1, storeProvince: '', storeCity: '',storeRegion: '',
                   storeDistributorJc:'', storeDistributorQc: '',
                   storePhone: '',storeAddress: ''}, // 单个对象
        listLoading: false, //刷新加载框
        dialogStatus: '',//头部按钮跟踪
        dialogFormVisible: false, //表单是否展示
        qrurl: '', // 二维码地址(目前是默认的)
        downurl: '', // 下载地址
        centerDialogVisible: false, // 弹窗状态
        qrName: ''// 二维码下载名称
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
        findAllStore(self.page, self.rows).then(response => {
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
          const tHeader = ['门店ID', '省份', '城市', '区域', '经销商简称', '经销商全称', '电话', '地址']
          // 字段名称
          const filterVal = ['storeId', 'storeProvince', 'storeCity', 'storeRegion',
            'storeDistributorJc','storeDistributorQc', 'storePhone', 'storeAddress']
          // 将状态数字改为汉字
          const list = this.updateList(this.list)
          // 数据处理
          const data = this.formatJson(filterVal, list)
          // 执行导出方法
          export_json_to_excel(tHeader, data, '门店信息')
        })
      },
      // 数据处理
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      // 将状态转为汉字(在data中新增了一个user对象)
      /*updateList(list) {
        for (var i = 0; i < list.length; i++) {
          this.user = list[i]
          if (this.user.paymentState === 1) {
            this.user.paymentState = '已支付'
          } else {
            this.user.paymentState = '未支付'
          }
          // 赋值回去
          list[i] = this.user
        }
        for (var i = 0; i < list.length; i++) {
          this.user = list[i]
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
      },*/
      // 导入excel
      openBrowse() {
        // 获得file的id
        var f = document.getElementById('uploadExcel')
        // 触发事件
        f.click()
      },
      importf(obj) {
        console.log("123")
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
              // obj.storeId = v.门店ID
              obj.storeProvince = v.省份
              obj.storeCity = v.城市
              obj.storeRegion = v.区域
              obj.storeDistributorJc = v.经销商简称
              obj.storeDistributorQc = v.经销商全称
              obj.storePhone = v.电话
              obj.storeAddress = v.地址
              this.examine = obj
              arr.push(this.examine)
              console.log(this.examine)
            })
            console.log(arr)

            var s = JSON.stringify(arr)
            // const para = {
            //   // withList: JSON.stringify(this.da)
            //   withList: arr
            // }

            console.log('数据:' + s)
            withImportStore(s).then(res => {
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
      // 获得二维码
      getE(id) {
        console.log('id为' + id)
        getE(id).then(res => {
          console.log(res)
          if (res.status === 200) {
            //上线放开注释

            // 展示路径
            this.qrurl = res.data.storeViewUrl
            console.log('res.data.storeViewUrl');
            console.log(res)
            // 下载路径
            this.downurl = res.data.storeDownloadUrl
            // 二维码名称
            this.qrName = id
            // 弹窗状态改变
            this.centerDialogVisible = true
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
      handleDel(storeId){//删除某个门店
        this.$confirm("此操作将会删除该数据，是否继续？","提示",{
          confirmButtonText:"确定",
          cancelButtonText:"取消",
          type:"warning"
        }).then(res =>{
          delStoreById(storeId).then(response => {
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
        }).catch(error =>{
          console.log("error")
          console.log(error)
        })

      },

    }
  }
</script>

<style>
</style>
