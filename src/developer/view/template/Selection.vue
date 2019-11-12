<template>
	<div>

		<NbPagerSelection :pager="pager" :activeItem="activeTemplate">

			<span slot="title">
				{{activeTemplate.name?"#"+activeTemplate.id+" "+activeTemplate.name:"请选择模板..."}}
			</span>

			<div class="mb10 p10 cursor br4" v-for="template in pager.templates"
			     @click.stop.prevent="clickItem(template)"
			     :class="{'bg-white':template.id !== activeTemplate.id,'bg-azure':template.id === activeTemplate.id}"
			     slot="cells">

				<div class="media">
					<div class="pull-left">
						<img class="img-rounded img-md" v-if="template.poster && template.poster.url" :src="template.poster.url">
					</div>

					<div class="media-body">
						<div>
							<span class="ml5 f15">{{template.name}}</span>
							<span :class="'label label-'+template.getTypeStyle()">{{template.getTypeName()}}</span>
						</div>

						<div class="mv5">描述：{{template.description}}</div>
						<span class="text-xs">#{{template.id}}</span>
						<span class="text-xs">创建于:{{template.createTime | simpleDateTime}}</span>
					</div>
				</div>

			</div>

		</NbPagerSelection>


	</div>

</template>
<script>
	import Pager from "../../../common/model/base/Pager";
	import Template from "../../../common/model/template/Template";
	import NbPagerSelection from "../../../common/widget/NbPagerSelection";

	export default{
		data(){
			return {
				pager: new Pager(Template, 5)

			}
		},
		props: {
			activeTemplate: {
				type: Template,
				required: true
			}
		},
		watch: {},
		methods: {
			clickItem(template){
				this.activeTemplate.render(template);
			}
		},
		components: {
			NbPagerSelection
		},
		mounted(){

		}
	}
</script>
