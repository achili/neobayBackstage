<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">

        <LoadingFrame :loading="entryBatch.detailLoading">

          <div class="text-right mb10">
            <a title="编辑" class="btn btn-success" @click.stop.prevent="$router.push('/by/entry/batch/edit/'+entryBatch.id)">
              <i class="fa fa-pencil"></i>
              编辑
            </a>
          </div>

          <NbSlidePanel title="入驻批次详情">
            <div class="row">
              <div class="col-md-2">批次名称</div>
              <div class="col-md-10 bold">{{entryBatch.name}}</div>
            </div>
            <div class="row mt10">
              <div class="col-md-2">园区地点</div>
              <div class="col-md-10 bold">{{entryBatch.spaceRegional.name}}</div>
            </div>
            <div class="row mt10">
              <div class="col-md-2">创建时间</div>
              <div class="col-md-10 bold">{{entryBatch.createTime | humanTime}}</div>
            </div>
            <div class="row mt10">
              <div class="col-md-2">批次状态</div>
              <div class="col-md-10 bold">
                <span :class="'label label-'+entryBatch.getStatusStyle()">
                  {{entryBatch.getStatusName()}}
                </span>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-2">批次号</div>
              <div class="col-md-10 bold">{{entryBatch.no}}</div>
            </div>

            <div class="row mt10">
              <div class="col-md-2">批次日期范围</div>
              <div class="col-md-10 bold">
                {{entryBatch.startTime | humanTime}} 到 {{entryBatch.endTime | humanTime}}
              </div>
            </div>

            <div class="row mt10">
              <div class="col-md-2">备注</div>
              <div class="col-md-10 bold">
                {{entryBatch.description}}

              </div>
            </div>

          </NbSlidePanel>

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
	import {MessageBox, Notification} from 'element-ui'

	import EntryBatch from  "../../../../common/model/entry/batch/EntryBatch"
	import NbSlidePanel from  "../../../../common/widget/NbSlidePanel.vue"
  import LoadingFrame from "../../widget/LoadingFrame";

	export default{
		data(){
			return {
				entryBatch: new EntryBatch()
			}
		},
		components: {
			NbSlidePanel,
      LoadingFrame
		},
		methods: {
			fetchDetail(){
				let that = this;
				this.entryBatch.id = this.$store.state.route.params.id;
				if (this.entryBatch.id) {
					this.entryBatch.httpDetail();
				}
			}
		},
		mounted(){
			this.fetchDetail();
		}
	}
</script>
