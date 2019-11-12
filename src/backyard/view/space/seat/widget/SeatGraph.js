export default function SeatGraph() {

	//最外层dom节点。SeatGraph的所有内容都装在里面的。
	this.dom = null;

	//所有数据库中存储了工位
	this.spaceSeats = [];
	this.spaceSeatMap = {};

	//点击了工位时，给一个回掉函数.
	this.selectCallback = null;

	//整张图纸的大小。
	this.svg = null;
	this.svgWidth = 1200;
	this.svgHeight = 800;

	//房间的真正大小。
	this.g = null;

	//墙壁和图纸之间的margin
	this.outterMargin = 30;

	this.width = this.svgWidth - 2 * this.outterMargin;
	this.height = this.svgHeight - 2 * this.outterMargin;

	this.doorR = 50;

	//工位桌子的宽度
	this.deskWidth = 50;

	this.freeColor = "#1ab394";
	this.occupiedColor = "#ED5565";
	this.selectColor = "#f8ac59";
	this.disableColor = "#c2c2c2";
  this.releaseColor = "pink";


	this.background = "white";
}

//给我一个点，我给你画一扇门.x,y为圆心。phase 为圆弧所在象限。
SeatGraph.prototype.addDoor = function (dom, x, y, phase) {

	let doorStrokeWidth = 2;

	//默认第一象限
	let d = "M" + x + "," + y + "L" + x + "," + (y - this.doorR) + "A " + this.doorR + "," + this.doorR + " 0 0 1 " + (x + this.doorR) + "," + y + " Z";
	if (phase === 2) {
		d = "M" + x + "," + y + "L" + (x - this.doorR) + "," + y + "A " + this.doorR + "," + this.doorR + " 0 0 1 " + x + "," + (y - this.doorR) + " Z";
	} else if (phase === 3) {
		d = "M" + x + "," + y + "L" + x + "," + (y + this.doorR) + "A " + this.doorR + "," + this.doorR + " 0 0 1 " + (x - this.doorR) + "," + y + " Z";
	} else if (phase === 4) {
		d = "M" + x + "," + y + "L" + (x + this.doorR) + "," + y + "A " + this.doorR + "," + this.doorR + " 0 0 1 " + x + "," + (y + this.doorR) + " Z";
	}

	dom.append("path")
		.attr("d", d)
		.style("fill", "white")
		.style("stroke", "black")
		.style("stroke-width", doorStrokeWidth);
}

//给我一个点，我给你画一张桌子。
SeatGraph.prototype.addTable = function (dom, cx, cy) {

	let group = dom.append("g")
		.attr("transform", "translate(" + cx + "," + cy + ")");
	let tableR = 20;
	let tableStrokeWidth = 3;

	group.append("circle")
		.attr("cx", 0)
		.attr("cy", 0)
		.attr("r", tableR)
		.style("fill", "transparent")
		.style("stroke", "black")
		.style("stroke-width", tableStrokeWidth);
	let sqrt2R = Math.sqrt(2) * tableR;
	let chairsArray = [
		[-sqrt2R, -sqrt2R],
		[sqrt2R, -sqrt2R],
		[-sqrt2R, sqrt2R],
		[sqrt2R, sqrt2R]
	];

	let chairStrokeWidth = 2;
	let chairGroup = group.append("g");
	chairGroup
		.selectAll("circle")
		.data(chairsArray)
		.enter()
		.append("circle")
		.attr("cx", function (d, i) {
			return d[0];
		})
		.attr("cy", function (d, i) {
			return d[1];
		})
		.attr("r", tableR)
		.style("fill", "transparent")
		.style("stroke", "black")
		.style("stroke-width", chairStrokeWidth);
}


//给我一个点，我给你画一组工位（8个） cx,cy 是工位组的中心点。
SeatGraph.prototype.addSeatGroup = function (dom, cx, cy, groupName) {

	let seatGroup = dom.append("g")
		.attr("transform", "translate(" + cx + "," + cy + ")");

	this.addSeatChair(seatGroup, -this.deskWidth / 2 * 3, -this.deskWidth / 2 * 3, 1);
	this.addSeatChair(seatGroup, -this.deskWidth / 2 * 3, -this.deskWidth / 2 * 1, 1);
	this.addSeatChair(seatGroup, -this.deskWidth / 2 * 3, this.deskWidth / 2 * 1, 1);
	this.addSeatChair(seatGroup, -this.deskWidth / 2 * 3, this.deskWidth / 2 * 3, 1);

	this.addSeatChair(seatGroup, this.deskWidth / 2 * 3, -this.deskWidth / 2 * 3, 0);
	this.addSeatChair(seatGroup, this.deskWidth / 2 * 3, -this.deskWidth / 2 * 1, 0);
	this.addSeatChair(seatGroup, this.deskWidth / 2 * 3, this.deskWidth / 2 * 1, 0);
	this.addSeatChair(seatGroup, this.deskWidth / 2 * 3, this.deskWidth / 2 * 3, 0);

	this.addSeatDesk(seatGroup, -this.deskWidth / 2 * 1, -this.deskWidth / 2 * 3, groupName + "-1");
	this.addSeatDesk(seatGroup, -this.deskWidth / 2 * 1, -this.deskWidth / 2 * 1, groupName + "-2");
	this.addSeatDesk(seatGroup, -this.deskWidth / 2 * 1, this.deskWidth / 2 * 1, groupName + "-3");
	this.addSeatDesk(seatGroup, -this.deskWidth / 2 * 1, this.deskWidth / 2 * 3, groupName + "-4");


	this.addSeatDesk(seatGroup, this.deskWidth / 2 * 1, -this.deskWidth / 2 * 3, groupName + "-5");
	this.addSeatDesk(seatGroup, this.deskWidth / 2 * 1, -this.deskWidth / 2 * 1, groupName + "-6");
	this.addSeatDesk(seatGroup, this.deskWidth / 2 * 1, this.deskWidth / 2 * 1, groupName + "-7");
	this.addSeatDesk(seatGroup, this.deskWidth / 2 * 1, this.deskWidth / 2 * 3, groupName + "-8");

}

//给我一个点，我给你画一个椅子 0 朝左 1朝右
SeatGraph.prototype.addSeatChair = function (dom, cx, cy, direction) {
	let chairGroup = dom.append("g")
		.attr("transform", "translate(" + cx + "," + cy + ")");


	let w = 28;

	let m = 3;

	chairGroup
		.append("rect")
		.attr("x", -w / 2)
		.attr("y", -w / 2)
		.attr("width", w)
		.attr("height", w)
		.style("fill", "transparent")
		.style("stroke", "black")
		.style("stroke-width", 1);


	let rect2X = -w / 2 - m;
	let rect2Y = -w / 2 + m;

	if (direction === 1) {
		rect2X = -w / 2 + m;
	}

	chairGroup
		.append("rect")
		.attr("x", rect2X)
		.attr("y", rect2Y)
		.attr("width", w)
		.attr("height", w - 2 * m)
		.style("fill", "white")
		.style("stroke", "black")
		.style("stroke-width", 1);

	let lineX = w / 2 - m;

	if (direction === 1) {
		lineX = -w / 2 + m;
	}

	let lineY1 = -w / 2;
	let lineY2 = w / 2;
	chairGroup
		.append("line")
		.attr("x1", lineX)
		.attr("y1", lineY1)
		.attr("x2", lineX)
		.attr("y2", lineY2)
		.style("fill", "black ")
		.style("stroke", "black")
		.style("stroke-width", 1);
}
//给我一个点，我给你画一个桌子
SeatGraph.prototype.addSeatDesk = function (dom, cx, cy, deskName) {
	let that = this;

	let deskGroup = dom.append("g")
		.attr("transform", "translate(" + cx + "," + cy + ")")
		.style("cursor", "pointer");

	let spaceSeat = this.spaceSeatMap[deskName];

	let updateDesk = function () {

		//首先清空里面的内容。
		deskGroup
			.selectAll("g")
			.data([])
			.exit()
			.remove();

		let color = that.disableColor;
		let selectOpacity = 0;

		if (spaceSeat) {
			if (spaceSeat.status === spaceSeat.Status.OCCUPIED) {
				color = that.occupiedColor;

				if (spaceSeat.selected) {
					selectOpacity = 1;
				} else {
					selectOpacity = 0;
				}
			} else if (spaceSeat.status === spaceSeat.Status.FREE) {
				if (spaceSeat.selected) {
					color = that.selectColor;
					selectOpacity = 1;
				} else {
					color = that.freeColor;
					selectOpacity = 0;
				}
			}else if(spaceSeat.status === spaceSeat.Status.RELEASE){
        color = that.releaseColor;
        if (spaceSeat.selected) {
          selectOpacity = 1;
        } else {
          selectOpacity = 0;
        }
      }
		}

		let innerGroup = deskGroup.append("g");

		innerGroup
			.append("rect")
			.attr("x", -that.deskWidth / 2)
			.attr("y", -that.deskWidth / 2)
			.attr("width", that.deskWidth)
			.attr("height", that.deskWidth)
			.style("fill", color)
			.style("stroke", "black")
			.style("stroke-width", 2);


		deskGroup
			.append("text")
			.attr("x", -18)
			.attr("y", 5)
			.text(deskName);

		let selectLineData = "M" + (-that.deskWidth / 4) + "," + 0 + "L" + (-that.deskWidth / 12) + "," + that.deskWidth / 4 + "L" + that.deskWidth / 3 + "," + 0;

		deskGroup
			.append("path")
			.attr("d", selectLineData)
			.attr("stroke", "white")
			.attr("stroke-width", 7)
			.attr("fill", "none")
			.attr("opacity", selectOpacity);
	}

	updateDesk();

	deskGroup
		.on("click", function (e, i) {

			let spaceSeat = that.spaceSeatMap[deskName];

			spaceSeat.selected = !spaceSeat.selected;
			updateDesk();
			if (typeof that.selectCallback === "function") {
				that.selectCallback(spaceSeat);
			}

		});

}

//绘制轮廓，柱子。
SeatGraph.prototype.drawOutline = function () {
}

//绘制办公室，茶水间
SeatGraph.prototype.drawMeetingRooms = function () {

}


//绘制所有的工位
SeatGraph.prototype.drawSeatGroups = function () {

}

//绘制图例
SeatGraph.prototype.drawLegends = function (x, y) {

	let legendGroup = this.g.append("g")
		.attr("transform", "translate(" + x + "," + y + ")");

	legendGroup
		.append("rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", 120)
		.attr("height", 250)
		.style("fill", "transparent")
		.style("stroke-dasharray", "5,5")
		.style("stroke", "orange")
		.style("stroke-width", 2);

	legendGroup
		.append("text")
		.attr("x", 10)
		.attr("y", 20)
		.text("图例");

	let g = legendGroup.append("g");
	let arr = [
		{
			"name": "已占用",
			"color": this.occupiedColor
		},
    {
      "name": "释放中",
      "color": this.releaseColor
    },
		{
			"name": "空闲",
			"color": this.freeColor
		},
		{
			"name": "禁用",
			"color": this.disableColor
		},
		{
			"name": "已选择",
			"color": this.selectColor
		}
	];


	g.selectAll("rect")
		.data(arr)
		.enter()
		.append("rect")
		.attr("x", 10)
		.attr("y", function (d, i) {
			return 30 + i * 40;
		})
		.attr("width", 30)
		.attr("height", 30)
		.style("fill", function (d, i) {
			return d.color;
		})
		.style("stroke", "black")
		.style("stroke-width", 2)

	g.selectAll("text")
		.data(arr)
		.enter()
		.append("text")
		.attr("x", 50)
		.attr("y", function (d, i) {
			return 50 + i * 40;
		})
		.text(function (d, i) {
			return d.name;
		})

}

SeatGraph.prototype.draw = function (dom, spaceSeats) {

	this.dom = dom;
	this.spaceSeats = spaceSeats;

	this.refresh();

}

SeatGraph.prototype.refresh = function () {
	this.spaceSeatMap = {};
	for (let i = 0; i < this.spaceSeats.length; i++) {
		let spaceSeat = this.spaceSeats[i];
		this.spaceSeatMap[spaceSeat.no] = spaceSeat;
	}

	//清除之前图中的残留。
	this.dom
		.selectAll("svg")
		.data([])
		.exit()
		.remove();

	this.svg = this.dom.append("svg")
		.attr("width", this.svgWidth)
		.attr("height", this.svgHeight)
		.style("background-color", this.background);

	this.g = this.svg.append("g")
		.attr("transform", "translate(" + this.outterMargin + "," + this.outterMargin + ")");

	this.drawOutline();

	this.drawMeetingRooms();

	this.drawSeatGroups();

	this.drawLegends();
}


//根据一些已经选中的来更新自己
SeatGraph.prototype.updateSelectedSpaceSeats = function (spaceSeats) {
	if (!spaceSeats) {
		return;
	}

	for (let i = 0; i < this.spaceSeats.length; i++) {
		let spaceSeat = this.spaceSeats[i];

		for (let j = 0; j < spaceSeats.length; j++) {

			let standardSpaceSeat = spaceSeats[j];

			if (spaceSeat.no === standardSpaceSeat.no) {
				this.spaceSeats[i].selected = true;
				break;
			}
		}

	}

	//更新了自己之后需要立即重绘啊，混蛋。
	this.refresh();
}

SeatGraph.prototype.getSelectedSpaceSeats = function () {

	let selectedSpaceSeats = [];


	if (this.spaceSeats) {
		for (let i = 0; i < this.spaceSeats.length; i++) {
			let spaceSeat = this.spaceSeats[i];
			if (spaceSeat.selected) {
				selectedSpaceSeats.push(spaceSeat);
			}
		}

	}

	return selectedSpaceSeats;
}
