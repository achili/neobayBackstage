<template>
  <div class="animated fadeIn">

    <div class="row">
      <div class="col-md-12">

        <div class="col-xs-12">
          <h2>
            <i class="fa fa-fire text-success"></i>
            <span>园区市集申请详情</span>
          </h2>
        </div>
        <div class="text-right mb10">
          <a title="编辑" class="btn btn-success"
             @click.stop.prevent="$router.push({ path: 'edit', query: { id: makerMarket.id }})">
            <i class="fa fa-pencil"></i>
            编辑
          </a>
        </div>

       <div class="row">

         <div class="col-md-12">
           <MakerMarketCell :makerMarket="makerMarket"/>
         </div>

       </div>

      </div>
    </div>
  </div>
</template>
<script>

  import Notification from  "../../../../common/model/notification/Notification";
  import {Notification as NotificationBox} from 'element-ui'
  import MakerMarket from "../../../../common/model/maker/MakerMarket";
  import MakerMarketCell from "./widget/MakerMarketCell";


  export default{
    data () {
      return {
        makerMarket: new MakerMarket(),
        user: this.$store.state.user
      }
    },
    components: {
      MakerMarketCell
    },
    computed: {},
    watch: {},
    methods: {
      fetchDetail(){
        let that = this;
        this.makerMarket.id = this.$store.state.route.query.id;
        if (this.makerMarket.id) {
          this.makerMarket.httpDetail();
        }
      }
    },
    mounted(){
      this.fetchDetail();
    }
  }


</script>
