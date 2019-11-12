<template>
	<div class="by-task-detail animated fadeIn">
		<div class="row">
			<div class="col-xs-12">
        <NbSlidePanel>
          <span slot="heading" class="text-success">
            <i class="fa fa-tasks" aria-hidden="true"></i>
            权限赋予详情
          </span>
          <div class="pull-right">
            <button title="编辑" class="btn btn-success"
                    @click.stop.prevent="$router.push('/by/grant/authority/edit?id='+iSpaceGrantAuthority.id)">
                    <!--@click.stop.prevent="$router.push('/by/grant/authority/edit/'+iSpaceGrantAuthority.id)">-->
              <i class="fa fa-pencil"></i>
              编辑
            </button>
          </div>
              <div class="text-center" v-show="iSpaceGrantAuthority.loading">
                <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
              </div>
            <div class="row">
              <div class="col-md-8">
                <div class="row mt10">
                  <div class="col-xs-4">创建者:</div>
                  <div class="col-xs-8"><UserProfileLink :user="iSpaceGrantAuthority.users"/></div>
                </div>
                <div class="row mt10">
                  <div class="col-xs-4">被赋予开门权限者：</div>
                  <div class="col-xs-8"><UserProfileLink :user="iSpaceGrantAuthority.user"/></div>
                </div>
                <div class="row mt10" v-if="iSpaceGrantAuthority.room && iSpaceGrantAuthority.room.id">
                  <div class="col-xs-4">房间：</div>
                  <div class="col-xs-8 text-info cursor" @click="$router.push('/by/space/room/detail/' + iSpaceGrantAuthority.room.id)">
                    {{iSpaceGrantAuthority.room.name}}
                  </div>
                </div>
                <div class="row mt10" v-else-if="iSpaceGrantAuthority.conference && iSpaceGrantAuthority.conference.id">
                  <div class="col-xs-4">会议室：</div>
                  <!--<span class="text-info cursor" @click="$router.push('/by/conference/room/detail/' + iSpaceGrantAuthority.conference.id)">-->
                  <div class="col-xs-8 text-info cursor" @click="$router.push('/by/conference/room/detail?id=' + iSpaceGrantAuthority.conference.id)">
                    {{iSpaceGrantAuthority.conference.name}}
                  </div>
                </div>
                <div class="row mt10" v-else>
                  <div class="col-xs-4">房间或会议室：</div>
                  <div class="col-xs-8 text-danger">暂未允许进入的房间或会议室</div>
                </div>
                <div class="row mt10">
                  <div class="col-xs-4">是否允许进入：</div>
                  <div class="col-xs-8" v-if="iSpaceGrantAuthority.type">是</div>
                  <div class="col-xs-8" v-else>否</div>
                </div>
                <div class="row mt10">
                  <div class="col-xs-4">开始日期时间：</div>
                  <div class="col-xs-8">{{iSpaceGrantAuthority.startDateTime | simpleDateTime}}</div>
                </div>
                <div class="row mt10">
                  <div class="col-xs-4">结束日期时间：</div>
                  <div class="col-xs-8">{{iSpaceGrantAuthority.endDateTime | simpleDateTime}}</div>
                </div>
                <!--<div><span>门禁ID集合：{{iSpaceGrantAuthority.doorList.toString()}}</span></div>-->
              </div>
            </div>
        </NbSlidePanel>
			</div>
		</div>
	</div>

</template>
<script>
  import {Notification} from 'element-ui';
  import ISpaceGrantAuthority from "../../../../common/model/ispace/door/ISpaceGrantAuthority";
  import UserProfileLink from "../../../../backyard/view/widget/UserProfileLink.vue";
  import NbSlidePanel from '../../../../common/widget/NbSlidePanel.vue';

  export default {

		data () {
			return {
				iSpaceGrantAuthority: new ISpaceGrantAuthority()
			}
		},
		components: {
      UserProfileLink,
      NbSlidePanel
    },
		methods: {},
		mounted(){
			let that = this;
      /*that.iSpaceGrantAuthority.id = that.$store.state.route.params.id;*/
      that.iSpaceGrantAuthority.id = that.$store.state.route.query.id;
			if (that.iSpaceGrantAuthority.id) {
        that.iSpaceGrantAuthority.httpDetail();
			}
		}
	}
</script>

<style lang="less" rel="stylesheet/less">
	.by-task-detail {
		.mail-body {
			.screen {
				width: 304px;
        height: 574px;
        background: white;
        border: #888888 2px solid;
        .img {
          width: 300px;
          height: 480px;
          background-size: cover;
        }
        .bottom {
          height: 90px;
          width: 300px;
          .small-bell {
            width: 70px;
            height: 70px;
            border: white 5px solid;
            border-radius: 100%;
            color: white;
            margin: -22px auto auto auto;
            background-color: #ddd2d9;
            text-align: center;
            line-height: 75px;
          }
          .qr-code {
          }
        }
			}
		}
	}
</style>
