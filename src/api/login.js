import request from '@/utils/request'

export function login(username, password) {
  console.log(222)
  return request({
    url: '/AdminUser/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/AdminUser/userInfo',
    method: 'post',
    data: { token }
  })
}

export function logout() {
  return request({
    url: '/AdminUser/logout',
    method: 'post'
  })
}
