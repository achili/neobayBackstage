<template>
  <div>

    <NbPagerSelection :pager="pager" :activeItem="activeFinanceElectricPay" :initFilter="initFilter">

      <span slot="title">
        {{activeFinanceElectricPay.name && activeFinanceElectricPay.id ?"#" + activeFinanceElectricPay.id + " " + activeFinanceElectricPay.name: "请选择一个电费付款信息单..."  }}
      </span>

      <div class="mb10 p10 cursor br4 border" v-for="financeElectricPay in pager.financeElectricPays"
            @click.stop.prevent="clickItem(financeElectricPay)"
            :class="{'bg-white': financeElectricPay.id !== activeFinanceElectricPay.id,'bg-azure': financeElectricPay.id === activeFinanceElectricPay.id }"
            slot="cells">
        <div>
          <span class="f15">#{{financeElectricPay.id}} {{financeElectricPay.name}}</span>
          <span :class="'label label-'+ financeElectricPay.getStatusStyle()">{{financeElectricPay.getStatusName()}}</span>
        </div>

      </div>

    </NbPagerSelection>

  </div>
</template>

<script>

  import NbPagerSelection from "../../../../../common/widget/NbPagerSelection";
  import Pager from "../../../../../common/model/base/Pager";
  import FinanceElectricPay from "../../../../../common/model/finance/FinanceElectricPay";

  export default {
      data(){
        return {
          pager: new Pager(FinanceElectricPay,5)
        }
      },
      computed:{},
      components:{
        NbPagerSelection
      },
      props:{
        activeFinanceElectricPay :{
          type: FinanceElectricPay,
          required: true
        },
        initFilter: {
          type: Object,
          required: false
        }
      },
      watch:{},
      methods:{
        clickItem(financeElectricPay){
          this.activeFinanceElectricPay.render(financeElectricPay);
        }
      },
      mounted(){

      }
    }
</script>

<style scoped>

</style>
