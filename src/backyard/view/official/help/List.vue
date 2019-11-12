<template>
  <div class="animated fadeIn">

    <div class="row mb10">
      <div class="col-xs-12 clearfix">
        <div class="pull-left f24">
          <i class="fa fa-fire text-success"></i>
          <span>帮助列表</span>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12">
        <div v-for="officialHelp in pager.officialHelps">

          <OfficialHelpCell :refreshCallback="refresh" :officialHelp="officialHelp"></OfficialHelpCell>

        </div>


      </div>
      <div class="col-xs-12">
        <OfficialHelpCreateCell v-show="createMole" :refreshCallback="refresh" :officialHelp="quickHelp"></OfficialHelpCreateCell>
      </div>

      <div class="col-xs-12">
        <button class="pull-right btn btn-success f16" @click="create">
          <i class="fa fa-plus"></i>
          创建
        </button>
      </div>
    </div>

  </div>
</template>

<script>
  import NbRadio from '../../../../common/widget/NbRadio.vue'
  import {MessageBox, Notification} from 'element-ui'

  import Pager from  "../../../../common/model/base/Pager"
  import OfficialHelp from  "../../../../common/model/official/OfficialHelp"
  import UserProfileLink from "../../widget/UserProfileLink"
  import CreateSaveButton from "../../widget/CreateSaveButton.vue"
  import OfficialHelpCell from "./widget/OfficialHelpCell.vue"
  import OfficialHelpCreateCell from "./widget/OfficialHelpCreateCell.vue"

  export default {
    data () {
      return {
        pager: new Pager(OfficialHelp,50),
        quickHelp: new OfficialHelp(),
        createMole: false
      }
    },
    components: {
      NbRadio,
      UserProfileLink,
      CreateSaveButton,
      OfficialHelpCell,
      OfficialHelpCreateCell
    },
    computed: {},
    watch: {},
    methods: {
      refresh(){
        let that = this;
        this.pager.httpFastPage(function () {
          that.createMole = false;
          that.quickHelp = new OfficialHelp();
        });
      },
      create() {
        this.createMole = true;
      }
    },
    mounted() {
      this.pager.enableHistory();
      this.refresh();
    }
  }

</script>
