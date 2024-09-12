import request from '@/utils/request'


export function getCategoryAPI(id) {
  return request({
    url: '/Category',
    params: {
      id
    }
  })
}

export const getHotGoodsAPI = ({ id, type, limit = 3 }) => {
  return request({
    url: '/new',
    params: {
      id,
      type,
      limit
    }
  })
}
export const RandomList = () => {
  let List = {
    OldPrice: Math.floor(Math.random() * (500) + 10),
    Number1: Math.floor(Math.random() * (999 - 100 + 1) + 100),
    Number2: Math.floor(Math.random() * (999 - 100 + 1) + 100),
    Number3: Math.floor(Math.random() * (999 - 100 + 1) + 100),
    Number4: Math.floor(Math.random() * (999 - 100 + 1) + 100),
  }
  return List
}

