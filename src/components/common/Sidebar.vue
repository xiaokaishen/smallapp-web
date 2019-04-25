<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
             text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
            </template>
            <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
              {{ subItem.title }}
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
  import bus from './bus';

  export default {
    data() {
      return {
        collapse: false,
        items: [
          {
            icon: 'el-icon-location',
            index: 'dashboard',
            title: '首页',
          },
          {
            icon: 'el-icon-setting',
            index: 'smallApp',
            title: '用户管理',
            subs: [
              {
                index: 'userCountList',
                title: '用户列表'
              }
            ]
          },
          {
            icon: 'el-icon-setting',
            index: 'examine',
            title: '审核管理',
            subs: [
              {
                index: 'examineMain',
                title: '审核列表'
              }
            ]
          },
          // {
          //   icon: 'el-icon-menu',
          //   index: 'realName',
          //   title: '实名管理',
          //   subs: [
          //     {
          //       index: 'realNameAdoptList',
          //       title: '实名列表'
          //     },
          //     {
          //       index: 'realNameHavingList',
          //       title: '审核列表'
          //     },
          //     {
          //       index: 'realNameFailList',
          //       title: '未通过列表'
          //     }
          //   ]
          // },

          // {
          //   icon: 'el-icon-document',
          //   index: 'artWork',
          //   title: '艺术管理',
          //   subs: [
          //     {
          //       index: 'artworkAdoptList',
          //       title: '艺术品列表'
          //     },
          //     {
          //       index: 'artworkHavingList',
          //       title: '审核列表'
          //     },
          //     {
          //       index: 'artworkFailList',
          //       title: '未通过列表'
          //     }
          //   ]
          // },
          //
          // {
          //   icon: 'el-icon-star-on',
          //   index: 'customArtwork',
          //   title: '在售管理',
          //   subs: [
          //     {
          //       index: 'customArtworkAdoptList',
          //       title: '售卖列表'
          //     },
          //     {
          //       index: 'customArtworkAdd',
          //       title: '添加售卖'
          //     },
          //     {
          //       index: 'orderList',
          //       title: '订单列表'
          //     }
          //   ]
          // },
          //
          //
          // {
          //   icon: 'el-icon-star-off',
          //   index: 'interactive',
          //   title: '互动专区',
          //   subs: [
          //     {
          //       index: 'interactiveAdoptList',
          //       title: '互动列表'
          //     },
          //     {
          //       index: 'interactiveFailList',
          //       title: '未通过列表'
          //     },
          //     {
          //       index: 'userCountList',
          //       title: '用户列表'
          //     }
          //   ]
          // },
          // {
          //   icon: 'el-icon-star-off',
          //   index: 'actionArea',
          //   title: '活动专区',
          //   subs: [
          //     {
          //       index: 'ActionList',
          //       title: '活动列表'
          //     },
          //     {
          //       index: 'AddAction',
          //       title: '添加活动'
          //     },
          //     {
          //       index: 'ActivityOrderList',
          //       title: '活动订单列表'
          //     },
          //   ]
          // },
        ]
      }
    },
    computed: {
      onRoutes() {
        return this.$route.path.replace('/', '');
      }
    },
    created() {
      // 通过 Event Bus 进行组件间通信，来折叠侧边栏
      bus.$on('collapse', msg => {
        this.collapse = msg;
      })
    }
  }
</script>

<style scoped>
  .sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
  }

  .sidebar::-webkit-scrollbar {
    width: 0;
  }

  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
  }

  .sidebar > ul {
    height: 100%;
  }
</style>
