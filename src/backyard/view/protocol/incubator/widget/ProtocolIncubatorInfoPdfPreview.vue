<template>
	<div class="row protocol-incubator-preview">
		<div class="col-xs-12">
			<NbSlidePanel type="info" :initShow="false">
      <span slot="heading" class="f16">
        <i class="fa fa-file-pdf-o"></i>
        孵化协议
      </span>
				<div slot="body">

          <div class="pdf-container">

            <h1>
              零号湾孵化器孵化协议
            </h1>
            <div class="no">
              合同编号：{{protocolIncubator.no}}
            </div>
            <div class="lh35">
              <span class="party">甲方：{{protocolIncubator.partyA}}</span>
            </div>
            <div class="lh35">
              <span class="party">乙方：{{protocolIncubator.partyB}}</span>
            </div>
            <div>
              <p class="indent">
                甲乙双方本着平等互重、恪守信用的原则，就企业（项目）培育孵化等有关事宜，经充分协商，达成下列各项条款：
              </p>
            </div>
            <div>
              <H2>一、基本原则</H2>
              <p class="indent">
                1、本协议的目的是为了加速高新技术成果的转化、加快高新技术企业培育“孵化”进程，促进本地高新技术产业的发展。<br/>
              </p>
              <p class="indent">
                2、本协议仅确立甲、乙双方孵化与被孵化的关系。<br/>
              </p>
              <p class="indent">
                3、被孵化的企业应符合国科发高[2010]680号《科技企业孵化器认定和管理办法》第十条在孵企业应具备下列条件。<br/>
              </p>
            </div>
            <div>
              <H2>二、期限与场地</H2>
              <p class="indent">
                1、甲乙双方同意建立孵化关系，孵化期限定为 <u>{{protocolIncubator.year}}</u>
                年，自 <u>{{protocolIncubator.startTime | date("yyyy年MM月dd日")}}</u>
                至 <u>{{protocolIncubator.endTime | date("yyyy年MM月dd日")}}</u>止。 <br/>
              </p>
              <p class="indent">
                2、孵化场地设在<u>{{protocolIncubator.space}}</u><br/>
              </p>
            </div>
            <div>
              <H2>三、甲方权利和义务</H2>
              <h3>（一）甲方可提供的服务</h3>
              <p class="indent">
                1、指导或协助乙方办理企业工商注册，税务登记等有关审批手续；<br/>
              </p>
              <p class="indent">
                2、及时传达有关科技政策信息，并提供政策、管理、投融资、财务、市场、营销、法律、人力资源等方面的咨询； <br/>
              </p>
              <p class="indent">
                3、推荐申报“上海市高新技术企业”、“上海市高新技术成果转化项目”、国家“科技型中小企业技术创新基金”、科技攻关、专项科技计划等相关项目；<br/>
              </p>
              <p class="indent">
                4、定期或不定期举办报告会、培训班、联谊会等活动； <br/>
              </p>
              <p class="indent">
                5、投资咨询与中介，为乙方争取风险投资、银行贷款、其他投资等融资服务；<br/>
              </p>
              <p class="indent">
                6、协助开展“四技”服务及国内外经济技术合作；<br/>
              </p>
              <p class="indent">
                7、协助落实有关国家、市、区相关优惠政策；<br/>
              </p>
              <p class="indent">
                8、优先、优惠提供打字、复印、会议室租用、资讯、代理等有偿服务； <br/>
              </p>
              <p class="indent">
                9、甲方为乙方应配备专业的辅导员，每季度一次对企业提供多方位、深层次、个性化、园丁式的一对一、一对多专业化技术辅导和服务；<br/>
              </p>
              <p class="indent">
                10、甲方对乙方每季度一次对企业阶段进行评估，并提出评估建意； <br/>
              </p>
              <p class="indent">
                11、其他乙方需要而甲方有能力提供的服务。 <br/>
              </p>
              <h3>（二）甲方的权利</h3>
              <p class="indent">
                1、甲方有权到乙方了解企业经营管理项目进展情况，乙方应当积极配合，并如实提供相关报表； <br/>
              </p>
              <p class="indent">
                2、乙方经营管理不善、项目停滞不前，或者信誉度差、违法经营，或者改变经营方向不符合在孵企业孵化协议规定条件的， 甲方有权单方面终止服务合同。 <br/>
              </p>
              <p class="indent">
                3、在乙方项目对外进行各轮融资时，甲方或甲方指定的关联方有权对乙方项目在第一时间进行跟投（以下简称“融资跟投”），融资跟投比例不超过乙方该轮实际融资额的 5%；同时，融资跟投的定价，可以由双方协商，甲方可以现金出资，也可以向乙方收取的租金、计费服务等折算投资额参与投资。相关投资协议双方另行协商签订。<br/>
              </p>
            </div>
            <div>
              <H2>四、乙方权利和义务</H2>
              <h3>（一）乙方的权利</h3>
              <p class="indent">
                1、乙方有权享有甲方提供的各项服务，有偿使用基地的共用设施； <br/>
              </p>
              <p class="indent">
                2、乙方在经营管理中遇有困难和问题时，甲方应积极提供帮助； <br/>
              </p>
              <p class="indent">
                3、乙方有权要求甲方保守技术秘密和商业秘密； <br/>
              </p>
              <p class="indent">
                4、在服务期间，乙方需要扩大经营场地的，在同等条件下，应当优先满足。<br/>
              </p>
              <h3>（二）乙方的义务 </h3>
              <p class="indent">
                1、乙方必须遵守国家的有关法律、法规及《零号湾—全球创新创业集聚区孵化器管理办法》有关规章制度，合法经营，不得利用甲方提供的场地、服务设施等从事任何不正当、不合法、违反社会公共利益的经营活动。否则，由此造成的一切不良后果由乙方承担； <br/>
              </p>
              <p class="indent">
                2、在协议期间，乙方应当按照入驻时提交的申报材料上所提出的目标和进一步从事研究开发和生产经营，努力实现经营目标； <br/>
              </p>
              <p class="indent">
                3．乙方必须配合甲方的科技服务管理工作，每半年向甲方提供有关财务报表、提交统计报表，按期支付本协议约定的服务费用及各项有偿服务费用等；<br/>
              </p>
              <p class="indent">
                4．乙方应积极参加甲方组织的报告会、培训班、联谊会等活动。 <br/>
              </p>
            </div>
            <div>
              <H2>五、协议变更与解除</H2>
              <p class="indent">
                1、本协议在履行过程中若一方对协议条款提出变更，应提前1个月以书面形式提出，经双方协商达成一致意见后方可变更，在变更协议未达成之前原签订的协议仍然有效。<br/>
              </p>
              <p class="indent">
                2、于不可抗力因素致使协议无法履行，提出解除协议方必须在不可抗力因素发生后一个月内以书面形式说明理由，经双方确认后，方可通过协商解除协议。 <br/>
              </p>
              <p class="indent">
                3、乙方有本协议第三条第（二）款第 2 项情形的，甲方有权单方面解除本协议。<br/>
              </p>
              <p class="indent">
                4、乙方不履行本协议第四条第（二）款第1、3项 义务的，甲方有权解除本协议。 <br/>
              </p>
            </div>
            <div>
              <H2>六、违约责任</H2>
              <p class="indent">
                甲乙双方不得以任何借口违反本协议规定的各项条款，如一方故意违反本协议并造成损失、导致协议不能正常履行或不得不提前终止的，守约方有权要求违约方赔偿全部损失。<br/>
              </p>
            </div>
            <div>
              <H2>七、其他条款</H2>
              <p class="indent">
                本孵化协议具有唯一性，本协议有效期内乙方不得同时与其他机构构成同类孵化关系。<br/>
              </p>
            </div>
            <div>
              <H2>八、争议解决</H2>
              <p class="indent">
                执行本协议发生争议，由当事人双方协商解决。协商不成，任一方可向甲方所在地人民法院起诉。<br/>
              </p>
            </div>
            <div>
              <H2>九、附则</H2>
              <p class="indent">
                1、本协议未尽事宜，可由双方协商，以书面形式予以补充，补充协议与协议正文同样有效。<br/>
              </p>
              <p class="indent">
                2、 协议经双方代表签字盖章后生效，壹式陆份，甲方执肆份、乙方执贰份。 <br/>
              </p>
            </div>
            <!--  签章部分 -->
            <div>
              <table width="100%">
                <tr>
                  <td>甲方： （签章）</td>
                  <td>乙方： （签章）</td>
                </tr>
                <tr>
                  <td>法定代表人或授权人：{{protocolIncubator.partyARepresentative}}</td>
                  <td>法定代表人或授权人：{{protocolIncubator.partyBRepresentative}}</td>
                </tr>
                <tr>
                  <td> 日期：{{protocolIncubator.partyATime | date("yyyy年MM月dd日")}}</td>
                  <td> 日期：{{protocolIncubator.partyBTime | date("yyyy年MM月dd日")}}</td>
                </tr>
              </table>
            </div>

          </div>

				</div>
			</NbSlidePanel>
		</div>
	</div>
</template>

<script>
	import ProtocolIncubator from  "../../../../../common/model/protocol/incubator/ProtocolIncubator"
	import NbSlidePanel from  "../../../../../common/widget/NbSlidePanel.vue"

	export default{
		data(){
			return {}
		},
		props: {
			protocolIncubator: {
				type: ProtocolIncubator,
				required: true
			}
		},
		components: {
			NbSlidePanel
		}
	}

</script>
<style lang="less" rel="stylesheet/less">
	.protocol-incubator-preview {

		.pdf-container {
			font-family: "simsun", serif;
			padding: 0 40px 20px 40px;
			color: black;
			font-size: 18px;
		}
    h1 {
      font-family: "simhei", serif;
      font-size: 34px;
      text-align: center;
      font-weight: bold;
      padding-top: 20px;
    }
    h2 {
      font-family: "simhei", serif;
      font-size: 20px;
      font-weight: bold;
      line-height: 30px;
      padding-top: 5px;
    }
    h3 {
      text-indent: 1.7em;
    }
    p {
      text-indent: 2em;
      line-height: 32px;
      margin: 0;
      padding: 0;
    }
    .lh35 {
      line-height: 35px;
    }
    .no {
      font-family: "simhei", serif;
      text-align: right;
      font-weight: bold;
      padding-bottom: 10px;
    }
    .party {
      font-family: "simhei", serif;
      font-size: 20px;
      font-weight: bold;
      margin: 10px 0;
    }
    table {
      margin-top: 30px;
      border-collapse: collapse;
    }
    tr, th, td {
      border: 1px solid transparent;
    }
    th {
      padding: 30px 0;
    }
    td {
      padding: 30px 0;
    }
	}
</style>
