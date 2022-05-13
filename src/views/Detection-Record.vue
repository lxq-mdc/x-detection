<template>
  <div>
    <el-header>
      <el-date-picker
        style="float: left"
        v-model="value1"
        type="date"
        @change="selectByData"
        placeholder="选择日期"
      >
      </el-date-picker>
    </el-header>
    <el-row>
      <el-col :span="10"
        ><div class="grid-content bg-purple">
          <el-table
            :data="
              tableData.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
              )
            "
            style="width: 100%"
            @row-click="handleData"
          >
            <el-table-column prop="id" label="序号" width="120">
            </el-table-column>
            <el-table-column prop="projectName" label="项目名称" width="120">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="120">
            </el-table-column>
            <el-table-column label="操作"  width="120">
              <template   slot-scope="scope">
                <router-link :to="{
                  path:'/detection/detail',
                  query:{
                    obj:scope.row,
                    name:'asd'
                  }
                }" >
                  <el-button
                    size="mini"
                    align="center"

                  >详情</el-button>

                </router-link>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            align="center"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[7, 5, 10, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length"
          >
          </el-pagination></div
      ></el-col>
      <el-col :span="7">
        <div
          class="above"
          style="width: 400px; height: 400px"
          ref="above"
        ></div>
      </el-col>
      <el-col :span="7">
        <div
          class="under"
          ref="under"
          style="width: 400px; height: 400px;"
        ></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { getItems } from "@/service";
import dayjs from "dayjs";
export default {
  name: "Detection-Record",
  data() {
    return {
      value1: "",
      value2: "",
      tableData: [],
      tableDataCopy: [],
      barXAxis:[],
      baryAxis:[],
      barOption: {
        xAxis: {
          type: "category",
          data: [],
          axisTick: { alignWithLabel: true }
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data:[],
            type: "bar",
          },
        ],
      },
      pieData:[],
      pieOption: {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "0%",
          left: "center",
        },
        series: [
          {
            name: "饼图",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            // emphasis: {
            //   label: {
            //     show: true,
            //     fontSize: '40',
            //     fontWeight: 'bold'
            //   }
            // },
            labelLine: {
              show: false,
            },
            data:this.pieData
          },
        ],
      },
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 7, // 每页的数据条数
    };
  },
  methods: {
    //跳转到详情页
    // toDetailPage(params){
    //   console.log('asd',params)
    // },
    //缺陷类型转换
    typeCasting(key){
      switch (key) {
        case 'stomaCount':
          return '气孔数量';
        case 'dregsCount':
          return '夹渣数量';
        case 'tumorCount':
          return '焊瘤数量';
        case 'crackCount':
          return '裂纹数量';
        case 'biteCount':
          return '咬边数量';
        case 'nosolvedCount':
          return '未熔合数量';
        case 'noweldedCount':
          return '未焊透数量';
        case 'burnCount':
          return '烧穿数量';
        case 'weldingCount':
          return '焊缝数量';
        case 'poorformCount':
          return '形成不良数量';
        case 'concaveCount':
          return '内凹数量';
        case 'fakedefectCount':
          return '伪缺陷数量';
      }
    },
    handleData(row){
      console.log('row',row);
      let sum={
        "stomaCount": 0,
        "dregsCount": 0,
        "tumorCount": 0,
        "crackCount": 0,
        "biteCount": 0,
        "nosolvedCount": 0,
        "noweldedCount": 0,
        "burnCount": 0,
        "weldingCount": 0,
        "poorformCount": 0,
        "concaveCount": 0,
        "foreignbodyCount": 0,
        "fakedefectCount": 0
      }
      for (let i = 0; i < row.images.length; i++) {
        let {stomaCount,dregsCount,tumorCount,crackCount,biteCount,nosolvedCount,noweldedCount,burnCount,weldingCount,poorformCount,concaveCount,foreignbodyCount,fakedefectCount} = row.images[i]
        let count=stomaCount+dregsCount+tumorCount+crackCount+biteCount+nosolvedCount+noweldedCount+burnCount+weldingCount+poorformCount+concaveCount+foreignbodyCount+fakedefectCount
        for (let imageKey in row.images[i]) {
          // eslint-disable-next-line no-prototype-builtins
            if(sum.hasOwnProperty(imageKey)){
              sum[imageKey] +=row.images[i][imageKey]
            }
        }
        this.barXAxis.push(row.images[i].uploadName.slice(9,15))
        // this.barXAxis.push(row.images[i].uploadName)
        this.baryAxis.push(count)
      }
      for (let sumKey in sum) {
        let obj={}
          obj.name=this.typeCasting(sumKey)
        obj.value=sum[sumKey]
        this.pieData.push(obj)
      }
      console.log(this.barXAxis);
      this.barOption.xAxis.data=this.barXAxis
      this.barOption.series[0].data=this.baryAxis
      this.pieOption.series[0].data=this.pieData
      this.pieData=[]
      // console.log(this.pieOption.series);
      this.visualPage()
    },
    //可视化界面初始化
    visualPage(){
      this.barXAxis=[]
      this.baryAxis=[]
      let myChartBar = echarts.init(this.$refs.above);
      let myChartPie = echarts.init(this.$refs.under);
      setTimeout(()=>{
        this.barOption && myChartBar.setOption(this.barOption);
        this.pieOption && myChartPie.setOption(this.pieOption);
      },100)
    },
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    selectByData() {
      this.tableData = this.tableDataCopy;
      let newTableData = this.tableData.filter(
        (item) =>
          item.createTime === this.timeFormater(this.value1).slice(0, 11)
      );
      this.tableData = newTableData;
    },
    //对时间格式化
    // str='YYYY年MM月DD日 HH:mm:ss'
    timeFormater(value, str = "YYYY年MM月DD日") {
      return dayjs(value).format(str);
    },
    //获取所有项目列表
    async getAllItems() {
      let result = await getItems();
      if (result.success) {
        for (let i = 0; i < result.data.length; i++) {
          result.data[i].createTime = this.timeFormater(
            result.data[i].createTime
          );
        }
        this.tableData = result.data;
        this.tableDataCopy = result.data;
      } else {
        this.$message({
          message: "警告哦，这是一条警告消息",
          type: "warning",
        });
      }
    },
  },
  mounted() {
    console.log("mounted",this.tableData);
    this.getAllItems();
    this.visualPage()
  },
};
</script>

<style scoped>
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
</style>
