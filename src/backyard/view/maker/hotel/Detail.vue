<template>
  <div class="animated fadeIn">

    <div class="row">
      <div class="col-md-12">

        <div class="text-right mb10">
          <a title="编辑" class="btn btn-success"
             @click.stop.prevent="$router.push({ path: 'edit', query: { id: makerHotel.id }})">
            <i class="fa fa-pencil"></i>
            编辑
          </a>
        </div>

        <div class="row">
          <div class="col-md-12">
           <MakerHotelCell :makerHotel="makerHotel"/>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>
<script>
  import MakerHotel from "../../../../common/model/maker/MakerHotel"

  import NbSlidePanel from  "../../../../common/widget/NbSlidePanel.vue";
  import Notification from  "../../../../common/model/notification/Notification";
  import NbExpanding from  "../../../../common/widget/NbExpanding.vue";
  import MakerHotelCell from "./widget/MakerHotelCell";

  import {Notification as NotificationBox} from 'element-ui'

  export default{
    data () {
      return {
        makerHotel: new MakerHotel(),
        user: this.$store.state.user
      }
    },
    components: {
      NbSlidePanel,
      NbExpanding,
      MakerHotelCell
    },
    computed: {},
    methods: {
      fetchDetail(){
        let that = this;
        this.makerHotel.id = this.$store.state.route.query.id;
        if (this.makerHotel.id) {
          this.makerHotel.httpDetail();
        }
      }
    },
    mounted(){
      this.fetchDetail();
    }
  }


</script>
