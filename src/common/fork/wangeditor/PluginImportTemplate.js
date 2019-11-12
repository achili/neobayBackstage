import { Notification } from 'element-ui'

/*
/导入模板
 */
export default function PluginImportTemplate (WangEditor, $) {

  // 用 createMenu 方法创建菜单
  WangEditor.createMenu(function (check) {

    // 定义菜单id，不要和其他菜单id重复。编辑器自带的所有菜单id，可通过『参数配置-自定义菜单』一节查看
    let menuId = 'importtemplate'

    // check将检查菜单配置（『参数配置-自定义菜单』一节描述）中是否该菜单id，如果没有，则忽略下面的代码。
    if (!check(menuId)) {
      return
    }

    // this 指向 editor 对象自身
    let editor = this

    // 创建 menu 对象
    let menu = new WangEditor.Menu({
      editor: editor,  // 编辑器对象
      id: menuId,  // 菜单id
      title: '使用模板', // 菜单标题

      // 正常状态和选中状态下的dom对象，样式需要自定义
      $domNormal: $('<a href="#" tabindex="-1"><i class="fa fa-window-maximize"></i></a>'),
      $domSelected: $('<a href="#" tabindex="-1" class="selected"><i class="fa fa-window-maximize"></i></a>')
    })

    // 菜单正常状态下，点击将触发该事件
    menu.clickEvent = function (e) {
      // 执行插入的命令
      let content = editor.$txt.html()
      editor.$txt[0].innerHTML = '<div id="nb-editor-template-1">\n' +
        '\n' +
        '\t<center>\n' +
        '\t\t<table\n' +
        '\t\t\tstyle="background-color: #FAFAFA;height: 100%!important;margin: 0;padding: 0;width: 100%!important;border-collapse: collapse!important;-webkit-text-size-adjust: 100%;"\n' +
        '\t\t\talign="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">\n' +
        '\t\t\t<tbody style="border-collapse: collapse!important;">\n' +
        '\t\t\t<tr>\n' +
        '\t\t\t\t<td\n' +
        '\t\t\t\t\tstyle="border-collapse: collapse!important;webkit-text-size-adjust: 100%;padding: 20px;height: 100%!important;margin: 0;width: 100%!important;"\n' +
        '\t\t\t\t\talign="center" valign="top" id="bodyCell">\n' +
        '\t\t\t\t\t<table style="border-collapse: collapse!important;width: 600px;border: 1px solid #ddd;background-color: #fff;"\n' +
        '\t\t\t\t\t       border="0" cellpadding="0" cellspacing="0" id="templateContainer">\n' +
        '\t\t\t\t\t\t<tbody>\n' +
        '\t\t\t\t\t\t<tr style="border-collapse: collapse!important;">\n' +
        '\t\t\t\t\t\t\t<td align="center" valign="top" style="border-collapse: collapse!important;">\n' +
        '\t\t\t\t\t\t\t\t<table style="border-collapse: collapse!important;" border="0" cellpadding="0" cellspacing="0"\n' +
        '\t\t\t\t\t\t\t\t       width="100%" id="templateHeader">\n' +
        '\t\t\t\t\t\t\t\t\t<tbody style="border-collapse: collapse!important;">\n' +
        '\t\t\t\t\t\t\t\t\t<tr>\n' +
        '\t\t\t\t\t\t\t\t\t\t<td\n' +
        '\t\t\t\t\t\t\t\t\t\t\tstyle="text-align:center;border-collapse: collapse!important;background-color: #f8f8f8;border-bottom: 1px solid #ddd;color: #505050;font-family: Helvetica;font-size: 20px;font-weight: 700;line-height: 100%;text-align: left;vertical-align: middle;padding: 0;"\n' +
        '\t\t\t\t\t\t\t\t\t\t\tvalign="top" class="headerContent">\n' +
        '\t\t\t\t\t\t\t\t\t\t\t<div style="border-collapse: collapse!important;">\n' +
        '\t\t\t\t\t\t\t\t\t\t\t\t<div style="font-size: 5px;height: 10px">&nbsp; &nbsp;</div>\n' +
        '\t\t\t\t\t\t\t\t\t\t\t\t&nbsp; &nbsp;<img title="零号湾" width="150" height="39"\n' +
        '\t\t\t\t\t\t\t\t\t\t\t\t                  src="https://neobay.cn/static/img/common/logo.png" id="headerImage">\n' +
        '\t\t\t\t\t\t\t\t\t\t\t\t<div style="font-size: 5px;height: 10px">&nbsp; &nbsp;</div>\n' +
        '\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
        '\n' +
        '\t\t\t\t\t\t\t\t\t\t</td>\n' +
        '\t\t\t\t\t\t\t\t\t</tr>\n' +
        '\t\t\t\t\t\t\t\t\t</tbody>\n' +
        '\t\t\t\t\t\t\t\t</table>\n' +
        '\t\t\t\t\t\t\t</td>\n' +
        '\t\t\t\t\t\t</tr>\n' +
        '\t\t\t\t\t\t<tr style="border-collapse: collapse!important;">\n' +
        '\t\t\t\t\t\t\t<td style="border-collapse: collapse!important;" align="center" valign="top">\n' +
        '\t\t\t\t\t\t\t\t<table style="border-collapse: collapse!important;background-color: #fff;" border="0" cellpadding="0"\n' +
        '\t\t\t\t\t\t\t\t       cellspacing="0" width="100%" id="templateBody">\n' +
        '\t\t\t\t\t\t\t\t\t<tbody style="border-collapse: collapse!important;">\n' +
        '\t\t\t\t\t\t\t\t\t<tr style="border-collapse: collapse!important;">\n' +
        '\t\t\t\t\t\t\t\t\t\t<td\n' +
        '\t\t\t\t\t\t\t\t\t\t\tstyle="border-collapse: collapse!important;font-family: Helvetica;line-height: 150%;text-align: left;color: #505050;font-size: 14px;padding: 35px 20px 20px 20px;"\n' +
        '\t\t\t\t\t\t\t\t\t\t\tvalign="top" class="bodyContent">\n' +
        '\t\t\t\t\t\t\t\t\t\t\t<div id="nb-editor-template-1-content">\n' +
        '\n' +
        content +
        '\n' +
        '\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
        '\t\t\t\t\t\t\t\t\t\t</td>\n' +
        '\t\t\t\t\t\t\t\t\t</tr>\n' +
        '\t\t\t\t\t\t\t\t\t<tr style="height: 0">\n' +
        '\t\t\t\t\t\t\t\t\t\t<td style="height: 0"></td>\n' +
        '\t\t\t\t\t\t\t\t\t</tr>\n' +
        '\t\t\t\t\t\t\t\t\t</tbody>\n' +
        '\t\t\t\t\t\t\t\t</table>\n' +
        '\t\t\t\t\t\t\t</td>\n' +
        '\t\t\t\t\t\t</tr>\n' +
        '\t\t\t\t\t\t<tr style="border-collapse: collapse!important;">\n' +
        '\t\t\t\t\t\t\t<td style="border-collapse: collapse!important;" align="center" valign="top">\n' +
        '\t\t\t\t\t\t\t\t<table style="border-collapse: collapse!important;" border="0" cellpadding="0" cellspacing="0"\n' +
        '\t\t\t\t\t\t\t\t       width="100%" id="templateFooter">\n' +
        '\t\t\t\t\t\t\t\t\t<tbody style="border-collapse: collapse!important;">\n' +
        '\t\t\t\t\t\t\t\t\t<tr style="border-collapse: collapse!important;">\n' +
        '\t\t\t\t\t\t\t\t\t\t<td\n' +
        '\t\t\t\t\t\t\t\t\t\t\tstyle="border-collapse: collapse!important;font-family: Helvetica;line-height: 150%;text-align: center;border-collapse: collapse!important;color: grey;font-size: 12px;padding: 20px;">\n' +
        '\t\t\t\t\t\t\t\t\t\t\t<a style="color: #606060;font-weight: 400;text-decoration: underline;" href="https://neobay.cn"\n' +
        '\t\t\t\t\t\t\t\t\t\t\t   target="_blank">visit our website</a>\n' +
        '\t\t\t\t\t\t\t\t\t\t\t<span class="hide-mobile"> | </span>\n' +
        '\t\t\t\t\t\t\t\t\t\t\t<a style="color: #606060;font-weight: 400;text-decoration: underline;"\n' +
        '\t\t\t\t\t\t\t\t\t\t\t   href="https://neobay.cn/user/login" target="_blank">log in to your account</a>\n' +
        '\t\t\t\t\t\t\t\t\t\t\t<span class="hide-mobile"> | </span>\n' +
        '\t\t\t\t\t\t\t\t\t\t\t<a style="color: #606060;font-weight: 400;text-decoration: underline;"\n' +
        '\t\t\t\t\t\t\t\t\t\t\t   href="https://neobay.cn/by/index" target="_blank">get support</a>\n' +
        '\t\t\t\t\t\t\t\t\t\t\t<br>\n' +
        '\t\t\t\t\t\t\t\t\t\t\tCopyright © 零号湾 | 创业无忧, All rights reserved.\n' +
        '\t\t\t\t\t\t\t\t\t\t</td>\n' +
        '\t\t\t\t\t\t\t\t\t</tr>\n' +
        '\t\t\t\t\t\t\t\t\t</tbody>\n' +
        '\t\t\t\t\t\t\t\t</table>\n' +
        '\t\t\t\t\t\t\t</td>\n' +
        '\t\t\t\t\t\t</tr>\n' +
        '\t\t\t\t\t\t</tbody>\n' +
        '\t\t\t\t\t</table>\n' +
        '\t\t\t\t</td>\n' +
        '\t\t\t</tr>\n' +
        '\t\t\t</tbody>\n' +
        '\t\t</table>\n' +
        '\t</center>\n' +
        '\n' +
        '</div>'
    }

    // 菜单选中状态下，点击将触发该事件
    menu.clickEventSelected = function (e) {
      let $text = editor.$txt
      let $templateContent = $text.find('#nb-editor-template-1-content')
      if ($templateContent.length === 0) {
        return
      }
      let content = $templateContent[0].innerHTML
      editor.$txt[0].innerHTML = content
    }

    // 根据当前选区，自定义更新菜单的选中状态或者正常状态
    menu.updateSelectedEvent = function () {
      let $text = editor.$txt
      let $template = $text.find('#nb-editor-template-1')
      if ($template.length === 0) {
        return false
      } else {
        return true
      }
    }

    // 增加到editor对象中
    editor.menus[menuId] = menu

  })

}
