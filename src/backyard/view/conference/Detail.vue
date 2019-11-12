<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <LoadingFrame :loading="conferenceRoom.detailLoading">
          <div class="text-right mb10">
            <a title="编辑" class="btn btn-success"
               @click.stop.prevent="$router.push({ path: 'edit', query: { id: conferenceRoom.id }})">
              <i class="fa fa-pencil"></i>
              编辑
            </a>
          </div>

          <div class="row">
            <div class="col-md-12">
              <NbSlidePanel>
                <span slot="heading" class="text-success f16">
                  <i class="fa fa-dot-circle-o"></i>
                    基本信息
                </span>
                <div slot="body">
                  <div class="row mt10">
                    <label class="col-md-3 control-label mt5 ">会议室名称</label>
                    <div class="col-md-9">
                     {{conferenceRoom.name}}
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3 control-label mt5 ">园区地点</label>
                    <div class="col-md-9">
                      {{conferenceRoom.spaceRegional.name}}
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3 control-label mt5 ">联系人</label>
                    <div class="col-md-9">
                      <UserProfileLink :user="conferenceRoom.contacts"/>
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3 control-label mt5 ">所属楼栋</label>
                    <div class="col-md-9">
                      {{conferenceRoom.spaceBuilding.name}}
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3 control-label mt5 ">图片</label>
                    <div class="col-md-9">
                      <img class="img-lg" :src="conferenceRoom.posterUrl">
                      <!--<NbTanks :tanks="reception.attachments" :edit="false"/>-->
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3 control-label mt5 ">详情介绍</label>
                    <div class="col-md-9">
                      {{conferenceRoom.introduce}}
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3 control-label mt5 ">详细地址</label>
                    <div class="col-md-9">
                      {{conferenceRoom.address}}
                    </div>
                  </div>

                  <div class="row mt10" >
                    <label class="col-md-3 control-label mt5 ">每小时价格</label>
                    <div class="col-md-9">
                      {{conferenceRoom.price}}
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3 control-label mt5">可容纳人数</label>
                    <div class="col-md-9">
                      <span class="label mr10" v-for="c in conferenceRoom.CapacityMap">
                        <span v-if="c.value === conferenceRoom.capacity ">{{c.name}} </span>
                      </span>
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3 control-label mt5">设施及服务</label>
                    <div class="col-md-9">
                       <span class="label mr10" v-for="s in conferenceRoom.services">
                            <span v-for="c in conferenceRoom.ServicesMap">
                              <span v-if="s === c.val">{{c.name}}</span>
                            </span>
                       </span>
                    </div>
                  </div>

                  <div class="row mt10">
                    <label class="col-md-3 control-label mt5">所属房间</label>
                    <div class="col-md-9">
                      <a href="javascript:void(0)" @click="$router.push('/by/space/room/detail/' + conferenceRoom.spaceRoom.id)">
                        {{conferenceRoom.spaceRoom.name}}
                      </a>
                    </div>
                  </div>

                </div>
              </NbSlidePanel>

            </div>

          </div>
        </LoadingFrame>
      </div>
      <div class="col-md-12 text-right">
        <button title="返回" class="btn btn-success" @click.stop.prevent="$router.go(-1)">
          <i class="fa fa-arrow-left"></i>
          返回
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import NbSlidePanel from '../../../common/widget/NbSlidePanel'
  import LoadingFrame from "../widget/LoadingFrame";
  import UserProfileLink from "../widget/UserProfileLink";
  import NbTanks from "../../../common/widget/NbTanks"
  import ConferenceRoom from "../../../common/model/conference/ConferenceRoom";

  export default {
    data () {
      return {
        user: this.$store.state.user,
        FeatureType: this.$store.state.FeatureType,
        conferenceRoom: new ConferenceRoom()
      }
    },
    computed: {},
    components: {
      NbSlidePanel,
      LoadingFrame,
      UserProfileLink,
      NbTanks
    },
    methods: {
      fetchDetail(){
        let that = this;
        this.conferenceRoom.id = this.$store.state.route.query.id;
        if (this.conferenceRoom.id) {
          this.conferenceRoom.httpDetail();
        }
      }
    },
    mounted(){
      this.fetchDetail();
    }
  }
</script>

