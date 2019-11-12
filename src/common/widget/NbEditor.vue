<template>
  <div>
    <div ref="editor" :style="style" @dragover="dragover" @dragenter="dragenter" @drop="drop" class="progrconter">
    </div>
    <div class="progress progr"  v-if="tank.procedure === tank.Procedure.UPLOADING">
      <div :style="'width: '+(tank.progress*100)+'%'" class="progress-bar progress-bar-primary">
        <span class="progrfs">{{(tank.progress * 100).toFixed(1)}}%</span>
      </div>
    </div>
    <div v-if="tank.procedure === tank.Procedure.UPLOADING">
      <div class="progrs">
        {{tank.speed | humanFileSize}}/s
      </div>
    </div>
  </div>

</template>

<script>

	import WangEditor from "../fork/wangeditor/WangEditor";
	import Tank from '../../common/model/tank/Tank'
	import $ from "jquery";
	import PluginAlignCenter from "../fork/wangeditor/PluginAlignCenter";
	import PluginAlignJustify from "../fork/wangeditor/PluginAlignJustify";
	import PluginAlignLeft from "../fork/wangeditor/PluginAlignLeft";
	import PluginAlignRight from "../fork/wangeditor/PluginAlignRight";
	import PluginIndent from "../fork/wangeditor/PluginIndent";
	import PluginHr from "../fork/wangeditor/PluginHr";
	import PluginImage from "../fork/wangeditor/PluginImage";
	import PluginAttachment from "../fork/wangeditor/PluginAttachment";
  import PluginImportTemplate from '../fork/wangeditor/PluginImportTemplate'
  import {containStr, endWith, getExtension, humanFileSize, startWith} from "../filter/str";

	//对齐
	PluginAlignCenter(WangEditor, $);
	PluginAlignJustify(WangEditor, $);
	PluginAlignLeft(WangEditor, $);
	PluginAlignRight(WangEditor, $);

	//分割线插件
	PluginHr(WangEditor, $);
	//缩进插件
	PluginIndent(WangEditor, $);
	//图片上传插件
	PluginImage(WangEditor, $);
	//附件上传插件
	PluginAttachment(WangEditor, $);
  //导入模板插件
  PluginImportTemplate(WangEditor, $);


	let Procedure = {
		"FREE": 0,
		"FETCHING_UPLOAD_TOKEN": 1,
		"UPLOADING": 2,
		"FETCHING_DOWNLOAD_TOKEN": 3,
		"DOWNLOADING": 4
	};

	export default {
		data() {
			return {
				content: null,
				editor: null,
        tank: new Tank("*", false,0.8 * 1024 * 1024, '最大不超过1M')
			}
		},
		props: {
			value: {
				type: String,
				required: false
			},
			height: {
				type: String,
				required: false,
				"default"() {
					return "300px";
				}
      },
      isAdvanced: {
        type: Boolean,
        required: false,
        'default' () {
          return false
        }
      }
		},
		computed: {
			style(){
				return "height:" + this.height;
			}
		},
		methods: {
			insert(text){

				this.editor.command(null, 'insertHtml', text);
			},
      dragover: function (e) {
        e.stopPropagation();
        e.preventDefault();
      },
      dragenter: function (e) {
        e.stopPropagation();
        e.preventDefault();
      },
      drop: function (e) {
        e.stopPropagation();
        e.preventDefault();
        let dt = e.dataTransfer;
        this.uploadFile(dt.files[0]);
      },
      uploadFile: function (file) {
        let that = this;
        this.tank.file = file;
        this.tank.upload(function (response) {
          let iconUrl = that.tank.fileIcon(true);
          let type = that.tank.file.type;
          let url = that.tank.url;
          let name = that.tank.file.name;
          let simpleType = type.substr(0, type.indexOf("/"));

          if (simpleType) {
            if (containStr("image", simpleType)) {
              let imgHtml = '<img src="' + url + '"/>';
              that.editor.command(null, 'insertHtml', imgHtml);
            } else {
              let linkHtml = '<p><img src="' + iconUrl + '"/>&nbsp;&nbsp;<a href="' + url + '" target="_blank">' + name + '</a></p>';
              that.editor.command(null, 'insertHtml', linkHtml);
            }
          } else {
            let linkHtml = '<p><img src="' + iconUrl + '"/>&nbsp;&nbsp;<a href="javascript:void(0)" target="_blank">' + name + '</a></p>';
            that.editor.command(null, 'insertHtml', linkHtml);
          }
          that.clear();
        }, function () {
          console.error('上传失败啦');
          that.clear()
        })
      },
      clear() {
        let that = this;
        that.tank.clear();
        // that.$refs['refFile'].value = ''
      }
		},
		watch: {
			"value"(newVal, oldVal){

				if (newVal !== this.content) {
					this.content = newVal;

					this.editor.$txt.html(this.content);
				}


			}
		},
		mounted() {
			let that = this;
			this.editor = new WangEditor(this.$refs.editor);

      if (this.isAdvanced) {
        this.editor.config.menus = [
          'source',
          'bold',
          'underline',
          'italic',
          'strikethrough',
          'hr',
          'eraser',
          'forecolor',
          'bgcolor',
          'quote',
          'fontfamily',
          'fontsize',
          'head',
          'indent',
          'unorderlist',
          'orderlist',
          'nbalignleft',
          'nbaligncenter',
          'nbalignright',
          'nbalignjustify',
          'link',
          'unlink',
          'table',
          'image',
          'attachment',
          'insertcode',
          'importtemplate',
          'undo',
          'redo',
          'fullscreen'
        ]
      } else {
        this.editor.config.menus = [
          'source',
          'bold',
          'underline',
          'italic',
          'strikethrough',
          'hr',
          'eraser',
          'forecolor',
          'bgcolor',
          'quote',
          'fontfamily',
          'fontsize',
          'head',
          'indent',
          'unorderlist',
          'orderlist',
          'nbalignleft',
          'nbaligncenter',
          'nbalignright',
          'nbalignjustify',
          'link',
          'unlink',
          'table',
          'image',
          'attachment',
          'insertcode',
          'undo',
          'redo',
          'fullscreen'
        ]
      }
			// 普通的自定义菜单



			// 配置 onchange 事件
			this.editor.onchange = function () {

				that.content = that.editor.$txt.html();
				// 编辑区域内容变化时，实时打印出当前内容
				that.$emit('input', that.content);
			};

			// 关闭菜单栏fixed
			this.editor.config.menuFixed = false;

			this.editor.create();

			//二次开发全屏功能
			this.editor.fullScreenClick = function () {
				$("body").addClass("editor-fullscreen");
			}
			this.editor.fullScreenClickSelected = function () {
				$("body").removeClass("editor-fullscreen");
			}


		},
		beforeDestroy() {
			if (this.editor) {
				this.editor.destroy();
			}

		}
	}


</script>

<style lang="less">
	@import "../fork/wangeditor/css/wangEditor";

	.wangEditor-txt img {
		max-width: 100%;
	}

	.editor-fullscreen {
    overflow: hidden !important;
	}

	.editor-fullscreen .navbar-static-side {
    display: none !important;
	}
  .progrconter{
    position: relative;
  }
  .progr{
    height: 15px;
    width: 360px;
    position: absolute;
    bottom: -19px;
    left: 17px;
    z-index: 66;
  }
  .progrs{
    position: absolute;
    left: 385px;
    bottom: -2px;
    z-index: 66;
  }
  .progrfs{
    font-size: 8px;
  }
</style>
