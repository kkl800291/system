<template>
  <div class="shop-wrap">
    <el-card>
      <div slot="header" class="card-header">
        <span>店铺管理</span>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </div>
      <div class="card-cont">
        <el-form label-width="80px">
          <el-form-item label="店铺名称">
            <el-input v-model="shopForm.name"></el-input>
          </el-form-item>
          <el-form-item label="店铺公告">
            <el-input type="textarea" v-model="shopForm.bulletin"></el-input>
          </el-form-item>
          <el-form-item label="店铺头像">
            <el-upload
              class="avatar-uploader"
              action="http://sell.h5.itsource.cn:8087/shop/upload"
              :show-file-list="false"
              :on-success="handleOnSuccess"
            >
              <img
                v-if="shopForm.avatar"
                :src="shopForm.avatar"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="店铺图片">
            <el-upload
              action="http://sell.h5.itsource.cn:8087/shop/upload"
              list-type="picture-card"
              :file-list="shopForm.pics"
              :on-success="handleImgListSuccess"
              :on-remove="handleOnRemove"
              :on-preview="handleOnPreview"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-form-item>
          <el-form-item label="配送费">
            <el-input v-model="shopForm.deliveryPrice"></el-input>
          </el-form-item>
          <el-form-item label="配送时间">
            <el-input v-model="shopForm.deliveryTime"></el-input>
          </el-form-item>
          <el-form-item label="配送描述">
            <el-input v-model="shopForm.description"></el-input>
          </el-form-item>
          <el-form-item label="店铺评分">
            <el-input v-model="shopForm.score"></el-input>
          </el-form-item>
          <el-form-item label="销量">
            <el-input v-model="shopForm.sellCount"></el-input>
          </el-form-item>
          <el-form-item label="活动">
            <el-checkbox-group v-model="shopForm.supports">
              <el-checkbox label="在线支付满28减5"></el-checkbox>
              <el-checkbox label="VC无限橙果汁全场8折"></el-checkbox>
              <el-checkbox label="单人精彩套餐"></el-checkbox>
              <el-checkbox label="单人特色套餐"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="营业时间">
            <el-time-picker
              is-range
              v-model="shopForm.date"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
              value-format="yyyy-MM-DD HH:mm:ss"
            >
            </el-time-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { api_shop_edit, api_shop_info } from "@/apis/shop";
export default {
  data() {
    return {
      shopForm: {
        id: "", //id
        name: "", //店铺名称
        bulletin: "", //公告
        avatar: "", //店铺头像
        deliveryPrice: "", //配送费
        deliveryTime: "", //送达时间
        description: "", //描述
        score: "", //评分
        sellCount: "", //销量
        supports: [], //活动
        pics: [], //店铺图片
        date: [], //营业时间
        minPrice: "", //起送价格
      },

      imageUrl: "",
      dialogVisible: false,
      dialogImageUrl: "",
      checkList: [],
      value1: "",
    };
  },
  created() {
    this.getShopInfo();
  },
  methods: {
    async getShopInfo() {
      const res = await api_shop_info();
      console.log(res);
      // 处理pics格式
      res.data.data.pics = res.data.data.pics.map((item) => {
        return {
          name: item,
          url: item,
        };
      });
      this.shopForm = res.data.data;
      // pics:      ["http://sell.h5.itsource.cn:8087/imgs/1670671740944.webp"]
      // file-list: [{name: 'http://sell.h5.itsource.cn:8087/imgs/1670671740944.webp', url: 'http://sell.h5.itsource.cn:8087/imgs/1670671740944.webp'}]
    },
    // 店铺头像上传成功
    handleOnSuccess(res) {
      // console.log(res);
      if (res.code === 0) {
        this.shopForm.avatar = res.imgUrl;
      }
    },
    // 店铺图片上传成功
    handleImgListSuccess(res) {
      console.log(res);
      if (res.code === 0) {
        this.shopForm.pics.push({
          name: res.imgUrl,
          url: res.imgUrl,
        });
      }
    },
    // 店铺图片删除
    handleOnRemove(file) {
      console.log(file);
      // 拿出删除图片的uid（惟一的，upload组件内部加的）
      let { uid } = file;
      // 通过uid从pics中找出对应数据的下标
      let index = this.shopForm.pics.findIndex((item) => item.uid === uid);
      // 通过index去pics中删除对应的数据
      if (index >= 0) {
        this.shopForm.pics.splice(index, 1);
      }
    },
    // 店铺图片查看
    handleOnPreview(file) {
      console.log(file);
      // 拿到点击图片的url
      let { url } = file;
      // 显式dialog
      this.dialogVisible = true;
      // 将url赋值给dialog里面的img
      this.dialogImageUrl = url;
    },
    // 保存
    async handleSave() {
      console.log(this.shopForm);
      // pics: [
      // {
      //     "name": "http://sell.h5.itsource.cn:8087/imgs/1670671740944.webp",
      //     "url": "http://sell.h5.itsource.cn:8087/imgs/1670671740944.webp",
      //     "uid": 1670728979159,
      //     "status": "success"
      // }]
      // pics: ['http://sell.h5.itsource.cn:8087/imgs/1670671740944.webp']
      // 将pics修改为后端需要的格式
      let pics = this.shopForm.pics.map((item) => item.url);
      // 发送请求
      const res = await api_shop_edit({
        ...this.shopForm,
        pics,
      });
      console.log(res);
    },
  },
};
</script>

<style lang="less" scoped>
.shop-wrap {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
/deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
}
.avatar {
  width: 148px;
  height: 148px;
  display: block;
}
</style>