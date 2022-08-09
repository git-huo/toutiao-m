<template>
  <div>
    <van-cell
      v-for="item in toSearchText"
      :key="item.art_id"
      :value="item.title"
    />
  </div>
</template>

<script>
import { getSearchAPI } from '@/api'

export default {
  data() {
    return {
      toSearchText: [],
      searchList: JSON.parse(localStorage.getItem('SEARCHhLIST')) || []
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  created() {
    this.getSearchAPI()
  },
  methods: {
    async getSearchAPI() {
      const { data } = await getSearchAPI(this.keywords)
      this.toSearchText = data.data.results
      console.log(this.toSearchText)
      // localStorage.setItem('SEARCHhLIST', JSON.stringify(this.list))
      if (this.keywords !== 0) {
        this.searchList.push(this.keywords)
        this.searchList = this.unique(this.searchList) //调用unique方法去重
        this.list = []
        for (let i = this.searchList.length; i > 0; i--) {
          this.list.push(this.searchList[i - 1])
        }
        localStorage.setItem('SEARCHhLIST', JSON.stringify(this.list))
      }
    },
    unique(arr) {
      return arr.filter(function (item, index, arr) {
        return arr.indexOf(item, 0) === index
      })
    }
  }
}
</script>

<style></style>
