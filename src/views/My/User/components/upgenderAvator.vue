<template>
  <div>
    <van-picker
      title="改变性别"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import { alterAvator } from '@/api'

export default {
  data() {
    return {
      columns: ['男', '女']
    }
  },
  methods: {
    async onConfirm(value, index) {
      try {
        console.log(value)
        console.log(index)
        const { data } = await alterAvator({ gender: index })
        console.log(data)
        this.$parent.$parent.getUserInfo()
        this.$parent.$parent.showsss = false
      } catch (error) {}
    },
    onCancel() {
      //  Toast('取消');
      this.$parent.$parent.showsss = false
    }
  }
}
</script>

<style scoped lang="less">
:deep(.van-picker__frame) {
  top: 20%;
}
:deep(.van-picker-column__wrapper) {
  margin-top: -150px;
}
</style>
