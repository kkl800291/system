<template>
  <div class="list-wrap">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账号列表</span>
      </div>
      <div class="list-cont">
        <el-table
          ref="listTable"
          :data="tableList"
          @selection-change="handleSelection"
        >
          <el-table-column type="selection" v-if="isRole(['super'])">
          </el-table-column>
          <el-table-column prop="account" label="账号"> </el-table-column>
          <el-table-column prop="userGroup" label="用户组"> </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              <span>{{ scope.row.ctime | forMateTime("YYYY-MM-DD") }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="220px"
            v-if="isRole(['super', 'normal'])"
          >
            <template slot-scope="{ row }">
              <el-button @click="handleShowDialog(row)">编辑</el-button>
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                confirm-button-text="删掉靳皓文"
                cancel-button-text="取消何朝兵"
                confirm-button-type="danger"
                @confirm="handleDel(row)"
              >
                <el-button slot="reference" class="delBtn" type="danger">
                  删除
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        >
        </el-pagination>
        <div class="bottom-btn" v-if="isRole(['super'])">
          <el-button
            type="danger"
            @click="handleBatchDel"
            :disabled="!ids.length"
            >批量删除</el-button
          >
          <el-button type="primary" @click="handleCancelChoise"
            >取消选择</el-button
          >
        </div>
      </div>
    </el-card>
    <!-- 编辑弹窗 -->
    <el-dialog
      title="账号编辑"
      :visible.sync="modifyVisible"
      :close-on-click-modal="false"
    >
      <el-form
        ref="modifyForm"
        :rules="rules"
        :model="modifyForm"
        label-width="80px"
      >
        <el-form-item label="账号" prop="account">
          <el-input clearable v-model="modifyForm.account"></el-input>
        </el-form-item>
        <el-form-item label="用户组">
          <el-select v-model="modifyForm.userGroup">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="普通管理员" value="普通管理员"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modifyVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { isRole } from "@/utils/common.js";
import {
  api_users_batchdel,
  api_users_del,
  api_users_edit,
  api_users_list,
} from "@/apis/user";
import { addCheckAccount } from "@/utils/valid";
export default {
  data() {
    return {
      // 表格的数据
      tableList: [],
      total: 0, // 总共多少条
      currentPage: 1,
      pageSize: 5,
      modifyVisible: false,
      modifyForm: {
        account: "",
        userGroup: "普通管理员",
      },
      rules: {
        account: {
          validator: addCheckAccount,
          trigger: "blur",
          required: true,
        },
      },
      ids: [], // 所有勾选了的数据的id
      isRole: isRole,
    };
  },
  // 生命周期
  created() {
    this.getTableData();
  },
  methods: {
    // 获取列表数据
    async getTableData() {
      const res = await api_users_list({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      });
      this.tableList = res.data.data;
      this.total = res.data.total;
    },
    // 当前页改变
    handleCurrentChange(page) {
      this.currentPage = page;
      // 再次请求数据
      this.getTableData();
    },
    // 当前每页的条数
    handleSizeChange(size) {
      this.pageSize = size;
      // 再次请求数据
      this.getTableData();
    },
    // 显式弹窗
    handleShowDialog(row) {
      this.modifyVisible = true;
      this.modifyForm = {
        ...row,
      };
    },
    // 确定修改
    handleSave() {
      this.$refs.modifyForm.validate(async (valid) => {
        if (valid) {
          // 发送ajax修改账号
          // 参数可以给多，但是不能少，也必须对
          const res = await api_users_edit(this.modifyForm);
          if (res.data.code === 0) {
            this.modifyVisible = false;
            // 重新获取最新表格数据
            this.getTableData();
          }
        }
      });
    },
    // 删除
    async handleDel({ id }) {
      const res = await api_users_del({ id });
      let {
        data: { code },
      } = res;
      if (code === 0) {
        this.getTableData();
      }
    },
    // 取消选择
    handleCancelChoise() {
      this.$refs.listTable.clearSelection();
    },
    // 勾选表格的checkbox
    handleSelection(selection) {
      this.ids = selection.map((item) => item.id);
    },
    // 批量删除
    handleBatchDel() {
      this.$confirm("此操作将永久删除这些账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          if (this.ids.length) {
            const res = await api_users_batchdel({ ids: this.ids });
            if (res.data.code === 0) {
              this.getTableData();
            }
          }
        })
        .catch(() => {});
    },
  },
  // 过滤器
  // filters: {
  //   forMateTime(v) {
  //     // 方式一
  //     let date = new Date(v);
  //     console.log(date);
  //     // 年月日
  //     let Y = date.getFullYear();
  //     let M = date.getMonth() + 1;
  //     let D = date.getDate();
  //     // 时分秒
  //     let h = date.getHours();
  //     let m = date.getMinutes();
  //     let s = date.getSeconds();
  //     return `${Y}年${M}月${D}日 ${h}时${m}分${s}秒`;
  //     // 方式二
  //     return Dayjs(v).format("YYYY年MM月DD hh时mm:ss");
  //   },
  // },
};
</script>

<style lang="less" scoped>
.list-wrap {
  .el-pagination {
    margin-top: 10px;
  }
  .bottom-btn {
    margin-top: 10px;
  }
  .el-dialog {
    .el-form {
      .el-input {
        width: 200px;
      }
    }
  }
  .delBtn {
    margin-left: 5px;
  }
}
</style>