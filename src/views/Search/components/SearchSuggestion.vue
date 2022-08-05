<template>
  <div>
    <van-cell
      v-for="(item, index) in highlightSuggestions"
      :key="index"
      icon="search"
    >
      <template #title>
        <span v-html="item"> </span>
      </template>
    </van-cell>
  </div>
</template>
<script>
import { getSearchSuggestionAPI } from '@/api'
import { debounce } from 'lodash'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  computed: {
    highlightSuggestions() {
      //map：映射，返回一个新数组，新数组与原来长度一样
      const red = new RegExp(this.keywords, 'ig')

      return this.suggestions.map((item) =>
        item.replace(
          red,
          (match) => `<span style='color:red' > ${match}</span>`
        )
      )
    }
  },
  methods: {
    //获取搜索建议
    //防抖
    //1延缓执行
    //2干掉上一次定时器
    //clearTimeout(id)
    getSearchSuggestion: debounce(async function () {
      try {
        const { data } = await getSearchSuggestionAPI(this.keywords)
        console.log(data)
        //Boolean()是一个函数，返回值：为真返回true 为假返回false
        this.suggestions = data.data.options.filter(Boolean)
      } catch (error) {
        this.$toast.fail('搜索失败')
      }
    }, 300)
  },
  watch: {
    keywords: {
      immediate: true,
      handler() {
        this.getSearchSuggestion()
      }
    }
  }
}
</script>

<style></style>
