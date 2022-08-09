<template>
  <div>
    <van-nav-bar
      title="更改昵称"
      left-text="取消"
      right-text="保存"
      left-arrow
      @click-left="$parent.$parent.showss = false"
      @click-right="alterAvator"
    />
    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="13"
      placeholder="请输入新的昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import { alterAvator } from '@/api'
export default {
  data() {
    return {
      message: ''
    }
  },
  methods: {
    async alterAvator() {
      await alterAvator({ name: this.message })
      this.$parent.$parent.getUserInfo()
      this.$parent.$parent.showss = false
    }
  }
}
</script>

<style></style>
