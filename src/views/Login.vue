<template>
  <div>
    <el-dialog title="登录页面" :visible.sync="dialogFormVisible" center>
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="on"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="backHome">取 消</el-button>
        <el-button type="primary" @click="intoDetection"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Login",
  data(){
    return {
      form: {
        name: '',
        password:''
      },
      formLabelWidth: '120px',
      dialogFormVisible: true,
    }
  },
  mounted() {
    this.dialogFormVisible = true

  },
  methods:{
    backHome(){
      this.dialogFormVisible = false
      this.$router.push({
        name:'Home'
      })
    },
    intoDetection(){
      this.dialogFormVisible = false
      this.$router.push({
        name:"detection"
      })
    }
  },

};
</script>

<style scoped></style>
