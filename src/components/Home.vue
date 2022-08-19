<template>
  <el-container style="height: 100%">
    <el-header>
      <div>
        <img src="../assets/heima.png" alt="" />
        <span>后台管理系统</span>
      </div>
      <el-button @click="loginOut">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollase">|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EEf"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/' + subItem.path)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: 'home-view',
  data() {
    return {
      // 左侧菜单数据
      menuList: [],
      // 一级菜单图标
      iconsObj: {
        125: 'iconfont icon-user',
      },
      // 是否折叠
      isCollapse: false,
      //
      activePath: '',
    }
  },
  created() {
    this._getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  computed: {},
  methods: {
    // 退出按钮
    loginOut() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async _getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.data.msg)
      this.menuList = res.data
      console.log(this.menuList)
    },
    // 菜单栏的折叠和展开
    toggleCollase() {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState(data) {
      window.sessionStorage.setItem('activePath', data)
      this.activePath = data
    },
  },
  components: {},
}
</script>
<style lang="less" scoped>
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: 0;
  }
}
.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
