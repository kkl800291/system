<template>
  <div class="category-wrap">
    <el-card>
      <div slot="header" class="card-title">
        <span>商品分类</span>
        <el-button type="primary" @click="addDialog = true">添加分类</el-button>
      </div>
      <div class="category-table">
        <el-table :data="tableData">
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column label="分类名称">
            <template slot-scope="{ row }">
              <!-- 
                isModify: true 可编辑
                          false 不可编辑
               -->
              <span v-show="!row.isModify">{{ row.cateName }}</span>
              <el-input v-show="row.isModify" v-model="row.cateName"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="是否启用">
            <template slot-scope="{ row }">
              <!-- 
                isModify: true 可编辑 switch可以点 --- disabled = false
                          false 不可编辑 switch不可以点  --- disabled = true
               -->
              <el-switch
                v-model="row.state"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :disabled="!row.isModify"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{ row }">
              <el-button v-show="!row.isModify" @click="row.isModify = true">
                编辑
              </el-button>
              <el-button
                v-show="row.isModify"
                type="success"
                @click="handleModify(row)"
              >
                完成
              </el-button>
              <el-popconfirm
                title="这一条分类您确定删除吗？"
                @confirm="handleDel(row.id)"
              >
                <el-button class="delBtn" slot="reference" type="danger"
                  >删除</el-button
                >
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="category-pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
    <!-- 添加分类弹窗 -->
    <el-dialog title="添加分类" :visible.sync="addDialog" @close="dialogClose">
      <el-form :model="addFormData" label-width="80px">
        <el-form-item label="分类名称">
          <el-input v-model="addFormData.cateName"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="addFormData.state"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  api_goods_addcate,
  api_goods_catelist,
  api_goods_delcate,
  api_goods_editcate,
} from "@/apis/goods";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1, // 当前页码
      pageSize: 5, // 点前页码条数
      total: 0, // 总条数
      addDialog: false, // 添加分类弹窗
      addFormData: {
        cateName: "",
        state: false,
      },
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    // 获取表格数据
    async getTableData() {
      // 调用列表接口
      const res = await api_goods_catelist({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      });
      console.log(res);

      // 给每条数据添加一个是否编辑的状态
      res.data.data.forEach((item) => {
        item.isModify = false;
        item.state = item.state ? true : false;
      });

      this.tableData = res.data.data;

      this.total = res.data.total;
    },
    // 每页多少条
    handleSizeChange(size) {
      // console.log(size);
      this.pageSize = size;
      this.getTableData();
    },
    // 当前页
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getTableData();
    },
    // 添加分类
    async handleAdd() {
      // 先检验拿到的数据是否符合接口文档需要的数据
      // console.log(this.addFormData);
      // 将不符合的数据转化成符合要求的数据
      this.addFormData.state = this.addFormData.state ? 1 : 0;
      const res = await api_goods_addcate(this.addFormData);
      // console.log(111, res);
      if (res.data.code === 0) {
        this.addDialog = false;
        this.getTableData();
      }
    },
    // 只要弹窗关闭就会调用
    dialogClose() {
      // 将添加表单的数据重置
      // this.addFormData = {
      //   cateName: "",
      //   state: false,
      // };
      this.addFormData = this.$options.data().addFormData;
    },
    // 删除分类
    async handleDel(id) {
      const res = await api_goods_delcate({ id });
      // console.log(res);
      if (res.data.code === 0) {
        this.getTableData();
      }
    },
    // 点击编辑按钮将状态改为可编辑
    // handleEdit(row) {
    //   row.isModify = true;
    // },
    // 完成按钮
    async handleModify(row) {
      const res = await api_goods_editcate({
        ...row,
        state: row.state ? 1 : 0,
      });
      if (res.data.code === 0) {
        row.isModify = false;
        this.getTableData();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.category-wrap {
  .card-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .delBtn {
    margin-left: 5px;
  }
  .category-pagination {
    margin-top: 10px;
  }
}
</style>