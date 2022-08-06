<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar
      class="navbar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 用户信息 -->
    <!-- input:file的属性 -->
    <!-- accept：显示file选择的文件后缀名，hidden：自动隐藏input：file -->
    <!-- el.clcick -->
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image round width="0.8rem" height="0.8rem" :src="userInfo.photo" />
      <input
        type="file"
        hidden
        accept=".png,jfif"
        ref="file"
        @change="selectPhoto"
    /></van-cell>
    <!-- 弹出层 -->
    <van-popup
      v-model="isShowAvator"
      closeable
      :style="{ height: '100%', width: '100%' }"
    >
      <update-avator :photo="photo" v-if="isShowAvator" @update-avatr="userInfo.photo=$event"></update-avator>
    </van-popup>
  </div>
</template>

<script>
import { getUserInfo } from '@/api'
import updateAvator from './components/updateAvator'
import { resolveToBase64 } from '@/utils'
export default {
  name: 'User',
  components: {
    updateAvator
  },
  created() {
    this.getUserInfo()
  },
  data() {
    return {
      userInfo: [],
      isShowAvator: false,
      photo: ''
    }
  },
  methods: {
    async getUserInfo() {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (error) {
        this.$toast.fail('获取失败，请刷新')
      }
    },
    async selectPhoto(e) {
      //1获取用户选择得图片的文件对象
      //e.target 触发事件元素

      console.dir(e.target)
      const file = e.target.files[0]
      // // const url = window.URL.createObjectURL(file)
      // const fr = new FileReader()
      // fr.readAsDataURL(file)
      // fr.onload = (e) => {
      //   this.photo = e.target.result
      //   //清空value，让用户可以选择同一张图片
      //   e.target.value = ''
      //   this.isShowAvator = true
      // }
      const url = await resolveToBase64(file)
      this.photo = url
      //清空value，让用户可以选择同一张图片
      e.target.value = ''
      //展示弹层组件
      this.isShowAvator = true
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.navbar) {
  background-color: #3296fa;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.van-popup {
  background-color: #000;
}
</style>
