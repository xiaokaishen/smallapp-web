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
      <el-button class="filter-item" type="primary" icon="el-icon-download"
                 @click='getExcel'>导出excle
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
          <span>{{ scope.row.examineState == 1?'审核通过':scope.row.examineState == 2?'审核未通过':'未审核'}}</span>
          <!--<span v-if="scope.row.examineState == 0 ">未审核</span>-->
          <!--<span v-else-if="scope.row.examineState == 1 ">已审核</span>-->
          <!--<span v-if="scope.row.examineState == 2 ">审核未通过</span>-->
        </template>
      </el-table-column>
      <el-table-column align="center" label="支付情况" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.paymentState == 1?'已支付':'未支付'}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" class-name="status-col" label="操作" width="150">
        <template slot-scope="scope">
          <!--<el-button size="small"
                     @click="examineYorN(scope.row.examineId)"  type="success">审核
          </el-button>-->
          <el-button size="small"
                     @click="havingRealName(scope.row.examineId)"  type="success">审核
          </el-button>
          <el-button size="small"
                     @click="paymentYorN(scope.row)" type="danger">支付
          </el-button>
          <!--<router-link :to="'/userDetail?userId='+scope.row.id">
            <el-button size="small" type="success">详情</el-button>
          </router-link>-->
        </template>
      </el-table-column>
    </el-table>
    <!--这里是审核的Form表单-->
    <el-dialog title="问卷审核" :visible.sync="havingFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="submitInfo" label-position="left"
               label-width="150px"
               style="width: 600px; margin-left:50px;">
        <el-form-item label="通过审核" prop="examineState">
          <el-radio class="radio" v-model="submitInfo.examineState" :label="1">是</el-radio>
          <el-radio class="radio" v-model="submitInfo.examineState" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item v-if="submitInfo.examineState==2" label="未通过审核原因" prop="examineRemark">
          <el-input v-model="submitInfo.examineRemark"/>
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
  import {findAllExamine,withImportExamine,examineYorNbyId,paymentYorNbyId} from '@/api/interactive'

  export default {
    data() {
      return {
        submitInfo: {//审核信息
          examineId:'',
          examineState:1,
          examineRemark:'',
        },
        rules: {
          examineRemark: [{required: true, message: '不通过审核必须填写原因', trigger: 'blur, change'}]
        },
        havingFormVisible: false, //审核表单是否展示
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
      havingRealName(examineId) {
        this.submitInfo.examineId = examineId
        this.havingFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      examineYorN(examineId){//更改某个审核状态
        this.$confirm("您确定要修改该条数据审核状态吗?,是否继续?","提示",{
          confirmButtonText:"继续",
          cancelButtonText:"取消",
          type:"warning"
        }).then(res =>{
          examineYorNbyId(examineId).then(res => {
            if (res.status == 200) {
              this.fetchData();
              this.$notify({
                title: '审核成功',
                message: res.data,
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
      paymentYorN(examine){//更改某个审核状态
        console.log(examine);
        if(examine.examineState == 0 || examine.examineState == 2 ){
          this.$notify({
            title: '请先通过审核',
            type: 'danger',
            duration: 2000
          })
          return false;
        }
        this.$confirm("您确定要修改该条数据支付情况吗?,是否继续?","提示",{
          confirmButtonText:"继续",
          cancelButtonText:"取消",
          type:"warning"
        }).then(res =>{
          paymentYorNbyId(examine.examineId).then(res => {
            if (res.status == 200) {
              this.fetchData();
              this.$notify({
                title: '支付成功',
                message: res.data,
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
      havingData() {//对实名进行审核
        var self = this;
        self.$refs['dataForm'].validate((valid) => {
          if (valid) {
            console.log("submitInfo:",self.submitInfo)
            // return false;
            examineYorNbyId(self.submitInfo.examineId,self.submitInfo.examineState).then(response => {
              console.log("havingData:",response)
              if (response.status == 200) {//添加成功
                let msg = self.submitInfo.examineState ==1?'审核通过':'审核未通过';
                self.havingFormVisible = false
                self.submitInfo.examineState = '';//清空temp的值
                self.submitInfo.examineRemark = '';//清空temp的值
                self.submitInfo.examineId = '';
                //调用初始化加载函数
                self.page = 1;
                self.fetchData();
                self.$notify({
                  title: msg,
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
