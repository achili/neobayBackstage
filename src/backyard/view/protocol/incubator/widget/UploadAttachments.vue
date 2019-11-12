<template>
  <div>
    <NbSlidePanel type="info" v-if="protocolIncubator.status === Status.NEW ||
			protocolIncubator.status === Status.PROCESSING ||
			protocolIncubator.status === Status.EXPIRE ||
			protocolIncubator.status === Status.EXCEPTION
">
      <span slot="heading" class="f16">
        <i class="fa fa-cogs"></i>
          附件上传/修改
      </span>
      <div slot="body">

        <div class="row mt10">
          <div class="col-md-2 ">其它附件：</div>
          <div class="col-md-10 ">
            <NbTanks :tanks="protocolIncubator.currentAttachments"/>
          </div>
        </div>

        <div class="text-right mt10">
          <SubmitButton :loading="protocolIncubator.loading" :callback="submit"/>
        </div>

      </div>
    </NbSlidePanel>

  </div>
</template>
<script>
  import ProtocolIncubator from  "../../../../../common/model/protocol/incubator/ProtocolIncubator"
  import NbSlidePanel from  "../../../../../common/widget/NbSlidePanel.vue";
  import NbTanks from  "../../../../../common/widget/NbTanks.vue"
  import SubmitButton from "../../../widget/SubmitButton.vue";

  export default {

    data () {
      return {
        Status: ProtocolIncubator.prototype.Status
      }
    },
    components: {
      NbSlidePanel,
      NbTanks,
      SubmitButton
    },
    props: {
      protocolIncubator: {
        type: ProtocolIncubator,
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
        this.protocolIncubator.httpUploadAttachments(this.successCallback);
      }
    },
    mounted(){

    }
  }
</script>
