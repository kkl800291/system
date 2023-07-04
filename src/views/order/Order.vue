<template>
  <div class="order-wrap">
    <el-card>
      <div class="order-cont">
        <div class="order-search-wrap">
          <el-form ref="searchForm" :model="searchForm" inline>
            <el-form-item label="订单号" prop="orderNo">
              <el-input v-model="searchForm.orderNo"></el-input>
            </el-form-item>
            <el-form-item label="收货人" prop="consignee">
              <el-input v-model="searchForm.consignee"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="searchForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="订单状态" prop="orderState">
              <el-select v-model="searchForm.orderState">
                <el-option label="已受理" value="已受理"></el-option>
                <el-option label="派送中" value="派送中"></el-option>
                <el-option label="已完成" value="已完成"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="选择时间" prop="date">
              <el-date-picker
                v-model="searchForm.date"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getTableData">查询</el-button>
              <el-button @click="handleReset">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="order-table-wrap">
          <el-table border :data="tableData" style="width: 100%">
            <el-table-column
              width="120"
              label="订单号"
              prop="orderNo"
            ></el-table-column>
            <el-table-column width="120" label="下单时间">
              <template slot-scope="{ row }">
                <span>{{ row.orderTime | forMateTime }}</span>
              </template>
            </el-table-column>
            <el-table-column
              width="120"
              label="手机号"
              prop="phone"
            ></el-table-column>
            <el-table-column
              width="120"
              label="收货人"
              prop="consignee"
            ></el-table-column>
            <el-table-column
              width="120"
              label="配送地址"
              prop="deliverAddress"
            ></el-table-column>
            <el-table-column width="120" label="送达时间">
              <template slot-scope="{ row }">
                <span>{{ row.deliveryTime | forMateTime }}</span>
              </template>
            </el-table-column>
            <el-table-column
              width="120"
              label="用户备注"
              prop="remarks"
            ></el-table-column>
            <el-table-column
              width="120"
              label="订单金额"
              prop="orderAmount"
            ></el-table-column>
            <el-table-column
              width="120"
              label="订单状态"
              prop="orderState"
            ></el-table-column>
            <el-table-column label="操作" width="120px" fixed="right">
              <template slot-scope="{ row }">
                <!-- 
                    scope: {
                      row: {} //当前行数据,
                      $index: 0, //当前行的索引
                    }
                 -->
                <el-button type="text" @click="handleJumpDetail(row.id)"
                  >查看</el-button
                >
                <el-button type="text" @click="handleEdit(row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="order-pagination">
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
      </div>
    </el-card>
    <!-- 编辑-抽屉 -->
    <el-drawer
      title="订单编辑"
      :visible.sync="drawer"
      :size="450"
      :wrapperClosable="false"
    >
      <div class="drawer-form">
        <el-form label-width="80px">
          <el-form-item label="订单号:">
            <!-- <span>{{ detailForm.orderNo }}</span> -->
            <span>{{ drawerForm.orderNo }}</span>
          </el-form-item>
          <el-form-item label="下单时间:">
            <!-- <span>{{ detailForm.orderTime | forMateTime }}</span> -->
            <span>{{ drawerForm.orderTime | forMateTime }}</span>
          </el-form-item>
          <el-form-item label="手机号:">
            <!-- <span>{{ detailForm.phone }}</span> -->
            <el-input v-model="drawerForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="收货人:">
            <!-- <span>{{ detailForm.consignee }}</span> -->
            <el-input v-model="drawerForm.consignee"></el-input>
          </el-form-item>
          <el-form-item label="配送地址:">
            <!-- <span>{{ detailForm.deliverAddress }}</span> -->
            <el-input v-model="drawerForm.deliverAddress"></el-input>
          </el-form-item>
          <el-form-item label="送达时间:">
            <!-- <span>{{ detailForm.deliveryTime | forMateTime }}</span> -->
            <el-date-picker
              v-model="drawerForm.deliveryTime"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="用户备注:">
            <!-- <span>{{ detailForm.remarks }}</span> -->
            <el-input type="textarea" v-model="drawerForm.remarks"></el-input>
          </el-form-item>
          <el-form-item label="订单金额:">
            <!-- <span>{{ detailForm.orderAmount }}</span> -->
            <el-input v-model="drawerForm.orderAmount"></el-input>
          </el-form-item>
          <el-form-item label="订单状态:">
            <!-- <span>{{ detailForm.orderState }}</span> -->
            <el-select v-model="drawerForm.orderState">
              <el-option label="已受理" value="已受理"></el-option>
              <el-option label="派送中" value="派送中"></el-option>
              <el-option label="已完成" value="已完成"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="drawer-footer">
        <el-button @click="drawer = false">取 消</el-button>
        <el-button type="primary" @click="handleEditSave">确 定</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { api_order_edit, api_order_list } from "@/apis/order";
import { forMateTime } from "@/filters";
export default {
  // orderNo	string	否	订单号
  // consignee	string	否	收货人
  // phone	string	否	手机号
  // orderState	string	否	订单状态
  // date	Array<String>	否	字符串格式数组：["2019-10-05 00:00:00","2019-10-10 00:00:00"]
  data() {
    return {
      searchForm: {
        orderNo: "", //订单号,
        consignee: "", //收货人
        phone: "", //手机号
        orderState: "", // 订单状态
        date: [], // 选择时间
      },
      tableData: [
        // {
        //   orderNo: "12321",
        //   orderTime: "2022-12-08",
        //   phone: 123123,
        //   consignee: "王二狗",
        //   deliverAddress: "34234234",
        //   deliveryTime: "2022-12-08",
        //   remarks: "24234",
        //   orderAmount: 123,
        //   orderState: "234234",
        // },
      ],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      drawer: false,
      drawerForm: {
        orderNo: "12321",
        orderTime: "2022-12-08",
        phone: 123123,
        consignee: "王二狗",
        deliverAddress: "34234234",
        deliveryTime: "2022-12-08",
        remarks: "24234",
        orderAmount: 123,
        orderState: "234234",
      },
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    // 获取订单列表
    async getTableData() {
      const res = await api_order_list({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        ...this.searchForm,
        date: this.searchForm.date
          ? JSON.stringify(this.searchForm.date)
          : JSON.stringify([]),
      });
      this.tableData = res.data.data;
      this.total = res.data.total;
    },
    // 每页条数
    handleSizeChange(size) {
      this.pageSize = size;
      this.getTableData();
    },
    // 切换当前页
    handleCurrentChange(page) {
      // 修改currentPage
      this.currentPage = page;
      // 获取列表数据
      this.getTableData();
    },
    // 重置
    handleReset() {
      this.$refs.searchForm.resetFields();
    },
    // 查看
    handleJumpDetail(id) {
      // 跳转到详情页
      this.$router.push(`/detail/${id}`);
    },
    // 点击编辑
    handleEdit(row) {
      // 回显数据
      this.drawerForm = { ...row };
      // 显式抽屉
      this.drawer = true;
    },
    // 抽屉确定按钮
    async handleEditSave() {
      // console.log(this.drawerForm);
      // 处理时间为标准格式 2022-12-09 14:35:52
      // let orderTime = forMateTime(this.drawerForm.orderTime);
      // let deliveryTime = forMateTime(this.drawerForm.deliveryTime);

      const res = await api_order_edit({
        ...this.drawerForm,
        orderTime: forMateTime(this.drawerForm.orderTime),
        deliveryTime: forMateTime(this.drawerForm.deliveryTime),
      });
      if (res.data.code === 0) {
        this.drawer = false;
        this.getTableData();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.order-wrap {
  overflow-x: scroll;
  .drawer-form {
    padding: 0 10px;
  }
  .el-drawer {
    position: relative;
    .drawer-footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 10px;
      text-align: right;
      background-color: #fff;
    }
  }
}
</style>