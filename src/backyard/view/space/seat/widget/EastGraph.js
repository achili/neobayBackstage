import SeatGraph from "./SeatGraph";

export default function EastGraph() {
	//extend BaseEntity's Attributes.
	SeatGraph.call(this, arguments);

	this.blankWidth = 330;
	this.blankHeight = 450;
}
EastGraph.prototype = new SeatGraph();
EastGraph.prototype.constructor = EastGraph;


//绘制轮廓，柱子。
EastGraph.prototype.drawOutline = function () {

	let outlineGroup = this.g.append("g");

	//四面墙
	let rectStrokeWidth = 10;


	outlineGroup
		.append("path")
		.attr("d", "M0,0 H" + (this.width - this.blankWidth) + " V" + (this.blankHeight) + " H" + this.width + " V" + this.height + " H0 Z")
		.style("fill", "transparent")
		.style("stroke", "black")
		.style("stroke-width", rectStrokeWidth);

	//两扇门
	let doorGroup = outlineGroup.append("g");

	let doorStartX = 0;
	let doorStartY = this.height / 2;

	//两扇门
	this.addDoor(doorGroup, doorStartX, doorStartY - this.doorR, 4);
	this.addDoor(doorGroup, doorStartX, doorStartY + this.doorR, 1);


	//九根柱子。
	let pillarGroup = outlineGroup.append("g");

	let pillarWidth = this.outterMargin;
	let pillarStrokeWidth = 3;
	let pillarMargin = this.outterMargin / 2;

	let pillarArray = [

		[-pillarWidth / 2, -pillarWidth / 2],
		[this.deskWidth * 8 - pillarWidth / 2, -pillarWidth / 2],
		[this.width - pillarWidth / 2 - this.blankWidth, -pillarWidth / 2],

		[-pillarWidth / 2, this.height / 2 - pillarWidth / 2 + (this.doorR + pillarWidth)],

		[this.width - pillarWidth / 2 - this.blankWidth, this.height / 2 - pillarWidth / 2 + (this.doorR + pillarWidth)],

		[-pillarWidth / 2, this.height - pillarWidth / 2],
		[this.deskWidth * 8 - pillarWidth / 2, this.height - pillarWidth / 2],
		[this.width - pillarWidth / 2 - this.blankWidth, this.height - pillarWidth / 2]

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
EastGraph.prototype.drawMeetingRooms = function () {

	//A8会议室。
	let meetingGroup = this.g.append("g");

	//a10会议室 - 茶水间
	let a10Width = 130;
	let a10Height = this.height - this.blankHeight;
	let a10X = this.width - a10Width;
	let a10Y = this.height - a10Height;
	let a10rectStrokeWidth = 3;
	let a10Group = meetingGroup.append("g").attr("transform", "translate(" + a10X + "," + a10Y + ")");

	a10Group.append("rect")
		.attr("width", a10Width)
		.attr("height", a10Height)
		.style("fill", "white")
		.style("stroke", "black")
		.style("stroke-width", a10rectStrokeWidth);

	this.addTable(a10Group, 70, 180);
	this.addDoor(a10Group, 0, 50, 4);
	//填上标签。
	a10Group.append("text")
		.attr("x", a10Width / 2)
		.attr("y", a10Height - 30)
		.style("font-size", 18)
		.text("B14");
}


//绘制所有的工位
EastGraph.prototype.drawSeatGroups = function () {

	let seatGroupGroup = this.g.append("g");

	this.addSeatGroup(seatGroupGroup, 2 * this.deskWidth, 2 * this.deskWidth, "B1");
	this.addSeatGroup(seatGroupGroup, 6 * this.deskWidth, 2 * this.deskWidth, "B2");
	this.addSeatGroup(seatGroupGroup, 10 * this.deskWidth, 2 * this.deskWidth, "B3");
	this.addSeatGroup(seatGroupGroup, 14 * this.deskWidth, 2 * this.deskWidth, "B4");

	this.addSeatGroup(seatGroupGroup, 2 * this.deskWidth, this.height - 2 * this.deskWidth, "B5");
	this.addSeatGroup(seatGroupGroup, 6 * this.deskWidth, this.height - 2 * this.deskWidth, "B6");
	this.addSeatGroup(seatGroupGroup, 10 * this.deskWidth, this.height - 2 * this.deskWidth, "B7");
	this.addSeatGroup(seatGroupGroup, 14 * this.deskWidth, this.height - 2 * this.deskWidth, "B8");
	this.addSeatGroup(seatGroupGroup, 18 * this.deskWidth, this.height - 2 * this.deskWidth, "B9");

	this.addSeatGroup(seatGroupGroup, 6 * this.deskWidth, this.height / 2, "B11");
	this.addSeatGroup(seatGroupGroup, 10 * this.deskWidth, this.height / 2, "B12");
	this.addSeatGroup(seatGroupGroup, 14 * this.deskWidth, this.height / 2, "B13");


	//比较特殊的两个工位

	let x = 2 * this.deskWidth;
	let y = this.height / 2;
	let specialSeatGroup = seatGroupGroup.append("g")
		.attr("transform", "translate(" + x + "," + y + ")");

	this.addSeatChair(specialSeatGroup, this.deskWidth / 2 * 3, -this.deskWidth / 2 * 1, 0);
	this.addSeatChair(specialSeatGroup, this.deskWidth / 2 * 3, this.deskWidth / 2 * 1, 0);

	this.addSeatDesk(specialSeatGroup, this.deskWidth / 2 * 1, this.deskWidth / 2 * 1, "B10-1");
	this.addSeatDesk(specialSeatGroup, this.deskWidth / 2 * 1, -this.deskWidth / 2 * 1, "B10-2");

}

//绘制图例
EastGraph.prototype.drawLegends = function () {
	//调用父类的方法。
	SeatGraph.prototype.drawLegends.call(this, this.width - 200, 20);

}