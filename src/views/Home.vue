<template>
  <el-container style="height: 100%" direction="vertical">
    <el-header>
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <router-link to="/login">
          <el-menu-item index="5" style="float: right"> 登录 </el-menu-item>
        </router-link>
        <router-link to="/detection">
          <el-menu-item index="4" style="float: right">
            检测工作台
          </el-menu-item>
        </router-link>
        <router-link to="/case">
          <el-menu-item index="3" style="float: right">成功案例 </el-menu-item>
        </router-link>
        <router-link to="/about_us">
          <el-menu-item index="2" style="float: right">关于我们 </el-menu-item>
        </router-link>
        <router-link to="/home">
          <el-menu-item index="1" style="float: right">首页 </el-menu-item>
        </router-link>
        <el-menu-item index="6" style="float: left">X-detection</el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <el-aside width="300px">
        <img />
      </el-aside>
      <el-main>
        <el-carousel trigger="click" height="150px">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="small">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },

  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style>
.el-header {
  padding: 0 !important;
}
.el-container {
  height: 100%;
  padding: 0;
  margin: 0;
  width: 100%;
}

a {
  text-decoration: none;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  /* line-height: 200px; */
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  /* line-height: 160px; */
}
</style>
