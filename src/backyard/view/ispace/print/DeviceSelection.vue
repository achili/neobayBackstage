<template>
  <div>

    <NbPagerSelection :pager="pager" :activeItem="activeDevice">

			<span slot="title">
				{{activeDevice.id&&activeDevice.id?" "+activeDevice.name:"请选择打印机..."}}
			</span>

      <div class="mb10 p10 cursor br4 border" v-for="addedPrint in pager.addedPrints"
           @click.stop.prevent="clickItem(addedPrint)"
           :class="{'bg-white':addedPrint.id !== activeDevice.id,'bg-azure':addedPrint.id === activeDevice.id}"
           slot="cells">

        <div class="media">
          <div class="media-body">
            <div>
              <span class="mr10">{{addedPrint.name}}</span>
            </div>
          </div>
        </div>

      </div>

    </NbPagerSelection>
  </div>

</template>
<script>
  import Pager from "../../../../common/model/base/Pager";
  import NbPagerSelection from "../../../../common/widget/NbPagerSelection";
  import AddedPrint from "../../../../common/model/ispace/print/AddedPrint";
  import PrintInformation from "../../../../common/model/ispace/print/PrintInformation";

	export default{
		data(){
			return {
				pager: new Pager(AddedPrint, 10),
        print: new PrintInformation()
			}
		},
		props: {
      activeDevice: {
				type: AddedPrint,
				required: true
			},
			initFilter: {
				type: Object,
				required: false
			}
		},
		watch: {},
		methods: {
			clickItem(addedPrint){
        console.log(this.activeDevice);
				this.activeDevice.render(addedPrint);
			}
		},
		components: {
			NbPagerSelection
		},
		mounted(){

		}
	}
</script>
