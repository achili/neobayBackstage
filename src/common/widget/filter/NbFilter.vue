<template>

	<div class="clearfix" v-show="!pager.errorMessage">
		<div class="text-right mb10" v-show="filters.length > 0">
			<slot></slot>
			<button v-if="allowOpen" class="btn btn-sm btn-info" @click="show=!show">
				<i class="fa fa-filter"></i>
				<span v-if="show">
            收起筛选
          </span>
				<span v-else>
            打开筛选
        </span>
			</button>
		</div>

    <div class="form-group mb50" v-for="filter in filters" v-if="filter.type === filter.Type.INPUT && filter.visible && filter.key === 'keyword'">
      <label class="col-md-3 control-label pt5" style="text-align: center;">{{filter.name}}</label>
      <div class="col-md-8">
        <input type="text" :placeholder="filter.name" v-model="filter.value" class="form-control"
               @keyup.enter="search">
      </div>
    </div>

    <div class="form-horizontal" v-if="allowOpen">

      <div class="form-group" v-for="filter in filters" v-if="filter.type === filter.Type.SELECTION && filter.visible && filter.isCrux">
        <label class="col-md-2 control-label pt5">{{filter.name}}</label>
        <div class="col-md-10">
          <NbFilterSelection :filter="filter" :callback="search"/>
        </div>
      </div>
    </div>



		<NbExpanding>
			<div v-show="show" class="col-xs-12 bg-aliceblue border-dash mb10">

				<div class="form-horizontal pt10 pb10">

					<div class="form-group" v-for="filter in filters" v-if="filter.type === filter.Type.INPUT && filter.visible  && filter.key !== 'keyword'">
						<label class="col-md-2 control-label pt5">{{filter.name}}</label>
						<div class="col-md-10">
							<div class="row">
								<div class="col-md-4">
									<input type="text" :placeholder="filter.name" v-model="filter.value" class="form-control"
									       @keyup.enter="search">
								</div>
							</div>
						</div>
					</div>

					<div class="form-group" v-if="hasSortType">
						<label class="col-md-2 control-label pt5">排序</label>
						<div class="col-md-10">

							<span v-for="filter in filters" v-if="filter.type === filter.Type.SORT && filter.visible">
								<NbFilterSort :filter="filter" :callback="search"/>
							</span>

						</div>
					</div>

					<div class="form-group" v-if="hasCheckType">
						<label class="col-md-2 control-label pt5">勾选</label>
						<div class="col-md-10">

							<span v-for="filter in filters" v-if="filter.type === filter.Type.CHECK && filter.visible">
								<NbFilterCheck :filter="filter" :callback="search"/>
							</span>

						</div>
					</div>

					<div class="form-group" v-for="filter in filters" v-if="filter.type === filter.Type.SELECTION && filter.visible">
						<label class="col-md-2 control-label pt5">{{filter.name}}</label>
						<div class="col-md-10">
							<NbFilterSelection :filter="filter" :callback="search"/>
						</div>
					</div>

					<div class="form-group" v-for="filter in filters" v-if="filter.type === filter.Type.MULTI_SELECTION && filter.visible">
						<label class="col-md-2 control-label pt5">{{filter.name}}</label>
						<div class="col-md-10">
							<NbFilterMultiSelection :filter="filter" :callback="search"/>
						</div>
					</div>

					<div class="form-group" v-for="filter in filters" v-if="filter.type === filter.Type.HTTP_SELECTION && filter.visible">
						<label class="col-md-2 control-label pt5">{{filter.name}}</label>
						<div class="col-md-10">
							<NbFilterHttpSelection :filter="filter" :callback="search"/>
						</div>
					</div>

					<div class="form-group" v-for="filter in filters" v-if="filter.type === filter.Type.DATE_TIME_SELECTION && filter.visible">
						<label class="col-md-2 control-label pt5">{{filter.name}}</label>
						<div class="col-md-10">
							<NbFilterDateTime :filter="filter" :callback="search"/>
						</div>
					</div>

          <div class="form-group" v-for="filter in filters" v-if="filter.type === filter.Type.SPACE_MULTI_SELECTION && filter.visible" >
            <label class="col-md-2 control-label pt5">{{filter.name}}</label>
            <div class="col-md-10" v-if="hasSpaceMulti">
              <NbFilterSpaceMultiSelection :filter="filter" :callback="search"></NbFilterSpaceMultiSelection>
            </div>
          </div>

					<div class="text-right">
						<button class="btn btn-sm btn-primary" @click.stop.prevent="search">
							<i class="fa fa-search"></i>
							搜索
						</button>
					</div>

				</div>
			</div>
		</NbExpanding>
	</div>

</template>

<script>

	import NbExpanding from '../NbExpanding'
	import Pager from "../../model/base/Pager";
	import Filter from "../../model/base/Filter";
	import NbFilterSort from "./NbFilterSort";
	import NbFilterCheck from "./NbFilterCheck";
	import NbFilterDateTime from "./NbFilterDateTime.vue";
	import NbFilterSelection from "./NbFilterSelection";
	import NbFilterMultiSelection from "./NbFilterMultiSelection";
	import NbFilterHttpSelection from "./NbFilterHttpSelection";
  import NbFilterSpaceMultiSelection from "./NbFilterSpaceMultiSelection";


	export default {
		data () {
			return {
				show: false,
        allowOpen: true
			}
		},
		components: {
			NbExpanding,
			NbFilterSort,
			NbFilterCheck,
			NbFilterDateTime,
			NbFilterSelection,
			NbFilterMultiSelection,
			NbFilterHttpSelection,
      NbFilterSpaceMultiSelection
		},
		props: {
			pager: {
				type: Pager,
				required: true,
				validator: function (value) {
					return true;
				}
			},
			callback: {
				type: Function,
				required: false
			}
		},
		computed: {
			filters(){
				return this.pager.FILTERS;
			},
			hasSortType(){
				for (let i = 0; i < this.filters.length; i++) {
					let filter = this.filters[i];
					if (filter.type === Filter.prototype.Type.SORT) {
						return true;
					}
				}
				return false;
			},
			hasCheckType(){
				for (let i = 0; i < this.filters.length; i++) {
					let filter = this.filters[i];
					if (filter.type === Filter.prototype.Type.CHECK) {
						return true;
					}
				}
				return false;
			},
      hasSpaceMulti(){
        for (let i = 0; i < this.filters.length; i++) {
          let filter = this.filters[i];
          if (filter.type === Filter.prototype.Type.SPACE_MULTI_SELECTION) {
            this.pager.setFilter("spaceRegionalIds",filter.value)
            return true;
          }
        }
        return false;
      }

		},
		watch: {},
		methods: {
			search(){
				this.callback && this.callback();
			}
		},
		mounted(){
      if(this.filters && this.filters.length === 1 && this.filters[0].key === 'keyword') {
        this.allowOpen = false;
      }
		}
	}
</script>
