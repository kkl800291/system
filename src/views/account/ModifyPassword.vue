<template>
  <div class="md-pwd-wrap">
    <el-card>
      <div slot="header">
        <span>修改密码</span>
      </div>
      <div class="md-pwd-cont">
        <el-form
          ref="modifyForm"
          label-width="100px"
          :rules="rules"
          :model="modifyForm"
          status-icon
        >
          <el-form-item label="原密码" prop="oldPwd">
            <el-input v-model="modifyForm.oldPwd"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPwd">
            <el-input v-model="modifyForm.newPwd"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="newPwdAgain">
            <el-input v-model="modifyForm.newPwdAgain"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleModify">确定</el-button>
            <el-button @click="handleReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { api_users_checkoldpwd, api_users_editpwd } from "@/apis/user";
export default {
  data() {
    // 新密码自定义验证
    const checkNewPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入新密码"));
      } else if (!/^[A-Za-z0-9]\w{5,11}$/.test(value)) {
        callback(
          new Error("请以字母或数字开头，包含字母、数字、_的6-12位字符")
        );
      } else {
        // 验证是否与确认新密码一致
        // 确认新密码不为空才做一致性判断
        if (this.modifyForm.newPwdAgain) {
          this.$refs.modifyForm.validateField("newPwdAgain");
        }
        // 验证通过
        callback();
      }
    };
    // 确认新密码自定义验证
    const checkNewPwdAgain = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入新密码"));
      } else if (!/^[A-Za-z0-9]\w{5,11}$/.test(value)) {
        callback(new Error("请以字母或数字头，包含字母、数字、_的6-12位字符"));
      } else {
        // 先判断是否与新密码一致
        if (value !== this.modifyForm.newPwd && this.modifyForm.newPwd) {
          callback(new Error("与新密码不一致"));
        } else {
          // 验证通过
          callback();
        }
      }
    };
    // 原密码自定义验证
    const checkOldPwd = async (rule, value, callback) => {
      // 空验证
      if (!value) {
        callback(new Error("请输入原密码"));
      } else {
        // 是否与原密码一致
        const res = await api_users_checkoldpwd({
          oldPwd: value,
        });
        if (res.data.code === 201) {
          callback(new Error(res.data.msg));
        }
        callback();
      }
    };

    return {
      modifyForm: {
        oldPwd: "",
        newPwd: "",
        newPwdAgain: "",
      },
      rules: {
        oldPwd: { required: true, validator: checkOldPwd, trigger: "blur" },
        newPwd: { required: true, validator: checkNewPwd, trigger: "blur" },
        newPwdAgain: {
          required: true,
          validator: checkNewPwdAgain,
          trigger: "blur",
        },
      },
    };
  },
  methods: {
    // 确定修改密码
    handleModify() {
      this.$refs.modifyForm.validate(async (valid) => {
        if (valid) {
          const res = await api_users_editpwd(this.modifyForm);
          if (res.data.code === 0) {
            localStorage.removeItem("token");
            this.$router.push("/login");
          }
        }
      });
    },
    // 重置
    handleReset() {
      this.$refs.modifyForm.resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.md-pwd-wrap {
  .md-pwd-cont {
    .el-input {
      width: 200px;
    }
  }
}
</style>