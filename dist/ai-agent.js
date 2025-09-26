(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("AIAgent", [], factory);
	else if(typeof exports === 'object')
		exports["AIAgent"] = factory();
	else
		root["AIAgent"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/ai-agent.css":
/*!***********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/ai-agent.css ***!
  \***********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/**
 * AI Agent 插件样式
 * 使用独立的命名空间和前缀，避免与宿主项目样式冲突
 */

/* 触发按钮 */
.ai-agent-btn {
  position: fixed;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: none;
  border-radius: 20px;
  background: #4096ff;
  color: white;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  transition: all 0.3s;
  z-index: 9999;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 14px;
}

.ai-agent-btn:hover { 
  background: #2e80ff; 
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.ai-agent-btn-text { 
  display: none; 
}

@media (min-width: 768px) { 
  .ai-agent-btn-text { 
    display: inline; 
  } 
}

/* 对话面板 */
.ai-agent-panel {
  position: fixed;
  width: 360px;
  height: 500px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  background: white;
  z-index: 10000;
  overflow: hidden;
  transition: all 0.3s;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 14px;
}

/* 主题：浅色 */
.ai-agent-theme-light { 
  background: white; 
  color: #333; 
}

.ai-agent-theme-light .ai-agent-panel-header { 
  background: #f5f5f5; 
  border-bottom: 1px solid #eee; 
}

.ai-agent-theme-light .ai-agent-close { 
  color: #666; 
}

.ai-agent-theme-light .ai-agent-msg-ai .ai-agent-msg-content { 
  background: #f5f5f5; 
  color: #333; 
}

.ai-agent-theme-light .ai-agent-msg-user .ai-agent-msg-content { 
  background: #4096ff; 
  color: white; 
}

.ai-agent-theme-light .ai-agent-input { 
  background: white; 
  color: #333; 
  border-top: 1px solid #eee;
}

/* 主题：深色 */
.ai-agent-theme-dark { 
  background: #1e1e1e; 
  color: #f0f0f0; 
}

.ai-agent-theme-dark .ai-agent-panel-header { 
  background: #2c2c2c; 
  border-bottom: 1px solid #3c3c3c; 
}

.ai-agent-theme-dark .ai-agent-close { 
  color: #ccc; 
}

.ai-agent-theme-dark .ai-agent-msg-ai .ai-agent-msg-content { 
  background: #3c3c3c; 
  color: #f0f0f0; 
}

.ai-agent-theme-dark .ai-agent-msg-user .ai-agent-msg-content { 
  background: #4096ff; 
  color: white; 
}

.ai-agent-theme-dark .ai-agent-input { 
  background: #2c2c2c; 
  color: #f0f0f0; 
  border-top: 1px solid #3c3c3c;
}

.ai-agent-theme-dark .ai-agent-input::placeholder {
  color: #aaa;
}

/* 位置 */
.ai-agent-pos-bottom-right { 
  bottom: 70px; 
  right: 20px; 
}

.ai-agent-pos-bottom-left { 
  bottom: 70px; 
  left: 20px; 
}

.ai-agent-pos-top-right { 
  top: 70px; 
  right: 20px; 
}

.ai-agent-pos-top-left { 
  top: 70px; 
  left: 20px; 
}

/* 面板头部 */
.ai-agent-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
}

.ai-agent-panel-header h3 { 
  margin: 0; 
  font-size: 16px; 
  font-weight: 600; 
}

.ai-agent-close {
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  line-height: 1;
  padding: 0 5px;
}

.ai-agent-close:hover {
  opacity: 0.8;
}

/* 消息区域 */
.ai-agent-messages {
  flex: 1;
  padding: 12px;
  overflow-y: auto;
  scrollbar-width: thin;
}

/* 设置滚动条样式 */
.ai-agent-messages::-webkit-scrollbar {
  width: 6px;
}

.ai-agent-messages::-webkit-scrollbar-track {
  background: transparent; 
}

.ai-agent-messages::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
}

.ai-agent-theme-dark .ai-agent-messages::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
}

.ai-agent-msg {
  margin-bottom: 12px;
  display: flex;
  gap: 8px;
}

.ai-agent-msg-ai { 
  justify-content: flex-start; 
}

.ai-agent-msg-user { 
  justify-content: flex-end; 
}

.ai-agent-msg-content {
  max-width: 80%;
  padding: 10px 14px;
  border-radius: 16px;
  line-height: 1.5;
  word-break: break-word;
}

/* 加载中动画 */
.ai-agent-loading-dots {
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
  height: 20px;
}

.ai-agent-loading-dots span {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: currentColor;
  opacity: 0.6;
  animation: ai-agent-pulse 1.4s infinite ease-in-out both;
}

.ai-agent-loading-dots span:nth-child(1) {
  animation-delay: -0.32s;
}

.ai-agent-loading-dots span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes ai-agent-pulse {
  0%, 80%, 100% { 
    transform: scale(0.6);
  } 
  40% { 
    transform: scale(1);
  }
}

/* 输入区域 */
.ai-agent-input-wrap {
  display: flex;
  border-top: 1px solid #eee;
}

.ai-agent-input {
  flex: 1;
  padding: 12px 16px;
  border: none;
  outline: none;
  font-size: 14px;
  font-family: inherit;
}

.ai-agent-send {
  padding: 0 16px;
  border: none;
  background: #4096ff;
  color: white;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

.ai-agent-send:hover { 
  background: #2e80ff; 
}

/* 响应式适配 */
@media (max-width: 480px) {
  .ai-agent-panel {
    width: calc(100% - 40px);
    max-width: 360px;
    height: 400px;
  }
  
  .ai-agent-pos-bottom-right,
  .ai-agent-pos-bottom-left { 
    bottom: 60px;
  }
  
  .ai-agent-pos-top-right,
  .ai-agent-pos-top-left { 
    top: 60px;
  }
}`, "",{"version":3,"sources":["webpack://./src/styles/ai-agent.css"],"names":[],"mappings":"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","sourcesContent":["/**\r\n * AI Agent 插件样式\r\n * 使用独立的命名空间和前缀，避免与宿主项目样式冲突\r\n */\r\n\r\n/* 触发按钮 */\r\n.ai-agent-btn {\r\n  position: fixed;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  padding: 8px 12px;\r\n  border: none;\r\n  border-radius: 20px;\r\n  background: #4096ff;\r\n  color: white;\r\n  cursor: pointer;\r\n  box-shadow: 0 2px 8px rgba(0,0,0,0.15);\r\n  transition: all 0.3s;\r\n  z-index: 9999;\r\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\r\n  font-size: 14px;\r\n}\r\n\r\n.ai-agent-btn:hover { \r\n  background: #2e80ff; \r\n  box-shadow: 0 4px 12px rgba(0,0,0,0.2);\r\n}\r\n\r\n.ai-agent-btn-text { \r\n  display: none; \r\n}\r\n\r\n@media (min-width: 768px) { \r\n  .ai-agent-btn-text { \r\n    display: inline; \r\n  } \r\n}\r\n\r\n/* 对话面板 */\r\n.ai-agent-panel {\r\n  position: fixed;\r\n  width: 360px;\r\n  height: 500px;\r\n  max-height: 80vh;\r\n  display: flex;\r\n  flex-direction: column;\r\n  border-radius: 8px;\r\n  box-shadow: 0 4px 20px rgba(0,0,0,0.15);\r\n  background: white;\r\n  z-index: 10000;\r\n  overflow: hidden;\r\n  transition: all 0.3s;\r\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\r\n  font-size: 14px;\r\n}\r\n\r\n/* 主题：浅色 */\r\n.ai-agent-theme-light { \r\n  background: white; \r\n  color: #333; \r\n}\r\n\r\n.ai-agent-theme-light .ai-agent-panel-header { \r\n  background: #f5f5f5; \r\n  border-bottom: 1px solid #eee; \r\n}\r\n\r\n.ai-agent-theme-light .ai-agent-close { \r\n  color: #666; \r\n}\r\n\r\n.ai-agent-theme-light .ai-agent-msg-ai .ai-agent-msg-content { \r\n  background: #f5f5f5; \r\n  color: #333; \r\n}\r\n\r\n.ai-agent-theme-light .ai-agent-msg-user .ai-agent-msg-content { \r\n  background: #4096ff; \r\n  color: white; \r\n}\r\n\r\n.ai-agent-theme-light .ai-agent-input { \r\n  background: white; \r\n  color: #333; \r\n  border-top: 1px solid #eee;\r\n}\r\n\r\n/* 主题：深色 */\r\n.ai-agent-theme-dark { \r\n  background: #1e1e1e; \r\n  color: #f0f0f0; \r\n}\r\n\r\n.ai-agent-theme-dark .ai-agent-panel-header { \r\n  background: #2c2c2c; \r\n  border-bottom: 1px solid #3c3c3c; \r\n}\r\n\r\n.ai-agent-theme-dark .ai-agent-close { \r\n  color: #ccc; \r\n}\r\n\r\n.ai-agent-theme-dark .ai-agent-msg-ai .ai-agent-msg-content { \r\n  background: #3c3c3c; \r\n  color: #f0f0f0; \r\n}\r\n\r\n.ai-agent-theme-dark .ai-agent-msg-user .ai-agent-msg-content { \r\n  background: #4096ff; \r\n  color: white; \r\n}\r\n\r\n.ai-agent-theme-dark .ai-agent-input { \r\n  background: #2c2c2c; \r\n  color: #f0f0f0; \r\n  border-top: 1px solid #3c3c3c;\r\n}\r\n\r\n.ai-agent-theme-dark .ai-agent-input::placeholder {\r\n  color: #aaa;\r\n}\r\n\r\n/* 位置 */\r\n.ai-agent-pos-bottom-right { \r\n  bottom: 70px; \r\n  right: 20px; \r\n}\r\n\r\n.ai-agent-pos-bottom-left { \r\n  bottom: 70px; \r\n  left: 20px; \r\n}\r\n\r\n.ai-agent-pos-top-right { \r\n  top: 70px; \r\n  right: 20px; \r\n}\r\n\r\n.ai-agent-pos-top-left { \r\n  top: 70px; \r\n  left: 20px; \r\n}\r\n\r\n/* 面板头部 */\r\n.ai-agent-panel-header {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  padding: 12px 16px;\r\n}\r\n\r\n.ai-agent-panel-header h3 { \r\n  margin: 0; \r\n  font-size: 16px; \r\n  font-weight: 600; \r\n}\r\n\r\n.ai-agent-close {\r\n  background: none;\r\n  border: none;\r\n  font-size: 22px;\r\n  cursor: pointer;\r\n  line-height: 1;\r\n  padding: 0 5px;\r\n}\r\n\r\n.ai-agent-close:hover {\r\n  opacity: 0.8;\r\n}\r\n\r\n/* 消息区域 */\r\n.ai-agent-messages {\r\n  flex: 1;\r\n  padding: 12px;\r\n  overflow-y: auto;\r\n  scrollbar-width: thin;\r\n}\r\n\r\n/* 设置滚动条样式 */\r\n.ai-agent-messages::-webkit-scrollbar {\r\n  width: 6px;\r\n}\r\n\r\n.ai-agent-messages::-webkit-scrollbar-track {\r\n  background: transparent; \r\n}\r\n\r\n.ai-agent-messages::-webkit-scrollbar-thumb {\r\n  background: rgba(0, 0, 0, 0.1);\r\n  border-radius: 3px;\r\n}\r\n\r\n.ai-agent-theme-dark .ai-agent-messages::-webkit-scrollbar-thumb {\r\n  background: rgba(255, 255, 255, 0.1);\r\n}\r\n\r\n.ai-agent-msg {\r\n  margin-bottom: 12px;\r\n  display: flex;\r\n  gap: 8px;\r\n}\r\n\r\n.ai-agent-msg-ai { \r\n  justify-content: flex-start; \r\n}\r\n\r\n.ai-agent-msg-user { \r\n  justify-content: flex-end; \r\n}\r\n\r\n.ai-agent-msg-content {\r\n  max-width: 80%;\r\n  padding: 10px 14px;\r\n  border-radius: 16px;\r\n  line-height: 1.5;\r\n  word-break: break-word;\r\n}\r\n\r\n/* 加载中动画 */\r\n.ai-agent-loading-dots {\r\n  display: flex;\r\n  gap: 4px;\r\n  justify-content: center;\r\n  align-items: center;\r\n  height: 20px;\r\n}\r\n\r\n.ai-agent-loading-dots span {\r\n  display: inline-block;\r\n  width: 6px;\r\n  height: 6px;\r\n  border-radius: 50%;\r\n  background-color: currentColor;\r\n  opacity: 0.6;\r\n  animation: ai-agent-pulse 1.4s infinite ease-in-out both;\r\n}\r\n\r\n.ai-agent-loading-dots span:nth-child(1) {\r\n  animation-delay: -0.32s;\r\n}\r\n\r\n.ai-agent-loading-dots span:nth-child(2) {\r\n  animation-delay: -0.16s;\r\n}\r\n\r\n@keyframes ai-agent-pulse {\r\n  0%, 80%, 100% { \r\n    transform: scale(0.6);\r\n  } \r\n  40% { \r\n    transform: scale(1);\r\n  }\r\n}\r\n\r\n/* 输入区域 */\r\n.ai-agent-input-wrap {\r\n  display: flex;\r\n  border-top: 1px solid #eee;\r\n}\r\n\r\n.ai-agent-input {\r\n  flex: 1;\r\n  padding: 12px 16px;\r\n  border: none;\r\n  outline: none;\r\n  font-size: 14px;\r\n  font-family: inherit;\r\n}\r\n\r\n.ai-agent-send {\r\n  padding: 0 16px;\r\n  border: none;\r\n  background: #4096ff;\r\n  color: white;\r\n  cursor: pointer;\r\n  font-size: 14px;\r\n  transition: background 0.2s;\r\n}\r\n\r\n.ai-agent-send:hover { \r\n  background: #2e80ff; \r\n}\r\n\r\n/* 响应式适配 */\r\n@media (max-width: 480px) {\r\n  .ai-agent-panel {\r\n    width: calc(100% - 40px);\r\n    max-width: 360px;\r\n    height: 400px;\r\n  }\r\n  \r\n  .ai-agent-pos-bottom-right,\r\n  .ai-agent-pos-bottom-left { \r\n    bottom: 60px;\r\n  }\r\n  \r\n  .ai-agent-pos-top-right,\r\n  .ai-agent-pos-top-left { \r\n    top: 60px;\r\n  }\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/styles/ai-agent.css":
/*!*********************************!*\
  !*** ./src/styles/ai-agent.css ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ai_agent_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./ai-agent.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/ai-agent.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ai_agent_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ai_agent_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_ai_agent_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_ai_agent_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/ai-agent.ts ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _styles_ai_agent_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/ai-agent.css */ "./src/styles/ai-agent.css");
/**
 * AIAgent - 跨框架通用的AI对话助手插件
 * 支持Vue、React、jQuery等多种框架
 * 采用TypeScript + UMD模块化规范实现
 */
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
// 样式隔离

/**
 * AIAgent类 - 插件的主类
 */
var AIAgent = /** @class */function () {
  /**
   * 创建AIAgent实例
   * @param options 配置选项
   */
  function AIAgent(options) {
    if (options === void 0) {
      options = {};
    }
    /**
     * 对话历史记录
     */
    this.chatHistory = [];
    /**
     * 面板是否展开
     */
    this.isOpen = false;
    /**
     * 对话面板DOM元素
     */
    this.panelEl = null;
    /**
     * 触发按钮DOM元素
     */
    this.buttonEl = null;
    // 默认配置 + 用户自定义配置
    this.options = __assign({
      apiUrl: options.apiUrl || '/api/ai/chat',
      theme: options.theme || 'light',
      position: options.position || 'bottom-right',
      placeholder: options.placeholder || '请输入问题...',
      title: options.title || 'AI 助手'
    }, options);
    this.init(); // 初始化插件
  }
  /**
   * 初始化插件
   * 创建界面、绑定事件
   */
  AIAgent.prototype.init = function () {
    this.createTriggerButton();
    this.createChatPanel();
    this.injectStyles();
    document.body.appendChild(this.buttonEl);
  };
  /**
   * 创建悬浮触发按钮
   */
  AIAgent.prototype.createTriggerButton = function () {
    var _this = this;
    this.buttonEl = document.createElement('button');
    this.buttonEl.className = 'ai-agent-btn';
    // 设置按钮的位置
    var positionStyles = {
      'bottom-right': {
        bottom: '20px',
        right: '20px'
      },
      'bottom-left': {
        bottom: '20px',
        left: '20px'
      },
      'top-right': {
        top: '20px',
        right: '20px'
      },
      'top-left': {
        top: '20px',
        left: '20px'
      }
    };
    var position = positionStyles[this.options.position] || positionStyles['bottom-right'];
    Object.assign(this.buttonEl.style, position);
    this.buttonEl.innerHTML = "\n      <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n        <path d=\"M12 12L12 19\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n        <path d=\"M12 8H12.01\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      </svg>\n      <span class=\"ai-agent-btn-text\">".concat(this.options.title, "</span>\n    ");
    this.buttonEl.addEventListener('click', function () {
      return _this.togglePanel();
    });
  };
  /**
   * 创建对话面板
   */
  AIAgent.prototype.createChatPanel = function () {
    var _this = this;
    this.panelEl = document.createElement('div');
    this.panelEl.className = "ai-agent-panel ai-agent-theme-".concat(this.options.theme, " ai-agent-pos-").concat(this.options.position);
    this.panelEl.style.display = 'none';
    this.panelEl.innerHTML = "\n      <div class=\"ai-agent-panel-header\">\n        <h3>".concat(this.options.title, "</h3>\n        <button class=\"ai-agent-close\">&times;</button>\n      </div>\n      <div class=\"ai-agent-messages\"></div>\n      <div class=\"ai-agent-input-wrap\">\n        <input type=\"text\" placeholder=\"").concat(this.options.placeholder, "\" class=\"ai-agent-input\" />\n        <button class=\"ai-agent-send\">\u53D1\u9001</button>\n      </div>\n    ");
    // 绑定关闭按钮事件
    var closeBtn = this.panelEl.querySelector('.ai-agent-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        return _this.closePanel();
      });
    }
    // 绑定输入/发送事件
    var input = this.panelEl.querySelector('.ai-agent-input');
    var sendBtn = this.panelEl.querySelector('.ai-agent-send');
    if (input && sendBtn) {
      input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && input.value.trim()) {
          _this.sendMessage(input.value);
        }
      });
      sendBtn.addEventListener('click', function () {
        if (input.value.trim()) {
          _this.sendMessage(input.value);
        }
      });
    }
    document.body.appendChild(this.panelEl);
  };
  /**
   * 注入样式（避免与宿主项目冲突）
   * 为了确保代码的模块化，样式已移至单独的CSS文件
   * 但此方法保留，便于动态注入特定样式
   */
  AIAgent.prototype.injectStyles = function () {
    // 动态计算位置相关的样式
    var style = document.createElement('style');
    style.setAttribute('ai-agent-dynamic-styles', '');
    // 根据配置计算面板位置
    var positions = {
      'bottom-right': 'bottom: 70px; right: 20px;',
      'bottom-left': 'bottom: 70px; left: 20px;',
      'top-right': 'top: 70px; right: 20px;',
      'top-left': 'top: 70px; left: 20px;'
    };
    // 设置按钮的位置
    var buttonPositions = {
      'bottom-right': 'bottom: 20px; right: 20px;',
      'bottom-left': 'bottom: 20px; left: 20px;',
      'top-right': 'top: 20px; right: 20px;',
      'top-left': 'top: 20px; left: 20px;'
    };
    var position = this.options.position;
    // 动态生成位置相关的样式
    style.textContent = "\n      .ai-agent-panel.ai-agent-pos-".concat(position, " {\n        ").concat(positions[position] || positions['bottom-right'], "\n      }\n      .ai-agent-btn {\n        ").concat(buttonPositions[position] || buttonPositions['bottom-right'], "\n      }\n    ");
    document.head.appendChild(style);
  };
  /**
   * 切换面板显示/隐藏
   */
  AIAgent.prototype.togglePanel = function () {
    this.isOpen = !this.isOpen;
    if (this.panelEl) {
      this.panelEl.style.display = this.isOpen ? 'flex' : 'none';
      if (this.isOpen) {
        var input_1 = this.panelEl.querySelector('.ai-agent-input');
        if (input_1) {
          setTimeout(function () {
            return input_1.focus();
          }, 300);
        }
      }
    }
  };
  /**
   * 关闭面板
   */
  AIAgent.prototype.closePanel = function () {
    this.isOpen = false;
    if (this.panelEl) {
      this.panelEl.style.display = 'none';
    }
  };
  /**
   * 发送消息到后端 AI 接口
   * @param text 用户输入的消息文本
   */
  AIAgent.prototype.sendMessage = function (text) {
    var _this = this;
    if (!text.trim() || !this.panelEl) return;
    var input = this.panelEl.querySelector('.ai-agent-input');
    var messagesEl = this.panelEl.querySelector('.ai-agent-messages');
    if (!input || !messagesEl) return;
    // 添加用户消息到界面
    this.addMessage('user', text);
    messagesEl.appendChild(this.createMessageEl('user', text));
    input.value = '';
    messagesEl.scrollTop = messagesEl.scrollHeight;
    // 显示加载中状态
    var loadingId = this.showLoading(messagesEl);
    // 调用后端 API
    fetch(this.options.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: text,
        history: this.chatHistory
      })
    }).then(function (res) {
      if (!res.ok) {
        throw new Error('API响应异常: ' + res.status);
      }
      return res.json();
    }).then(function (data) {
      // 移除加载中状态
      _this.removeLoading(loadingId);
      // 添加AI回复
      var reply = data.reply || '抱歉，无法获取回复～';
      _this.addMessage('ai', reply);
      messagesEl.appendChild(_this.createMessageEl('ai', reply));
      messagesEl.scrollTop = messagesEl.scrollHeight;
    })["catch"](function (err) {
      // 移除加载中状态
      _this.removeLoading(loadingId);
      // 显示错误信息
      console.error('AI 接口调用失败：', err);
      _this.addMessage('ai', '接口异常，请稍后再试～');
      messagesEl.appendChild(_this.createMessageEl('ai', '接口异常，请稍后再试～'));
      messagesEl.scrollTop = messagesEl.scrollHeight;
    });
  };
  /**
   * 显示加载中状态
   * @param messagesEl 消息容器元素
   * @returns 加载状态的唯一ID
   */
  AIAgent.prototype.showLoading = function (messagesEl) {
    var loadingId = 'loading-' + Date.now();
    var loadingEl = document.createElement('div');
    loadingEl.className = 'ai-agent-msg ai-agent-msg-ai ai-agent-loading';
    loadingEl.id = loadingId;
    loadingEl.innerHTML = "\n      <div class=\"ai-agent-msg-content\">\n        <div class=\"ai-agent-loading-dots\">\n          <span></span><span></span><span></span>\n        </div>\n      </div>\n    ";
    messagesEl.appendChild(loadingEl);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return loadingId;
  };
  /**
   * 移除加载中状态
   * @param loadingId 加载状态的唯一ID
   */
  AIAgent.prototype.removeLoading = function (loadingId) {
    var loadingEl = document.getElementById(loadingId);
    if (loadingEl && loadingEl.parentNode) {
      loadingEl.parentNode.removeChild(loadingEl);
    }
  };
  /**
   * 添加消息到历史记录
   * @param role 角色：'user' 或 'ai'
   * @param content 消息内容
   */
  AIAgent.prototype.addMessage = function (role, content) {
    this.chatHistory.push({
      role: role,
      content: content
    });
    if (this.chatHistory.length > 20) this.chatHistory.shift(); // 限制历史长度
  };
  /**
   * 创建消息 DOM 元素
   * @param role 角色：'user' 或 'ai'
   * @param content 消息内容
   * @returns 消息DOM元素
   */
  AIAgent.prototype.createMessageEl = function (role, content) {
    var msgEl = document.createElement('div');
    msgEl.className = "ai-agent-msg ai-agent-msg-".concat(role);
    // 转换换行为 <br>，并处理HTML转义
    var formattedContent = content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');
    msgEl.innerHTML = "<div class=\"ai-agent-msg-content\">".concat(formattedContent, "</div>");
    return msgEl;
  };
  /**
   * 销毁插件（清理 DOM 和事件）
   */
  AIAgent.prototype.destroy = function () {
    // 移除悬浮按钮
    if (this.buttonEl && this.buttonEl.parentNode) {
      this.buttonEl.parentNode.removeChild(this.buttonEl);
      this.buttonEl = null;
    }
    // 移除对话面板
    if (this.panelEl && this.panelEl.parentNode) {
      this.panelEl.parentNode.removeChild(this.panelEl);
      this.panelEl = null;
    }
    // 移除动态注入的样式
    var style = document.querySelector('style[ai-agent-dynamic-styles]');
    if (style && style.parentNode) {
      style.parentNode.removeChild(style);
    }
    // 清空对话历史
    this.chatHistory = [];
  };
  return AIAgent;
}();
// 导出为默认模块
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AIAgent);
})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=ai-agent.js.map