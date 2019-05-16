import request from '@/utils/request'

export function getAdoptList(page, rows) {
  return request({
    url: '/Interactive/selectAllInteractive',
    method: 'post',
    data: {
      page: page,
      rows: rows
    }
  })
}

export function findAllExamine(page, rows) {
  return request({
    url: '/examine/findAllExamine',
    method: 'post',
    data: {
      page: page,
      rows: rows
    }
  })
}

export function findAllStore(page, rows) {
  return request({
    url: '/store/findAllStore',
    method: 'post',
    data: {
      page: page,
      rows: rows
    }
  })
}

/**
 * 修改审核状态
 * @param examineId
 */
export function examineYorNbyId(examineId,examineState) {
  return request({
    url: '/examine/examineYorNbyId',
    method: 'post',
    data: {
      examineId: examineId,
      examineState:examineState
    }
  })
}

/**
 * 修改支付情况
 * @param examineId
 */
export function paymentYorNbyId(examineId,examineState) {
  return request({
    url: '/examine/paymentYorNbyId',
    method: 'post',
    data: {
      examineId: examineId,
      examineState:examineState
    }
  })
}



export function getAdoptDetail(interactiveId) {
  return request({
    url: '/Interactive/selectInteractiveDetailById',
    method: 'post',
    data: {
      interactiveId: interactiveId
    }
  })
}

export  function delStoreById(storeId) {
  return request({
    url: '/store/delStoreById',
    method: 'post',
    data: {
      storeId: storeId
    }
  })
}

export  function queryAllUserInfo(page,rows) {
  return request({
    url: '/report/findAllUser',
    method: 'post',
    data: {
      page: page,
      rows: rows
    }
  })
}
export function excelforDownload() {
  return request({
    url: '/report/excelDownload',
    method: 'get',
    responseType: 'blob'
  })
}
export  function selectShare(shareUserid,shareToUserid,shareObjectId,shareObjectType) {
  return request({
    url: '/ShareCms/selectShare',
    method: 'post',
    data: {
      shareUserid:shareUserid,
      shareToUserid:shareToUserid,
      shareObjectId:shareObjectId,
      shareObjectType:shareObjectType
    }
  })
}
// 导入用户excel文件
export function withImport(s) {
  return request({
    url: '/report/loadExcel',
    method: 'post',
    data: {
      para: s
    }
  })
}
// 导入审核excel文件
export function withImportExamine(s) {
  return request({
    url: '/examine/loadExcel',
    method: 'post',
    data: {
      para: s
    }
  })
}
// 导入门店excel文件
export function withImportStore(s) {
  return request({
    url: '/store/loadExcel',
    method: 'post',
    data: {
      para: s
    }
  })
}
//获得二维码
export function getE(id) {
  return request({
    url: '/store/getE',
    method: 'post',
    data: { id: id }
  })
}
