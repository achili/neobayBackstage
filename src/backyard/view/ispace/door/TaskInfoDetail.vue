<template>
	<div class="by-task-detail animated fadeIn">

		<div class="row">

			<div class="col-xs-12">
				<div class="mail-box-header">
          <div class="pull-right">
            <button title="编辑" class="btn btn-success"
                    @click.stop.prevent="$router.push('/by/task/info/edit?templateId='+iSpaceTaskInfo.templateId)">
                   <!-- @click.stop.prevent="$router.push('/by/task/info/edit/'+iSpaceTaskInfo.templateId)">-->
              <i class="fa fa-pencil"></i>
              编辑
            </button>
          </div>
				</div>

				<div class="mail-box">
					<div class="mail-body">
						<div class="text-center" v-show="iSpaceTaskInfo.loading">
							<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
						</div>
            <div class="row">
              <div class="col-md-4">
                <div class="screen">
                  <div class="img" v-if="iSpaceTaskInfo.imageKey"
                       :style="'background-image: url(\'' + 'http://xsb3.oss-cn-shanghai.aliyuncs.com/client/' + iSpaceTaskInfo.imageKey + '\')'">
                  </div>
                  <div class="bottom">
                    <div class="small-bell">
                      <i class="fa fa-bell-o fa-3x" aria-hidden="true"></i>
                    </div>
                    <div class="qr-code"></div>
                  </div>
                </div>

              </div>
              <div class="col-md-8">
                <div class="row mt10">
                  <h3><span>主题ID:{{iSpaceTaskInfo.templateId}}</span></h3>
                </div>
                <div class="row mt10">
                  <span>开始日期时间：</span>
                  <span>{{iSpaceTaskInfo.broadStartDateTime | simpleDateTime}}</span>
                </div>
                <div class="row mt10">
                  <span>结束日期时间：</span>
                  <span>{{iSpaceTaskInfo.broadEndDateTime | simpleDateTime}}</span>
                </div>
                <!--<div><span>门禁ID集合：{{iSpaceTaskInfo.doorList.toString()}}</span></div>-->
                <div class="row mt10">
                  <span>门名称：</span>
                  <span class="text-info cursor"  v-for="item in doorNameList" :key="item.id"
                        @click.stop.prevent="$router.push('/by/door/detail?doorId='+item.doorId)">
                    {{item.doorName}}
                  </span>
                </div>
              </div>
            </div>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>
<script>
	import {Notification} from 'element-ui';
  import ISpaceTaskInfo from "../../../../common/model/ispace/door/ISpaceTaskInfo";
  import ISpaceDoor from "../../../../common/model/ispace/door/ISpaceDoor";
  import Pager from "../../../../common/model/base/Pager";
  import NbCheckbox from '../../../../common/widget/NbCheckbox.vue';

	export default {

		data () {
			return {
				iSpaceTaskInfo: new ISpaceTaskInfo(),
        doorNameList: []
			}
		},
		components: {
      NbCheckbox
    },
		methods: {},
		mounted(){
			let that = this;
			/*this.iSpaceTaskInfo.templateId = this.$store.state.route.params.templateId;*/
			this.iSpaceTaskInfo.templateId = this.$store.state.route.query.templateId;
			if (this.iSpaceTaskInfo.templateId) {
        this.iSpaceTaskInfo.httpDetailTaskInfo(
          function () {
            // let resDoorList = JSON.parse(that.iSpaceTaskInfo.doorList);
            // for (let i in resDoorList) {
            //   that.doorDetails.doorId = resDoorList[i].doorId;
            //   if (that.doorDetails.doorId) {
            //     that.iSpaceTaskInfo.doorDetails.doorId = that.doorDetails.doorId;
            //     that.iSpaceTaskInfo.doorDetails.httpDetail();
            //   }
            //   console.log(that.iSpaceTaskInfo.doorDetails)
            //   that.iSpaceTaskInfo.doorNameList.push(that.iSpaceTaskInfo.doorDetails);
            //   console.log(that.iSpaceTaskInfo.doorNameList)
            // }

            that.iSpaceTaskInfo.doorList.forEach(door => {
              let iSpaceDoor = new ISpaceDoor();
              iSpaceDoor.doorId = door.doorId;
              iSpaceDoor.httpDetail(function () {
                that.doorNameList.push(iSpaceDoor);
              });
            })
          }
        );
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
