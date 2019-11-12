<template>
  <div>
    <div v-for="(item,index) in keeperBusinessType.processTypes">
      <div class="row mt5">
        <div class="col-md-2">
          {{index + 1}}、{{item.getTypeName(type)}}
        </div>
        <div class="col-md-10">
          <input type="text" v-model="item.content" class="form-control">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TypeProcess from '../../../../../common/model/keeper/business/TypeProcess';
  import KeeperBusinessType from  "../../../../../common/model/keeper/business/KeeperBusinessType";

  export default {
    data() {
      return {

      }
    },
    props: {
      keeperBusinessType: {
        type: KeeperBusinessType,
        required: true
      }
    }
  }
</script>
