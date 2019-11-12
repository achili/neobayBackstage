<template>
	<div class="row">

		<div class="col-xs-12">

			<div class="text-center" v-show="financeStatement.loading">
				<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
			</div>


			<div class="finance-statement-block" v-show="!financeStatement.loading">

				<div class="title">
					零号湾场地租赁合同缴付执行明细表
				</div>

				<div class="table-block">
					<table>
						<tr>
							<th></th>
							<th :colspan="protocolBasicCols">合同基本信息</th>
							<th :colspan="protocolItemCols">合同款项信息</th>
						</tr>

						<tr>
							<th v-for="(th1,th1Index) in thItems1" :rowspan="th1.rowspan" :colspan="th1.colspan">{{th1.name}}</th>
						</tr>
						<tr>
							<td v-for="(td1,td1Index) in tdItems1">{{td1}}</td>
						</tr>

						<tr v-for="(item,itemIndex) in financeStatement.items">
							<td v-for="(td,tdIndex) in item.tds">{{td}}</td>
						</tr>

						<tr>
							<th v-for="(th2,th2Index) in thItems2" :colspan="th2Index===0?10:1">{{th2}}</th>
						</tr>
					</table>
				</div>
			</div>
      <!--自己分页查询显示-->
      <div class="page-bar">
        <ul>
          <li v-if="cur>1"><a v-on:click="cur--, pageClick()">上一页</a></li>
          <li v-if="cur === 1"><a class="banClick">上一页</a></li>

          <li v-for="index in indexs"  v-bind:class="{ 'active': cur === index}">
            <a v-on:click="btnClick(index)">{{ index }}</a>
          </li>

          <li v-if="cur!==all"><a v-on:click="cur++,pageClick()">下一页</a></li>
          <li v-if="cur === all"><a class="banClick">下一页</a></li>
          <!--<li><a>共<i>{{all}}</i>页</a></li>-->
        </ul>
      </div>
		</div>
	</div>
</template>
<script>

  import {MessageBox} from 'element-ui'
  import FinanceStatement from "../../../common/model/finance/statement/FinanceStatement"

  export default{
		data(){
			return {
        financeStatement: new FinanceStatement(),
        //<!--自己分页查询显示-->
        all: 100, //总页数
        cur: 1//当前页码
			}
		},
    props: {
    },
		components: {
    },
		computed: {
			protocolBasicCols(){
				return 9;
			},
			protocolItemCols(){
				return 7 + this.financeStatement.maxPayTimes * 6 + 4;
			},
			thItems1(){
				let arr = [];
				arr.push({
					rowspan: 2,
					colspan: 1,
					name: "合同状态"
				});
				arr.push({
					rowspan: 2,
					colspan: 1,
					name: "序号"
				});
				arr.push({
					rowspan: 2,
					colspan: 1,
					name: "检索编号"
				});
				arr.push({
					rowspan: 2,
					colspan: 1,
					name: "合同编号"
				});
				arr.push({
					rowspan: 2,
					colspan: 1,
					name: "名称"
				});
				arr.push({
					rowspan: 2,
					colspan: 1,
					name: "联系人"
				});
				arr.push({
					rowspan: 2,
					colspan: 1,
					name: "联系方式"
				});
				arr.push({
					rowspan: 2,
					colspan: 1,
					name: "租赁房屋/工位"
				});
				arr.push({
					rowspan: 2,
					colspan: 1,
					name: "租赁面积"
				});
				arr.push({
					rowspan: 2,
					colspan: 1,
					name: "租赁期限"
				});
				arr.push({
					rowspan: 2,
					colspan: 1,
					name: "每月约定租金（元）"
				});
				arr.push({
					rowspan: 2,
					colspan: 1,
					name: "抵扣及补贴总额（元）"
				});
				arr.push({
					rowspan: 2,
					colspan: 1,
					name: "每月抵扣金额（元）"
				});
				arr.push({
					rowspan: 2,
					colspan: 1,
					name: "实际每月应缴现金租金金额（元）"
				});
				arr.push({
					rowspan: 1,
					colspan: 3,
					name: "履约保证金（元）"
				});

				for (let i = 0; i < this.financeStatement.maxPayTimes; i++) {
					arr.push({
						rowspan: 1,
						colspan: 6,
						name: "第" + (i + 1) + "次付款"
					});
				}
				arr.push({
					rowspan: 1,
					colspan: 4,
					name: "汇总"
				});

				return arr;
			},
			tdItems1(){
				let arr = [];
				arr.push("应收金额");
				arr.push("实收金额");
				arr.push("应收余额");
				for (let i = 0; i < this.financeStatement.maxPayTimes; i++) {
					arr.push("付款起始时间");
					arr.push("付款通知日");
					arr.push("应收金额");
					arr.push("抵扣金额");
					arr.push("实收金额（元）");
					arr.push("应收余额");
				}
				arr.push("应收金额");
				arr.push("实收金额");
				arr.push("应收余额");
				arr.push("抵扣总额");
				return arr;
			},
			thItems2(){
				let arr = [];
				arr.push("汇总");
				arr.push(this.financeStatement.rental);
				arr.push(this.financeStatement.totoalInnoToken);
				arr.push(this.financeStatement.innoToken);
				arr.push(this.financeStatement.realRental);

				arr.push(this.financeStatement.deposit);
				arr.push(this.financeStatement.receiptDeposit);
				arr.push(this.financeStatement.balanceDeposit);


				for (let i = 0; i < this.financeStatement.maxPayTimes; i++) {

					if (i < this.financeStatement.bills.length) {
						let bill = this.financeStatement.bills[i];
						arr.push("当期金额");
						arr.push("");
						arr.push(bill.amount);
						arr.push(bill.innoToken);
						arr.push(bill.receiptAmount);
						arr.push(bill.balanceAmount);
					} else {
						for (let j = 0; j < 6; j++) {
							arr.push("");
						}
					}
				}
				arr.push(this.financeStatement.amount);
				arr.push(this.financeStatement.receiptAmount);
				arr.push(this.financeStatement.balanceAmount);
				arr.push(this.financeStatement.innoTokenTotal);
				return arr;
			},

      //<!--自己分页查询显示-->
      indexs: function(){
        let left = 1;
        let right = this.all;
        let ar = [];
        if(this.all >= 5){
          if(this.cur > 3 && this.cur < this.all - 2){
            left = this.cur - 2
            right = this.cur + 2
          }else{
            if(this.cur <= 3){
              left = 1
              right = 5
            }else{
              right = this.all
              left = this.all - 4
            }
          }
        }
        while (left <= right){
          ar.push(left)
          left++
        }
        return ar
      }
		},
		watch: {
      //<!--自己分页查询显示-->
      cur: function(oldValue , newValue){
      }
    },
		methods: {
      //<!--自己分页查询显示-->
      btnClick: function(data){ //页码点击事件
        if(data !== this.cur){
          this.cur = data
        }
        this.financeStatement.cur = this.cur;
        this.financeStatement.httpReport();
      },
      pageClick: function(){
        this.financeStatement.cur = this.cur;
        this.financeStatement.httpReport();
      },



			save(){

			},
			fetchDetail(){
				let that = this;

			},
      refresh() {
        this.financeStatement.httpReport();
      }
		},
		mounted(){
			let that = this;
      this.refresh();

		}
	}
</script>

<style lang="less" rel="stylesheet/less">
	.finance-statement-block {

		background: white;
		padding: 10px;
		border-radius: 4px;

		.title {
			font-size: 18px;
			text-align: center;
		}

		.table-block {

			overflow-x: auto;

			table {
				margin-top: 10px;
				width: 100%;
				border: solid #000;
				border-width: 1px 0 0 1px;
				border-spacing: 0;

				th {
					text-align: center;
				}
				th, td {
					height: 55px;
					border: solid #000;
					border-width: 0 1px 1px 0;
					padding: 10px;
					min-width: 60px;
				}
			}
		}

	}
  //<!--自己分页查询显示-->
  .page-bar{
    margin:40px;
  }
  ul,li{
    margin: 0px;
    padding: 0px;
  }
  li{
    list-style: none
  }
  .page-bar li:first-child>a {
    margin-left: 0px
  }
  .page-bar a{
    border: 1px solid #ddd;
    text-decoration: none;
    position: relative;
    float: left;
    padding: 6px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: #337ab7;
    cursor: pointer
  }
  .page-bar a:hover{
    background-color: #eee;
  }
  .page-bar a.banClick{
    cursor:not-allowed;
  }
  .page-bar .active a{
    color: #fff;
    cursor: default;
    background-color: #337ab7;
    border-color: #337ab7;
  }
  .page-bar i{
    font-style:normal;
    color: #d44950;
    margin: 0px 4px;
    font-size: 12px;
  }

</style>
