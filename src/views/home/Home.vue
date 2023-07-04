<template>
  <div class="home-wrap">
    <div class="home-header">
      <home-card title="总订单" :amount="homeData.totalOrder">
        <i class="iconfont icon-order" style="color: green"></i>
      </home-card>
      <home-card title="总销售额" :amount="homeData.totalAmount">
        <i class="iconfont icon-goods" style="color: red"></i>
      </home-card>
      <home-card title="今日订单数" :amount="homeData.todayOrder">
        <i class="iconfont icon-home" style="color: deeppink"></i>
      </home-card>
      <home-card title="今日销售额" :amount="homeData.totayAmount">
        <i class="iconfont icon-total" style="color: purple"></i>
      </home-card>
    </div>
    <div class="home-echarts">
      <div class="my-echart" id="myEchart"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import HomeCard from "./homeCard";
import { api_order_totaldata } from "@/apis/total";
export default {
  components: {
    HomeCard,
  },
  data() {
    return {
      homeData: {
        xData: [],
        orderData: [],
        amountData: [],
        totalOrder: 0,
        totalAmount: 0,
        todayOrder: 0,
        totayAmount: 0,
      },
    };
  },
  async mounted() {
    const res = await api_order_totaldata();
    console.log(res);
    this.homeData = res.data;
    let myChart = echarts.init(document.getElementById("myEchart"));
    myChart.setOption({
      title: {
        text: "Stacked Line",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["订单", "金额"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: this.homeData.xData,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "订单",
          type: "line",
          stack: "Total",
          data: this.homeData.orderData,
        },
        {
          name: "金额",
          type: "line",
          stack: "Total",
          data: this.homeData.amountData,
        },
      ],
    });
  },
};
</script>

<style lang="less" scoped>
.home-wrap {
  .home-header {
    display: flex;
    justify-content: space-between;
  }
  .home-echarts {
    background-color: #fff;
    margin-top: 30px;
    .my-echart {
      width: 100%;
      height: 400px;
    }
  }
}
</style>