<template>
  <div >
    <label>
      <select class="form-control" v-model="spaceRegionalActive.id" :disabled="disabled" @click="clickItem(spaceRegionalActive)">
        <option v-for="(spaceRegional,index) in pager.spaceRegionals"  :value="spaceRegional.id" :key="index" v-if="user.hasPermissionSpace(FeatureType.OFFICIAL_MANAGE,spaceRegional.id) || user.hasPermissionSpace(FeatureType.MAKER_SIMPLE_APPLY_MANAGE,spaceRegional.id) ||
         user.hasPermissionSpace(FeatureType.MAKER_SIMPLE_APPLY_MINE,spaceRegional.id) || user.hasPermissionSpace(FeatureType.KEEPER_BUSINESS_MINE,spaceRegional.id)" >{{spaceRegional.name}}</option>
      </select>
    </label>

  </div>

</template>
<script>
  import SpaceRegional from "../../../../common/model/space/SpaceRegional";
  import {FeatureType, FeatureTypeMap, FeatureTypeList, ModuleFeatureMap} from "../../../../common/model/core/feature/FeatureType";
  import Pager from "../../../../common/model/base/Pager";

  export default{
    data(){
      return {
        spaceRegionalActive: new SpaceRegional(),
        pager:new Pager(SpaceRegional),
        FeatureType,
        user: this.$store.state.user
      }
    },
    props: {
      spaceRegional: {
        type: SpaceRegional,
        required: true
      },
      initFilter: {
        type: Object,
        required: false
      },
      editMode:{
        type: Boolean,
        required: true
      },
      disabled:{
        type: Boolean,
        required: false
      }
    },
    watch: {
      "spaceRegional.id"(newVal,oldVal){
        if(this.editMode){
            this.spaceRegionalActive.render(this.spaceRegional);
        }
      },
      "spaceRegionalActive.id"(newVal,oldVal) {
        this.clickItem(this.spaceRegionalActive)

      }

    },
    methods: {
      clickItem(spaceRegionalActive){
        this.spaceRegional.render(spaceRegionalActive);
      },
      refresh(){
        let that = this;
        this.pager.httpFastPage(function () {
          if(!that.editMode) {
            that.spaceRegionalActive.id = that.user.role.spaceRegional.id;
          }
        });

      }

    },
    components: {
    },
    mounted(){
      let that = this;
      this.refresh();
    }
  }
</script>
