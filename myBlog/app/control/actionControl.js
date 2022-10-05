import Modal from './modalControl'
import Validate from '../module/validate'
import Http from '../module/http'
import Router from './routeControl'
import $ from 'jquery'
import Message from '../module/message'
/**
 * @description: 
 */
const RES_HANDLE = {
  putUserInfo () {
    new Message('修改成功').success()
    Router.go('/index', { routeName: 'index' })
  },
  register () {
    this.index()
  },
  login () {
    this.index()
  },
  postColumn () {
    Router.reload('/columns', { routeName: 'columns' })
  },
  index () {
    Router.go('/index', { routeName: 'index', isLogin: true })
  }
}

/**
 * @description: 清除from中各个input的错误信息
 */
function cleanErrMsg (form) {
  //获取form下所有类名为 blog-error--input 错误p标签
  let errorInput = $(form).find('.blog-error--input')
  if (errorInput.length === 0) {
    return false
  }
  errorInput.removeClass('blog-error--input')[0].dataset['msg'] = ''
}

export default class Action {
  constructor() {
    this.init()
    this.modalAgency()
    this.formAgency()
    this.routeAgency()
    this.columnsAgency()
    this.searchAgency()
  }
  /**
   * @description: 初始化初始路由
   */
  init () {
    Router.go('/index', { routeName: 'index' })
  }

  //搜索处理
  /*
    search 
      1. 实时搜索
        input 
      2. 回车搜索
        1. input聚焦的时候 给绑定一次 回车监听
        2. input失焦的时候 解绑 回车监听
  
  */
  searchAgency () {
    //文章搜索,失焦
    function routeSearch (target) {
      let val = $(target).val()
      if (val) {
        let routeName = $(target).data('input')//搜索文章的,articles
        Router.reload(`/${routeName}`, {
          routeName, search: val
        })
      }
      $(target).val('').trigger('blur')
    }
    //回车搜索
    function getSearchValue (e) {
      if (e.keyCode === 13) {
        routeSearch(e.target)
      }
    }
    //搜索行为 点击 回车(input框)
    $(document).on('focus', '[data-input]', (e) => {
      let $inputTarget = $(e.target)
      $inputTarget.on('keyup', getSearchValue)
    })
    //失焦 去掉绑定事件
    $(document).on('blur', '[data-input]', (e) => {
      let $inputTarget = $(e.target)
      $inputTarget.off('keyup', getSearchValue)
    })
    //点击提交按钮
    $(document).on('click', '[data-submit]', (e) => {
      let $target = $(e.target)
      let submitType = $target.data('submit')//articles
      let $input = $(`[data-input=${submitType}]`)//回到那个input,articles框(输入文本在input框内)
      routeSearch($input)
    })
  }

  /**
   * @description: 监听可以弹出模态框的地方,点击渲染对应的弹出框
   */
  //modal
  modalAgency () {
    //监听所有的 [data-modal] 元素的 click 渲染唤起对应modal 如login,postColumn
    $(document).on('click', '[data-modal]', (e) => {
      let $target = $(e.target)
      let modalType = $target.data('modal')
      //防止模板渲染时 data-modal属性 没有值
      if (!modalType) {
        return false
      }
      //modal属性挂载 Modal实例
      this.modal = new Modal({ modalType })
      this.modal.render()
    })

    //监听modal上的 button
    $(document).on('click', 'button[data-modal-btn]', (e) => {
      let $target = $(e.target)
      let btnType = $target.data('modal-btn')
      // confirm close 
      if (this.modal && btnType) {
        //调用modal 对应行为
        this.modal[btnType]()
      }
    })
  }

  /**
   * @description: 初始化表格,绑定一些事件
   */
  formAgency () {
  /**
   * @description: 表格提交
   */
    $(document).on('submit', 'form', async (e) => {
      let $target = $(e.target)//form(返回的是节点数组)
      let formType = $target[0].id//获取form的id(例如:login,一共3)
      cleanErrMsg($target)
      //表单校验 如果校验成功 返回表单数据
      try {
        let formData = await new Validate(formType)
        //调用 Http发送请求 
        console.log(formType)
        let result = await Http({ type: formType, data: formData })
        //如果请求回调成功 执行handle句柄
        if (formType in RES_HANDLE) {
          RES_HANDLE[formType](result)
        }
        //如果存在modal 关闭modal
        this.modal && this.modal.close()
      } catch (err) {
        console.log(err)
      }
    })
  }
  /**
   * @description: 初始化路由
   */  
  routeAgency () {
    $(document).on('click', 'a[data-router]', function (e) {
      let $target = $(this)
      let routeName = $target.data('router')
      let articleID = $target.data('article-id')
      let columnID = $target.data('column-id')
      Router.go(`/${routeName}`, { routeName: routeName, articleID, columnID })
    })
  }
  /**
   * @description: 
   */
  columnsAgency () {
    $(document).on('click', 'li[data-column]', function (e) {
      $(this).addClass('selected').siblings('li').removeClass('selected')
    })
  }
}

