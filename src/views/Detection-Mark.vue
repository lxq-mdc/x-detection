<template>
  <div class="mark">
    <el-container >
      <el-aside width="200px" class="mark_left">
        <el-button type="primary" style="margin-top: 50px;width: 80%;">加载本地图片</el-button>
        <el-button type="primary" style="margin-top: 10px ;width: 80%;">选择保存目录</el-button>
        <el-button type="primary" style="margin-top: 10px;width: 80%;">保存</el-button>
        <el-button type="primary" style="margin-top: 10px ;width: 80%;">上一张图像</el-button>
        <el-button type="primary" style="margin-top: 10px ;width: 80%;">下一张图像</el-button>
        <el-button style="margin-top: 10px ;width: 80%;">创建标注</el-button>
        <el-button style="margin-top: 10px;width: 80%;">删除标注</el-button>
      </el-aside>
      <el-main>
        <div class="mask_imgDetail">
          <el-image style="width: 100%; height: 100%" :src="url"></el-image>
        </div>
      </el-main>
      <el-aside width="200px">
        <el-button style="margin-top: 10px;width: 80%;">图像处理</el-button>
        <el-button type="info" style="margin-top: 10px;width: 80%;" >亮度</el-button>
        <el-button type="info" style="margin-top: 10px;width: 80%;">对比度</el-button>
        <el-button style="margin-top: 10px;width: 80%;">标签</el-button>
        <el-card class="box-card" ref="box_card" > </el-card>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Detection-Mark",
  data(){
    return {
      url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
    }
  }
};
</script>

<style scoped>

.mark {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
.mask_imgDetail {
  width: 90%;
  height: 90%;
  /*background-color: red;*/
  margin: 0 auto 10px;
}
.box-card {
  width: 80%;
  margin: 0 auto;
  height: 200px;
  overflow: scroll;
  margin: 10px auto 10px;
  /*background-color: red;*/
}
</style>
