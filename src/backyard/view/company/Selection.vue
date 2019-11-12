<template>
  <div>

    <NbPagerSelection :pager="pager" :activeItem="activeCompany" :initFilter="initFilter">

			<span slot="title">
				<span v-if="activeCompany.name&&activeCompany.id">
					{{activeCompany.name}}
				</span>
				<span v-else>
					请选择一个企业...
				</span>

        <i class="fa fa-times-circle-o sort-close" v-show="activeCompany !== null && activeCompany.name !== null" @click="clear"></i>
			</span>

      <div class="mb10 p10 cursor br4 border" v-for="company in pager.companies"
           @click.stop.prevent="clickItem(company)"
           :class="{'bg-white':company.id !== activeCompany.id,'bg-azure':company.id === activeCompany.id}"
           slot="cells">
        <div>
          <span class="f15">{{company.name}}</span>
        </div>
      </div>

    </NbPagerSelection>


  </div>

</template>
<script>
  import Pager from "../../../common/model/base/Pager";
  import NbPagerSelection from "../../../common/widget/NbPagerSelection";
  import Company from "../../../common/model/company/Company";

  export default{
    data(){
      return {
        pager: new Pager(Company, 5)
      }
    },
    props: {
      activeCompany: {
        type: Company,
        required: true
      },
      initFilter: {
        type: Object,
        required: false
      }
    },
    watch: {},
    methods: {
      clickItem(company){
        this.activeCompany.render(company);
      },
      clear(){
        this.activeCompany.render(new Company());
      }

    },
    components: {
      NbPagerSelection
    },
    mounted(){


    }
  }
</script>
