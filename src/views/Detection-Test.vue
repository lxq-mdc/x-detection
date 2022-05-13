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
        <el-card class="box-card" ref="box_card" style="height: 60%">
            <div v-for="item in msg" :key="item.info" @click="demo(item.src)">
<!--              <span>{{item.info}}</span>-->
              <img :src="item.src">
            </div>

        </el-card>
      </el-aside>
      <el-main>
        <div class="imgDetail">
          <el-image style="width: 100%; height: 50%" :src="url">
            <div slot="error" class="image-slot">
              未上传文件
            </div>
          </el-image>
        </div>
        <el-button type="primary" @click="uploadProject">上传项目</el-button>
        <el-dialog title="" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="项目名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off" placeholder="请输入项目名称"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="projectCancel">取 消</el-button>
            <el-button type="primary" @click="projectRequest">确 定</el-button>
          </div>
        </el-dialog>
      </el-main>
      <el-aside width="200px">
        <el-button style="height: 30px; line-height: 5px; margin-top: 10px;width: 80%"
        >已检测</el-button
        >
        <el-card class="box-card" style="margin-top: 15px;height: 90%" ref="box_card">
          <div v-for="item in showImgs" :key="item.id"  @click="demo(item.downUrl)">
            <img :src="item.downUrl">
          </div>
        </el-card>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import { upload } from "@/service";
export default {
  name: "Detection-Test",
  data() {
    return {
      form: {
        name: '',
      },
      formLabelWidth: '120px',
      dialogFormVisible: false,
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
      fileList: [],
      ulContent: "",
      imgs: [],
      divs:[],
      msg:[],
      url: "",
      showImgs:[]
    };
  },
  methods: {
    //展示请求回来的图片
    // bindClickEvent(){
    //    for (let i = 0; i < this.showImgs.length; i++) {
    //     (function(i){
    //         this.showImgs[i].onClick=function(){
    //           this.url=this.src
    //         }
    //     })(i)

    //    }
    // },
    //获取需要上传的图片的名称
    getImageName(){
        let names = []
      Array.from(this.fileList).forEach(item=>{
          names.push(item.name)
        })
     return names
    },
    //上传项目
    uploadProject(){
      this.dialogFormVisible = true

    },
    //上传项目取消
    projectCancel(){
      this.dialogFormVisible = false
      this.form.name=''
    },
    //上传项目确定，发送请求
   async projectRequest(){
      this.dialogFormVisible = false
      // this.form.name=''
      let uploadNames=  this.getImageName()
      let projectName = this.form.name
      console.log(uploadNames,projectName);
      let result= await upload(projectName,uploadNames)
      console.log('45678',result);
      if(result.success){
        this.showImgs=result.data
        console.log(this.showImgs);
      }
    },
    handleFiles() {
      this.fileList = this.$refs.inputFile.files;
      this.handleFileList();
    },
    demo(src){
      this.url=src
      console.log(this.msg);
    },
    handleFileList() {
      window.URL = window.URL || window.webkitURL;
      let that = this;
      for (let i = 0; i < this.fileList.length; i++) {
        (function (i) {
          let div2 = document.createElement("div");
          div2.className = "displayStyle";
          let img = document.createElement("img");
          let info = document.createElement("span");
          info.innerHTML = `${i + 1}.`;
          div2.appendChild(info);
          let obj={}
          let reader = new FileReader();
          reader.readAsDataURL(that.fileList[i]);
          reader.onload = function () {
            img.src = reader.result;
            img.height = 25;
            obj.src=reader.result;
            obj.info=that.msg.length
            that.msg.push(obj)
          };
        })(i);
      }
      setTimeout(() => {
        console.log('123',this.msg);
      });
    },
  },
  mounted() {

  },
  beforeUpdate() {},
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
.box-card img{
  height: 25px;
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
