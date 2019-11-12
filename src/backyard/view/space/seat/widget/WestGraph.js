import SeatGraph from "./SeatGraph";

export default function WestGraph() {
	//extend BaseEntity's Attributes.
	SeatGraph.call(this, arguments);


}
WestGraph.prototype = new SeatGraph();
WestGraph.prototype.constructor = WestGraph;


//绘制轮廓，柱子。
WestGraph.prototype.drawOutline = function () {

	let outlineGroup = this.g.append("g");

	//四面墙
	let rectStrokeWidth = 10;

	outlineGroup
		.append("rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", this.width)
		.attr("height", this.height)
		.style("fill", "transparent")
		.style("stroke", "black")
		.style("stroke-width", rectStrokeWidth);


	//两扇门
	let doorGroup = outlineGroup.append("g");

	let doorStartX = this.width;
	let doorStartY = this.height / 2;

	//两扇门
	this.addDoor(doorGroup, doorStartX, doorStartY - this.doorR, 3);
	this.addDoor(doorGroup, doorStartX, doorStartY + this.doorR, 2);


	//九根柱子。
	let pillarGroup = outlineGroup.append("g");

	let pillarWidth = this.outterMargin;
	let pillarStrokeWidth = 3;
	let pillarMargin = this.outterMargin / 2;

	let pillarArray = [

		[-pillarWidth / 2, -pillarWidth / 2],
		[this.width / 2 - pillarWidth / 2, -pillarWidth / 2],
		[this.width - pillarWidth / 2, -pillarWidth / 2],

		[-pillarWidth / 2, this.height / 2 - pillarWidth / 2 + (this.doorR + pillarWidth)],
		[this.width / 2 - pillarWidth / 2, this.height / 2 - pillarWidth / 2 + (this.doorR + pillarWidth)],
		[this.width - pillarWidth / 2, this.height / 2 - pillarWidth / 2 + (this.doorR + pillarWidth)],

		[-pillarWidth / 2, this.height - pillarWidth / 2],
		[this.width / 2 - pillarWidth / 2, this.height - pillarWidth / 2],
		[this.width - pillarWidth / 2, this.height - pillarWidth / 2]

	];

	pillarGroup
		.selectAll("rect")
		.data(pillarArray)
		.enter()
		.append("rect")
		.attr("x", function (d) {
			return d[0];
		})
		.attr("y", function (d) {
			return d[1];
		})
		.attr("width", pillarWidth)
		.attr("height", pillarWidth)
		.style("fill", "white")
		.style("stroke", "black")
		.style("stroke-width", pillarStrokeWidth);


}

//绘制办公室，茶水间
WestGraph.prototype.drawMeetingRooms = function () {

	//A8会议室。
	let meetingGroup = this.g.append("g");

	let a8X = 170;
	let a8Y = 320;
	let a8Width = 420;
	let a8Height = 150;
	let a8rectStrokeWidth = 3;
	let a8Group = meetingGroup.append("g").attr("transform", "translate(" + a8X + "," + a8Y + ")");

	a8Group.append("rect")
		.attr("width", a8Width)
		.attr("height", a8Height)
		.style("fill", "transparent")
		.style("stroke", "black")
		.style("stroke-width", a8rectStrokeWidth);

	this.addTable(a8Group, 80, 80);
	this.addDoor(a8Group, a8Width - this.doorR, 0, 3);
	this.addDoor(a8Group, a8Width - this.doorR, a8Height, 2);
	//填上标签。
	a8Group.append("text")
		.attr("x", a8Width / 2)
		.attr("y", a8Height / 2)
		.style("font-size", 18)
		.text("A8");


	//a9会议室
	let a9X = 590;
	let a9Y = 320;
	let a9Width = 280;
	let a9Height = 150;
	let a9rectStrokeWidth = 3;
	let a9Group = meetingGroup.append("g").attr("transform", "translate(" + a9X + "," + a9Y + ")");


	a9Group.append("rect")
		.attr("width", a9Width)
		.attr("height", a9Height)
		.style("fill", "transparent")
		.style("stroke", "black")
		.style("stroke-width", a9rectStrokeWidth);

	this.addTable(a9Group, 80, 80);
	this.addDoor(a9Group, a9Width - 20, 0, 3);
	this.addDoor(a9Group, a9Width - 20, a9Height, 2);
	//填上标签。
	a9Group.append("text")
		.attr("x", a9Width / 2)
		.attr("y", a9Height / 2)
		.style("font-size", 18)
		.text("A8");

	//a10会议室 - 茶水间
	let a10Width = 200;
	let a10Height = 200;
	let a10X = this.width - a10Width;
	let a10Y = 0;
	let a10rectStrokeWidth = 3;
	let a10Group = meetingGroup.append("g").attr("transform", "translate(" + a10X + "," + a10Y + ")");

	a10Group.append("rect")
		.attr("width", a10Width)
		.attr("height", a10Height)
		.style("fill", "white")
		.style("stroke", "black")
		.style("stroke-width", a10rectStrokeWidth);

	this.addTable(a10Group, 80, 80);
	this.addDoor(a10Group, 20, a10Height, 1);
	//填上标签。
	a10Group.append("text")
		.attr("x", a10Width / 2)
		.attr("y", a10Height - 30)
		.style("font-size", 18)
		.text("茶水间");
}


//绘制所有的工位
WestGraph.prototype.drawSeatGroups = function () {


	let seatGroupGroup = this.g.append("g");

	this.addSeatGroup(seatGroupGroup, 2 * this.deskWidth, 2 * this.deskWidth, "A1");
	this.addSeatGroup(seatGroupGroup, 8 * this.deskWidth, 2 * this.deskWidth, "A2");
	this.addSeatGroup(seatGroupGroup, 15 * this.deskWidth, 2 * this.deskWidth, "A3");

	this.addSeatGroup(seatGroupGroup, 2 * this.deskWidth, this.height - 2 * this.deskWidth, "A4");
	this.addSeatGroup(seatGroupGroup, 8 * this.deskWidth, this.height - 2 * this.deskWidth, "A5");
	this.addSeatGroup(seatGroupGroup, 15 * this.deskWidth, this.height - 2 * this.deskWidth, "A6");
	this.addSeatGroup(seatGroupGroup, 20 * this.deskWidth, this.height - 2 * this.deskWidth, "A7");

}

//绘制图例
WestGraph.prototype.drawLegends = function () {

	//调用父类的方法。
	SeatGraph.prototype.drawLegends.call(this, this.width - 200, this.height / 2 - 100);

}