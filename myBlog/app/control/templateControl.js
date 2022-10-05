import head from 'hbs/head.hbs'
import user from 'hbs/user.hbs'
import modal from 'hbs/modal.hbs'//返回的是函数
import write from 'hbs/write.hbs'
import article from 'hbs/article.hbs'
import message from 'hbs/message.hbs'
import articles from 'hbs/articles.hbs'
import columns from 'hbs/columns.hbs'
import comment from 'hbs/comment.hbs'
import toolbar from 'hbs/toolbar.hbs'
import info from 'hbs/info.hbs'
import slide from 'hbs/slide.hbs'
import $ from 'jquery'

const TEMP_MAP = {
  head, user, modal, write, article, message, articles, columns, comment, toolbar, info, slide
}

export default class TemplateControl {
  constructor({
    wrap = "body", name, data
  }) {
    this.wrap = $(wrap)//模板的外部容器
    this.name = name
    this.data = data
    this.init()
  }

  init () {
    this.tempHandle = TEMP_MAP[this.name]
    this.render()
  }
  /**
   * @description: 在模板容器中渲染
   */
  render () {
    this.wrap.html(this.getHTML())
  }
  /**
   * @description: 模板函数,传参(data数据)
   * @return {string}模板字符串
   */
  getHTML () {
    return this.tempHandle(this.data)
  }
  /**
   * @description: 静态方法,获取模板字符串
   * @param {string} tempName 模板类型
   * @param {*} data 数据
   * @return {string} 模板字符串
   */
  static render (tempName, data) {
    let html = '';
    if (tempName in TEMP_MAP) {
      html = TEMP_MAP[tempName](data)
    }
    return html
  }
}