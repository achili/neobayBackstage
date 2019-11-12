<template>
  <div class="animated fadeIn">

  <div class="row">

    <div class="col-lg-6">
      <SpaceInvestmentCell  :spaceInvestment="pager" />
    </div>

    <div class="col-lg-6">
      <RoomCell :spaceRoom="spaceRoom"  />
    </div>

  </div>

</div>
</template>

<script>
    import Pager from "../../../common/model/base/Pager";
    import SpaceInvestment from "../../../common/model/demand/SpaceInvestment";
    import RoomCell from "./widget/RoomCell";
    import SpaceInvestmentCell from "./widget/SpaceInvestmentCell";
    import SpaceRoom from "../../../common/model/space/SpaceRoom";
    import { Notification, MessageBox } from 'element-ui';


    export default {
      data(){
        return {
          pager: new Pager(SpaceInvestment),
          spaceRoom: new Pager(SpaceRoom)
        }
      },
      comments:{},
      components:{
        RoomCell,
        SpaceInvestmentCell
      },
      methods:{},
      mounted(){

      }
    }
</script>

<style scoped>

</style>
