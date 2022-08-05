<template>
  <div>
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        v-model.trim="keywords"
        placeholder="请输入搜索关键词"
        background="#3296fa"
        show-action
        class="search"
        @search="onSearch"
        @focus="onSearchFocus"
        @cancel="$router.back()"
      />
    </form>
    <!-- 搜索历史/建议/结果 -->
    <!-- <search-suggestion></search-suggestion>
    <search-result></search-result>
    <search-history></search-history> -->
    <component :is="componentName" :keywords="keywords"></component>
  </div>
</template>

<script>
import SearchSuggestion from './components/SearchSuggestion'
import SearchResult from './components/SearchResult'
import SearchHistory from './components/SearchHistory'

export default {
  name: 'Search',
  components: {
    SearchSuggestion,
    SearchResult,
    SearchHistory
  },
  data() {
    return {
      keywords: '',
      //用于记录用户是否搜索
      isShowSearchResult: false
    }
  },
  computed: {
    componentName() {
      //如果输入的是空字符串，那么渲染历史
      if (this.keywords === '') {
        return 'SearchHistory'
      }

      if (this.isShowSearchResult) {
        //用变量记录是否显示搜索结果
        return 'SearchResult'
      }
      //即不显示搜索结果，也不显示搜索历史，就渲染历史建议
      return SearchSuggestion
    }
  },
  methods: {
    onSearch() {
      this.isShowSearchResult = true
    },
    onSearchFocus() {
      //如果keyword为‘’，显示搜索历史
      //如果keywords有值，显示显示建议
      this.isShowSearchResult = false
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
