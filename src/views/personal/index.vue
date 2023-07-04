<template>
  <div class="personal-wrap">
    <el-card>
      <div slot="header">
        <span>个人中心</span>
      </div>
      <div class="personal-cont">
        <el-divider content-position="left">管理员ID</el-divider>
        <span>{{ userInfo.id }}</span>
        <el-divider content-position="left">账号</el-divider>
        <span>{{ userInfo.account }}</span>
        <el-divider content-position="left">用户组</el-divider>
        <span>{{ userInfo.userGroup }}</span>
        <el-divider content-position="left">创建时间</el-divider>
        <span>{{ userInfo.ctime | forMateTime }}</span>
        <el-divider content-position="left">管理员头像</el-divider>
        <el-upload
          class="avatar-uploader"
          action="http://sell.h5.itsource.cn:8087/users/avatar_upload"
          :show-file-list="false"
          :before-upload="handleBeforeUpload"
          :on-success="handleSuccess"
        >
          <img v-if="userInfo.imgUrl" :src="userInfo.imgUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </el-card>
  </div>
</template>

<script>
import { api_users_avataredit } from "@/apis/user";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      // userInfo: {
      //   account: "",
      //   ctime: "",
      //   id: 0,
      //   imgUrl: "",
      //   userGroup: "",
      // },
    };
  },
  // created() {
  //   this.getUserInfo();
  // },
  // 计算属性
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    ...mapMutations(["SET_USER_INFO"]),
    // 获取个人中心数据
    // async getUserInfo() {
    //   const res = await api_users_info();
    //   this.SET_USER_INFO(res.data);
    // },
    // 上传图片之前的钩子函数
    handleBeforeUpload(file) {
      let { type } = file;
      if (type != "image/jpeg" && type != "image/png") {
        this.$message.error("请上传jpeg或者png格式的图片");
        return false;
      }
    },
    // 图片上传成功呢
    async handleSuccess(res) {
      let { code, imgUrl } = res;
      if (code === 0) {
        // 头像图片上传成功
        // this.userInfo.imgUrl = imgUrl;
        this.SET_USER_INFO({ imgUrl });
        // 发送请求修改头像
        const res = await api_users_avataredit({ imgUrl });
        console.log(res);
      }
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 128px;
  height: 128px;
  line-height: 128px;
  text-align: center;
}
.avatar {
  width: 128px;
  height: 128px;
  display: block;
}
</style>