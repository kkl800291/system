<template>
  <div class="right-header">
    <div class="left">
      <!-- 面包屑 -->
      <el-breadcrumb separator="-">
        <el-breadcrumb-item
          v-for="(item, index) in breads"
          :key="index"
          :to="item.path"
        >
          {{ item.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          欢迎您, {{ userInfo.account
          }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="personal">个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-avatar size="small" :src="userInfo.imgUrl"></el-avatar>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      breads: [
        {
          path: "/layout/goodslist",
          title: "商品管理",
        },
        {
          path: "/layout/goodscategory",
          title: "商品分类",
        },
      ], // 面包屑
    };
  },
  // created() {
  //   this.calcBreads();
  // },
  computed: {
    ...mapState(["userInfo"]),
  },
  watch: {
    // 监听路由变化
    // $route() {
    //   this.calcBreads();
    // },
    $route: {
      handler() {
        this.calcBreads();
      },
      immediate: true, // 页面进入立马执行handler里面的逻辑
    },
  },
  methods: {
    calcBreads() {
      // 计算面包屑的动态数据
      // 获取路由信息对象里面的matched
      let { matched } = this.$route;
      // 防止已有数据
      this.breads = [];
      // 通过matched循环获取面包屑动态数据
      matched.forEach((item) => {
        //  1.过滤掉meta是空对象的情况
        if (item.meta.title) {
          this.breads.push({
            path: item.path || item.redirect,
            title: item.meta.title,
          });
        }
      });
    },
    // dropdown触发事件
    handleCommand(type) {
      switch (type) {
        case "personal":
          this.$router.push("/personal");
          break;
        case "logout":
          localStorage.clear();
          // 由于router自身的bug，只能用强制刷新来解决路由权限bug
          location.reload();
          this.$router.push("/login");
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.right-header {
  height: 40px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  .right {
    display: flex;
    align-items: center;
    .el-avatar {
      margin-left: 5px;
    }
  }
}
</style>