import request from '@/utils/request'

export function getAdoptList(page, rows) {
  return request({
    url: '/RealName/selectAllUserRealName',
    method: 'post',
    data: {
      page: page,
      rows: rows
    }
  })
}

export function getFailList(page, rows) {
  return request({
    url: '/RealName/selectAllUserRealNameAsAuditFailure',
    method: 'post',
    data: {
      page: page,
      rows: rows
    }
  })
}

export function getHavingList(page, rows) {
  return request({
    url: '/RealName/selectAllUserRealNameToBeAudited',
    method: 'post',
    data: {
      page: page,
      rows: rows
    }
  })
}

export function getAdoptDetail(id) {
  return request({
    url: '/RealName/selectUserRealNameDetailById',
    method: 'post',
    data: {
      realNameUserid: id
    }
  })
}

export function havingArtWork(submitInfo) {
  return request({
    url: '/RealName/havingUserRealNameByReadId',
    method: 'post',
    data: {
      realNameUserid: submitInfo.realNameUserid,
      realNameStatus: submitInfo.realNameStatus,
      havingRemark: submitInfo.havingRemark
    }
  })
}

export function recordList(realNameUserid) {
  return request({
    url: '/RealName/selectRecordByRealNameId',
    method: 'post',
    data: {
      realNameUserid: realNameUserid
    }
  })
}

