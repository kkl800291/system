<template>
  <div class="layout-wrap">
    <!-- 导航组件 -->
    <left-nav />
    <div class="layout-cont">
      <top-header />
      <!-- 二级路由出口 -->
      <div class="layout-route">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// import { api_users_info } from "@/apis/user";
import LeftNav from "./nav/index";
import TopHeader from "./topHeader";
// import { mapMutations } from "vuex";
import { mapActions } from "vuex";
export default {
  components: {
    LeftNav,
    TopHeader,
  },
  created() {
    // this.getUserInfo();
    this.getAcitonUserInfo();
  },
  methods: {
    ...mapActions(["getAcitonUserInfo"]),
    // ...mapMutations(['SET_USER_INFO']),
    // async getUserInfo() {
    // const res = await api_users_info();
    // console.log(res);
    // this.SET_USER_INFO(res.data)
    // },
  },
};
</script>

<style lang="less" scoped>
.layout-wrap {
  display: flex;
  height: 100%;
  .layout-cont {
    background-color: yellow;
    overflow: hidden;
    flex: 1;
    display: flex;
    flex-direction: column;
    .layout-route {
      padding: 15px;
      flex: 1;
      overflow-y: scroll;
    }
  }
}
</style>