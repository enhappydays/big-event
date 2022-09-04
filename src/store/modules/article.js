import { reqGetArtCateList } from '@/api/article'

export default {
  // 开启命名空间
  namespaced: true,
  state () {
    return {
      // 文章分类的列表数据
      cateList: []
    }
  },
  mutations: {
    // 设置分类列表数据
    setCateList (state, list) {
      state.cateList = list
    }
  },
  actions: {
    // 初始化文章分类
    async getCateList (ctx) {
      const res = await reqGetArtCateList()
      if (res.code === 0) {
        ctx.commit('setCateList', res.data)
      }
    }
  },
  getters: {}
}
