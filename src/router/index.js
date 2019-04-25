import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Home */
import Home from '../components/common/Home.vue'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
const router = new Router({
    routes: [
      {path: '/login', component: () => import('@/views/login/index'), hidden: true},
      {path: '/404', component: () => import('@/views/404'), hidden: true},

      {
        path: '/',
        component: Home,
        meta: {
          title: '自述文件'
        },
        children: [
          {
            name: 'dashboard',
            path: '/dashboard',
            component: resolve => require(['@/views/dashboard/index'], resolve),
            meta: {
              title: '系统首页'
            }
          },
          //***************************************小程序管理开始*****************************
          {
            name: 'smallAppBanner',
            path: '/smallAppBanner',
            component: resolve => require(['@/views/smallApp/banner/index'], resolve),
            meta: {
              title: 'banner设置'
            }
          },
          {
            name: 'smallAppPictures',
            path: '/smallAppPictures',
            component: resolve => require(['@/views/smallApp/pictures/index'], resolve),
            meta: {
              title: '图片上传'
            }
          },

          //***************************************实名管理开始*****************************
          {
            name: 'realNameAdoptList',
            path: '/realNameAdoptList',
            component: resolve => require(['@/views/RealName/adoptList/index'], resolve),
            meta: {
              title: '实名列表'
            }
          },
          {
            name: 'realNameHavingList',
            path: '/realNameHavingList',
            component: resolve => require(['@/views/RealName/havingList/index'], resolve),
            meta: {
              title: '实名审核列表'
            }
          },
          {
            name: 'realNameFailList',
            path: '/realNameFailList',
            component: resolve => require(['@/views/RealName/failList/index'], resolve),
            meta: {
              title: '实名未通过列表'
            }
          },
          {
            name: 'RealNameDetail',
            path: '/RealNameDetail',
            component: resolve => require(['@/views/RealName/RealNameDetail/index'], resolve),
            meta: {
              title: '实名详情'
            }
          },


          //***************************************艺术品管理开始*****************************
          {
            name: 'artworkAdoptList',
            path: '/artworkAdoptList',
            component: resolve => require(['@/views/Artwork/adoptList/index'], resolve),
            meta: {
              title: '艺术品列表'
            }
          },
          {
            name: 'artworkHavingList',
            path: '/artworkHavingList',
            component: resolve => require(['@/views/Artwork/havingList/index'], resolve),
            meta: {
              title: '艺术品审核列表'
            }
          },
          {
            name: 'artworkFailList',
            path: '/artworkFailList',
            component: resolve => require(['@/views/Artwork/failList/index'], resolve),
            meta: {
              title: '艺术品未通过列表'
            }
          },
          {
            name: 'artWorkDetail',
            path: '/artWorkDetail',
            component: resolve => require(['@/views/Artwork/artWorkDetail/index'], resolve),
            meta: {
              title: '艺术品详情'
            }
          },
          {
            name: 'toAdoptList',
            path: '/toAdoptList',
            component: resolve => require(['@/views/CustomArtwork/toAdoptList/index'], resolve),
            meta: {
              title: '绑定页详情'
            }
          },

          //***************************************在售艺术品开始*****************************

          {
            name: 'customArtworkAdoptList',
            path: '/customArtworkAdoptList',
            component: resolve => require(['@/views/CustomArtwork/CustomArtworkList/index'], resolve),
            meta: {
              title: '售卖列表',
              keepAlive: false
            }
          },
          {
            name: 'customArtworkAdd',
            path: '/customArtworkAdd',
            component: resolve => require(['@/views/CustomArtwork/CustomArtworkAdd/index'], resolve),
            meta: {
              title: '添加售卖'
            }
          },
          {
            name: 'orderList',
            path: '/orderList',
            component: resolve => require(['@/views/CustomArtwork/orderList/index'], resolve),
            meta: {
              title: '订单列表',
              keepAlive: false
            }
          },
          {
            name: 'customArtworkDetail',
            path: '/customArtworkDetail',
            component: resolve => require(['@/views/CustomArtwork/customArtworkDetail/index'], resolve),
            meta: {
              title: '售卖艺术品详情'
            }
          },
          //***************************************互动开始*****************************

          {
            name: 'interactiveAdoptList',
            path: '/interactiveAdoptList',
            component: resolve => require(['@/views/Interactive/adoptList/index'], resolve),
            meta: {
              title: '互动列表'
            }
          },
          {
            name: 'interactiveFailList',
            path: '/interactiveFailList',
            component: resolve => require(['@/views/Interactive/failList/index'], resolve),
            meta: {
              title: '互动未通过列表'
            }
          },
          {
            name: 'userCountList',
            path: '/userCountList',
            component: resolve => require(['@/views/Interactive/userCountList/index'], resolve),
            meta: {
              title: '用户列表',
                keepAlive: true // 需要被缓存
            }
          },
          {
            name: 'examineMain',
            path: '/examineMain',
            component: resolve => require(['@/views/examine/examine-main/index'], resolve),
            meta: {
              title: '用户列表',
              keepAlive: true // 需要被缓存
            }
          },
          {
            name: 'userDetail',
            path: '/userDetail',
            component: resolve => require(['@/views/Interactive/userDetail/index'], resolve),
            meta: {
              title: '互动详情'
            }
          },
          {
            name: 'InteractiveDetail',
            path: '/InteractiveDetail',
            component: resolve => require(['@/views/Interactive/InteractiveDetail/index'], resolve),
            meta: {
              title: '互动详情'
            }
          },
          {
            name: 'ActionList',
            path: '/ActionList',
            component: resolve => require(['@/views/Action/ActionList/index'], resolve),
            meta: {
              title: '活动列表'
            }
          },
          {
            name: 'AddAction',
            path: '/AddAction',
            component: resolve => require(['@/views/Action/ActionAdd/index'], resolve),
            meta: {
              title: '添加活动'
            }
          },
          {
            name: 'ActionDetail',
            path: '/ActionDetail',
            component: resolve => require(['@/views/Action/ActionDetail/index'], resolve),
            meta: {
              title: '活动详情'
            }
          },
          {
            name: 'ActionEdit',
            path: '/ActionEdit',
            component: resolve => require(['@/views/Action/ActionEdit/index'], resolve),
            meta: {
              title: '修改活动'
            }
          },
          {
            name: 'ActivityOrderList',
            path: '/ActivityOrderList',
            component: resolve => require(['@/views/Action/ActivityOrderList/index'], resolve),
            meta: {
              title: '活动订单列表'
            }
          },
          {
            name: 'ActivityOrderDetail',
            path: '/ActivityOrderDetail',
            component: resolve => require(['@/views/Action/ActivityOrderDetail/index'], resolve),
            meta: {
              title: '活动订单详情'
            }
          },
        ]
      },
    ],
    mode: 'history'
  }
);

export default router

