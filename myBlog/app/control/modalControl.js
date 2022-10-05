import modalMap from '../config/modal.config'
import Template from './templateControl'
import $ from 'jquery'

export default class Modal {
  constructor({ modalWarp = $('.blog-modal'), modalType }) {
    //渲染hbs方法
    this.data = {}
    this.wrap = modalWarp
    this.modalType = modalType
    this.html = ''
  }
  //数据渲染
  render () {
    let data = modalMap[this.modalType]
    this.html = Template.render('modal', data)//调用template中渲染方法传入固定模板参数和数据
    this.draw()
  }

  //渲染
  draw () {
    this.clean()
    this.wrap.removeAttr('hidden')
    this.wrap.html(this.html).show()//针对.hide
    this.drawCallback && this.drawCallback(this.modalType)
  }
  //清空
  clean () {
    this.wrap.html('')
  }
  //关闭,相当于隐藏
  close () {
    this.wrap.hide()//隐藏
    this.wrap.attr('hidden', true)
  }
  //提交
  confirm () {
  }

}