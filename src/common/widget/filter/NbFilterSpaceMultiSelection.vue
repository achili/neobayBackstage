<template>

  <div class="pt5" v-show="filter.visible">
		<span class="mr20" v-for="(option, index) in pager.getList()">
      <span v-if="user.hasPermissionSpace(FeatureType.OFFICIAL_MANAGE,option.id) || user.hasPermissionSpace(FeatureType.MAKER_SIMPLE_APPLY_MANAGE,option.id) ||
       user.hasPermissionSpace(FeatureType.MAKER_SIMPLE_APPLY_MINE,option.id) || user.hasPermissionSpace(FeatureType.KEEPER_BUSINESS_MINE,option.id)">
        <NbCheckbox :val="option.id" v-model="filter.value"></NbCheckbox>
			  <span :class="'label label-'+option.style">{{option.name}}</span>
      </span>
		</span>
  </div>

</template>


<script>
  import Filter from "../../model/base/Filter";
  import NbCheckbox from "../NbCheckbox.vue";
  import Pager from "../../model/base/Pager";
  import {
    FeatureType,
    FeatureTypeMap,
    FeatureTypeList,
    ModuleFeatureMap
  } from "../../../common/model/core/feature/FeatureType";

  export default {
    data () {
      return {
        courses: [],
        pager: new Pager(this.filter.Clazz),
        FeatureType,
        user:this.$store.state.user,
        spaces: this.$store.state.spaceRegionals
      }
    },
    props: {
      filter: {
        type: Filter,
        required: true,
        validator: function (value) {

          if (value["type"] !== "SPACE_MULTI_SELECTION") {
            console.error("type must be `SPACE_MULTI_SELECTION`.");
            return false;
          }

          if (!value.value) {
            value.value = [];
          }

          return true;
        }
      },
      callback: {
        type: Function,
        required: false
      }

    },
    computed: {},
    components: {
      NbCheckbox
    },
    methods: {
      search(){
        this.pager.page = 0;
        this.refresh()
      },
      refresh(){
        this.pager.httpFastPage();
      }
    },
    mounted(){
      let that = this;
      this.filter.value = [];
      this.spaces.spaceRegionals.forEach(spaceRegional=>{
        if(that.user.hasPermissionSpace(FeatureType.OFFICIAL_MANAGE,spaceRegional.id) || that.user.hasPermissionSpace(FeatureType.MAKER_SIMPLE_APPLY_MANAGE,spaceRegional.id) ||
          that.user.hasPermissionSpace(FeatureType.MAKER_SIMPLE_APPLY_MINE,spaceRegional.id) || that.user.hasPermissionSpace(FeatureType.KEEPER_BUSINESS_MINE,spaceRegional.id)){
          if(spaceRegional.id != null){
            that.filter.value.push(spaceRegional.id);
          }
        }
      });
      this.refresh();

    }
  }
</script>


<style lang="less" rel="stylesheet/less">

</style>

