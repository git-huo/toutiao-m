<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onConfirms"
      @cancel="onCancels"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { alterAvator } from '@/api'
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(this.value)
    }
  },
  methods: {
    async onConfirms() {
      const currentDate = dayjs(this.currentDate).format('YYYY - MM - D')

      const { data } = await alterAvator({ birthday: currentDate })
      console.log(data)
      this.$parent.$parent.getUserInfo()
      this.$parent.$parent.showssss = false
    },
    onCancels() {
      //  Toast('取消');
      this.$parent.$parent.showssss = false
    }
  }
}
</script>
<style></style>
