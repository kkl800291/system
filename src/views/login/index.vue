<template>
  <div class="login-wrap">
    <div class="login-form-wrap">
      <p class="form-title">
        <img class="title-img" src="@/assets/imgs/logo.svg" />
        <span class="title">外面管理平台</span>
      </p>
      <el-form
        ref="loginForm"
        :model="formData"
        @keyup.native.enter="handleLogin"
        :rules="rules"
        status-icon
      >
        <el-form-item prop="account">
          <el-input
            prefix-icon="iconfont icon-yonghu"
            clearable
            v-model="formData.account"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="iconfont icon-mima"
            clearable
            v-model="formData.password"
            :type="isText ? 'text' : 'password'"
          >
            <i
              slot="suffix"
              @click="changeInputType"
              class="iconfont active"
              :class="isText ? 'icon-yanjing' : 'icon-bukejian'"
            ></i>
          </el-input>
        </el-form-item>
      </el-form>
      <el-button type="warning" @click="handleLogin">登录</el-button>
    </div>
  </div>
</template>

<script>
import { checkAccount, checkPassword } from "@/utils/valid";
import { api_users_checkLogin } from "@/apis/user";
import { calcRoute } from "@/router";
export default {
  data() {
    return {
      formData: {
        account: "",
        password: "",
      },
      isText: false,
      rules: {
        account: { validator: checkAccount, trigger: "blur" },
        password: [{ validator: checkPassword, trigger: "blur" }],
      },
      // rules: {
      //   account: [
      //     { required: true, message: "请输入用户名", trigger: "blur" },
      //     { min: 3, max: 6, message: "请输入3 - 6个字符", trigger: "blur" },
      //   ],
      //   password: [
      //     { required: true, message: "请输入密码", trigger: "blur" },
      //     { min: 6, max: 12, message: "请输入6 - 12个字符", trigger: "blur" },
      //   ],
      // },
    };
  },
  methods: {
    changeInputType() {
      this.isText = !this.isText;
    },
    // 登录
    handleLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        // valid: false --> 表单验证未通过
        // valid: true --> 表达验证通过
        if (valid) {
          // 发送登录请求
          // const res = await axios({
          //   url: "http://sell.h5.itsource.cn:8087/users/checkLogin",
          //   method: "post",
          //   data: this.formData,
          // });
          const res = await api_users_checkLogin(this.formData);
          console.log("login: ", res);
          if (res.data.code === 0) {
            // this.$message.success(res.data.msg);
            localStorage.setItem("token", res.data.token);
            // 将权限存入本地
            localStorage.setItem("role", res.data.role);
            calcRoute();
            this.$router.push("/home");
          }
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login-wrap {
  height: 100%;
  background-image: url("@/assets/imgs/login_bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: start;
  .login-form-wrap {
    border-radius: 10px;
    overflow: hidden;
    width: 300px;
    // height: 230px;
    margin-left: 100px;
    background-color: rgba(255, 255, 255, 0.3);
    padding: 0 15px 10px;
    box-sizing: border-box;
    .form-title {
      display: flex;
      justify-content: center;
      align-items: center;
      .title-img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
        background-color: orange;
      }
      .title {
        color: darkorange;
        margin-left: 10px;
      }
    }
    .el-form {
      /deep/ .el-input__inner {
        background-color: transparent;
        color: #fff;
      }
    }
    .el-button {
      width: 100%;
    }
    .active {
      cursor: pointer;
    }
  }
}
</style>