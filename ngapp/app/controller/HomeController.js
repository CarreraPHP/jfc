function HomeController($scope){
    var camera, renderer;
    var controls;
    var scene = document.querySelector('#container #scene2d');

    var objects = [];
    var grid = [];

    var i=1, xArr = [0];
    for(; i <= 50; i++){xArr.push(i);xArr.push(-i);}

    function createMockCard(){
        return {
            style: {
                left: 0,
                top: 0
            }
        };
    }

    function getHeight(elem){
            var elemClientRect = elem.getBoundingClientRect();
            return elemClientRect.height;
    }

    function getWidth(elem){
            var elemClientRect = elem.getBoundingClientRect();
            return elemClientRect.width;
    }

    function highLightChainLink(optionNode, enable){
            var optData = optionNode.rawData;
            if (optData.charts != '') {
                    var chartNode = optionNode.parentNode.parentNode.parentNode,
                            chartData = chartNode.rawData,
                            sElementNode = document.querySelector('#' + optData.charts),
                            arrowNodeList = document.querySelectorAll('#' + optData.charts + "-arrow"),
                            arrowNode = arrowNodeList[0];

                            console.log(chartNode.id, chartNode.className);

                    for(var q in arrowNodeList){
                        if(arrowNodeList[q].parentId == chartNode.id){
                            arrowNode = arrowNodeList[q];
                            break;
                        }
                    }

                    chartNode.className = enable ? chartNode.className + " highlight-node" : chartNode.className.replace(' highlight-node', "");
                    sElementNode.className = enable ? sElementNode.className + " highlight-node" : sElementNode.className.replace(' highlight-node', "");
                    arrowNode.className = enable ? arrowNode.className + " highlight-node" : arrowNode.className.replace(' highlight-node', "");
            }
    }

    function handleOptionClick(optionNode) {
            var optData = optionNode.rawData;
            if (optData.charts != '') {
                    var chartNode = optionNode.parentNode.parentNode.parentNode,
                            chartData = chartNode.rawData,
                            sElementNode = document.querySelector('#' + optData.charts),
                            _left = parseInt(chartNode.style.left) - parseInt(sElementNode.style.left),
                            _top = parseInt(chartNode.style.top) - parseInt(sElementNode.style.top);

                    for (var d in grid) {
                            grid[d].style.left = parseInt(grid[d].style.left) + _left;
                            grid[d].style.top  = parseInt(grid[d].style.top) + _top;
                    }
                    console.log(grid, _left, _top);
                    transform(grid, 250);
            }
    }

    function createOptHolder() {
            var details = document.createElement('div');
            details.className = 'options';
            return details;
    }

    function createOptRow() {
            var detailRow = document.createElement('div');
            return detailRow;
    }

    function createOptSiblings(optHolder, opt) {
            var options = document.createElement('div'),
                    span = document.createElement('span'),
                    icoSpan = document.createElement('span');

            icoSpan.className = "fa fa-play";
            span.innerHTML = opt.name;
            options.appendChild(span);
            options.appendChild(icoSpan);
            options.rawData = opt;
            options.addEventListener('click', function () {
                    console.log("Event fired....");
                    handleOptionClick(this);
            });
            options.addEventListener('mouseenter', function () {
                    console.log("Mouse Event fired....");
                    highLightChainLink(this, true);
            });
            options.addEventListener('mouseleave', function () {
                    console.log("Mouse Event fired....");
                    highLightChainLink(this, false);
            });
            optHolder.appendChild(options);
    }

    function createCard(content) {
            var element = document.createElement('div');
            element.id = content.id;
            element.className = 'card';
            element.rawData = content;

            var title = document.createElement('div');
            title.className = 'title';
            title.innerHTML = "<span class=\"fa fa-" + (content.name.toLowerCase() == "actor" ? "user" : "task") + "\"></span>" + content.name;
            element.appendChild(title);

            var symbol = document.createElement('div');
            symbol.className = 'content';
            symbol.innerHTML = content.description;
            element.appendChild(symbol);

            return element;
    }

    function parseChartOptions(opts) {
            var optHolder = createOptHolder(),
                    optRowArr = [];

            for (var z in opts) {
                    var opt = opts[z];

                    if (optRowArr.length == 0) {
                            optRowArr.push(createOptRow());
                    }
                    createOptSiblings(optRowArr[0], opt);
                    optHolder.appendChild(optRowArr.shift());
            }
            return optHolder;
    }

    function parserChartList(lists, z_index) {
            for (var z in lists) {
                    var lt = lists[z];
                    var ltCard = createCard(lt);
// 					console.log("chart : ", z, lt, lt.options);
                    if (lt.options.length > 0) {
                            ltCard.appendChild(parseChartOptions(lt.options));
                    }

                    ltCard.style.left = 0;
                    ltCard.style.top = 0;
                    ltCard.style.zIndex = z_index;

                    objects.push(ltCard);

// 					var ltCardClone = ltCard.cloneNode();
// 					ltCardClone.innerHTML = ltCard.innerHTML;
// 					iElem.contentDocument.body.appendChild(ltCardClone);

                    scene.appendChild(ltCard);
            }
    }

    function createHiddenFrame() {
            window.iElem = document.createElement('iframe');
            document.body.appendChild(iElem);
            window.linkElem = document.createElement('link');
            linkElem.href = "css/demo.css";
            linkElem.rel = "stylesheet";
            iElem.contentDocument.body.appendChild(linkElem);
            iElem.style.visibility = "hidden";
            iElem.contentDocument.body.style.position = "relative";
            iElem.width = "600px";
            iElem.height = "600px";
    }

// 			createHiddenFrame();
    parserChartList(chart, 10);
    setTimeout(domLoad, 250);

    function domLoad() {
        document.addEventListener('MoveObject', function (event) {
//                                    console.log("Move Object custom method...", grid, objects, event.pos.moveY, event.pos.startY, event.pos.endY);

            for (_n in grid) {
//                                        console.log(parseInt(grid[_n].style.left), grid[_n].style.left, parseInt(grid[_n].style.top), grid[_n].style.top);
                grid[_n].style.left = (parseInt(grid[_n].style.left) + event.pos.moveX) + "px";
                grid[_n].style.top  = (parseInt(grid[_n].style.top) - event.pos.moveY) + "px";
            }
            transform(grid, 125);
        });

        init();
        animate();
    }

    var nObjects = [], max_cnt = 0, max_cnt_index = 0, max_height = 0;

    function init() {
        for (var y in objects) {
            var x = objects[y],
                x_id = x.id,
                v = x_id.split('-'),
                u = v.length - 1;

            if (u in nObjects) {
                nObjects[u].push(x);
            } else {
                nObjects[u] = [x];
            }
        }

        for (var w in nObjects) {
            var wObjectArr = nObjects[w];
            // should be calculated before calculating the 
            max_cnt_index = (wObjectArr.length > max_cnt) ? w : max_cnt_index;
            max_cnt = (wObjectArr.length > max_cnt) ? wObjectArr.length : max_cnt;
        }

        max_top = (max_cnt * 180) / 2;
//                                console.log("%c  [max_cnt_index, max_cnt, max_top, max_height]", "color:red;font-size:18px;", max_cnt_index, max_cnt, max_top, max_height);

        var cnObjects = [], cardStart = true, _left = 0, _top = 0, _z = 0, nObjIndex = 0;
        //reset object for handling the shuffled arrangements of grid array.
        objects = [];

        for (var _ci in nObjects) {
            cnObjects[_ci] = [];
            if (nObjects[_ci].length > 0) {
                for (var _cj in nObjects[_ci]) {
                    cnObjects[_ci][_cj] = nObjects[_ci][_cj];
                    objects.push(nObjects[_ci][_cj]);
                }
            }
        }

        // Approach 2: starting from last child and span out to the parent.

        while (cnObjects.length !== 0) {
            var cur = cnObjects.shift();

            for (var curIndex in cur) {
                var curMock = createMockCard();
                cur[curIndex].mockCard = curMock;

                if (cur.length == 1 && cardStart) {
                    _left = 0;
                    _top = 0;
                    curMock.style.left = 0; //-650;
                    curMock.style.top = 0;
                    cardStart = false;
                } else {
                    var parentObj = false,
                        parentObjArr = nObjects[nObjIndex - 1],
                        elem = cur[curIndex],
                        elemId = elem.id,
                        elemIdArr = elemId.split('-');

                    elemIdArr.pop();
                    var parenElemId = elemIdArr.join('-')
                    for (var _nox in parentObjArr) {
                        if (parentObjArr[_nox].id == parenElemId) {
                            parentObj = parentObjArr[_nox];
                        }
                    }

// 											var cfnSelector = '#' + ((parseInt(curIndex) != cur.length-1) ? (cur[parseInt(curIndex)+1]).id : cur[parseInt(curIndex)].id);
                    var curFrameNode = ((parseInt(curIndex) != cur.length-1) ? (cur[parseInt(curIndex)+1]) : cur[parseInt(curIndex)]);

                    var _top_diff = 0, //* (max_cnt / 2)
                        _top_incr = 0; // 180
                    if (cur.length > 1) {
                        var _top_init = 0;
                        if (cur.length % 2 == 0) {
                            _top_init = 1;
                        } else {
                            _top_init = 0;
                        }
                        _top_incr = (curIndex - Math.floor(cur.length / 2));
                        _top_diff = getHeight(curFrameNode);
                        if (_top_incr > -1) {
                            _top_incr = _top_incr + _top_init;
                             _top_diff = getHeight(cur[curIndex]);
                        }
// 							console.log("curIndex , ", curIndex, (cur.length/2 + 1), (curIndex - (cur.length/2 + 1)), (curIndex - Math.floor(cur.length/2)), _top_incr);
                    }



                    curMock.style.left = (parentObj.mockCard.style.left + 300);
                    curMock.style.top = (parentObj.mockCard.style.top + (_top_incr * _top_diff));
//                                                  console.log("child - parent position , ", cur[curIndex].position, curMock.position, parentObj.position);
                }
                grid.push(curMock);
            }
            nObjIndex++;
        }

        transform(grid, 125);

        controls = new TrackballControls( scene, document.querySelector('#container') );
        controls.rotateSpeed = 0.5;
        controls.minDistance = 0;
        controls.maxDistance = 10000;
// 				controls.addEventListener( 'change', render );

        setTimeout(function(){
            drawArrow();
            transform(grid, 125);
        }, 150);

        window.addEventListener('resize', onWindowResize, false);

    }

    function drawArrow() {
        function getTopAdjustment(jinObj, options, _u) {
            var contentHeight = getHeight(jinObj.querySelector('.content')) + getHeight(jinObj.querySelector('.title'));
            var returnVal = contentHeight + (getHeight(options[_u]) / 2);

            while (_u > 0) {
                returnVal += getHeight(options[_u - 1]);
                _u--;
            }
            return returnVal;
        }

        function createArrow(_index, id, parentId, arrowBottomLeftX, arrowTopRightX, arrowBottomLeftY, arrowTopRightY, arrowElemHeight, arrowElemWidth) {                                    
            var widthPercent = (((_index > 10) ? (_index % 10) : _index) / 1) * 10; //percentage                                    
            var arrowElm = document.createElement('div');

            arrowElm.id = id + '-arrow';
            arrowElm.parentId = parentId;
            arrowElm.style.height = ((arrowElemHeight < 0) ? -arrowElemHeight : arrowElemHeight) + 'px';
            arrowElm.style.width = ((arrowElemWidth < 0) ? -arrowElemWidth : arrowElemWidth) + 'px';
            var w1 = Math.floor(arrowElemWidth * (arrowElemWidth < 0 ? -1 : 1)/2),
                w2 = (arrowElemWidth * (arrowElemWidth < 0 ? -1 : 1)) - w1;
            arrowElm.innerHTML = [ "<div style=\"width:", w2, "px\"></div>", "<div style=\"width:", w1, "px\"></div>" ].join(''); /* style=\"width:", (widthPercent), "%\" */
            arrowElm.style.top = (arrowElemHeight < 0) ? arrowBottomLeftY + arrowElemHeight : arrowBottomLeftY; // - (arrowElemWidth / 2) + 20
            arrowElm.style.left = (arrowTopRightX < arrowBottomLeftX) ? arrowTopRightX : arrowBottomLeftX; // + (arrowBottomLeftX / 2);

            var heightforCompare = ((arrowElemHeight < 0) ? -arrowElemHeight : arrowElemHeight);

            if((arrowTopRightY > arrowBottomLeftY)){
                    arrowElm.className = " arrow-reverse";
            }else if((heightforCompare > 10)){
                    arrowElm.className = " arrow";										
            }else{
                    arrowElm.className = " arrow-straight";
// 										arrowElm.style.height = '3px';
            }

            var mockCard = createMockCard();
            mockCard.style.top = (arrowElemHeight < 0 ? arrowBottomLeftY + arrowElemHeight : arrowBottomLeftY)//  + 'px'; //  - (arrowElemWidth / 2) + 20
            mockCard.style.left = (arrowTopRightX < arrowBottomLeftX) ? arrowTopRightX : arrowBottomLeftX; // + (arrowBottomLeftX / 2);

            if(arrowTopRightX < arrowBottomLeftX){
                if(arrowElm.className.indexOf("arrow-reverse") !== -1){
                    arrowElm.className = " arrow";
                }else if(arrowElm.className.indexOf("arrow") !== -1){
                    arrowElm.className = " arrow-reverse";
                }
            }

            arrowElm.mockCard = mockCard;
            arrowElm.rawData = {};
            objects.push(arrowElm);
            scene.appendChild(arrowElm);                                    
            grid.push(mockCard);
        }

        for (var _i in nObjects) {
            var inObj = nObjects[_i];
            for (var _j in inObj) {
                var jinObj = inObj[_j];
                var options = jinObj.querySelectorAll('.options > div > div');

                for (var _k = 0; _k < options.length; _k++) {
                    var kOption = options[_k];
//                                            console.log("\n\n\n\t\t", _i, _j, _k, "raw Data");
//                                            console.log(options, _k, kOption.rawData);

                    if (kOption.rawData.charts !== '') {
                        var linkedChart = document.querySelector('#' + kOption.rawData.charts);
                        var topPadding = getTopAdjustment(jinObj, options, _k);
                        var lcStyleTop = parseInt(linkedChart.style.top);
                        var lcStyleLeft = parseInt(linkedChart.style.left);
                        var jinObjStyleTop = parseInt(jinObj.style.top);
                        var jinObjStyleLeft = parseInt(jinObj.style.left);

                        var lcoPosY = (lcStyleTop > -1 && lcStyleTop < 1) ? linkedChart.mockCard.style.top : lcStyleTop;
                        var lcoPosX = (lcStyleLeft > -1 && lcStyleLeft < 1) ? linkedChart.mockCard.style.left : lcStyleLeft;
                        var joPosY = (jinObjStyleTop > -1 && jinObjStyleTop < 1) ? jinObj.mockCard.style.top : jinObjStyleTop;
                        var joPosX = (jinObjStyleLeft > -1 && jinObjStyleLeft < 1) ? jinObj.mockCard.style.left : jinObjStyleLeft;

                        var arrowBottomLeftY = topPadding + joPosY;
                        var arrowTopRightY = lcoPosY + (getHeight(linkedChart) / 2);
                        var arrowElemHeight = arrowTopRightY - arrowBottomLeftY;

                        var arrowBottomLeftX = joPosX + getWidth(jinObj);
                        var arrowTopRightX = lcoPosX;
                        var arrowElemWidth = arrowTopRightX - arrowBottomLeftX;

//                                                console.log("[getHeight(jinObj), topPadding, jinObj.style.left, jinObj.style.top, linkedChart.style.left, lcStyleTop, jinObj.id, getHeight(linkedChart), linkedChartObject.id]");
//                                                console.log(getHeight(jinObj), topPadding, joPosX, joPosY, lcoPosX, lcoPosY, jinObj.id, getHeight(linkedChart), kOption.rawData.charts);
//                                                 console.log("[arrowBottomLeftX, arrowTopRightX, arrowBottomLeftY, arrowTopRightY, arrowElemHeight, arrowElemWidth]");
//                                                 console.log(arrowBottomLeftX, arrowTopRightX, arrowBottomLeftY, arrowTopRightY, arrowElemHeight, arrowElemWidth);                                                
                        createArrow(_k+1, kOption.rawData.charts, jinObj.id, arrowBottomLeftX, arrowTopRightX, arrowBottomLeftY, arrowTopRightY, arrowElemHeight, arrowElemWidth);
                    }
                }
            }
        }
        transform(grid, 2000);
    }

    function transform(targets, duration) {
        for (var i = 0; i < objects.length; i++) {
            var object = objects[ i ];
            var target = targets[ i ];

            object.style.left = target.style.left + (target.style.left.toString().indexOf('px') !== -1 ? '' : 'px');
            object.style.top = target.style.top + (target.style.left.toString().indexOf('px') !== -1 ? '' : 'px');
        }
    }

    function onWindowResize() {
        render();
    }

    function animate() {
        requestAnimationFrame(animate);
//				controls.update();
    }

    function render() {
    }
}
