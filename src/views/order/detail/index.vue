<template>
  <div class="detail-wrap">
    <el-card>
      <div slot="header">
        <i class="el-icon-arrow-left go-back" @click="$router.go(-1)"></i>
        <span>订单详情</span>
      </div>
      <div class="detal-cont">
        <el-form>
          <el-form-item label="订单号:">
            <span>{{ detailForm.orderNo }}</span>
          </el-form-item>
          <el-form-item label="下单时间:">
            <span>{{ detailForm.orderTime | forMateTime }}</span>
          </el-form-item>
          <el-form-item label="手机号:">
            <span>{{ detailForm.phone }}</span>
          </el-form-item>
          <el-form-item label="收货人:">
            <span>{{ detailForm.consignee }}</span>
          </el-form-item>
          <el-form-item label="配送地址:">
            <span>{{ detailForm.deliverAddress }}</span>
          </el-form-item>
          <el-form-item label="送达时间:">
            <span>{{ detailForm.deliveryTime | forMateTime }}</span>
          </el-form-item>
          <el-form-item label="用户备注:">
            <span>{{ detailForm.remarks }}</span>
          </el-form-item>
          <el-form-item label="订单金额:">
            <span>{{ detailForm.orderAmount }}</span>
          </el-form-item>
          <el-form-item label="订单状态:">
            <span>{{ detailForm.orderState }}</span>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { api_order_detail } from "@/apis/order";
export default {
  data() {
    return {
      detailForm: {
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
    let { id } = this.$route.params;
    this.getDetail(id);
  },
  methods: {
    async getDetail(id) {
      const res = await api_order_detail({ id });
      this.detailForm = res.data.data;
    },
  },
};
</script>

<style lang="less" scoped>
.go-back {
  cursor: pointer;
}
</style>