<template>
  <div>
    <NbPagerSelection :pager="pager" :activeItem="PolicyArea">
      <span slot="title">
        <span v-if="PolicyArea.name&&PolicyArea.id">
          {{PolicyArea.name}}
        </span>
        <span v-else>
          请选择一个地区
        </span>
      </span>

      <div class="mb10 p10 cursor br4 border" v-for="policyArea in pager.officialPolicyAreas"
            @click.stop.prevent="clickItem(policyArea)"
            :class="{'bg-white':policyArea.id !== PolicyArea.id,'bg-azure':policyArea.id === PolicyArea.id}"
            slot="cells">
        <div>
          <span class="f15">#{{policyArea.id}} {{policyArea.name}}</span>
        </div>
      </div>

    </NbPagerSelection>
  </div>
</template>
<script>
  import Pager from "../../../../common/model/base/Pager";
  import OfficialPolicyArea from "../../../../common/model/official/OfficialPolicyArea";
  import NbPagerSelection from "../../../../common/widget/NbPagerSelection";

  export default {
    data() {
      return {
        pager: new Pager(OfficialPolicyArea, 5)
      }
    },
    props: {
      PolicyArea: {
        type: OfficialPolicyArea,
        required: true
      }
    },
    watch: {},
    methods: {
      clickItem(policyArea) {
        this.PolicyArea.render(policyArea);
      }
    },
    components: {
      NbPagerSelection
    },
    mounted() {
      this.pager.httpFastPage();
    }
  }
</script>
