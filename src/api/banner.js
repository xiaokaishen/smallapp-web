import request from '@/utils/request'

export function getList(page, rows) {
  return request({
    url: '/SmallAppBanner/selectSmallAppBannerList',
    method: 'post',
    data: {
      page: page,
      rows: rows
    }
  })
}

export function createArticle(data) {
  return request({
    url: '/SmallAppBanner/add',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/SmallAppBanner/updateSmallBanner',
    method: 'post',
    data
  })
}

export function deleteArticle(data) {
  return request({
    url: '/SmallAppBanner/deleteSmallBanner',
    method: 'post',
    data
  })
}
