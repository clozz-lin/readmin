<template>
  <div>
    <el-button @click="loginOut">退出</el-button>
  </div>
</template>
<script>
export default {
  name: 'home-view',
  data() {
    return {}
  },
  computed: {},
  methods: {
    // 退出按钮
    loginOut() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
  },
  components: {},
}
</script>
<style scoped></style>
