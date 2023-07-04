<template>
  <div class="add-wrap">
    <el-card>
      <div slot="header">
        <span>账号添加</span>
      </div>
      <div class="add-cont">
        <el-form
          ref="addForm"
          :rules="rules"
          :model="addForm"
          label-width="80px"
          status-icon
        >
          <el-form-item label="账号" prop="account">
            <el-input v-model="addForm.account"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password"></el-input>
          </el-form-item>
          <el-form-item label="用户组">
            <el-select v-model="addForm.userGroup">
              <el-option label="超级管理员" value="超级管理员"></el-option>
              <el-option label="普通管理员" value="普通管理员"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleAdd">添加</el-button>
            <el-button @click="handleReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { addCheckAccount, checkPassword } from "@/utils/valid";
import { api_users_add } from "@/apis/user";
import _ from "lodash";
export default {
  data() {
    return {
      addForm: {
        account: "",
        password: "",
        userGroup: "普通管理员",
      },
      rules: {
        account: { validator: addCheckAccount, trigger: "blur" },
        password: { validator: checkPassword, trigger: "blur" },
      },
    };
  },
  methods: {
    // 添加账号
    handleAdd1() {
      this.$refs.addForm.validate(async (valid) => {
        if (valid) {
          const res = await api_users_add(this.addForm);
          console.log(res);
          if (res.data.code === 0) {
            this.$router.push("/account/list");
          }
        }
      });
    },
    handleAdd: _.debounce(
      function () {
        this.handleAdd1();
      },
      1000,
      {
        leading: true,
      }
    ),
    handleReset() {
      this.$refs.addForm.resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.add-wrap {
  .el-form {
    /deep/ .el-input {
      width: 200px;
    }
  }
}
</style>