<template>
  <div>
    <van-cell value="搜索历史" v-if="isShow">
      <template #right-icon>
        <van-icon name="delete-o" @click="isShow = false" />
      </template>
    </van-cell>
    <van-cell v-else>
      <template #title>
        <div>搜索历史</div>
      </template>
      <template #default>
        <span @click="delAllsearch">全部删除</span>
        <span @click="isShow = true" class="spanshow">完成</span>
      </template>
    </van-cell>
    <van-cell :value="item" v-for="(item, index) in datalist" :key="index">
      <template #right-icon>
        <van-icon
          name="close"
          v-if="(isShows = !isShow)"
          @click="delSearch(index)"
        />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: true,
      datalist: [],
      isShows: false
    }
  },
  created() {
    this.getsearchlist()
  },
  methods: {
    getsearchlist() {
      if (localStorage.getItem('SEARCHhLIST')) {
        const str = JSON.parse(localStorage.getItem('SEARCHhLIST'))
        this.datalist = str
        console.log(this.datalist)
      }
    },
    delSearch(index) {
      this.datalist.splice(index, 1)
      // localStorage.removeItem(index)
      localStorage.setItem('SEARCHhLIST', JSON.stringify(this.datalist))
    },
    delAllsearch() {
      console.log(this.localStorage)
      localStorage.clear()
    }
  }
}
</script>

<style scoped lang="less">
.spanshow {
  margin-left: 15px;
}
</style>
