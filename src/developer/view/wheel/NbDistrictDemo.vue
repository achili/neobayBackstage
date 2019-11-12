<template>
	<div>
    <div class="alert alert-info">
      <p>您是不是厌烦了为了填写地址而重复地打字？</p>
      <p>是否因为地名生僻而打不出来？</p>
      <p>您是不是早觉得以选择的形式填写地址更好？</p>
      <p>从现在开始</p>
      <p>解放您的双手，尽情地享受吧！</p>
    </div>

    <div>
      maxLevel=4 地址：{{address1}}
      <NbDistrict v-model="address1" :maxLevel="4"></NbDistrict>
    </div>

    <div>
      maxLevel=2 地址：{{address4}}
      <NbDistrict v-model="address4" :maxLevel="2"></NbDistrict>
    </div>

    <div>
      maxLevel=3 地址：{{address2}}
      <NbDistrict v-model="address2" :maxLevel="3"></NbDistrict>
    </div>

    <div>
      maxLevel没定义 地址：{{address3}}
      <NbDistrict v-model="address3"></NbDistrict>
    </div>

    <div>
      maxLevel没定义 地址：null 地址：{{address5}}
      <NbDistrict v-model="address5"></NbDistrict>
    </div>

	</div>

</template>
<script>

	import NbDistrict from "../../../common/widget/NbDistrict.vue";
	export default{
		data(){
			return {
        address1: "吉林省 白城市 镇赉县",
        address2: "霍格沃兹",
        address3: "北京市 此路是我开 此树是我栽",
        address4: "山西省 阳泉市 盂县 仙人乡",
        address5: null

			}
		},
		watch: {},
		methods: {},
		components: {
			NbDistrict
		},
		mounted(){}
	}
</script>
