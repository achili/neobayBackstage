<template>
	<div class="nb-filter-http-selection" v-show="filter.visible">
    <div v-if="isEntitled">
      <div class="title-area clearfix">
			<span>
				<span>
					{{activeItem.name||activeItem.nickname?"#"+activeItem.id+" "+(activeItem.name?activeItem.name:activeItem.nickname):"请选择..."}}
				</span>
				<a class="btn-action f18 color-555" v-show="activeItem.id" @click.stop.prevent="clear">
					<i class="fa fa-times-circle-o pager-selection-close"></i>
				</a>
			</span>
        <button class="btn btn-default btn-sm ml15" @click="show=!show">
				<span v-if="show">
            <i class="fa fa-angle-up"></i>
				收起
          </span>
          <span v-else>
            <i class="fa fa-angle-down"></i>
				选择
        </span>

        </button>
      </div>
      <NbExpanding>
        <div v-show="show">
          <div class="content-area">
            <div class="row">

              <div class="form-group mb10" v-for="filter in pager.FILTERS" v-if="filter.type === filter.Type.INPUT && filter.visible && filter.key === 'keyword'">
                <label class="col-md-3 control-label pt5" style="text-align: center;">{{filter.name}}</label>
                <div class="col-md-8">
                  <input type="text" :placeholder="filter.name" v-model="filter.value" class="form-control"
                         @keyup.enter="refresh">
                </div>
              </div>

              <div class="col-xs-12">
                <div class="mb10 p10 cursor br4 border" v-for="item in pager.getList()"
                     @click.stop.prevent="clickItem(item)"
                     :class="{'bg-white':item.id !== activeItem.id,'bg-azure':item.id === activeItem.id}">
                  <div>
                    <!--兼容用户-->
                    <span class="f15">#{{item.id}} {{!item.name? item.nickname:item.name}}</span>
                  </div>
                </div>
              </div>


              <div class="col-xs-12 mt20">
                <NbPager :pager="pager" :callback="refresh"></NbPager>
              </div>

            </div>
          </div>
        </div>

      </NbExpanding>
    </div>

    <div v-else class="notEntitled">暂无权限查看</div>
	</div>

</template>

<script>
  import Filter from "../../model/base/Filter";
  import Pager from "../../model/base/Pager";
  import NbExpanding from "../NbExpanding.vue";
  import NbPager from "../NbPager.vue";
  import NbFilter from "../filter/NbFilter";

  export default {
		data () {
			return {
				show: false,
				pager: new Pager(this.filter.Clazz),
				activeItem: new (this.filter.Clazz)(),
        isEntitled: true
			}
		},
		props: {
			filter: {
				type: Filter,
				required: true,
				validator: function (value) {

					if (value["type"] !== "HTTP_SELECTION") {
						console.error("type must be `HTTP_SELECTION`.");
						return false;
					}

					return true;
				}
			},
			callback: {
				type: Function,
				required: false
			}
		},
		components: {
			NbExpanding,
			NbPager,
      NbFilter
		},
		computed: {},
		methods: {
			clear(){
				this.activeItem.render(new (this.filter.Clazz)());

				this.filter.value = null;

				this.callback && this.callback();

			},
			clickItem(item){
				this.activeItem.render(item);

				this.filter.value = this.activeItem.id;

				this.show = false;

				this.callback && this.callback();
			},
			search(){
				this.pager.page = 0;
				this.refresh()
			},
			refresh(){
        let that = this;
				this.pager.httpFastPage(function () {

        },function (res) {
          if(res.data.error && res.data.error.code === 401) {
            that.isEntitled = false
          }
        });
			}
		},
		mounted(){
			this.refresh();
		}
	}
</script>

<style lang="less" rel="stylesheet/less">

	.nb-filter-http-selection {

		.title-area {

		}
    .notEntitled {
      margin-top: 7px;
    }
		.content-area {
			margin-top: 10px;
			padding: 10px;
			border: 1px dashed #1167a9;
		}

	}

</style>
