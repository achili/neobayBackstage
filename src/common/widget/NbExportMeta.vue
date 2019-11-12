<template>

  <div class="col-xs-12" v-show="active === 1">
    <NbSlidePanel>
      <span slot="heading">
        <i class="fa fa-dot-circle-o"></i>
        <span>导出</span>
      </span>

      <div slot="body">
        <div class="row">
          <label class="col-md-2 control-label mt5 compulsory">导出模板</label>
          <div>
            <NbBtnDropdown :Clazz="ExportMeta" :option=""></NbBtnDropdown>
          </div>
        </div>
      </div>
    </NbSlidePanel>
  </div>

</template>
<script>
  import NbSlidePanel from "./NbSlidePanel.vue"
  import NbBtnDropdown from "./NbBtnDropdown.vue"
  import ExportMeta from "../../common/model/export/meta/ExportMeta"
  import Pager from "../../common/model/base/Pager"

  export default {
    data () {
      return {
        metaId: null,
        pager: new Pager(ExportMeta)
      }
    },
    components: {
      NbSlidePanel,
      NbBtnDropdown
    },
    computed: {},
    props: {
      objectIds: {
        type: Array,
        required: true
      }
    },
    methods: {


    }
  }

</script>
