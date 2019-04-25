import request from '@/utils/request'

export function getAdoptList(page, rows) {
  return request({
    url: '/Artwork/selectAllArtWork',
    method: 'post',
    data: {
      page: page,
      rows: rows
    }
  })
}

export function getFailList(page, rows) {
  return request({
    url: '/Artwork/selectAllArtWorkAsAuditFailure',
    method: 'post',
    data: {
      page: page,
      rows: rows
    }
  })
}

export function getHavingList(page, rows) {
  return request({
    url: '/Artwork/selectAllArtWorkAsToBeAudited',
    method: 'post',
    data: {
      page: page,
      rows: rows
    }
  })
}

export function getAdoptDetail(id) {
  return request({
    url: '/Artwork/selectAdoptDetailById',
    method: 'post',
    data: {
      artworkId: id
    }
  })
}

export function havingArtWork(submitInfo) {
  return request({
    url: '/Artwork/havingArtWorkByartworkId',
    method: 'post',
    data: {
      artworkId: submitInfo.artworkId,
      artworkExamineStatus: submitInfo.artworkExamineStatus,
      havingRemark: submitInfo.havingRemark
    }
  })
}

export function recordList(artworkId) {
  return request({
    url: '/Artwork/selectRecordByArtWorkId',
    method: 'post',
    data: {
      artworkId: artworkId
    }
  })
}

export function selectAllArtWorkByName(artName, page, rows) {
  return request({
    url: '/Artwork/selectAllArtWorkByName',
    method: 'post',
    data: {
      artName: artName,
      page: page,
      rows: rows
    }
  })
}

export function updateCustomerArtWork(submitInfo) {
    return request({
      url: '/CustomArtwork/updateCustomerArtWork',
      method: 'post',
      data: {
        submitInfo: submitInfo
      }
    })
}

export function queryAllBind() {
  return request({
    url: '/CustomerArtWork/queryAllBind',
    method: 'post',
    data: {
    }
  })
}
