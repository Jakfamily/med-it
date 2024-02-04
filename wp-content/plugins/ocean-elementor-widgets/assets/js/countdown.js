(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerWidget = exports.isElement = exports.getSiblings = exports.visible = exports.offset = exports.fadeToggle = exports.fadeOut = exports.fadeIn = exports.slideToggle = exports.slideUp = exports.slideDown = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var slideDown = function slideDown(element) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
  var display = window.getComputedStyle(element).display;

  if (display === "none") {
    display = "block";
  }

  element.style.transitionProperty = "height";
  element.style.transitionDuration = "".concat(duration, "ms");
  element.style.opacity = 0;
  element.style.display = display;
  var height = element.offsetHeight;
  element.style.height = 0;
  element.style.opacity = 1;
  element.style.overflow = "hidden";
  setTimeout(function () {
    element.style.height = "".concat(height, "px");
  }, 5);
  window.setTimeout(function () {
    element.style.removeProperty("height");
    element.style.removeProperty("overflow");
    element.style.removeProperty("transition-duration");
    element.style.removeProperty("transition-property");
    element.style.removeProperty("opacity");
  }, duration + 50);
};

exports.slideDown = slideDown;

var slideUp = function slideUp(element) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
  element.style.boxSizing = "border-box";
  element.style.transitionProperty = "height, margin";
  element.style.transitionDuration = "".concat(duration, "ms");
  element.style.height = "".concat(element.offsetHeight, "px");
  element.style.marginTop = 0;
  element.style.marginBottom = 0;
  element.style.overflow = "hidden";
  setTimeout(function () {
    element.style.height = 0;
  }, 5);
  window.setTimeout(function () {
    element.style.display = "none";
    element.style.removeProperty("height");
    element.style.removeProperty("margin-top");
    element.style.removeProperty("margin-bottom");
    element.style.removeProperty("overflow");
    element.style.removeProperty("transition-duration");
    element.style.removeProperty("transition-property");
  }, duration + 50);
};

exports.slideUp = slideUp;

var slideToggle = function slideToggle(element, duration) {
  window.getComputedStyle(element).display === "none" ? slideDown(element, duration) : slideUp(element, duration);
};

exports.slideToggle = slideToggle;

var fadeIn = function fadeIn(element) {
  var _options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var options = {
    duration: 300,
    display: null,
    opacity: 1,
    callback: null
  };
  Object.assign(options, _options);
  element.style.opacity = 0;
  element.style.display = options.display || "block";
  setTimeout(function () {
    element.style.transition = "".concat(options.duration, "ms opacity ease");
    element.style.opacity = options.opacity;
  }, 5);
  setTimeout(function () {
    element.style.removeProperty("transition");
    !!options.callback && options.callback();
  }, options.duration + 50);
};

exports.fadeIn = fadeIn;

var fadeOut = function fadeOut(element) {
  var _options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var options = {
    duration: 300,
    display: null,
    opacity: 0,
    callback: null
  };
  Object.assign(options, _options);
  element.style.opacity = 1;
  element.style.display = options.display || "block";
  setTimeout(function () {
    element.style.transition = "".concat(options.duration, "ms opacity ease");
    element.style.opacity = options.opacity;
  }, 5);
  setTimeout(function () {
    element.style.display = "none";
    element.style.removeProperty("transition");
    !!options.callback && options.callback();
  }, options.duration + 50);
};

exports.fadeOut = fadeOut;

var fadeToggle = function fadeToggle(element, options) {
  window.getComputedStyle(element).display === "none" ? fadeIn(element, options) : fadeOut(element, options);
};

exports.fadeToggle = fadeToggle;

var offset = function offset(element) {
  if (!element.getClientRects().length) {
    return {
      top: 0,
      left: 0
    };
  } // Get document-relative position by adding viewport scroll to viewport-relative gBCR


  var rect = element.getBoundingClientRect();
  var win = element.ownerDocument.defaultView;
  return {
    top: rect.top + win.pageYOffset,
    left: rect.left + win.pageXOffset
  };
};

exports.offset = offset;

var visible = function visible(element) {
  if (!element) {
    return false;
  }

  return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
};

exports.visible = visible;

var getSiblings = function getSiblings(e) {
  // for collecting siblings
  var siblings = []; // if no parent, return no sibling

  if (!e.parentNode) {
    return siblings;
  } // first child of the parent node


  var sibling = e.parentNode.firstChild; // collecting siblings

  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== e) {
      siblings.push(sibling);
    }

    sibling = sibling.nextSibling;
  }

  return siblings;
}; // Returns true if it is a DOM element


exports.getSiblings = getSiblings;

var isElement = function isElement(o) {
  return (typeof HTMLElement === "undefined" ? "undefined" : _typeof(HTMLElement)) === "object" ? o instanceof HTMLElement // DOM2
  : o && _typeof(o) === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string";
};

exports.isElement = isElement;

var registerWidget = function registerWidget(className, widgetName) {
  var skin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "default";

  if (!(className || widgetName)) {
    return;
  }
  /**
   * Because Elementor plugin uses jQuery custom event,
   * We also have to use jQuery to use this event
   */


  jQuery(window).on("elementor/frontend/init", function () {
    var addHandler = function addHandler($element) {
      elementorFrontend.elementsHandler.addHandler(className, {
        $element: $element
      });
    };

    elementorFrontend.hooks.addAction("frontend/element_ready/".concat(widgetName, ".").concat(skin), addHandler);
  });
};

exports.registerWidget = registerWidget;

},{}],2:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _utils = require("../lib/utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var OEW_CountDown = /*#__PURE__*/function (_elementorModules$fro) {
  _inherits(OEW_CountDown, _elementorModules$fro);

  var _super = _createSuper(OEW_CountDown);

  function OEW_CountDown() {
    var _this;

    _classCallCheck(this, OEW_CountDown);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "days", void 0);

    _defineProperty(_assertThisInitialized(_this), "hours", void 0);

    _defineProperty(_assertThisInitialized(_this), "minutes", void 0);

    _defineProperty(_assertThisInitialized(_this), "seconds", void 0);

    _defineProperty(_assertThisInitialized(_this), "timeRemaining", void 0);

    _defineProperty(_assertThisInitialized(_this), "countDownIntervalID", void 0);

    return _this;
  }

  _createClass(OEW_CountDown, [{
    key: "getDefaultSettings",
    value: function getDefaultSettings() {
      return {
        selectors: {
          countDown: ".oew-countdown-wrap",
          countDownDays: ".oew-countdown-days",
          countDownHours: ".oew-countdown-hours",
          countDownMinutes: ".oew-countdown-minutes",
          countDownSeconds: ".oew-countdown-seconds"
        },
        date: null
      };
    }
  }, {
    key: "getDefaultElements",
    value: function getDefaultElements() {
      var element = this.$element.get(0);
      var selectors = this.getSettings("selectors");
      return {
        countDown: element.querySelector(selectors.countDown),
        countDownDays: element.querySelector(selectors.countDownDays),
        countDownHours: element.querySelector(selectors.countDownHours),
        countDownMinutes: element.querySelector(selectors.countDownMinutes),
        countDownSeconds: element.querySelector(selectors.countDownSeconds)
      };
    }
  }, {
    key: "onInit",
    value: function onInit() {
      var _get2;

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      (_get2 = _get(_getPrototypeOf(OEW_CountDown.prototype), "onInit", this)).call.apply(_get2, [this].concat(args));

      this.setUserSettings();

      if (this.getSettings("date")) {
        this.initCountdown();
      }
    }
  }, {
    key: "setUserSettings",
    value: function setUserSettings() {
      var dateNumber = Number(this.elements.countDown.getAttribute("data-date"));

      if (dateNumber !== 0) {
        this.setSettings({
          date: new Date(dateNumber * 1000)
        });
      }
    }
  }, {
    key: "initCountdown",
    value: function initCountdown() {
      this.updateDOM();
      var intervalID = setInterval(this.updateDOM.bind(this), 1000);
      this.countDownIntervalID = intervalID;
    }
  }, {
    key: "updateDOM",
    value: function updateDOM() {
      this.getTime();

      if (!!this.elements.countDownDays) {
        this.elements.countDownDays.innerHTML = String(this.days).padStart(2, "0");
      }

      if (!!this.elements.countDownHours) {
        this.elements.countDownHours.innerHTML = String(this.hours).padStart(2, "0");
      }

      if (!!this.elements.countDownMinutes) {
        this.elements.countDownMinutes.innerHTML = String(this.minutes).padStart(2, "0");
      }

      if (!!this.elements.countDownSeconds) {
        this.elements.countDownSeconds.innerHTML = String(this.seconds).padStart(2, "0");
      }

      if (this.timeRemaining <= 0 && this.countDownIntervalID) {
        clearInterval(this.countDownIntervalID);
      }
    }
  }, {
    key: "getTime",
    value: function getTime() {
      this.setTimeRemaining();
      this.setDays();
      this.setHours();
      this.setMinutes();
      this.setSeconds();
    }
  }, {
    key: "setTimeRemaining",
    value: function setTimeRemaining() {
      var now = new Date();
      this.timeRemaining = this.getSettings("date") - now;

      if (this.timeRemaining < 0) {
        var prolong = Number(this.elements.countDown.dataset.prolong) * 60 * 60 * 1000;
        this.timeRemaining = this.getSettings("date") - now + prolong;
      }
    }
  }, {
    key: "setDays",
    value: function setDays() {
      this.days = Number(this.timeRemaining) > 0 ? Math.floor(this.timeRemaining / (1000 * 60 * 60 * 24)) : 0;
    }
  }, {
    key: "setHours",
    value: function setHours() {
      this.hours = Number(this.timeRemaining) > 0 ? Math.floor(this.timeRemaining / (1000 * 60 * 60) % 24) : 0;
    }
  }, {
    key: "setMinutes",
    value: function setMinutes() {
      this.minutes = Number(this.timeRemaining) > 0 ? Math.floor(this.timeRemaining / 1000 / 60 % 60) : 0;
    }
  }, {
    key: "setSeconds",
    value: function setSeconds() {
      this.seconds = Number(this.timeRemaining) > 0 ? Math.floor(this.timeRemaining / 1000 % 60) : 0;
    }
  }]);

  return OEW_CountDown;
}(elementorModules.frontend.handlers.Base);

(0, _utils.registerWidget)(OEW_CountDown, "oew-countdown");

},{"../lib/utils":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvc3JjL2pzL2xpYi91dGlscy5qcyIsImFzc2V0cy9zcmMvanMvd2lkZ2V0cy9jb3VudGRvd24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUNBTyxJQUFNLFNBQVMsR0FBRyxTQUFaLFNBQVksQ0FBQyxPQUFELEVBQTZCO0FBQUEsTUFBbkIsUUFBbUIsdUVBQVIsR0FBUTtBQUNsRCxNQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsT0FBL0M7O0FBRUEsTUFBSSxPQUFPLEtBQUssTUFBaEIsRUFBd0I7QUFDcEIsSUFBQSxPQUFPLEdBQUcsT0FBVjtBQUNIOztBQUVELEVBQUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxrQkFBZCxHQUFtQyxRQUFuQztBQUNBLEVBQUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxrQkFBZCxhQUFzQyxRQUF0QztBQUVBLEVBQUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxPQUFkLEdBQXdCLENBQXhCO0FBQ0EsRUFBQSxPQUFPLENBQUMsS0FBUixDQUFjLE9BQWQsR0FBd0IsT0FBeEI7QUFDQSxNQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsWUFBckI7QUFFQSxFQUFBLE9BQU8sQ0FBQyxLQUFSLENBQWMsTUFBZCxHQUF1QixDQUF2QjtBQUNBLEVBQUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxPQUFkLEdBQXdCLENBQXhCO0FBQ0EsRUFBQSxPQUFPLENBQUMsS0FBUixDQUFjLFFBQWQsR0FBeUIsUUFBekI7QUFFQSxFQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2IsSUFBQSxPQUFPLENBQUMsS0FBUixDQUFjLE1BQWQsYUFBMEIsTUFBMUI7QUFDSCxHQUZTLEVBRVAsQ0FGTyxDQUFWO0FBSUEsRUFBQSxNQUFNLENBQUMsVUFBUCxDQUFrQixZQUFNO0FBQ3BCLElBQUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxj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LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJleHBvcnQgY29uc3Qgc2xpZGVEb3duID0gKGVsZW1lbnQsIGR1cmF0aW9uID0gMzAwKSA9PiB7XG4gICAgbGV0IGRpc3BsYXkgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5kaXNwbGF5O1xuXG4gICAgaWYgKGRpc3BsYXkgPT09IFwibm9uZVwiKSB7XG4gICAgICAgIGRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxuXG4gICAgZWxlbWVudC5zdHlsZS50cmFuc2l0aW9uUHJvcGVydHkgPSBcImhlaWdodFwiO1xuICAgIGVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gYCR7ZHVyYXRpb259bXNgO1xuXG4gICAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5O1xuICAgIGxldCBoZWlnaHQgPSBlbGVtZW50Lm9mZnNldEhlaWdodDtcblxuICAgIGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gMDtcbiAgICBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgIGVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0fXB4YDtcbiAgICB9LCA1KTtcblxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcImhlaWdodFwiKTtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcIm92ZXJmbG93XCIpO1xuICAgICAgICBlbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KFwidHJhbnNpdGlvbi1kdXJhdGlvblwiKTtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcInRyYW5zaXRpb24tcHJvcGVydHlcIik7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJvcGFjaXR5XCIpO1xuICAgIH0sIGR1cmF0aW9uICsgNTApO1xufTtcblxuZXhwb3J0IGNvbnN0IHNsaWRlVXAgPSAoZWxlbWVudCwgZHVyYXRpb24gPSAzMDApID0+IHtcbiAgICBlbGVtZW50LnN0eWxlLmJveFNpemluZyA9IFwiYm9yZGVyLWJveFwiO1xuICAgIGVsZW1lbnQuc3R5bGUudHJhbnNpdGlvblByb3BlcnR5ID0gXCJoZWlnaHQsIG1hcmdpblwiO1xuICAgIGVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gYCR7ZHVyYXRpb259bXNgO1xuICAgIGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gYCR7ZWxlbWVudC5vZmZzZXRIZWlnaHR9cHhgO1xuICAgIGVsZW1lbnQuc3R5bGUubWFyZ2luVG9wID0gMDtcbiAgICBlbGVtZW50LnN0eWxlLm1hcmdpbkJvdHRvbSA9IDA7XG4gICAgZWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5oZWlnaHQgPSAwO1xuICAgIH0sIDUpO1xuXG4gICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcImhlaWdodFwiKTtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcIm1hcmdpbi10b3BcIik7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJtYXJnaW4tYm90dG9tXCIpO1xuICAgICAgICBlbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KFwib3ZlcmZsb3dcIik7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJ0cmFuc2l0aW9uLWR1cmF0aW9uXCIpO1xuICAgICAgICBlbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KFwidHJhbnNpdGlvbi1wcm9wZXJ0eVwiKTtcbiAgICB9LCBkdXJhdGlvbiArIDUwKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzbGlkZVRvZ2dsZSA9IChlbGVtZW50LCBkdXJhdGlvbikgPT4ge1xuICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmRpc3BsYXkgPT09IFwibm9uZVwiID8gc2xpZGVEb3duKGVsZW1lbnQsIGR1cmF0aW9uKSA6IHNsaWRlVXAoZWxlbWVudCwgZHVyYXRpb24pO1xufTtcblxuZXhwb3J0IGNvbnN0IGZhZGVJbiA9IChlbGVtZW50LCBfb3B0aW9ucyA9IHt9KSA9PiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgZHVyYXRpb246IDMwMCxcbiAgICAgICAgZGlzcGxheTogbnVsbCxcbiAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgY2FsbGJhY2s6IG51bGwsXG4gICAgfTtcblxuICAgIE9iamVjdC5hc3NpZ24ob3B0aW9ucywgX29wdGlvbnMpO1xuXG4gICAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBvcHRpb25zLmRpc3BsYXkgfHwgXCJibG9ja1wiO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbiA9IGAke29wdGlvbnMuZHVyYXRpb259bXMgb3BhY2l0eSBlYXNlYDtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gb3B0aW9ucy5vcGFjaXR5O1xuICAgIH0sIDUpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJ0cmFuc2l0aW9uXCIpO1xuICAgICAgICAhIW9wdGlvbnMuY2FsbGJhY2sgJiYgb3B0aW9ucy5jYWxsYmFjaygpO1xuICAgIH0sIG9wdGlvbnMuZHVyYXRpb24gKyA1MCk7XG59O1xuXG5leHBvcnQgY29uc3QgZmFkZU91dCA9IChlbGVtZW50LCBfb3B0aW9ucyA9IHt9KSA9PiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgZHVyYXRpb246IDMwMCxcbiAgICAgICAgZGlzcGxheTogbnVsbCxcbiAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgY2FsbGJhY2s6IG51bGwsXG4gICAgfTtcblxuICAgIE9iamVjdC5hc3NpZ24ob3B0aW9ucywgX29wdGlvbnMpO1xuXG4gICAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBvcHRpb25zLmRpc3BsYXkgfHwgXCJibG9ja1wiO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbiA9IGAke29wdGlvbnMuZHVyYXRpb259bXMgb3BhY2l0eSBlYXNlYDtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gb3B0aW9ucy5vcGFjaXR5O1xuICAgIH0sIDUpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBlbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KFwidHJhbnNpdGlvblwiKTtcbiAgICAgICAgISFvcHRpb25zLmNhbGxiYWNrICYmIG9wdGlvbnMuY2FsbGJhY2soKTtcbiAgICB9LCBvcHRpb25zLmR1cmF0aW9uICsgNTApO1xufTtcblxuZXhwb3J0IGNvbnN0IGZhZGVUb2dnbGUgPSAoZWxlbWVudCwgb3B0aW9ucykgPT4ge1xuICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmRpc3BsYXkgPT09IFwibm9uZVwiID8gZmFkZUluKGVsZW1lbnQsIG9wdGlvbnMpIDogZmFkZU91dChlbGVtZW50LCBvcHRpb25zKTtcbn07XG5cbmV4cG9ydCBjb25zdCBvZmZzZXQgPSAoZWxlbWVudCkgPT4ge1xuICAgIGlmICghZWxlbWVudC5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4geyB0b3A6IDAsIGxlZnQ6IDAgfTtcbiAgICB9XG5cbiAgICAvLyBHZXQgZG9jdW1lbnQtcmVsYXRpdmUgcG9zaXRpb24gYnkgYWRkaW5nIHZpZXdwb3J0IHNjcm9sbCB0byB2aWV3cG9ydC1yZWxhdGl2ZSBnQkNSXG4gICAgY29uc3QgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3Qgd2luID0gZWxlbWVudC5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3O1xuICAgIHJldHVybiB7XG4gICAgICAgIHRvcDogcmVjdC50b3AgKyB3aW4ucGFnZVlPZmZzZXQsXG4gICAgICAgIGxlZnQ6IHJlY3QubGVmdCArIHdpbi5wYWdlWE9mZnNldCxcbiAgICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IHZpc2libGUgPSAoZWxlbWVudCkgPT4ge1xuICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuICEhKGVsZW1lbnQub2Zmc2V0V2lkdGggfHwgZWxlbWVudC5vZmZzZXRIZWlnaHQgfHwgZWxlbWVudC5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0U2libGluZ3MgPSAoZSkgPT4ge1xuICAgIC8vIGZvciBjb2xsZWN0aW5nIHNpYmxpbmdzXG4gICAgY29uc3Qgc2libGluZ3MgPSBbXTtcblxuICAgIC8vIGlmIG5vIHBhcmVudCwgcmV0dXJuIG5vIHNpYmxpbmdcbiAgICBpZiAoIWUucGFyZW50Tm9kZSkge1xuICAgICAgICByZXR1cm4gc2libGluZ3M7XG4gICAgfVxuXG4gICAgLy8gZmlyc3QgY2hpbGQgb2YgdGhlIHBhcmVudCBub2RlXG4gICAgbGV0IHNpYmxpbmcgPSBlLnBhcmVudE5vZGUuZmlyc3RDaGlsZDtcblxuICAgIC8vIGNvbGxlY3Rpbmcgc2libGluZ3NcbiAgICB3aGlsZSAoc2libGluZykge1xuICAgICAgICBpZiAoc2libGluZy5ub2RlVHlwZSA9PT0gMSAmJiBzaWJsaW5nICE9PSBlKSB7XG4gICAgICAgICAgICBzaWJsaW5ncy5wdXNoKHNpYmxpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2libGluZyA9IHNpYmxpbmcubmV4dFNpYmxpbmc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNpYmxpbmdzO1xufTtcblxuLy8gUmV0dXJucyB0cnVlIGlmIGl0IGlzIGEgRE9NIGVsZW1lbnRcbmV4cG9ydCBjb25zdCBpc0VsZW1lbnQgPSAobykgPT4ge1xuICAgIHJldHVybiB0eXBlb2YgSFRNTEVsZW1lbnQgPT09IFwib2JqZWN0XCJcbiAgICAgICAgPyBvIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgLy8gRE9NMlxuICAgICAgICA6IG8gJiYgdHlwZW9mIG8gPT09IFwib2JqZWN0XCIgJiYgbyAhPT0gbnVsbCAmJiBvLm5vZGVUeXBlID09PSAxICYmIHR5cGVvZiBvLm5vZGVOYW1lID09PSBcInN0cmluZ1wiO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyV2lkZ2V0ID0gKGNsYXNzTmFtZSwgd2lkZ2V0TmFtZSwgc2tpbiA9IFwiZGVmYXVsdFwiKSA9PiB7XG4gICAgaWYgKCEoY2xhc3NOYW1lIHx8IHdpZGdldE5hbWUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCZWNhdXNlIEVsZW1lbnRvciBwbHVnaW4gdXNlcyBqUXVlcnkgY3VzdG9tIGV2ZW50LFxuICAgICAqIFdlIGFsc28gaGF2ZSB0byB1c2UgalF1ZXJ5IHRvIHVzZSB0aGlzIGV2ZW50XG4gICAgICovXG4gICAgalF1ZXJ5KHdpbmRvdykub24oXCJlbGVtZW50b3IvZnJvbnRlbmQvaW5pdFwiLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFkZEhhbmRsZXIgPSAoJGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnRvckZyb250ZW5kLmVsZW1lbnRzSGFuZGxlci5hZGRIYW5kbGVyKGNsYXNzTmFtZSwge1xuICAgICAgICAgICAgICAgICRlbGVtZW50LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZWxlbWVudG9yRnJvbnRlbmQuaG9va3MuYWRkQWN0aW9uKGBmcm9udGVuZC9lbGVtZW50X3JlYWR5LyR7d2lkZ2V0TmFtZX0uJHtza2lufWAsIGFkZEhhbmRsZXIpO1xuICAgIH0pO1xufTtcbiIsImltcG9ydCB7IHJlZ2lzdGVyV2lkZ2V0IH0gZnJvbSBcIi4uL2xpYi91dGlsc1wiO1xuXG5jbGFzcyBPRVdfQ291bnREb3duIGV4dGVuZHMgZWxlbWVudG9yTW9kdWxlcy5mcm9udGVuZC5oYW5kbGVycy5CYXNlIHtcbiAgZGF5cztcbiAgaG91cnM7XG4gIG1pbnV0ZXM7XG4gIHNlY29uZHM7XG4gIHRpbWVSZW1haW5pbmc7XG4gIGNvdW50RG93bkludGVydmFsSUQ7XG5cbiAgZ2V0RGVmYXVsdFNldHRpbmdzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzZWxlY3RvcnM6IHtcbiAgICAgICAgY291bnREb3duOiBcIi5vZXctY291bnRkb3duLXdyYXBcIixcbiAgICAgICAgY291bnREb3duRGF5czogXCIub2V3LWNvdW50ZG93bi1kYXlzXCIsXG4gICAgICAgIGNvdW50RG93bkhvdXJzOiBcIi5vZXctY291bnRkb3duLWhvdXJzXCIsXG4gICAgICAgIGNvdW50RG93bk1pbnV0ZXM6IFwiLm9ldy1jb3VudGRvd24tbWludXRlc1wiLFxuICAgICAgICBjb3VudERvd25TZWNvbmRzOiBcIi5vZXctY291bnRkb3duLXNlY29uZHNcIixcbiAgICAgIH0sXG4gICAgICBkYXRlOiBudWxsLFxuICAgIH07XG4gIH1cblxuICBnZXREZWZhdWx0RWxlbWVudHMoKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IHRoaXMuJGVsZW1lbnQuZ2V0KDApO1xuICAgIGNvbnN0IHNlbGVjdG9ycyA9IHRoaXMuZ2V0U2V0dGluZ3MoXCJzZWxlY3RvcnNcIik7XG5cbiAgICByZXR1cm4ge1xuICAgICAgY291bnREb3duOiBlbGVtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLmNvdW50RG93biksXG4gICAgICBjb3VudERvd25EYXlzOiBlbGVtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLmNvdW50RG93bkRheXMpLFxuICAgICAgY291bnREb3duSG91cnM6IGVsZW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcnMuY291bnREb3duSG91cnMpLFxuICAgICAgY291bnREb3duTWludXRlczogZWxlbWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5jb3VudERvd25NaW51dGVzKSxcbiAgICAgIGNvdW50RG93blNlY29uZHM6IGVsZW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcnMuY291bnREb3duU2Vjb25kcyksXG4gICAgfTtcbiAgfVxuXG4gIG9uSW5pdCguLi5hcmdzKSB7XG4gICAgc3VwZXIub25Jbml0KC4uLmFyZ3MpO1xuXG4gICAgdGhpcy5zZXRVc2VyU2V0dGluZ3MoKTtcblxuICAgIGlmICh0aGlzLmdldFNldHRpbmdzKFwiZGF0ZVwiKSkge1xuICAgICAgdGhpcy5pbml0Q291bnRkb3duKCk7XG4gICAgfVxuICB9XG5cbiAgc2V0VXNlclNldHRpbmdzKCkge1xuICAgIGNvbnN0IGRhdGVOdW1iZXIgPSBOdW1iZXIoXG4gICAgICB0aGlzLmVsZW1lbnRzLmNvdW50RG93bi5nZXRBdHRyaWJ1dGUoXCJkYXRhLWRhdGVcIilcbiAgICApO1xuXG4gICAgaWYgKGRhdGVOdW1iZXIgIT09IDApIHtcbiAgICAgIHRoaXMuc2V0U2V0dGluZ3Moe1xuICAgICAgICBkYXRlOiBuZXcgRGF0ZShkYXRlTnVtYmVyICogMTAwMCksXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBpbml0Q291bnRkb3duKCkge1xuICAgIHRoaXMudXBkYXRlRE9NKCk7XG5cbiAgICBjb25zdCBpbnRlcnZhbElEID0gc2V0SW50ZXJ2YWwodGhpcy51cGRhdGVET00uYmluZCh0aGlzKSwgMTAwMCk7XG5cbiAgICB0aGlzLmNvdW50RG93bkludGVydmFsSUQgPSBpbnRlcnZhbElEO1xuICB9XG5cbiAgdXBkYXRlRE9NKCkge1xuICAgIHRoaXMuZ2V0VGltZSgpO1xuXG4gICAgaWYgKCEhdGhpcy5lbGVtZW50cy5jb3VudERvd25EYXlzKSB7XG4gICAgICB0aGlzLmVsZW1lbnRzLmNvdW50RG93bkRheXMuaW5uZXJIVE1MID0gU3RyaW5nKHRoaXMuZGF5cykucGFkU3RhcnQoXG4gICAgICAgIDIsXG4gICAgICAgIFwiMFwiXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICghIXRoaXMuZWxlbWVudHMuY291bnREb3duSG91cnMpIHtcbiAgICAgIHRoaXMuZWxlbWVudHMuY291bnREb3duSG91cnMuaW5uZXJIVE1MID0gU3RyaW5nKHRoaXMuaG91cnMpLnBhZFN0YXJ0KFxuICAgICAgICAyLFxuICAgICAgICBcIjBcIlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoISF0aGlzLmVsZW1lbnRzLmNvdW50RG93bk1pbnV0ZXMpIHtcbiAgICAgIHRoaXMuZWxlbWVudHMuY291bnREb3duTWludXRlcy5pbm5lckhUTUwgPSBTdHJpbmcodGhpcy5taW51dGVzKS5wYWRTdGFydChcbiAgICAgICAgMixcbiAgICAgICAgXCIwXCJcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKCEhdGhpcy5lbGVtZW50cy5jb3VudERvd25TZWNvbmRzKSB7XG4gICAgICB0aGlzLmVsZW1lbnRzLmNvdW50RG93blNlY29uZHMuaW5uZXJIVE1MID0gU3RyaW5nKHRoaXMuc2Vjb25kcykucGFkU3RhcnQoXG4gICAgICAgIDIsXG4gICAgICAgIFwiMFwiXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnRpbWVSZW1haW5pbmcgPD0gMCAmJiB0aGlzLmNvdW50RG93bkludGVydmFsSUQpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5jb3VudERvd25JbnRlcnZhbElEKTtcbiAgICB9XG4gIH1cblxuICBnZXRUaW1lKCkge1xuICAgIHRoaXMuc2V0VGltZVJlbWFpbmluZygpO1xuICAgIHRoaXMuc2V0RGF5cygpO1xuICAgIHRoaXMuc2V0SG91cnMoKTtcbiAgICB0aGlzLnNldE1pbnV0ZXMoKTtcbiAgICB0aGlzLnNldFNlY29uZHMoKTtcbiAgfVxuXG4gIHNldFRpbWVSZW1haW5pbmcoKSB7XG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICB0aGlzLnRpbWVSZW1haW5pbmcgPSB0aGlzLmdldFNldHRpbmdzKFwiZGF0ZVwiKSAtIG5vdztcblxuICAgIGlmICh0aGlzLnRpbWVSZW1haW5pbmcgPCAwKSB7XG4gICAgICBjb25zdCBwcm9sb25nID1cbiAgICAgICAgTnVtYmVyKHRoaXMuZWxlbWVudHMuY291bnREb3duLmRhdGFzZXQucHJvbG9uZykgKiA2MCAqIDYwICogMTAwMDtcbiAgICAgIHRoaXMudGltZVJlbWFpbmluZyA9IHRoaXMuZ2V0U2V0dGluZ3MoXCJkYXRlXCIpIC0gbm93ICsgcHJvbG9uZztcbiAgICB9XG4gIH1cblxuICBzZXREYXlzKCkge1xuICAgIHRoaXMuZGF5cyA9XG4gICAgICBOdW1iZXIodGhpcy50aW1lUmVtYWluaW5nKSA+IDBcbiAgICAgICAgPyBNYXRoLmZsb29yKHRoaXMudGltZVJlbWFpbmluZyAvICgxMDAwICogNjAgKiA2MCAqIDI0KSlcbiAgICAgICAgOiAwO1xuICB9XG5cbiAgc2V0SG91cnMoKSB7XG4gICAgdGhpcy5ob3VycyA9XG4gICAgICBOdW1iZXIodGhpcy50aW1lUmVtYWluaW5nKSA+IDBcbiAgICAgICAgPyBNYXRoLmZsb29yKCh0aGlzLnRpbWVSZW1haW5pbmcgLyAoMTAwMCAqIDYwICogNjApKSAlIDI0KVxuICAgICAgICA6IDA7XG4gIH1cblxuICBzZXRNaW51dGVzKCkge1xuICAgIHRoaXMubWludXRlcyA9XG4gICAgICBOdW1iZXIodGhpcy50aW1lUmVtYWluaW5nKSA+IDBcbiAgICAgICAgPyBNYXRoLmZsb29yKCh0aGlzLnRpbWVSZW1haW5pbmcgLyAxMDAwIC8gNjApICUgNjApXG4gICAgICAgIDogMDtcbiAgfVxuXG4gIHNldFNlY29uZHMoKSB7XG4gICAgdGhpcy5zZWNvbmRzID1cbiAgICAgIE51bWJlcih0aGlzLnRpbWVSZW1haW5pbmcpID4gMFxuICAgICAgICA/IE1hdGguZmxvb3IoKHRoaXMudGltZVJlbWFpbmluZyAvIDEwMDApICUgNjApXG4gICAgICAgIDogMDtcbiAgfVxufVxuXG5yZWdpc3RlcldpZGdldChPRVdfQ291bnREb3duLCBcIm9ldy1jb3VudGRvd25cIik7XG4iXX0=
