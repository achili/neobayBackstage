<template>
  <div class="border-radius-5 border p5">

    <div class="row mt5 mb10">
      <div class="col-md-2 col-xs-6 col-sm-4  mt5" v-for="type in typeProcess.getTypeList()" v-if="type.name.indexOf(search) !== -1">
        <NbCheckbox v-model="keeperBusinessType.processTypes" :val="newType(type.value)"></NbCheckbox>
        <label>{{type.name}}</label>
      </div>
    </div>

  </div>
</template>
<script>
  import KeeperBusinessType from "../../../../../common/model/keeper/business/KeeperBusinessType";
  import Attribute from "../../../../../common/model/template/Attribute";
  import TypeProcess from '../../../../../common/model/keeper/business/TypeProcess'
  import NbCheckbox from "../../../../../common/widget/NbCheckbox";

  export default {
    data() {
      return {
        typeProcess: new TypeProcess()
      }
    },
    computed: {

    },
    props: {
      keeperBusinessType: {
        type: KeeperBusinessType,
        required: true
      },
      search: {
        required: false
      }
    },
    components: {
      NbCheckbox
    },
    watch: {

    },
    methods: {
      newType(type) {
        return new TypeProcess(type);
      },
      updateAttributeList() {
        let that = this;
        that.tempAttribute.httpGetCandidates(null, true, function (attributeList) {
          that.typeProcessList = attributeList;
        })
      }
    }
  }
</script>
