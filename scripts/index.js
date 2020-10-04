/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Apple.js":
/*!******************!*\
  !*** ./Apple.js ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Apple; });\n/* harmony import */ var _Math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Math */ \"./Math.js\");\n/* harmony import */ var _Snake__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Snake */ \"./Snake.js\");\n\n\n\nclass Apple extends EventTarget{\n    constructor(gameField){\n        super();\n        this.body = [];\n        this.gameField = gameField;\n\n        let freeCell = {x: Object(_Math__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(0, gameField.columnsCount - 1), y: Object(_Math__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(0, gameField.rowsCount - 1)};\n\n        while(true){\n            if(gameField.isFreeCell(freeCell)){\n                break;\n            } else {\n                freeCell = {x: Object(_Math__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(0, gameField.columnsCount - 1), y: Object(_Math__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(0, gameField.rowsCount - 1)};\n            }\n        }\n\n        freeCell.div = null;\n\n        this.body.push({x: freeCell.x, y: freeCell.y, div: null});\n        this.gameField.updateSegments({detail: this.body});\n\n        this.draw();\n    }\n\n    onCollision(game, actor){\n        if(actor instanceof _Snake__WEBPACK_IMPORTED_MODULE_1__[\"default\"]){\n            game.score = game.score + 1;\n            actor.addSegment();\n\n            let freeCell = {x: Object(_Math__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(0, this.gameField.columnsCount - 1), y: Object(_Math__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(0, this.gameField.rowsCount - 1)};\n\n            while(true){\n                if(this.gameField.isFreeCell(freeCell)){\n                    break;\n                } else {\n                    freeCell = {x: Object(_Math__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(0, this.gameField.columnsCount - 1), y: Object(_Math__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(0, this.gameField.rowsCount - 1)};\n                }\n            }\n\n            this.body[0].x = freeCell.x;\n            this.body[0].y = freeCell.y;\n        }\n        \n        this.gameField.updateSegments({detail: this.body});\n    }\n\n    draw(){\n\n        for(let i = 0; i < this.body.length; i++){\n\n            let curSegment = this.body[i];\n\n            let div = curSegment.div;\n\n            div.style.backgroundImage = 'url(images/apple.png)';\n            div.style.backgroundPosition = 'center';\n            div.style.backgroundSize = 'cover';\n        }\n    }\n}\n\n//# sourceURL=webpack:///./Apple.js?");

/***/ }),

/***/ "./Controls.js":
/*!*********************!*\
  !*** ./Controls.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Controls; });\nclass Controls extends EventTarget{\n    constructor(){\n        super();\n        document.onkeydown = this.keyPress.bind(this);\n    }\n\n    keyPress(event){\n        let eventName = 'Keyboard';\n        let detail = {};\n\n        switch(event.code){\n            case 'ArrowUp':\n            case 'KeyW'     : detail.key = 'Up'; break;\n            case 'ArrowDown': \n            case 'KeyS'     : detail.key = 'Down'; break;\n            case 'ArrowLeft':\n            case 'KeyA'     : detail.key = 'Left'; break;\n            case 'ArrowRight':\n            case 'KeyD'     : detail.key = 'Right'; break;\n            case 'Digit1'   : detail.key = 'Num1'; break;\n            case 'Digit2'   : detail.key = 'Num2'; break;\n            case 'Digit3'   : detail.key = 'Num3'; break;\n            case 'Digit4'   : detail.key = 'Num4'; break;\n            case 'Digit5'   : detail.key = 'Num5'; break;\n            case 'Digit6'   : detail.key = 'Num6'; break;\n            case 'Digit7'   : detail.key = 'Num7'; break;\n            case 'Digit8'   : detail.key = 'Num8'; break;\n            case 'Digit9'   : detail.key = 'Num9'; break;\n            case 'Digit0'   : detail.key = 'Num0'; break;\n            case 'Escape'   : detail.key = 'Escape'; break;\n            case 'Enter'    : detail.key = 'Enter'; break;\n        }\n\n        if(detail.key != undefined){\n            this.dispatchEvent(new CustomEvent(eventName, {detail: detail}));\n        }\n    }\n}\n\n//# sourceURL=webpack:///./Controls.js?");

/***/ }),

/***/ "./Game.js":
/*!*****************!*\
  !*** ./Game.js ***!
  \*****************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Game; });\n/* harmony import */ var _SinglePlayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SinglePlayer */ \"./SinglePlayer.js\");\n/* harmony import */ var _Controls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Controls */ \"./Controls.js\");\n/* harmony import */ var _Scene__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Scene */ \"./Scene.js\");\n/* harmony import */ var _GameOverScreen__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GameOverScreen */ \"./GameOverScreen.js\");\n\n\n\n\n\nclass Game extends EventTarget{\n    constructor(columnsCount, rowsCount){\n        super();\n        \n        if(document.getElementById('game') == undefined){\n            let gameDiv = document.createElement('div');\n\n            gameDiv.id = 'game';\n            \n            let gameDivSize = this.getDisplaySize(480, 640);\n            gameDiv.style.width = gameDivSize.width;\n            gameDiv.style.height = gameDivSize.height;\n\n            document.body.appendChild(gameDiv);\n        }\n\n        this._div = document.getElementById('game');\n\n        this._controls = new _Controls__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n        this._controls.addEventListener('Keyboard', this.onKeyboardEvent.bind(this));\n\n        this._currentScene = new _Scene__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n        \n        this._scenes = {\n            SinglePlayer : new _SinglePlayer__WEBPACK_IMPORTED_MODULE_0__[\"default\"](columnsCount, rowsCount, this._div),\n            GameOverScreen : new _GameOverScreen__WEBPACK_IMPORTED_MODULE_3__[\"default\"](this._div)\n        }\n\n        this.changeCurrentScene(this._scenes.SinglePlayer);\n    };\n\n    getDisplaySize(defaultWidth, defaultHeight){\n        let documentWidth = document.documentElement.clientWidth;\n        let documentHeight = document.documentElement.clientHeight;\n        let K = documentWidth / documentHeight;\n        let k = 1;\n\n        if(K > 1){\n            k = documentHeight > defaultHeight ? 1 : documentHeight / defaultHeight;\n        } else {\n            k = documentWidth > defaultWidth ? 1 : documentWidth / defaultWidth;    \n        }\n\n        return {\n            width : defaultWidth * k,\n            height : defaultHeight * k\n        }\n    }\n\n    onKeyboardEvent(event){\n        this._currentScene.onKeyboardEvent(event);\n    }\n\n    changeCurrentScene(newScene){\n        this._currentScene.removeEventListener('StateChanging', this.onSceneStateChanging.bind(this));\n        this._currentScene.removeEventListener('OnStop', this.onSceneStop.bind(this));\n        this._currentScene.removeEventListener('OnStart', this.onSceneStart.bind(this));\n        this._currentScene.removeEventListener('OnPause', this.onScenePause.bind(this));\n\n        this._currentScene.reset();\n        this._currentScene = newScene;\n        this._currentScene.score = 50;\n        this._currentScene.start();\n\n        this._currentScene.addEventListener('StateChanging', this.onSceneStateChanging.bind(this));\n        this._currentScene.addEventListener('OnStop', this.onSceneStop.bind(this));\n        this._currentScene.addEventListener('OnStart', this.onSceneStart.bind(this));\n        this._currentScene.addEventListener('OnPause', this.onScenePause.bind(this));\n    }\n\n    onSceneStateChanging(event){}\n    onSceneStop(event){\n\n        this.changeCurrentScene(this._scenes.GameOverScreen);\n    }\n    onSceneStart(event){}\n    onScenePause(event){}\n}\n\n\n\n//# sourceURL=webpack:///./Game.js?");

/***/ }),

/***/ "./GameOverScreen.js":
/*!***************************!*\
  !*** ./GameOverScreen.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return GameOverScreen; });\n/* harmony import */ var _Scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Scene */ \"./Scene.js\");\n\n\nclass GameOverScreen extends _Scene__WEBPACK_IMPORTED_MODULE_0__[\"default\"]{\n    constructor(display){\n        super('game-over-screen');\n\n        this._score = 0;\n\n        let w = display.clientWidth;\n        let h = display.clientHeight;\n\n        this._screen.style.position = 'absolute';\n        this._screen.style.width = w;\n        this._screen.style.height = h;\n\n        this._screen.innerText = 'GAME OVER';\n\n        display.appendChild(this._screen);\n    }\n\n    set score(newValue){\n        this._score = newValue;\n    }\n\n    start(){\n        super.start();\n    }\n}\n\n//# sourceURL=webpack:///./GameOverScreen.js?");

/***/ }),

/***/ "./Gamefield.js":
/*!**********************!*\
  !*** ./Gamefield.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return GameField; });\n/* harmony import */ var _Math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Math */ \"./Math.js\");\n\n\nclass GameField extends EventTarget{\n    constructor(columnsCount, rowsCount, visibleAreaWidth, visibleAreaHeight, parentDiv, name){\n        super();\n\n        if(name == undefined || name == ''){\n            throw SyntaxError(\"Parameter 'name' is undefined!\");\n        }\n\n        let parent = document.body;\n\n        if(parentDiv != undefined){\n            parent = parentDiv;\n        }\n\n        this.segmentWidth = 20;\n        this.segmentHeight = 20;\n        this.minSegmentCountToEdge = 4;\n        this._visibleArea = {\n            x : 0,\n            y : 0,\n            minX : 0,\n            maxX : 0,\n            minY : 0,\n            maxY : 0\n        }\n\n        this._visibleAreaWidth = visibleAreaWidth;\n        this._visibleAreaHeight = visibleAreaHeight;\n\n        this._gamefieldDiv = document.getElementById(name);\n\n        if(this._gamefieldDiv == undefined){\n            this._gamefieldDiv = document.createElement('div');\n            this._gamefieldDiv.id = name;\n            parent.appendChild(this._gamefieldDiv);\n        }\n\n        let au = document.createElement('div');\n        au.id = 'arrow-up';\n        au.classList.add('arrow');\n        let ad = document.createElement('div');\n        ad.id = 'arrow-down';\n        ad.classList.add('arrow');\n        let al = document.createElement('div');\n        al.id = 'arrow-left';\n        al.classList.add('arrow');\n        let ar = document.createElement('div');\n        ar.id = 'arrow-right';\n        ar.classList.add('arrow');\n        \n        this._gamefieldDiv.appendChild(au);\n        this._gamefieldDiv.appendChild(ad);\n        this._gamefieldDiv.appendChild(al);\n        this._gamefieldDiv.appendChild(ar);\n\n        this.viewPortDiv = document.getElementById(name);\n        this.viewPortDiv.style.width = this._visibleAreaWidth;\n        this.viewPortDiv.style.height = this._visibleAreaHeight;\n        this.viewPortDiv.style.overflow = 'hidden';\n\n        this.arrows = {\n            up:     document.getElementById('arrow-up'),\n            down:   document.getElementById('arrow-down'),\n            left:   document.getElementById('arrow-left'),\n            right:  document.getElementById('arrow-right'),\n        }\n\n        let fieldDiv = document.createElement('div');\n        fieldDiv.style.position = 'relative';\n        fieldDiv.style.border = '1px solid rgb(0, 224, 0)';\n        fieldDiv.style.boxShadow = '0 0 10px rgb(0, 224, 0)';\n        fieldDiv.style.webkitBoxShadow = '0 0 10px rgb(0, 224, 0)';\n        fieldDiv.style['-webkit-transition'] = 'all 0.2s ease-out';\n        this.viewPortDiv.append(fieldDiv);\n\n        this.fieldDiv = fieldDiv;\n\n        this.fieldDiv.style.width = columnsCount*this.segmentWidth;\n        this.fieldDiv.style.height = rowsCount*this.segmentHeight;\n\n        this.field = new Array(rowsCount);\n        for(let y = 0; y < rowsCount; y++){\n            this.field[y] = new Array(columnsCount);\n\n            for(let x = 0; x < columnsCount; x++){\n                this.field[y][x] = {busy : false};\n            }\n        }\n\n        this.setupViewPortPosition();\n    }\n\n    get columnsCount(){\n        return this.field[0].length;\n    }\n\n    get rowsCount(){\n        return this.field.length;\n    }\n\n    isFreeCell(cellCoordinates){\n        return !this.field[cellCoordinates.y][cellCoordinates.x].busy;\n    }\n\n    takeСell(cellCoordinates){\n        this.field[cellCoordinates.y][cellCoordinates.x].busy = true;\n    }\n\n    addSegment(event){\n        let body = event.detail;\n\n        for(let segmentIndex = 0; segmentIndex < body.length; segmentIndex++){\n            let segment = body[segmentIndex]; \n\n            if(segment.div == null){\n                let div = document.createElement('div');\n\n                div.style.position = 'absolute';\n                div.style.width = this.segmentWidth;\n                div.style.height = this.segmentHeight;\n                div.style.left = segment.x*this.segmentWidth;\n                div.style.top = segment.y*this.segmentHeight;\n                div.style.transformOrigin = 'center center';\n\n                this.fieldDiv.append(div);\n\n                segment.div = div;\n            }\n        }\n    }\n\n    freeSegments(event){\n        let body = event.detail;\n\n        for(let i = 0; i < body.length; i++){\n            this.field[body[i].y][body[i].x].busy = false;\n        }\n    }\n\n    updateSegments(event){\n        let body = event.detail;\n\n        for(let segmentIndex = 0; segmentIndex < body.length; segmentIndex++){\n            let segment = body[segmentIndex]; \n\n            if(segment.div == null){\n                this.addSegment(event);\n            }\n\n            segment.div.style.left = segment.x*this.segmentWidth;\n            segment.div.style.top = segment.y*this.segmentHeight;\n\n            this.field[segment.y][segment.x].busy = true;\n        }\n    }\n\n    showArrows(){\n        if(this.fieldDiv.clientWidth + Number(this.fieldDiv.style.left.replace('px', '')) > this.viewPortDiv.clientWidth){\n            this.arrows.right.style.opacity = 0.5;\n        } else {\n            this.arrows.right.style.opacity = 0.0;\n        }\n\n        if(Number(this.fieldDiv.style.left.replace('px', '')) < 0){\n            this.arrows.left.style.opacity = 0.5;\n        } else {\n            this.arrows.left.style.opacity = 0.0;\n        }\n        \n        if(this.fieldDiv.clientHeight + Number(this.fieldDiv.style.top.replace('px', '')) > this.viewPortDiv.clientHeight){\n            this.arrows.down.style.opacity = 0.5;\n        } else {\n            this.arrows.down.style.opacity = 0.0;\n        }\n\n        if(Number(this.fieldDiv.style.top.replace('px', '')) < 0){\n            this.arrows.up.style.opacity = 0.5;\n        } else {\n            this.arrows.up.style.opacity = 0.0;\n        }\n    }\n\n    setupViewPortPosition(){\n        this.moveViewPort(0, 0);\n    }\n\n    moveViewPort(x, y){\n        this.resetVisibleArea(x, y);\n\n        this.fieldDiv.style.left = -x * this.segmentWidth;\n        this.fieldDiv.style.top = -y * this.segmentHeight;\n\n        this.showArrows();\n    }\n\n    resetVisibleArea(x, y){\n        this._visibleArea.x = x;\n        this._visibleArea.y = y;\n        this._visibleArea.minX = this._visibleArea.x + 4;\n        this._visibleArea.maxX = this._visibleArea.x + (this._visibleAreaWidth/this.segmentWidth - 1) - 4;\n        this._visibleArea.minY = this._visibleArea.y + 4;\n        this._visibleArea.maxY = this._visibleArea.y + (this._visibleAreaHeight/this.segmentHeight - 1) - 4;\n\n        this.dispatchEvent(new Event('ChangeVisibleArea'));\n    }\n\n    needViewPortRemoving(Coord){\n        let minX = this._visibleArea.minX;\n        let maxX = this._visibleArea.maxX;\n        let minY = this._visibleArea.minY;\n        let maxY = this._visibleArea.maxY;\n\n        return Coord.x < minX || Coord.x > maxX || Coord.y < minY || Coord.y > maxY;\n    }\n\n    moveViewPortOnStep(event){\n        let head = event.detail[0]; \n\n        if(this.needViewPortRemoving(head)){\n            let hx = head.x;\n            let hy = head.y;\n            let minX = this._visibleArea.minX;\n            let minY = this._visibleArea.minY;\n            let maxX = this._visibleArea.maxX;\n            let maxY = this._visibleArea.maxY;\n            let minSCRE = this.minSegmentCountToEdge;\n            let vSOWC = this._visibleAreaWidth/this.segmentWidth;\n            let vSOHC = this._visibleAreaHeight/this.segmentHeight;\n\n            let x = this._visibleArea.x;\n            let y = this._visibleArea.y;\n            \n            x = hx > maxX ? hx + minSCRE - (vSOWC - 1) : x;            \n            x = hx < minX ? hx - minSCRE : x;            \n            y = hy > maxY ? hy + minSCRE - (vSOHC - 1) : y;\n            y = hy < minY ? hy - minSCRE : y;\n\n            this.moveViewPort(x, y);\n        }\n    }\n\n    getFreeCell(){\n        let freeCell = {x: Object(_Math__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(0, this.columnsCount - 1), y: Object(_Math__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(0, this.rowsCount - 1)};\n\n        while(true){\n            if(this.isFreeCell(freeCell)){\n                break;\n            } else {\n                freeCell = {x: Object(_Math__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(0, this.columnsCount - 1), y: Object(_Math__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(0, this.rowsCount - 1)};\n            }\n        }\n\n        return freeCell;\n    }\n\n    gitVisibleSegments(){\n\n    }\n}\n\n//# sourceURL=webpack:///./Gamefield.js?");

/***/ }),

/***/ "./Math.js":
/*!*****************!*\
  !*** ./Math.js ***!
  \*****************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return getRandomIntInclusive; });\nfunction getRandomIntInclusive(min, max) {\n    min = Math.ceil(min);\n    max = Math.floor(max);\n    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются\n}\n\n//# sourceURL=webpack:///./Math.js?");

/***/ }),

/***/ "./Portal.js":
/*!*******************!*\
  !*** ./Portal.js ***!
  \*******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Portal; });\n/* harmony import */ var _Math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Math */ \"./Math.js\");\n/* harmony import */ var _Snake__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Snake */ \"./Snake.js\");\n\n\n\nclass Portal extends EventTarget{\n    constructor(gameField){\n        super();\n\n        this.body = new Array();\n        this.gameField = gameField;\n        this.buffer = {};\n\n        this.resetBody();\n\n    }\n\n    resetBody(){\n        for(let i = 0; i < 2; i++){\n            let freeCell = this.gameField.getFreeCell();\n\n            this.body.push({x: freeCell.x, y: freeCell.y, div: null});\n        }\n\n        this.gameField.updateSegments({detail: this.body});\n\n        this.draw();\n    }\n\n    clearBody(){\n        this.gameField.freeSegments({detail: this.body});\n\n        for(let i = this.body.length - 1; i >= 0; i--){\n            this.body[i].div.remove();\n            this.body[i].div = null;\n            this.body.splice(i, 1);\n        }\n    }\n\n    onCollision(game, actor){\n        if(actor instanceof _Snake__WEBPACK_IMPORTED_MODULE_1__[\"default\"]){\n            for(let i = 0; i < this.body.length; i++){\n                if(this.body[i].x == actor.body[0].x && this.body[i].x == actor.body[0].x){\n                    actor.addEventListener('PrevStep', \n                                            this.goThroughThePortalPrev.bind(\n                                                this, \n                                                actor, \n                                                this.body[(i + 1)%2].x, \n                                                this.body[(i + 1)%2].y), \n                                            {once : true})\n                    this.clearBody();\n                    break;\n                    \n                    // actor.body[0].x = this.body[(i + 1)%2].x;\n                    // actor.body[0].y = this.body[(i + 1)%2].y;\n                    // this.clearBody();\n                    // setTimeout(this.resetBody.bind(this), getRandomIntInclusive(1000, 10000));\n                    // break;\n                }\n            }\n            // this.clearBody();\n            // setTimeout(this.resetBody.bind(this), getRandomIntInclusive(1000, 10000));\n        }\n    }\n\n    goThroughThePortalPrev(snake, x, y){\n        this.buffer['oldDirection'] = snake.direction;\n        \n        snake.direction = {\n            x: x - snake.head.x,\n            y: y - snake.head.y\n        };        \n\n        snake.addEventListener('Step', this.goThroughThePortal.bind(this, snake), {once:true})\n\n        // this.clearBody();\n        // setTimeout(this.resetBody.bind(this), getRandomIntInclusive(1000, 10000));\n    }\n\n    goThroughThePortal(snake, x, y){\n        snake.direction = {\n            x: this.buffer.oldDirection.x,\n            y: this.buffer.oldDirection.y,\n        }\n\n        setTimeout(this.resetBody.bind(this), Object(_Math__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(1000, 10000));\n    }\n\n    draw(){\n        \n        this.body[0].div.style.borderColor = 'rgb(64, 64, 192)';\n        this.body[0].div.style.borderStyle = 'solid';\n        this.body[0].div.style.boxSizing = 'border-box';\n        this.body[0].div.style.borderWidth = '2px';\n        \n        this.body[1].div.style.borderColor = 'rgb(224, 96, 0)';\n        this.body[1].div.style.borderStyle = 'solid';\n        this.body[1].div.style.boxSizing = 'border-box';\n        this.body[1].div.style.borderWidth = '2px';\n    }\n}\n\n//# sourceURL=webpack:///./Portal.js?");

/***/ }),

/***/ "./Scene.js":
/*!******************!*\
  !*** ./Scene.js ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Scene; });\nconst STATES = Object({'CREATED': 0, 'EXECUTING': 1, 'PAUSED': 2, 'STOPPED':3});\n\nclass Scene extends EventTarget{\n    constructor(nameID){\n        super();\n\n        if(nameID == undefined || nameID == ''){\n            nameID = Date.now().toString();\n        }\n        this._screen = document.createElement('div');\n        this._screen.style.position = 'absolute';\n        this._screen.style.opacity = 0;\n\n        this._state = STATES.CREATED;\n        this._id = nameID;\n    }\n\n    stop(){\n        this._screen.style.opacity = 0;\n        this.state = STATES.STOPPED;\n        this.dispatchEvent(new CustomEvent('OnStop'));\n    }\n    \n    start(){\n        this._screen.style.opacity = 1;\n        this.state = STATES.EXECUTING;\n        this.dispatchEvent(new CustomEvent('OnStart'));\n    }\n\n    pause(){\n        this._screen.style.opacity = 0;\n        this.state = STATES.PAUSED;\n        this.dispatchEvent(new CustomEvent('OnPause'));\n    }\n    \n    reset(){\n        this._screen.style.opacity = 0;\n        this.state = STATES.CREATED;\n        this.dispatchEvent(new CustomEvent('OnReset'));\n    }\n\n    get state(){\n        return this._state;\n    }\n\n    get id(){\n        return this._id;\n    }\n\n    onKeyboardEvent(event){}\n\n    set state(newValue){\n        this.dispatchEvent(new CustomEvent('StateChanging', {detail: {oldState: this._state, newState: newValue,}}));\n\n        this._state = newValue;\n    }\n}\n\n//# sourceURL=webpack:///./Scene.js?");

/***/ }),

/***/ "./SinglePlayer.js":
/*!*************************!*\
  !*** ./SinglePlayer.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SinglePlayer; });\n/* harmony import */ var _Scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Scene */ \"./Scene.js\");\n/* harmony import */ var _Snake__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Snake */ \"./Snake.js\");\n/* harmony import */ var _Apple__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Apple */ \"./Apple.js\");\n/* harmony import */ var _Portal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Portal */ \"./Portal.js\");\n/* harmony import */ var _Gamefield__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Gamefield */ \"./Gamefield.js\");\n\n\n\n\n\n\nclass SinglePlayer extends _Scene__WEBPACK_IMPORTED_MODULE_0__[\"default\"]{\n    constructor(columnsCount, rowsCount, display){\n        super('single-player');\n\n        this._screen.id = 'game-field';\n        display.appendChild(this._screen);\n        this.gameField = new _Gamefield__WEBPACK_IMPORTED_MODULE_4__[\"default\"](columnsCount, rowsCount, display.clientWidth, display.clientHeight, display, 'game-field');\n\n        this.maxY = rowsCount - 1;\n        this.maxX = columnsCount - 1;\n        this._score = 0;\n\n        this.actors = new Array();\n\n        this.actors.push(new _Snake__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.gameField)); // player\n\n        this.actors[0].addEventListener('GrowUp', this.gameField.addSegment.bind(this.gameField));\n        this.actors[0].addEventListener('PrevStep', this.gameField.freeSegments.bind(this.gameField));\n        this.actors[0].addEventListener('Step', this.goThroughWalls.bind(this));\n        // this.actors[0].addEventListener('Step', this.gameField.updateSegments.bind(this.gameField));\n        this.actors[0].addEventListener('Step', this.gameField.moveViewPortOnStep.bind(this.gameField));\n        this.actors[0].addEventListener('Step', this.collisionControl.bind(this));\n        this.actors[0].addEventListener('Death', this.stop.bind(this));\n\n        this.actors.push(new _Apple__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.gameField));\n        this.actors.push(new _Portal__WEBPACK_IMPORTED_MODULE_3__[\"default\"](this.gameField));\n\n        this.actors[0].move();\n    }\n\n    reset(){\n        this._score = 0;_Gamefield__WEBPACK_IMPORTED_MODULE_4__[\"default\"]\n\n        delete this.actors;\n        this.actors = new Array();\n        this.actors.push(new _Snake__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.gameField)); // player\n        this.actors[0].addEventListener('GrowUp', this.gameField.addSegment.bind(this.gameField));\n        this.actors[0].addEventListener('PrevStep', this.gameField.freeSegments.bind(this.gameField));\n        this.actors[0].addEventListener('Step', this.goThroughWalls.bind(this));\n        // this.actors[0].addEventListener('Step', this.gameField.updateSegments.bind(this.gameField));\n        this.actors[0].addEventListener('Step', this.gameField.moveViewPortOnStep.bind(this.gameField));\n        this.actors[0].addEventListener('Step', this.collisionControl.bind(this));\n        this.actors[0].addEventListener('Death', this.stop.bind(this));\n\n        this.actors.push(new _Apple__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.gameField));\n        this.actors.push(new _Portal__WEBPACK_IMPORTED_MODULE_3__[\"default\"](this.gameField));\n\n        super.reset();\n    }\n\n    onKeyboardEvent(event){\n        super.onKeyboardEvent(event);\n\n        let key = event.detail.key;\n\n        switch(key){\n            case 'Left' : this.actors[0].changeDirection({x: -1, y: 0}); break;\n            case 'Right': this.actors[0].changeDirection({x: 1, y: 0}); break;\n            case 'Up'   : this.actors[0].changeDirection({x: 0, y: -1}); break;\n            case 'Down' : this.actors[0].changeDirection({x: 0, y: 1}); break;\n            case 'Num1' : this.actors[0].addSegment(); break;\n        }\n    }\n\n    set score(value){\n        this.dispatchEvent(new CustomEvent({prevValue: this._score, currentValue: value}));\n\n        this._score = value;\n\n        // document.getElementById('game-score').innerText = `Score: ${this._score}`;\n    }\n\n    get score(){\n        return this._score;\n    }\n\n    goThroughWalls(event){\n        let segments = event.detail;\n\n        for(let segmentIndex = 0; segmentIndex < segments.length; segmentIndex++){\n            let segment = segments[segmentIndex];\n\n            if(segment.x < 0){\n                segment.x = this.gameField.columnsCount - 1;\n            }\n\n            if(segment.x >= this.gameField.columnsCount){\n                segment.x = 0;\n            }\n            \n            if(segment.y < 0){\n                segment.y = this.gameField.rowsCount - 1;\n            }\n\n            if(segment.y >= this.gameField.rowsCount){\n                segment.y = 0;\n            }\n        }\n    }\n\n    collisionControl(){\n        for(let i = 0; i < this.actors.length; i++){\n            for(let e = i; e < this.actors.length; e++){\n                let fActor = this.actors[i];\n                let sActor = this.actors[e];\n\n                function isCollision(fBody, sBody){\n                    for(let fi = 0; fi < fBody.length; fi++){\n                        for(let si = 0; si < sBody.length; si++){\n                            if(fActor.body[fi].x == sActor.body[si].x && fActor.body[fi].y == sActor.body[si].y){\n                                return true;\n                            }\n                        }\n                    }\n\n                    return false;\n                }\n\n                if(isCollision(fActor.body, sActor.body)){\n                    console.log();\n\n                    fActor.onCollision(this, sActor);\n                    sActor.onCollision(this, fActor);\n                }\n            }\n        }\n    }\n\n    stop(){\n        super.stop();\n    }\n\n    start(){\n        super.start();\n    }\n};\n\n//# sourceURL=webpack:///./SinglePlayer.js?");

/***/ }),

/***/ "./Snake.js":
/*!******************!*\
  !*** ./Snake.js ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Snake; });\nclass Snake extends EventTarget{\n    constructor(gameField){\n        super();\n        this.body = new Array();\n        this.lastPlace = {x:0, y:0};\n        this.millisecondsPerStep = 200;\n        this.alive = true;\n\n        this.gameField = gameField;\n\n        let newSegment = {x: 0, y: 0, div:null};\n\n        for(let i = 0; i < 3; i++){\n            if(gameField.isFreeCell(newSegment)){\n                gameField.takeСell(newSegment);\n                this.body.push(newSegment);\n            } else if(gameField.isFreeCell({x:newSegment.x + 1, y: newSegment.y})){\n                newSegment = {x:newSegment.x + 1, y: newSegment.y, div:null};\n                gameField.takeСell(newSegment);\n                this.body.push(newSegment);\n            } else if(gameField.isFreeCell({x:newSegment.x, y: newSegment.y + 1})){\n                newSegment = {x:newSegment.x, y: newSegment.y + 1, div:null};\n                gameField.takeСell(newSegment);\n                this.body.push(newSegment);\n            } else {\n                if(newSegment.x + 1 < gameField.maxX){\n                    newSegment = {x: newSegment.x + 1, y: newSegment.y, div:null};\n                } else if(newSegment.y + 1 < gameField.maxY){\n                    newSegment = {x: newSegment.x, y: newSegment + y, div:null};\n                } else {\n                    if(this.body.length != 0){\n                        break;\n                    }\n                }\n\n                i = i - 1;\n                continue;\n            }\n        }\n\n        this.direction = {\n            // x: this.body[0].x - this.body[1].x, \n            // y: this.body[0].y - this.body[1].y\n            x: 0, \n            y: 1\n        };\n\n        this.gameField.updateSegments({detail: this.body});\n    }\n\n    get head(){\n        return this.body[0];\n    }\n\n    kill(){\n        if(this.alive){\n            this.stop();\n            this.dispatchEvent(new Event('Death'));\n            this.alive = false;\n        }\n    }\n\n    move(){\n        this.intervalId = setInterval(this.makeStep.bind(this), this.millisecondsPerStep);\n    }\n\n    stop(){\n        clearInterval(this.intervalId);\n    }\n\n    addSegment(){\n        this.body.push({x:this.lastPlace.x, y: this.lastPlace.y, div:null});\n\n        this.dispatchEvent(new CustomEvent('GrowUp', {detail: this.body}));\n    }\n\n    makeStep(){\n        this.dispatchEvent(new CustomEvent('PrevStep', {detail: this.body}));\n\n        this.lastPlace.x = this.body[this.body.length - 1].x;\n        this.lastPlace.y = this.body[this.body.length - 1].y;\n\n        for(let i = this.body.length - 1; i > 0; i--){\n            let curSegment = this.body[i];\n            let prevSergment = this.body[i - 1];\n            curSegment.x = prevSergment.x;\n            curSegment.y = prevSergment.y;\n        }\n\n        this.body[0].x += this.direction.x;\n        this.body[0].y += this.direction.y;\n\n        this.dispatchEvent(new CustomEvent('Step', {detail: this.body}));\n\n        this.gameField.updateSegments({detail: this.body});\n\n        this.draw();\n    }\n    \n    changeDirection(newDirection){\n        let firstSegment = this.body[0];\n        let secondSegment = this.body[1];\n\n        if(firstSegment.x + newDirection.x == secondSegment.x ||\n            firstSegment.y + newDirection.y == secondSegment.y){\n            return;\n        }\n\n        let detail = {\n            oldDirection: this.direction,\n            newDirection: newDirection\n        }\n\n        this.direction = newDirection;\n\n        this.dispatchEvent(new CustomEvent('ChangeDirection', {detail: detail}));\n    }\n\n    draw(){\n        for(let i = this.body.length - 1; i >= 0; i--){\n\n            let curSegment = this.body[i];\n\n            let div = curSegment.div;\n        \n            if(i == 0){\n                div.style.backgroundImage = 'url(images/snakeHead.png)';\n                div.style.zIndex = 1;\n\n            } else {\n                div.style.backgroundImage = 'url(images/snakeBody.png)';\n                div.style.zIndex = 0;\n            }\n\n            div.style.backgroundPosition = 'center';\n            div.style.backgroundSize = 'cover';\n        }\n    }\n\n    onCollision(game, actor){\n        if(actor instanceof Snake){\n            if(this === actor){\n                for(let i = 1; i < this.body.length; i++){\n                    if(this.body[0].x == this.body[i].x && this.body[0].y == this.body[i].y){\n                        this.kill();\n                    }\n                }\n            }\n        }\n    }\n}\n\n//# sourceURL=webpack:///./Snake.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ \"./Game.js\");\n\n\nwindow.onload = function(event){\n    let game = new _Game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](20, 20);\n}\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });