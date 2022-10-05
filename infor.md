<!--
 * @description: 
 * @param: 
 * @return: 
 * @Date: 2022-07-27 14:11:02
-->
/*
      运行 compile-styl 自动监听编译styl文件夹下的第一级styl文件 生成css文件到css文件夹下

      styl 内引入其他styl 跟css导入一样 @import 路径
    
    */

    /*
      ES6模块化引入和使用
      
      模块导出 export [default a | {a,b,c}]

      模块导入 import 承接变量名 | {变量名} from 模块路径

      html引入模块 

      <script type="module" src="模块路径">
    
    */
    /*
      运行execHbs脚本 
      把template文件夹内的 hbs文件 生成 渲染js文件到 views文件夹

      需要用到对应模板的页面引入 handlebars.runtime.js 编译好的js文件

      Handlebars.templates['编译前的hbs文件名.hbs'] => return 编译函数
      编译函数({数据}) => return 数据插入编译生成html代码
    // var template = Handlebars.templates['test.hbs'];
    // console.log(template({ name: 'hahahha' }))
    */
    //jquery 方式唤起模态框
    // $('#b-modal').modal('show')
    //modal 展示完成后回调 事件

    /*  
        show.bs.modal 调用show后触发
        shown.bs.modal 加载完成可见后触发
        hide.bs.modal 调用hide隐藏的时候触发
        hidden.bs.modal 完全隐藏后触发
        loaded.bs.modal	从远端的数据源加载完数据之后触发该事件。
    
    */
