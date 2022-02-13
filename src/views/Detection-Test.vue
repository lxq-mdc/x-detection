<template>
  <div class="test_left">
    <el-container>
      <el-aside width="200px">
        <el-button style="height: 30px; line-height: 5px; margin-top: 10px"
          >选择检测缺陷类别</el-button
        >
        <el-select
          size="small"
          v-model="value"
          placeholder="请选择"
          style="width: 80%; margin-top: 10px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <label class="upload_button"
          >上传文件
          <input
            type="file"
            ref="inputFile"
            id="xFile"
            multiple
            accept="image/*"
            @change="handleFiles()"
            style="position: absolute; clip: rect(0 0 0 0)"
          />
        </label>

        <el-button
          style="
            height: 30px;
            width: 80%;
            margin-bottom: 10px;
            line-height: 5px;
          "
          >未检测</el-button
        >
        <el-card class="box-card" ref="box_card" v-html="ulContent"> </el-card>
      </el-aside>
      <el-main>
        <div class="imgDetail">
          <el-image style="width: 100%; height: 100%" :src="url"></el-image>
        </div>
        <el-button type="primary">上传项目</el-button>
      </el-main>
      <el-aside width="200px">Aside</el-aside>
    </el-container>
  </div>
</template>

<script>

export default {
  name: "Detection-Test",
  data() {
    return {
      options: [
        {
          value: "全选",
          label: "全选",
        },
        {
          value: "气孔",
          label: "气孔",
        },
        {
          value: "裂纹",
          label: "裂纹",
        },
        {
          value: "未熔合",
          label: "未熔合",
        },
        {
          value: "未焊透",
          label: "未焊透",
        },
        {
          value: "夹渣",
          label: "夹渣",
        },
      ],
      value: "全选",
      fileList: [
        // {
        //   name: "food.jpeg",
        //   url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        // },
        // {
        //   name: "food2.jpeg",
        //   url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        // },
      ],
      ulContent:'',
      imgs: [],
      url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
    };
  },
  methods: {
    handleFiles() {
      this.fileList = this.$refs.inputFile.files;
      this.handleFileList();
    },
    handleFileList() {
      window.URL = window.URL || window.webkitURL;
      let div1 = document.createElement("div");
      let that = this;
      for (let i = 0; i < this.fileList.length; i++) {
        (function (i) {
          let div2 = document.createElement("div");
          div2.className = "displayStyle";
          let img = document.createElement("img");
          let info = document.createElement("span");
          info.innerHTML = `${i + 1}.`;
          div2.appendChild(info);


          let reader = new FileReader();
          reader.readAsDataURL(that.fileList[i]);
          reader.onload = function () {
            img.src = reader.result;
            img.height = 25;
            div2.appendChild(img);
            div1.appendChild(div2);
          };

          // img.src=window.URL.createObjectURL(that.fileList[i])
          // img.height=20
          // img.onload=function(){
          //   window.URL.revokeObjectURL(this.src)
          // }
          // div2.appendChild(img)
          // div1.appendChild(div2)
        })(i);
      }
      console.log(div1);
      console.log(div1.innerHTML);
      this.ulContent = div1.innerHTML
    },
  },
  mounted() {},
  beforeUpdate() {
  },
};
</script>

<style scoped>
.imgDetail {
  width: 90%;
  height: 90%;
  /*background-color: red;*/
  margin: 0 auto 10px;
}
.displayStyle {
  list-style: none;
  background-color: red;
}
.test_left {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
.box-card {
  width: 80%;
  margin: 0 auto;
  height: 200px;
  overflow: scroll;
  /*background-color: red;*/
}
.box-card div {
  margin: 0 auto;
  /*width: 80%;*/
  height: 30px;
  /*background-color: #e9eef3;*/
  line-height: 30px;
}
.upload_button {
  background-color: deepskyblue;
  display: block;
  border-radius: 5px;
  width: 80%;
  margin: 18px auto;
  height: 30px;
  line-height: 30px;
}
</style>
