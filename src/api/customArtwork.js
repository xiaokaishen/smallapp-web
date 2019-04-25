import request from '@/utils/request'

export function getList(page, rows) {
  return request({
    url: '/CustomArtwork/selectAllCustomArtwork',
    method: 'post',
    data: {
      page: page,
      rows: rows
    }
  })
}

export function addCustomArtwork(submitInfo) {
  return request({
    url: '/CustomArtwork/addCustomArtwork',
    method: 'post',
    data: {
      submitInfo
    }
  })
}

export function getDetailById(customArtworkId) {
  return request({
    url: '/CustomArtwork/selectCustomArtworkByWorkId',
    method: 'post',
    data: {
      customArtworkId: customArtworkId
    }
  })
}

export function selectAllWorkType() {
  return request({
    url: '/workType/selectAllWorkType',
    method: 'post'
  })
}

export function delCustomerArtWorkById(customArtworkId) {
  return request({
    url: '/CustomArtwork/delCustomerArtWorkById',
    method: 'post',
    data: {
      customArtworkId: customArtworkId
    }
  })
}

export function updateCustomerArtWork(submitInfo) {
  return request({
    url: '/CustomArtwork/updateCustomerArtWork',
    method: 'post',
    data: {
      submitInfo
    }
  })
}

export function queryOrderInfo(page, rows) {
  return request({
    url: '/CustomArtWorkOrder/queryOrderInfo',
    method: 'post',
    data: {
      page: page,
      rows: rows
    }
  })
}

export function excelforDownload() {
  return request({
    url: '/CustomArtWorkOrder/excelDownload',
    method: 'get',
    responseType: 'blob'
  })
}

export function addActivity(activity) {
  return request({
    url: '/activity/addActivity',
    method: 'post',
    data: {
      activity
    }
  })
}

export function queryActivity(activityId, page, row) {
  return request({
    url: '/activity/queryActivity',
    method: 'post',
    data: {
      activityId: activityId,
      page: page,
      row: row
    }
  })
}

export function delActivity(activityId) {
  return request({
    url: '/activity/delActivity',
    method: 'post',
    data: {
      activityId: activityId
    }
  })
}

export function updateActivity(activity) {
  return request({
    url: '/activity/updateActivity',
    method: 'post',
    data: {
      activity
    }
  })
}

export function selectAllOrder(page, row) {
  return request({
    url: '/activityOrder/selectAllOrder',
    method: 'post',
    data: {
      page: page,
      rows: row
    }
  })
}

export function selectActivityOrderById(orderId) {
  return request({
    url: '/activityOrder/selectActivityOrderById',
    method: 'post',
    data: {
      orderId: orderId
    }
  })
}

export function handleOrderStatus(orderId, orderStatus) {
  return request({
    url: '/activityOrder/handleOrderStatusById',
    method: 'post',
    data: {
      orderId: orderId,
      orderStatus: orderStatus
    }
  })
}

export function returnPayActivityOrder(orderId) {
  return request({
    url: '/activityOrder/returnPayActivityOrder',
    method: 'post',
    data: {
      orderId: orderId
    }
  })
}

export function returnPayArtworkOrder(orderId) {
  return request({
    url: '/CustomArtWorkOrder/returnPayArtworkOrder',
    method: 'post',
    data: {
      orderId:  orderId
    }
  })
}

export function handleCustomArtworkOrderStatus(customArtworkOrderId, customArtworkOrderStatus) {
  return request({
    url: '/CustomArtWorkOrder/handleCustomArtworkOrderStatusById',
    method: 'post',
    data: {
      customArtworkOrderId: customArtworkOrderId,
      customArtworkOrderStatus: customArtworkOrderStatus
    }
  })
}
