import template from '../control/templateControl'
import $ from 'jquery'


export default class Message {
  constructor(msg = "未知错误") {
    this.msg = msg
    this.wrap = $('.blog-message')//显示错误的容器
  }

  success () {
    this.html('success')
  }

  info () {
    this.html('info')
  }

  warning () {
    this.html('warning')
  }

  danger () {
    this.html('danger')
  }

  html (type) {
    this.render(template.render('message', { type, msg: this.msg }))
  }
  /**
   * @description: 在传入容器中显示提示,并且3秒中后删除显示的提示元素
   * @param {ele} 传入的元素
   */
  render (ele) {
    let wrap = this.wrap
    wrap.append($(ele)).children().addClass('show move').delay(3000).queue(function (next) {
      $(this).remove()
      next()
    })
  }

}


