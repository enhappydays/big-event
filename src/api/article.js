import request from '@/utils/request.js'

// 获取文章分类列表
export const reqGetArtCateList = () => {
  return request.get('/my/cate/list')
}
// 新增文章分类列表
export const reqAddArticleCate = data => {
  return request.post('/my/cate/add', data)
}
// 删除文章分类
export const reqDelArticle = id => {
  return request.delete('/my/cate/del', {
    params: {
      id
    }
  })
}
// 根据id查询文章分类详情
export const reqGetCateInfoById = id => {
  return request.get('/my/cate/info', {
    params: {
      id
    }
  })
}
// 根据 id 更新文章分类数据
export const reqUpdataArticle = data => {
  return request.put('/my/cate/info', data)
}
