
<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-xs-12">
        <h2>
          <i class="fa fa-fire text-success"></i>
          <span v-show="!exportMeta.editMode">导出模板</span>
          <span v-show="exportMeta.editMode">编辑导出模板</span>
        </h2>
        <CreateSaveButton :entity="exportMeta" :callback="save" />
      </div>
    </div>

    <div class="col-xs-12 m-t-md">
      <div class="form-validation">

        <div class="form-group">
          <label class="control-label">名称</label>
          <input type="text" class="form-control" v-model="exportMeta.name">
        </div>

        <div class="form-group">
          <label class="control-label">描述</label>
          <textarea class="form-control" rows="3" v-model="exportMeta.description"
                    placeholder="模板描述"></textarea>
        </div>

        <div class="form-group">
          <div>
            <label class="control-label">属性</label>
            <span>编辑模式   <NbCheckbox v-model="attributeEditMode"/></span>
          </div>
          <div>
            <NbAttribute :attributes="exportMeta.attributes" :editMode="attributeEditMode"
                         :attributeClick="attributeClick"/>
          </div>
        </div>

      </div>
    </div>

    <div class="col-xs-12 m-t-md">
      <div class="alert alert-danger" v-show="exportMeta.errorMessage">
        {{exportMeta.errorMessage}}
      </div>
      <CreateSaveButton :entity="exportMeta" :callback="save" />
    </div>


  </div>

</template>

<script>
  import ExportMeta from '../../../../common/model/export/meta/ExportMeta'
  import Pager from '../../../../common/model/base/Pager'
  import {Notification} from 'element-ui'
  import NbCheckbox from "../../../../common/widget/NbCheckbox.vue"
  import NbAttribute from "../../../../common/widget/attribute/NbAttribute.vue"
  import CreateSaveButton from "../../widget/CreateSaveButton.vue"

  export default{
    data () {
      return {
        exportMeta: new ExportMeta(),
        attributeEditMode: true,
        previewDirty: true
      }
    },

    components: {
      NbCheckbox,
      NbAttribute,
      CreateSaveButton
    },

    methods: {
      save(){
        let that = this;

        this.exportMeta.httpSave(function (response) {

          Notification.success({
            message: that.exportMeta.editMode ? '修改导出模板成功！' : '创建导出模板成功！'
          });
          that.$router.push("/by/export/meta/detail/" + that.exportMeta.id);
        },);

      },
      attributeClick(attribute){
//        if (this.exportMeta.type === "PDF") {
//          this.editor1.insert(attribute.getPebble());
//        } else {
//          this.editor2.insert(attribute.getPebble());
//        }
      }
    },


    mounted(){



      let that = this;
      this.exportMeta.id = this.$store.state.route.params.id;

      if (this.exportMeta.id) {
        this.exportMeta.editMode = true;
        this.exportMeta.httpDetail();
      }
    }
  }


</script>


























