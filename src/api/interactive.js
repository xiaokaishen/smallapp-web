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

export function getFailList(page, rows) {
  return request({
    url: '/Interactive/selectAllInteractiveAsAuditFailure',
    method: 'post',
    data: {
      page: page,
      rows: rows
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

export  function delInteractiveById(interactiveId) {
  return request({
    url: '/Interactive/delInteractiveById',
    method: 'post',
    data: {
      interactiveId: interactiveId
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

