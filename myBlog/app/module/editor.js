import $ from 'jquery'
import Editor from 'wangeditor'
import store from 'store'
import Message from './message'

const pubKeyName = 'ua_publicKay'
const tokenName = "ua_jot"
const URL = 'http://127.0.0.1:3000/upload/article'


const ERROR_MAP = {
  title: '标题不能为空',
  content: '内容不能为空',
  column: '请选择分类'
}

class Edite {
  constructor(callback) {
    this.editor = null
    this.callback = callback
    this.init()
  }
  init (ele = '.blog-write--wrap') {
    this.editor = new Editor(ele)
    this.editor.config.focus = false
    this.upload()
    this.create()
  }
  upload () {
    this.editor.config.uploadImgServer = URL
    this.editor.config.uploadImgMaxSize = 5 * 1024 * 1024 // 5M
    this.editor.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp']
    this.editor.config.uploadImgMaxLength = 5
    this.editor.config.uploadFileName = 'file'
    this.editor.config.uploadImgHeaders = {
      'Authorization': `Bearer ${store.get(tokenName)}`,
    }
  }
  create () {
    this.editor.create()
    this.linsten()
  }
  linsten () {
    $('.blog-write').on('click', '.blog-write--submit', (e) => {
      e.preventDefault()
      let data = {}
      let content = this.editor.txt.html()
      let $content = $(content)
      let column = $('.blog-write--column>.selected').data('column')
      let coverURL = $content.find('img')[0]?.src
      data.title = $('#blog-write-title').val()
      data.content = content
      data.column = column;
      if (coverURL) {
        data.cover = coverURL
      }
      Object.entries(data).some(([key, value]) => {
        let isPass = !value || value.trim().length === 0
        if (isPass) {
          new Message(ERROR_MAP[key]).warning()
          data = null
        }
        return isPass
      })
      this.callback(data)
    })
  }

}

export default Edite