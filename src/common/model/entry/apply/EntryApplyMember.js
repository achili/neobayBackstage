import BaseEntity from "../../base/BaseEntity";
import {simpleDateTime, str2Date, str2simpleDateTime} from "../../../filter/time";
import Vue from "vue";
import EntryApply from "./EntryApply";
import Tank from "../../tank/Tank";

let Identity = {
	MEMBER: "MEMBER",
	LEADER: "LEADER"
}

export default function EntryApplyMember() {

	BaseEntity.call(this, arguments);

	this.name = null;
	this.birthday = new Date();
	this.school = null;
	this.major = null;
	this.phone = null;
	this.email = null;
	this.resume = null;
	this.identity = Identity.MEMBER;
  this.cvResume = new Tank(".doc|.docx|.pdf|.ppt|.pptx", false, 50 * 1024 * 1024, "doc,docx,pdf,ppt,pptx");

	this.entryApply = new EntryApply();

	if (Vue.store.state.debug) {
		this.mockData();
	}
}

EntryApplyMember.prototype = new BaseEntity();
EntryApplyMember.prototype.constructor = EntryApplyMember;


EntryApplyMember.prototype.mockData = function () {
	this.name = "瞿凯明";
	this.birthday = new Date();
	this.school = "sjtu";
	this.major = "电子";
	this.phone = 123456;
	this.email = "16516@qq.com";
	// this.resume = "以下是本人真实的个人经历：1995年，就读于德国慕尼黑特种兵学校；1998年，在美国宾夕法尼亚大学心理系进修；2000年，加入海豹突击队；2003年，攻破日本情报系统，获取10份绝密文件，令其战争阴谋破产；2005年，前往叙利亚执行任务，成功解救三千人质;2006年，获得诺贝尔和平奖提名;2008年，参加美国总统选举，以1票之差落选;2011年，被奥巴马跪请回到海豹;击队，同年击毙拉登2015年，被提名为全球最有影响力人物；2016年，放弃一生荣誉入驻零号湾";
	this.identity = Identity.MEMBER;


}


EntryApplyMember.prototype.render = function (obj) {
	BaseEntity.prototype.render.call(this, obj);
	this.birthday = str2Date(this.birthday);
  this.renderEntity("cvResume", Tank);
}

EntryApplyMember.prototype.getForm = function () {
	let form = {
		name: this.name,
		birthday: simpleDateTime(this.birthday),
		school: this.school,
		major: this.major,
		phone: this.phone,
		email: this.email,
		resume: this.resume,
    cvResumeCode: this.cvResume.code,
		identity: this.identity
	};
	if (this.id) {
		form.id = this.id;
	}
	return form;
}

EntryApplyMember.prototype.setLeader = function () {
	this.identity = Identity.LEADER;
}




