<template>
  <div class="mark">
    <el-container>
      <el-aside width="200px" class="mark_left">
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
          type="primary"
          style="margin-top: 10px; width: 80%"
          @click="saveImg"
        >
          保存
          <!--          <a :href="currentSrc" :download="downloadName">保存</a>-->
        </el-button>
        <el-button
          type="primary"
          style="margin-top: 10px; width: 80%"
          @click="switchPage('last')"
          >上一张图像</el-button
        >
        <el-button
          type="primary"
          style="margin-top: 10px; width: 80%"
          @click="switchPage('next')"
          >下一张图像</el-button
        >
        <el-button style="margin-top: 10px; width: 80%" @click="setMode('RECT')"
          >创建标注</el-button
        >
        <el-button style="margin-top: 10px; width: 80%" @click="deIcon"
          >删除标注</el-button
        >
      </el-aside>
      <el-main>
        <div id="mask_imgDetail">
          <div id="map"></div>
        </div>
        <el-dialog
          title="选择缺陷类型"
          :visible.sync="dialogVisible"
          width="30%"
        >
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancelDialog">取 消</el-button>
            <el-button type="primary" @click="sureDialog"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </el-main>
      <el-aside width="200px">
        <el-button style=" width: 80%;margin: 10px auto 0">图像处理</el-button>
        <div style="float: left;margin-left: 25px;margin-top: 6px">亮度</div>
        <el-progress  color="gray" style="width: 80%;margin: 0 auto" :percentage="0" :stroke-width="15" :text-inside="true" ></el-progress>
        <div style="float: left;margin-left: 25px;margin-top: 6px">对比度</div>
        <el-progress  color="gray" style="width: 80%;margin: 0 auto" :percentage="0" :stroke-width="15" :text-inside="true" ></el-progress>
        <el-button  style=" width: 80%;margin: 10px auto 0">标签</el-button>
        <el-card class="box-card" ref="box_card">
              <div v-for="(item,index) in labelContent" :key="index">
                {{item}}
              </div>
        </el-card>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import AILabel from "ailabel";
import html2canvas from "html2canvas";
let index = 0;
export default {
  name: "Detection-Mark",
  data() {
    return {
      url: "",
      gMap: "",
      gFirstFeatureLayer: "",
      mode: "",
      fileList: [],
      imgSrc: [],
      currentSrc: "",
      href: "",
      downloadName: "tp.jpg",
      dialogVisible: false,
      options: [
        {
          value: "气孔",
          label: "气孔",
        },
        {
          value: "夹渣",
          label: "夹渣",
        },
        {
          value: "焊瘤",
          label: "焊瘤",
        },
        {
          value: "裂纹",
          label: "裂纹",
        },
        {
          value: "咬边",
          label: "咬边",
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
          value: "烧穿",
          label: "烧穿",
        },
        {
          value: "焊缝",
          label: "焊缝",
        },
        {
          value: "成形不良",
          label: "成形不良",
        },
        {
          value: "内凹",
          label: "内凹",
        },
        {
          value: "异物",
          label: "异物",
        },
        {
          value: "伪缺陷",
          label: "伪缺陷",
        },
      ],
      value: "",
      labelContent:[],
      text:'',
      str:''
    };
  },
  watch: {
    mode(mode) {
      console.log("变化了", mode);
      this.gMap.setMode(mode);
      this.setDrawingStyle(mode);
    },
  },
  methods: {
    //将弹出框选择的类型转换为数字
    handleType(type){
        switch (type) {
          case '气孔':
            return 0;
          case '夹渣':
            return 1;
          case '焊瘤':
            return 2;
          case '裂纹':
            return 3;
          case '咬边':
            return 4;
          case '未熔合':
            return 5;
          case '未焊透':
            return 6;
          case '烧穿':
            return 7;
          case '焊缝':
            return 8;
          case '成形不良':
            return 9;
          case '内凹':
            return 10;
          case '异物':
            return 11;
          case '伪缺陷':
            return 12;
        }
    },
    //标注之后对话框的确认按钮
    sureDialog(){
      this.dialogVisible = false
      this.text=this.text + this.handleType(this.value)+this.str+'\n'
      this.str=''
      console.log(this.text);
      this.labelContent.push(this.value)
    },
    //标注之后对话框的取消按钮
    cancelDialog(){
      this.dialogVisible = false
    },

    //保存图片  使用html2canvas
    generateShareImage() {
      const canvas = document.createElement("canvas");
      let canvasBox = document.getElementById("mask_imgDetail");
      const width = canvasBox.offsetWidth;
      const height = canvasBox.offsetHeight;
      canvas.width = width * 1.5;
      canvas.height = height * 1.5;
      // 生成页面模糊时，可以放大一定倍数，通过调整canvas的宽高使其清晰度增加
      // const context = canvas.getContext("2d");
      // context.scale(1.5, 1.5);
      const options = {
        backgroundColor: null,
        canvas: canvas,
        useCORS: true,
      };
      html2canvas(canvasBox, options).then((canvas) => {
        let dataURL = canvas.toDataURL("image/png");
        //下载
        this.downloadImage(dataURL);
      });
    },
    downloadImage(url) {
      let link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "截图.png");
      link.click();
    },
    //下载txt文件
    download_txt(filename, text){
        let pom = document.createElement('a');
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        pom.setAttribute('download', filename);
        if (document.createEvent) {
          let event = document.createEvent('MouseEvents');
          event.initEvent('click', true, true);
          pom.dispatchEvent(event);
        } else {
          pom.click();
        }

    },

    //保存图片按钮
    saveImg() {
      this.download_txt('result',this.text)
      this.text=''
      // this.generateShareImage();
      this.imgSrc = this.imgSrc.filter((item) => {
        return item != this.currentSrc;
      });
      if (index === this.imgSrc.length) {
        index = 0;
        this.currentSrc = this.imgSrc[index];
        index++;
      } else {
        this.currentSrc = this.imgSrc[index + 1];
        index++;
      }
      this.labelContent=[]
      this.gMap && this.gMap.destroy();
      this.initMask();
      this.gMap.refresh();
    },
    //上一张图片或者下一张图片
    switchPage(type) {
      this.labelContent=[]
      if (type == "last") {
        console.log("last");
        if (index <= 0) {
          index = this.imgSrc.length - 1;
        } else {
          index--;
        }
        this.currentSrc = this.imgSrc[index];
        this.gMap && this.gMap.destroy();
        this.initMask();
      } else {
        console.log("next");
        if (index >= this.imgSrc.length - 1) {
          index = 0;
        } else {
          index++;
        }
        this.currentSrc = this.imgSrc[index];
        this.gMap && this.gMap.destroy();
        this.initMask();
      }
    },
    //删除标注
    deIcon() {
      // this.gMap.markerLayer.removeAllMarkers();
      this.gFirstFeatureLayer.removeAllFeatures();
      this.labelContent=[]
      // this.gMap.removeAllLayers()
    },
    //上传文件
    handleFiles() {
      this.fileList = this.$refs.inputFile.files;


      //获取图片宽高
      // let imgSrc = window.URL.createObjectURL(this.fileList[0]);
      // let img = new Image();
      // img.src = imgSrc;
      // // let this_ = this; // onload 里面不能用this
      // // let type = this.formData.iconFile.type.split('/')[1];
      // img.onload = function () {
      //   // 我在这里就可以获取到图片的宽度和高度了 img.width 、img.height
      //   console.log('width:' + img.width + ' height:' + img.height);
      //   if ((img.width === 192) && (img.height === 192) ) {
      //     // this_.$Message.success({content: '真棒！！！'})
      //     console.log('上传成功');
      //     // todo
      //   } else {
      //     console.log('xia mian');
      //     // this_.$Message.error({content: '选的啥玩意！'})
      //   }
      // };




      let that = this;
      for (let i = 0; i < this.fileList.length; i++) {
        (function (i) {
          let reader = new FileReader();
          reader.readAsDataURL(that.fileList[i]);
          reader.onload = function () {
            // that.imgSrc[i] = reader.result;
            that.imgSrc.push(reader.result);
          };
        })(i);
      }
      // console.log(this.imgSrc[0]);
      setTimeout(() => {
        this.currentSrc = this.imgSrc[0];
        this.gMap && this.gMap.destroy();
        this.initMask();
      }, 400);
    },
    setMode(mode) {
      this.mode = mode;
      console.log(mode);
      this.setDrawingStyle(mode);
    },
    //获取所有数据
    getFeatures() {
      const allFeatures = this.gFirstFeatureLayer.getAllFeatures();
      console.log("--allFeatures--", allFeatures);
    },
    //初始化样式
    setDrawingStyle(mode) {
      let drawingStyle = {};
      switch (mode) {
        case "PAN": {
          break;
        }
        case "RECT": {
          this.drawingStyle = { strokeStyle: "#1aff00", lineWidth: 1 };
          this.gMap.setDrawingStyle(drawingStyle);
          break;
        }
        default:
          break;
      }
    },
    //添加图形
    addFeature(data, type, name) {
      let that = this;
      let drawingStyle = this.drawingStyle;
      if (type === "RECT") {
        const rectFeature = new AILabel.Feature.Rect(
          `${+new Date()}`, // id
          data, // shape
          { name }, // props
          drawingStyle // style
        );
        that.gFirstFeatureLayer.addFeature(rectFeature);
      }
    },
    //保留小数点后两位
    handleFloat(num){
      return parseFloat(num).toFixed(2)
    },
    //添加事件
    addEvents() {
      let that = this;
      let gMap = this.gMap;
      gMap.events.on("drawDone", (type, data) => {
        console.log("--type, data--", type, data);
        that.dialogVisible = true
        // this.text=this.value
        this.str= ` ${this.handleFloat(data.x)} ${this.handleFloat(data.y)} ${ this.handleFloat(data.x+data.width)} ${this.handleFloat(data.y + data.height)}`
        // thstr
        // console.log('text ',this.text);
        that.addFeature(data, type);
      });
      gMap.events.on("mouseOver", () => {
        gMap.setMode("RECT");
        console.log("gmap");
      });
    },
    //初始化数据标注
    initMask() {
      const gMap = new AILabel.Map("map", {
        center: { x: 150, y: 70 }, // 为了让图片居中
        zoom: 360,
        // size:{
        //   width:100,
        //   height:100
        // },
        mode: "PAN", // 绘制线段
        // refreshDelayWhenZooming: true, // 缩放时是否允许刷新延时，性能更优
        // zoomWhenDrawing: true,
        // panWhenDrawing: true,
        // zoomWheelRatio: 5, // 控制滑轮缩放缩率[0, 10), 值越小，则缩放越快，反之越慢
        // withHotKeys: true // 关闭快捷键
      });
      this.gMap = gMap;
      this.addEvents();
      let that = this;
      const gFirstImageLayer = new AILabel.Layer.Image(
        "first-layer-image",
        {
          src: that.currentSrc,
          width: 388,
          height: 100,
          crossOrigin: false,
          position: {
            x: 0,
            y: 0,
          },
          grid: {
            // 3 * 3
            columns: [{ color: "#9370DB" }, { color: "#FF6347" }],
            rows: [{ color: "#9370DB" }, { color: "#FF6347" }],
          },
        },
        { name: "第一个图片图层" }, // props
        { zIndex: 5 } // style
      );
      gMap.addLayer(gFirstImageLayer);
      const gFirstFeatureLayer = new AILabel.Layer.Feature(
        "first-layer-feature", // id
        { name: "第一个矢量图层" }, // props
        { zIndex: 10 } // style
      );
      this.gFirstFeatureLayer = gFirstFeatureLayer;
      gMap.addLayer(gFirstFeatureLayer);
      window.onresize = function () {
        gMap && gMap.resize();
      };
    },
  },

  mounted() {
    this.initMask();
  },
};
</script>

<style scoped>
.el-main {
  /*background-color: #42b983;*/
}
.el-button {
  margin-left: 15px;
}
.upload_button {
  background-color: deepskyblue;
  display: block;
  border-radius: 5px;
  width: 80%;
  /*margin: 10px auto;*/
  /*margin: 50px auto 0;*/
  margin-top: 50px;
  margin-left: 28px;
  height: 40px;
  line-height: 40px;
}
#map {
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  height: 100%;
  width: 100%;
  border: 1px dashed black;
  /*background-color: #333333;*/
}
.mark {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
#mask_imgDetail {
  width: 100%;
  height: 100%;
  /*background-color: red;*/
  overflow: hidden;
  margin: 0 auto;
}
#mask_imgDetail div {
  width: 100%;
  height: 100%;
  /*background-color: #42b983;*/
}
/*#main-wrapper-1{*/
/*  width: 90%;*/
/*  height: 90%;*/
/*  background-color: #42b983;*/
/*}*/
.box-card {
  width: 80%;
  margin: 0 auto;
  height: 60%;
  overflow: scroll;
  margin: 10px auto 10px;
  /*background-color: red;*/
}
</style>
