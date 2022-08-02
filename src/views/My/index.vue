<template>
  <div>
    <!-- 头部 -->
    <header>
      <div class="login" v-if="isLogin">登陆后的盒子</div>
      <div class="loginout" v-else>未登陆后的盒子</div>
    </header>
    <main>收藏/历史/消息通知/小智同学</main>
    <footer>
      <button v-if="isLogin" @click="logout">退出</button>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    logout() {
      //清除token
      this.$store.commit('SET_TOKEN', {})
    }
  }
}
</script>

<style></style>
