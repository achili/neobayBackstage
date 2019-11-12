<template>
  <div class="animated fadeIn">

    <div class="row">
      <div class="col-md-12">

          <div class="text-right mb10">
            <a title="编辑" class="btn btn-success"
               @click.stop.prevent="$router.push({ path: 'edit', query: { id: sport.id }})">
              <i class="fa fa-pencil"></i>
              编辑
            </a>
          </div>

          <div class="row">
            <div class="col-md-12">
              <MakerSportCell :sport="sport"/>
            </div>
          </div>

      </div>
    </div>

  </div>
</template>
<script>
  import Sport from "../../../../common/model/maker/MakerSport"

  import NbSlidePanel from  "../../../../common/widget/NbSlidePanel.vue";
  import Notification from  "../../../../common/model/notification/Notification";
  import NbExpanding from  "../../../../common/widget/NbExpanding.vue";
  import MakerSportCell from "./widget/MakerSportCell";

  import {Notification as NotificationBox} from 'element-ui'

  export default{
    data () {
      return {
        sport: new Sport(),
        user: this.$store.state.user
      }
    },
    components: {
      NbSlidePanel,
      NbExpanding,
      MakerSportCell
    },
    computed: {},
    watch: {},
    methods: {
      fetchDetail(){
        let that = this;
        this.sport.id = this.$store.state.route.query.id;
        if (this.sport.id) {
          this.sport.httpDetail();
        }
      }
    },
    mounted(){
      this.fetchDetail();
    }
  }


</script>
