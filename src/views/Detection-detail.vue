<template>
  <div class="detail">
    <el-row >
      <el-col :span="7"
        ><div class="grid-content bg-purple">
          <el-table :data="$route.query.obj.images" @row-click="handleRowClick" style="height: 500px">
            <el-table-column prop="uploadName" label="图片名称" width="180">
            </el-table-column>
            <el-table-column prop="projectName" label="检测等级" width="180" :formatter="formatter">
            </el-table-column>
          </el-table>
        </div></el-col
      >
      <el-col :span="10">
        <div
          class="line-chart"
          style="width: 800px; height: 500px"
          ref="lineChart"
        ></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "DetectionsDetail",
  data() {
    return {
      barXAxis: [],
      baryAxis: [],
      barOption: {
        xAxis: {
          type: "category",
          data: ['气孔数量', '夹渣数量', '焊瘤数量', '裂纹数量', '咬边数量', '未熔合数量', '未焊透数量', '烧穿数量', '焊缝数量', '形成不良数量', '内凹数量', undefined, '伪缺陷数量'],
          axisTick: { alignWithLabel: true },
          axisLabel: {
            interval: 0,
            rotate: 30
          }
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data:[59, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0],
            type: "bar",
          },
        ],
      },
    };
  },
  methods: {
    formatter(val) {
      // const {biteCount,burnCount,concaveCount,crackCount,gregsCount,fakedefectCount,nosolvedCount,noweldedCount,poorformCount,stomaCount,tumorCount,weldingCount}=val
      let flag=0
      for (let key in val){
        if(val[key]>0){
          flag=1
        }
      }
      if(val.crackCount || val.stomaCount ||val.dregsCount){
        return  "焊接质量三级"
      }else if(flag==0){
        return "焊接质量一级"
      }else{
        return "焊接质量二级"
      }
    },
    typeCasting(key) {
      switch (key) {
        case "stomaCount":
          return "气孔数量";
        case "dregsCount":
          return "夹渣数量";
        case "tumorCount":
          return "焊瘤数量";
        case "crackCount":
          return "裂纹数量";
        case "biteCount":
          return "咬边数量";
        case "nosolvedCount":
          return "未熔合数量";
        case "noweldedCount":
          return "未焊透数量";
        case "burnCount":
          return "烧穿数量";
        case "weldingCount":
          return "焊缝数量";
        case "poorformCount":
          return "形成不良数量";
        case "concaveCount":
          return "内凹数量";
        case "fakedefectCount":
          return "伪缺陷数量";
      }
    },
    handleRowClick(row) {
      console.log("click", row);
      for (let key in row) {
        if (key != "downUrl" && key != "uploadName" && key != "id") {
          this.barXAxis.push(this.typeCasting(key));
          this.baryAxis.push(row[key]);
        }
      }
      console.log("this.xAxis", this.barXAxis);
      console.log("this.yAxis", this.baryAxis);
      // this.barOption.xAxis.data = this.barXAxis;

      this.barOption.series[0].data = this.baryAxis;
      this.visualPage();
    },
    visualPage() {
      this.barXAxis = [];
      this.baryAxis = [];
      let myChartBar = echarts.init(this.$refs.lineChart);
      // let myChartPie = echarts.init(this.$refs.under);
      setTimeout(() => {
        this.barOption && myChartBar.setOption(this.barOption);
        // this.pieOption && myChartPie.setOption(this.pieOption);
      }, 100);
    },
  },
  mounted() {
    console.log(this.$route.query);
  },
};
</script>

<style scoped>
.line-chart {
  /*background-color: red;*/
}
.detail {
  height: 100%;
  /*background-color: red;*/
}
.grid-content {
  height: 100%;
  background-color: #fff;
}
</style>
