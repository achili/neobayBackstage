<template>
	<div class="nb-pager-selection">
    <div v-if="!isEntitled" class="mt8">
      暂无权限查看
    </div>

    <div v-else>
      <div class="title-area clearfix">
        <slot name="title"></slot>
        <button class="btn btn-default btn-sm ml15" @click="show=!show">
          <span v-if="show"><i class="fa fa-angle-up"></i>收起</span>
          <span v-else><i class="fa fa-angle-down"></i>选择</span>
        </button>
      </div>
      <NbExpanding>
        <div v-show="show">
          <div class="content-area">
            <div class="row">
              <div class="col-xs-12">
                <NbFilter :pager="pager" :callback="search"></NbFilter>
              </div>
              <div class="col-xs-12">
                <slot name="cells"></slot>
              </div>
              <div class="col-xs-12 mt20">
                <NbPager :pager="pager" :callback="refresh"></NbPager>
              </div>
            </div>
          </div>
        </div>
      </NbExpanding>

    </div>
	</div>
</template>


<script>
  import Pager from "../../common/model/base/Pager";
  import NbFilter from './filter/NbFilter.vue'
  import NbPager from '../../common/widget/NbPager.vue'
  import NbExpanding from '../../common/widget/NbExpanding'

  export default {
		data () {
			return {
				show: false,
        isEntitled: true
			}
		},
		props: {
			pager: {
				type: Pager,
				required: true
			},
			activeItem: {
				type: Object,
				required: true
			},
			initFilter: {
				type: Object,
				required: false
			},
			callback: {
				type: Function,
				required: false
			}

		},
		components: {
			NbFilter,
			NbPager,
			NbExpanding
		},
		watch: {
			"activeItem.id"(newVal, oldVal){
				newVal = parseInt(newVal);
				oldVal = parseInt(oldVal);

				if (newVal !== oldVal) {
					this.show = false
				}
			},
      "activeItem.doorId"(newVal, oldVal){
        if (newVal !== oldVal) {
          this.show = false
        }
      }
		},
		computed: {},
		methods: {
			search(){
				this.pager.page = 0;
				this.refresh()
			},
			refresh(){
        if (this.initFilter) {
          this.refreshFilter();
        }
        let that = this;
				this.pager.httpFastPage(function() {},function(res) {
          if(res.data.error && res.data.error.code === 401) {
            that.isEntitled = false
          }
        });
			},
      refreshFilter() {
        for (let key in this.initFilter) {
          if(this.initFilter.hasOwnProperty(key)) {
            this.pager.setFilter(key, this.initFilter[key]);
          }
        }
      }
		},
		mounted(){
			this.refresh();
		}
	}
</script>

<style lang="less" rel="stylesheet/less">

	.nb-pager-selection {

		.title-area {

		}
		.content-area {
			margin-top: 10px;
			padding: 10px;
			border: 1px dashed #1167a9;
		}

	}

</style>
