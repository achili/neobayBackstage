import Vue from 'vue';
Vue.directive('dragx', (el, binding, vnode) => {
    //  默认参数
    let defaultOpts = {
        dragDirection: 'n, e, s, w, ne, se, sw, nw, all',
        dragContainerId: '', //
        dragBarClass: '', // 类选择器
        resizeEdge: 10,
        dirctDom: true,
        canDrag:true,
        canResize:true
    };
    let isMove = false;
    binding.value = binding.value || {};
    let cfg = Object.assign({}, defaultOpts, binding.value);

    // 获取目标元素 resize方向
    function getDirection(e) {
        let el = e.currentTarget;
        let dir = '';
        let rect = el.getBoundingClientRect();
        let win = el.ownerDocument.defaultView;
        let offset = {
            top: rect.top + win.pageYOffset,
            left: rect.left + win.pageXOffset,
            right: rect.right + win.pageXOffset,
            bottom: rect.bottom + win.pageYOffset
        };
        if (e.pageY > offset.top && e.pageY < offset.top + cfg.resizeEdge) {
            dir += 'n';
        } else if (e.pageY < offset.bottom && e.pageY > offset.bottom - cfg.resizeEdge) {
            dir += 's';
        }
        if (e.pageX > offset.left && e.pageX < offset.left + cfg.resizeEdge) {
            dir += 'w';
        } else if (e.pageX < offset.right && e.pageX > offset.right - cfg.resizeEdge) {
            dir += 'e';
        }
        if (binding.value) {
            let directions = cfg.dragDirection.split(',');
            for (let i = 0; i < directions.length; i++) {
                let handle = directions[i].replace(/(^\s*)|(\s*$)/g, '');
                if (handle === 'all' || handle === dir) {
                    return dir;
                }
            }
        }
        return '';
    }
    //  设置约束范围
    function setConstraint(data) {
        if (cfg.dragContainerId) {
            let constraintDom = document.querySelector("#" + cfg.dragContainerId);
            let constraintRect = constraintDom.getBoundingClientRect();
            if (data.left <= 0) data.left = 0;
            if (data.top <= 0) data.top = 0;
            if (data.top + data.height + data.borderTop + data.borderBottom >= constraintRect.height) data.top = constraintRect.height - data.height - data.borderTop - data.borderBottom;
            if (data.left + data.width + data.borderLeft + data.borderRight > constraintRect.width) data.left = constraintRect.width - data.width - data.borderLeft - data.borderRight;
        }
    }

    el.onmousemove = function (e) {
        if (cfg.dragBarClass.length > 0 && e.target.classList.contains(cfg.dragBarClass) && cfg.canDrag) {
            el.style.cursor = 'move';
            return;
        }
        let dir = getDirection(e);
        if (dir !== '') {
            el.style.cursor = dir + '-resize'; return;
        }
        el.style.cursor = '';
    };

    el.onmouseleave = function (e) {
        el.style.cursor = '';
    };

    el.onmousedown = function (e) {
        isMove = false;
        if (cfg.dragBarClass.length > 0 && e.target.classList.contains(cfg.dragBarClass)) {
            isMove = true;
            document.body.style.cursor = 'move';
        }
        let style = window.getComputedStyle(el);
        function getStyleNumValue(key) {
            return parseInt(style.getPropertyValue(key), 10);
        }
        let rect = el.getBoundingClientRect();
        let data = {
            width: getStyleNumValue("width"),
            height: getStyleNumValue("height"),
            left: getStyleNumValue("left"),
            top: getStyleNumValue("top"),
            borderLeft:getStyleNumValue("border-left-width"),
            borderTop:getStyleNumValue("border-top-width"),
            borderRight:getStyleNumValue("border-right-width"),
            borderBottom:getStyleNumValue("border-bottom-width"),
            deltX: e.pageX - rect.left,
            deltY: e.pageY - rect.top,
            startX: rect.left,
            startY: rect.top,
            index:binding,
            ele:el,
            node:vnode,
            pager:null
        };
        let dir = getDirection(e);
        if (dir === '' && !isMove) return;
        // 创建遮罩
        let mask = document.createElement("div");
        mask.style.cssText = "position:absolute;top:0px;bottom:0px;left:0px;right:0px;";
        document.body.appendChild(mask);
        document.onmousemove = function (edom) {
            //  获取当前鼠标位置
            if (dir.indexOf("e") > -1) {
                data.width = edom.pageX - data.startX + data.borderLeft + data.borderRight;
            }
            // if (dir.indexOf("s") > -1) {
            //     data.height = edom.pageY - data.startY + data.borderBottom + data.borderTop;
            // }
            // if (dir.indexOf("n") > -1) {
            //     let deltheight = data.startY + data.borderBottom + data.borderTop - edom.pageY;
            //     data.height += deltheight;
            //     data.top -= deltheight;
            //     data.startY -= deltheight;
            // }
            if (dir.indexOf("w") > -1) {
                let deltwidth = data.startX + data.borderLeft + data.borderRight - edom.pageX;
                data.width += deltwidth;
                data.left -= deltwidth;
                data.startX -= deltwidth;
            }
            // 处理组件 移动
            if (isMove && cfg.canDrag) {
                let targetPageX = edom.pageX;
                let targetPageY = edom.pageY;
                let deltX = targetPageX - data.startX - data.deltX;
                let deltY = targetPageY - data.startY - data.deltY;
                let newLeft = parseInt(getStyleNumValue("left") || '0', 10) + deltX;
                let newTop = parseInt(getStyleNumValue("top") || '0', 10) + deltY;
                data.left = newLeft;
                data.top = newTop;
                data.startX = data.startX + deltX;
                data.startY = data.startY + deltY;
                setConstraint(data);
            }
            if (cfg.dirctDom) {
                if(cfg.canResize){
                el.style.width = data.width + "px";
                el.style.height = data.height + "px";
                }
                if(cfg.canDrag){
                el.style.left = data.left + 'px';
                el.style.top = data.top + 'px';
               }
            }
            el.dispatchEvent(new CustomEvent('bindUpdate', { detail: data }));
        };

        document.onmouseup = function (e) {
          document.body.style.cursor = '';
          document.onmousemove = function () {
            //顶部吸附
            let strTopFixed = (data.top / 397).toFixed(1);
            if(strTopFixed >= 0.1 && strTopFixed <= 0.4){
              el.style.top = 45 + 'px';
            }else if(strTopFixed >= 0.5 && strTopFixed <= 0.8){
              el.style.top = 203 + 'px';
            }else if(strTopFixed >= 1.1 && strTopFixed <= 1.4){
              el.style.top = 442 + 'px';
            }else if(strTopFixed >= 1.5 && strTopFixed <= 1.8){
              el.style.top = 600 + 'px';
            }else if(strTopFixed >= 2.1 && strTopFixed <= 2.4){
              el.style.top = 839 + 'px';
            }else if(strTopFixed >= 2.5 && strTopFixed <= 2.8){
              el.style.top = 997 + 'px';
            }else if(strTopFixed >= 3.1 && strTopFixed <= 3.4){
              el.style.top = 1236 + 'px';
            }else if(strTopFixed >= 3.5 && strTopFixed <= 3.8){
              el.style.top = 1394 + 'px';
            }else if(strTopFixed >= 4.1 && strTopFixed <= 4.4){
              el.style.top = 1633 + 'px';
            }else if(strTopFixed >= 4.5 && strTopFixed <= 4.8){
              el.style.top = 1791 + 'px';
            }else if(strTopFixed >= 5.1 && strTopFixed <= 5.4){
              el.style.top = 2030 + 'px';
            }else if(strTopFixed >= 5.5 && strTopFixed <= 5.8){
              el.style.top = 2188 + 'px';
            }
            //边界处理
            let strWidth = data.width;
            if(data.top <= 21){
              el.style.top = 21 + 'px';
            }else if(data.top > 2228){
              el.style.top = 2228 + 'px';
            }
            if(data.left < 0){
              el.style.left = 0 + 'px';
            } else if(data.left > 1428 - strWidth ){
              el.style.left = 1430 - strWidth + 'px';
            }
          };
          isMove = false;
          document.onmouseup = null;
          document.body.removeChild(mask);
          let strTopFixed = (data.top / 397).toFixed(1);
          if(strTopFixed >= 0.1 && strTopFixed <= 0.4){
            el.style.top = 45 + 'px';
          }else if(strTopFixed >= 0.5 && strTopFixed <= 0.8){
            el.style.top = 203 + 'px';
          }else if(strTopFixed >= 1.1 && strTopFixed <= 1.4){
            el.style.top = 442 + 'px';
          }else if(strTopFixed >= 1.5 && strTopFixed <= 1.8){
            el.style.top = 600 + 'px';
          }else if(strTopFixed >= 2.1 && strTopFixed <= 2.4){
            el.style.top = 839 + 'px';
          }else if(strTopFixed >= 2.5 && strTopFixed <= 2.8){
            el.style.top = 997 + 'px';
          }else if(strTopFixed >= 3.1 && strTopFixed <= 3.4){
            el.style.top = 1236 + 'px';
          }else if(strTopFixed >= 3.5 && strTopFixed <= 3.8){
            el.style.top = 1394 + 'px';
          }else if(strTopFixed >= 4.1 && strTopFixed <= 4.4){
            el.style.top = 1633 + 'px';
          }else if(strTopFixed >= 4.5 && strTopFixed <= 4.8){
            el.style.top = 1791 + 'px';
          }else if(strTopFixed >= 5.1 && strTopFixed <= 5.4){
            el.style.top = 2030 + 'px';
          }else if(strTopFixed >= 5.5 && strTopFixed <= 5.8){
            el.style.top = 2188 + 'px';
          }
          //边界处理
          let strWidth = data.width;
          let canvasWidth = 1430;
          let dislocationTop = 21;
          let dislocationLeft = 30;
          if(data.top <= dislocationTop){
            el.style.top = dislocationTop + 'px';
          }else if(data.top > 2228){
            el.style.top = 2228 + 'px';
          }
          if(data.left < dislocationLeft){
            el.style.left = 0 + 'px';
          } else if(data.left > canvasWidth - strWidth ){
            el.style.left = canvasWidth - strWidth + 'px';
          }
          let strTop = el.style.top;
          let strTops = strTop.slice(0,strTop.length - 2);
          let strLeft =  el.style.left;
          let strLefts = strLeft.slice(0,strLeft.length - 2);
          binding.value.canvasLeft = strLefts;
          binding.value.canvasTop = strTops;
          binding.value.editMode = true;
          //碰撞处理
          let familyList = data.pager;
          let itemContent = [];
          let leftList = [];
          let minList = null;
          //最小贴近距离 最大贴近距离
          let maxNumber = 25;
          let minNumber = 25;
          //相同楼层
          for(let i = 0; i < familyList.length; i++){
            if(familyList[i].canvasTop === strTops && familyList[i].id !== binding.value.id){
              itemContent.push(familyList[i]);
            }
          }
          function closest(arr, num){
            let ret = arr[0];
            let distance = Math.abs(ret - num);
            for(let i = 1; i < arr.length; i++){
              let newDistance = Math.abs(arr[i] - num);
              if(newDistance < distance){
                distance = newDistance;
                ret = arr[i];
              }
            }
            return ret;
          }
          //当同一楼层不为空时
          if(itemContent.length > 0){
            itemContent.forEach(item =>{
              leftList.push(item.canvasLeft);
            });
            //同一楼层的最小left
            minList = Math.min.apply(null, leftList);
            //left触边或不触边
            if(minList > maxNumber){
              binding.value.canvasLeft = 0;
            }else if(minList < maxNumber){
              if(data.left - minNumber <= parseInt(itemContent[leftList.indexOf(closest(leftList,data.left))].canvasLeft) + parseInt(itemContent[leftList.indexOf(closest(leftList,data.left))].canvasWidth)){
                binding.value.canvasLeft = parseInt(itemContent[leftList.indexOf(closest(leftList,data.left))].canvasLeft) + parseInt(itemContent[leftList.indexOf(closest(leftList,data.left))].canvasWidth) - 2;
              }
            }
            itemContent = [];
            leftList = [];
            minList = null;
          }
          //指定存储楼栋为2号楼
          binding.value.spaceBuilding.id = 3;
          binding.value.httpSave();
        };
        document.body.style.cursor = dir + '-resize';
    }
});
