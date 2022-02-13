<template>
  <el-container>
    <el-header>
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <router-link to="/detection/test">
          <el-menu-item index="1" style="float: left">检测界面</el-menu-item>
        </router-link>
       <router-link to="/detection/record">
         <el-menu-item index="2" style="float: left">检测记录</el-menu-item>
       </router-link>
       <router-link to="/detection/mark">
         <el-menu-item index="3"  style="float: left">数据标注界面</el-menu-item>
       </router-link>
       <router-link to="/detection/buy">
         <el-menu-item index="4" style="float: left">服务购买</el-menu-item>
       </router-link>
      </el-menu>
    </el-header>
    <el-main >
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: "Detection",
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted() {
    this.$router.push('/detection/test')
  }
};
</script>

<style scoped>
.el-container{height:100%;padding:0;margin:0;width:100%;}

.el-main{
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>
