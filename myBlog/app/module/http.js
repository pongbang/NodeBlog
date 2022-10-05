import axios from 'axios'
import JSEncrypt from 'jsencrypt'
import store from 'store'
import Message from './message'



const BASEURL = 'http://127.0.0.1:3000'
const TIMEOUT = 3000
const pubKeyName = 'ua_publicKay'
const tokenName = "ua_jot"


const REQUEST_MAP = {
  'register': {
    url: 'admin/register',
    method: 'POST',
    rsaKey: 'password',
    setToken: true,
  },
  'getUserInfo': {
    url: '/user',
    method: 'GET',
  },
  'putUserInfo': {
    url: '/user',
    method: 'PUT',
  },
  'index': {
    url: '/index',
    method: 'GET',
    noMessage: true
  },
  'login': {
    url: 'admin/login',
    method: 'POST',
    rsaKey: 'password',
    setToken: true
  },
  'pubKey': {
    url: '/keys',
    method: 'GET'
  },
  'articles': {
    url: '/api/rest/articles',
    method: 'GET'
  },
  'columns': {
    url: '/api/rest/columns',
    method: 'GET'
  },
  'postColumn': {
    url: '/api/rest/columns',
    method: 'POST'
  },
  'postComment': {
    url: '/api/rest/comments',
    method: 'POST'
  },
  'postArticle': {
    url: '/api/rest/articles',
    method: 'POST'
  },
  'getArticleById': {
    rest: true,
    url: '/api/rest/articles/:id',
    method: 'GET'
  },
  'columns': {
    url: '/api/rest/columns',
    method: 'GET'
  },
  'uploadArticle': {
    url: '/upload/article',
    method: 'POST'
  }
}

async function encrypt (value) {
  let key = store.get(pubKeyName)
  try {
    if (!key || key === 'undefined') {
      let result = await instance.get('/keys')
      key = result.pubKey
      key = key.replace(/\. +/g, '')
      key = key.replace(/[\r\n]/g, '')
      store.set(pubKeyName, key)
    }
    let encrypt = new JSEncrypt()
    encrypt.setPublicKey(key)
    return encrypt.encrypt(value)
  } catch (err) {
    console.log(err)
  }
}

/*axios 默认值*/
axios.defaults.baseURL = BASEURL
let instance = axios.create()
//request 拦截器
instance.interceptors.request.use(async (config) => {
  let token = store.get(tokenName)
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error);
});

//response 拦截器
instance.interceptors.response.use((response) => {
  //剥离最外层
  let result = response.data
  return result?.data;
}, (error) => {
  return Promise.reject(error);
});


export default async function Http ({ type, data }) {
  if (!(type in REQUEST_MAP)) {
    throw new Error('API请求错误')
  }
  let { url, method, noMessage = false, rsaKey = false, rest = false, setToken = false } = REQUEST_MAP[type]
  try {
    method = method.toLowerCase()
    if (rest) {
      let restSymbol = url.match(/:(.*)$/)[1]
      url = url.replace(/:(.*)$/, data[restSymbol])
    }
    if (rsaKey && data[rsaKey]) {
      data[rsaKey] = await encrypt(data[rsaKey])
    }
    data = method === 'get' ? { params: data } : data
    let result = await instance[method](url, data)
    if (setToken) {
      let token = result.token;
      let uid = result.userId
      store.set('uid', uid)
      //本地存储token
      store.set(tokenName, token)
    }
    return result
  } catch (error) {
    if (error.response) {
      let message = error.response.data.message
      if (!noMessage) {
        new Message(message).danger()
      }
    }
    return Promise.reject(error);
  }
}
