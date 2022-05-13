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
          <el-menu-item index="5" style="float: right;margin-top: 20px"> 登录 </el-menu-item>
        </router-link>
        <router-link to="/detection">
          <el-menu-item index="4" style="float: right;margin-top: 20px">
            检测工作台
          </el-menu-item>
        </router-link>
        <router-link to="/case">
          <el-menu-item index="3" style="float: right;margin-top: 20px">成功案例 </el-menu-item>
        </router-link>
        <router-link to="/about_us">
          <el-menu-item index="2" style="float: right;margin-top: 20px">关于我们 </el-menu-item>
        </router-link>
        <router-link to="/home">
          <el-menu-item index="1" style="float: right;margin-top: 20px">首页 </el-menu-item>
        </router-link>
        <el-menu-item index="6" style="float: left;font-size: 30px;margin-left: 30px">X-detection</el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <el-aside width="300px" >
        <img src="../assets/log.jpg" class="logo"/>
      </el-aside>
      <el-main>
        <el-carousel trigger="click" height="300px" class="carousel">
          <el-carousel-item>
           <img src="../assets/1.jpg">
          </el-carousel-item>
          <el-carousel-item>
            <img src="../assets/3.jpg">
          </el-carousel-item>
          <el-carousel-item>
            <img src="../assets/6.jpg">
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
<style >
.carousel{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin-top: 20px;

}
.logo{
  transform: translateY(50%);
  width: 50%;
}
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
  /*padding-top: 30px;*/
  /* line-height: 160px; */
}
</style>
