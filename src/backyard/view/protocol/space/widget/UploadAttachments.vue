<template>
  <div>
    <NbSlidePanel type="info" v-if="protocolSpace.status === Status.NEW ||
			protocolSpace.status === Status.PROCESSING ||
			protocolSpace.status === Status.EXPIRE ||
			protocolSpace.status === Status.EXCEPTION
">
      <span slot="heading" class="f16">
        <i class="fa fa-cogs"></i>
          附件上传/修改
      </span>
      <div slot="body">

        <div class="row mt10">
          <div class="col-md-2 ">其它附件：</div>
          <div class="col-md-10 ">
            <NbTanks :tanks="protocolSpace.currentAttachments"/>
          </div>
        </div>

        <div class="text-right mt10">
          <SubmitButton :loading="protocolSpace.loading" :callback="submit"/>
        </div>

      </div>
    </NbSlidePanel>

  </div>
</template>
<script>
  import ProtocolSpace from  "../../../../../common/model/protocol/space/ProtocolSpace"
  import NbSlidePanel from  "../../../../../common/widget/NbSlidePanel.vue";
  import NbTanks from  "../../../../../common/widget/NbTanks.vue"
  import SubmitButton from "../../../widget/SubmitButton.vue";

  export default {

    data () {
      return {
        Status: ProtocolSpace.prototype.Status
      }
    },
    components: {
      NbSlidePanel,
      NbTanks,
      SubmitButton
    },
    props: {
      protocolSpace: {
        type: ProtocolSpace,
        required: true
      },
      successCallback: {
        type: Function,
        required: false
      }
    },
    computed: {},
    methods: {
      submit() {
        this.protocolSpace.httpUploadAttachments(this.successCallback);
      }
    },
    mounted(){

    }
  }
</script>
