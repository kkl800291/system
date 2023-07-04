<template>
  <div class="home-card-wrap">
    <div class="left">
      <slot></slot>
    </div>
    <div class="right">
      <p>{{ title }}</p>
      <p>{{ amount | forMateMoney }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="less" scoped>
.home-card-wrap {
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  padding: 10px;
  width: 22%;
  box-sizing: border-box;
  .iconfont {
    font-size: 50px;
  }
  .right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      & + p {
        margin-top: 5px;
      }
    }
  }
}
</style>