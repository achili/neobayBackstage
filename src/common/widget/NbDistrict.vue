<template>
	<div class="wheel-nb-district">
    <div class="row">
      <div class="col-sm-3 item mt5" v-for="(addressArr, index) in choiceDistrictArr">
        <select class="form-control m-b" v-model="choiceDistrictArr[index]" @change="onChange(choiceDistrictArr[index])">
          <option v-for="address in districtLevelArr[index]" :value="address">
            {{address.name}}
          </option>
        </select>
      </div>
    </div>
	</div>
</template>
<script>

	import District from "../../common/model/district/District";

	export default{
		data(){
			return {
        district: new District(),
				districtLevelArr: [],
        choiceDistrictArr: [new District()],
        address: []
      }
		},
    props: {
      value: {
        type: String,
        required: false,
        "default": ""
      },
      maxLevel: {
        type: Number,
        required: false,
        "default": 3
      }
    },
		watch: {
      "address"(newVal, oldVal){
        let addressStr = '';
        for(let i = 0; i < this.address.length; i++) {
          addressStr += this.address[i];
          addressStr += ' ';
        }
        this.$emit('input', addressStr);
      }
    },
		methods: {
      onChange(myAddressDistrict){
        this.address[myAddressDistrict.level - 1] = myAddressDistrict.name;
        let that = this;
        //先随便切割下数组，确保触发watch；
        this.address.splice([myAddressDistrict.level]);
        if(myAddressDistrict.level > this.maxLevel - 1) {
          return;
        }
        this.choiceDistrictArr.splice([myAddressDistrict.level]);
        this.districtLevelArr.splice([myAddressDistrict.level]);
        myAddressDistrict.httpGetChildren(function (childrenArr) {
          if(childrenArr instanceof Array){
            if(childrenArr.length > 0) {
              that.districtLevelArr.push(childrenArr);
              that.choiceDistrictArr.push(new District());
            }
          }
        });
      },
      init(myAddressDistrict) {
        if(myAddressDistrict.level > this.maxLevel - 1) {
          return;
        }
        this.choiceDistrictArr.push(new District());
        let that = this;
        myAddressDistrict.httpGetChildren(function (childrenArr) {
          if (childrenArr instanceof Array) {
            if (childrenArr.length > 0) {
              that.districtLevelArr.push(childrenArr);
            }
          }
          let myDistrict = that.findByName(myAddressDistrict.level, that.address[myAddressDistrict.level]);
          if (that.address[myAddressDistrict.level] && myDistrict) {
            //此处发生递归
            that.init(myDistrict);
            //回填本家
            that.choiceDistrictArr[myAddressDistrict.level] = myDistrict;
          }
        });
      },
      findByName(level, name) {
        let districtArr = this.districtLevelArr[level];
        for(let i = 0; i < districtArr.length; i++) {
          if(districtArr[i].name === name) {
            return districtArr[i];
          }
        }
      },
      valueChange() {
        let that = this;
        //获取第一层地址列表
        this.district.httpGetLevelFirst(function (LevelFirst) {
          that.districtLevelArr.push(LevelFirst);
          //检查有没有需要回填第一层
          if(that.value) {
            that.address = that.value.split(" ");
            if (that.address[0] && that.findByName(0, that.address[0])) {
              that.choiceDistrictArr[0] = that.findByName(0, that.address[0]);
              that.init(that.choiceDistrictArr[0]);
            }
          }
        });
      }
    },
		components: {},
		mounted(){
      this.valueChange()
		}
	}
</script>

<style lang="less">
  .wheel-nb-district {
    margin-right: 10px;
    margin-left: 10px;
    .item {
      margin-right: -10px;
      margin-left: -10px;
    }
    select {
      margin: 0px;
    }
  }
</style>
