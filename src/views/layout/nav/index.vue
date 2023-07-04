<template>
  <div class="layout-nav">
    <div class="nav-header">
      <img class="logo-img" src="@/assets/imgs/logo.svg" />
      <span class="header-title" v-show="!collapse">外卖管理平台</span>
    </div>
    <!-- 导航 -->
    <el-menu
      router
      class="el-menu-vertical-demo"
      unique-opened
      :default-active="defaultActive"
      background-color="orange"
      text-color="#fff"
      active-text-color="deeppink"
      :collapse="collapse"
    >
      <!-- 循环渲染导航 -->
      <template v-for="item in navList">
        <!-- 只有一级 -->
        <el-menu-item
          v-if="item.meta && item.meta.level == 1"
          :index="item.path"
          :key="item.path"
        >
          <i class="iconfont icon-home"></i>
          <span slot="title">{{ item.meta && item.meta.title }}</span>
        </el-menu-item>
        <!-- 有二级 -->
        <el-submenu
          v-else-if="item.meta && item.meta.level == 2"
          :index="item.path"
          :key="item.path"
        >
          <template slot="title">
            <i class="iconfont icon-goods"></i>
            <span slot="title">{{ item.meta && item.meta.title }}</span>
          </template>
          <el-menu-item
            v-for="v in item.children"
            :key="v.path"
            :index="v.path"
          >
            {{ v.meta && v.meta.title }}
          </el-menu-item>
        </el-submenu>
      </template>

      <!-- 后台首页 -->
      <!-- <el-menu-item index="/home">
        <i class="iconfont icon-home"></i>
        <span slot="title">后台首页</span>
      </el-menu-item> -->
      <!-- 订单管理 -->
      <!-- <el-menu-item index="/order">
        <i class="iconfont icon-order"></i>
        <span slot="title">订单管理</span>
      </el-menu-item> -->
      <!-- 商品管理 -->
      <!-- <el-submenu index="/goods">
        <template slot="title">
          <i class="iconfont icon-goods"></i>
          <span slot="title">商品管理</span>
        </template>
        <el-menu-item index="/goods/list">商品列表</el-menu-item>
        <el-menu-item index="/goods/add">商品添加</el-menu-item>
        <el-menu-item index="/goods/category">商品分类</el-menu-item>
      </el-submenu> -->
      <!-- 店铺管理 -->
      <!-- <el-menu-item index="/shop">
        <i class="iconfont icon-shop"></i>
        <span slot="title">店铺管理</span>
      </el-menu-item> -->
      <!-- 账号管理 -->
      <!-- <el-submenu index="5">
        <template slot="title">
          <i class="iconfont icon-account"></i>
          <span slot="title">账号管理</span>
        </template>
        <el-menu-item index="/account/list">账号列表</el-menu-item>
        <el-menu-item index="/account/add">账号添加</el-menu-item>
        <el-menu-item index="/account/modifypwd">修改密码</el-menu-item>
      </el-submenu> -->
      <!-- 销售统计 -->
      <!-- <el-submenu index="6">
        <template slot="title">
          <i class="iconfont icon-total"></i>
          <span slot="title">销售统计</span>
        </template>
        <el-menu-item index="/total/goods">商品统计</el-menu-item>
        <el-menu-item index="/total/order">订单统计</el-menu-item>
      </el-submenu> -->
    </el-menu>
    <div class="btn-box">
      <el-button
        @click="collapse = !collapse"
        class="collapse-btn"
        :icon="collapse ? 'el-icon-right' : 'el-icon-back'"
      ></el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      defaultActive: "/account/list",
      collapse: false, // true 收起导航
      // navList: [],
    };
  },
  created() {
    // this.navList = JSON.parse(localStorage.getItem("leve1Routes") || "[]");
    // console.log(navList);
  },
  computed: {
    ...mapState(["navList"]),
  },
  watch: {
    $route: {
      handler(v) {
        this.defaultActive = v.path;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
.layout-nav {
  // width: 200px;
  background-color: orange;
  position: relative;
  padding-top: 40px;

  .nav-header {
    display: flex;
    height: 40px;
    background-color: deeppink;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    .header-title {
      display: inline-block;
      width: 100px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .logo-img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      overflow: hidden;
      background-color: #fff;
      margin-right: 5px;
    }
  }

  .iconfont {
    color: #fff;
    margin-right: 5px;
  }

  .el-menu {
    border-right: 0;

    .el-menu-item {
      &.is-active {
        .iconfont {
          color: deeppink;
        }
      }

      &:hover {
      }
    }

    // 深度选择器(穿透)
    .el-submenu {
      /deep/ .el-icon-arrow-down {
        color: #fff;
      }
    }
  }

  .btn-box {
    background-color: red;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    .collapse-btn {
      background-color: aquamarine;
      border-width: 0;
      border-radius: 0;
      width: 100%;
    }
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>