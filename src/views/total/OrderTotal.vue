<template>
  <div class="order-total-wrap">
    <div class="total-time">
      <span>时间范围</span>
      <el-date-picker
        v-model="date"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        class="ml-5"
        format="yyyy-MM-dd HH:mm:ss"
        value-format="yyyy-MM-dd HH:mm:ss"
      >
      </el-date-picker>
      <el-button type="primary" class="ml-5" @click="handleSearch"
        >查询</el-button
      >
    </div>
    <div class="my-echart-wrap">
      <div id="myEchart" class="my-echart"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { api_order_ordertotal } from "@/apis/total";
import { forMateTime } from "@/filters";
export default {
  data() {
    return {
      date: [],
      myEchart: null,
    };
  },
  mounted() {
    this.getOrderTotal();
    // 监听窗口变化
    window.addEventListener("resize", this.addResize);
  },
  methods: {
    // 获取图表数据
    async getOrderTotal() {
      // 发送请求
      const res = await api_order_ordertotal({
        date: this.date ? JSON.stringify(this.date) : "[]",
      });
      // orderAmount   orderTime
      let echartsData = res.data.data;
      let xAxisData = [];
      let seriesData = [];
      echartsData.forEach((item) => {
        xAxisData.push(forMateTime(item.orderTime, "YYYY-MM-DD"));
        seriesData.push(item.orderAmount);
      });
      // 初始化echarts
      this.myEchart = echarts.init(document.getElementById("myEchart"));
      // 对echarts进行配置
      this.myEchart.setOption({
        xAxis: {
          type: "category",
          data: xAxisData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: seriesData,
            type: "bar",
          },
        ],
      });
    },
    handleSearch() {
      console.log(this.date);
      // 请求接口
      this.getOrderTotal();
    },
    addResize() {
      console.log(11);
      this.myEchart && this.myEchart.resize();
    },
  },
  destroyed() {
    window.removeEventListener("resize", this.addResize);
  },
};
</script>

<style lang="less" scoped>
.order-total-wrap {
  .ml-5 {
    margin-left: 5px;
  }
  .my-echart-wrap {
    background-color: #fff;
    margin-top: 20px;
    .my-echart {
      height: 400px;
    }
  }
}
</style>