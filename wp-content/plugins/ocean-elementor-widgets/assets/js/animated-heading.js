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

var OEW_AnimatedHeading = /*#__PURE__*/function (_elementorModules$fro) {
  _inherits(OEW_AnimatedHeading, _elementorModules$fro);

  var _super = _createSuper(OEW_AnimatedHeading);

  function OEW_AnimatedHeading() {
    _classCallCheck(this, OEW_AnimatedHeading);

    return _super.apply(this, arguments);
  }

  _createClass(OEW_AnimatedHeading, [{
    key: "getDefaultSettings",
    value: function getDefaultSettings() {
      return {
        selectors: {
          animatedHeading: ".oew-animated-heading"
        }
      };
    }
  }, {
    key: "getDefaultElements",
    value: function getDefaultElements() {
      var element = this.$element.get(0);
      var selectors = this.getSettings("selectors");
      return {
        animatedHeading: element.querySelector(selectors.animatedHeading),
        $animatedHeading: this.$element.find(selectors.animatedHeading)
      };
    }
  }, {
    key: "onInit",
    value: function onInit() {
      var _get2;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      (_get2 = _get(_getPrototypeOf(OEW_AnimatedHeading.prototype), "onInit", this)).call.apply(_get2, [this].concat(args));

      this.setUserSettings();

      if (this.hasAnimatedHeading) {
        this.initAnimation();
      }
    }
  }, {
    key: "initAnimation",
    value: function initAnimation() {
      var settings = this.getSettings();

      if (settings.heading_layout === "animated") {
        this.initMorphext();
      } else {
        this.initTyped();
      }
    }
  }, {
    key: "initMorphext",
    value: function initMorphext() {
      var settings = this.getSettings();
      this.elements.$animatedHeading.Morphext({
        animation: settings.heading_animation,
        speed: settings.heading_animation_delay
      });
    }
  }, {
    key: "initTyped",
    value: function initTyped() {
      var settings = this.getSettings();
      new Typed(settings.selectors.animatedHeading, {
        strings: settings.animated_heading.split(","),
        typeSpeed: settings.type_speed,
        startDelay: settings.start_delay,
        backSpeed: settings.back_speed,
        backDelay: settings.back_delay,
        loop: settings.loop === "yes" ? true : false,
        loopCount: settings.loop_count ? settings.loop_count : 0
      });
    }
  }, {
    key: "setUserSettings",
    value: function setUserSettings() {
      var elementSettings = this.getElementSettings();
      this.setSettings(elementSettings);
    }
  }, {
    key: "hasAnimatedHeading",
    value: function hasAnimatedHeading() {
      return this.getSettings("animated_heading").trim() !== "";
    }
  }]);

  return OEW_AnimatedHeading;
}(elementorModules.frontend.handlers.Base);

(0, _utils.registerWidget)(OEW_AnimatedHeading, "oew-animated-heading");

},{"../lib/utils":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvc3JjL2pzL2xpYi91dGlscy5qcyIsImFzc2V0cy9zcmMvanMvd2lkZ2V0cy9hbmltYXRlZC1oZWFkaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FDQU8sSUFBTSxTQUFTLEdBQUcsU0FBWixTQUFZLENBQUMsT0FBRCxFQUE2QjtBQUFBLE1BQW5CLFFBQW1CLHVFQUFSLEdBQVE7QUFDbEQsTUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLE9BQS9DOztBQUVBLE1BQUksT0FBTyxLQUFLLE1BQWhCLEVBQXdCO0FBQ3BCLElBQUEsT0FBTyxHQUFHLE9BQVY7QUFDSDs7QUFFRCxFQUFBLE9BQU8sQ0FBQyxLQUFSLENBQWMsa0JBQWQsR0FBbUMsUUFBbkM7QUFDQSxFQUFBLE9BQU8sQ0FBQyxLQUFSLENBQWMsa0JBQWQsYUFBc0MsUUFBdEM7QUFFQSxFQUFBLE9BQU8sQ0FBQyxLQUFSLENBQWMsT0FBZCxHQUF3QixDQUF4QjtBQUNBLEVBQUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxPQUFkLEdBQXdCLE9BQXhCO0FBQ0EsTUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFlBQXJCO0FBRUEsRUFBQSxPQUFPLENBQUMsS0FBUixDQUFjLE1BQWQsR0FBdUIsQ0FBdkI7QUFDQSxFQUFBLE9BQU8sQ0FBQyxLQUFSLENBQWMsT0FBZCxHQUF3QixDQUF4QjtBQUNBLEVBQUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxRQUFkLEdBQXlCLFFBQXpCO0FBRUEsRUFBQSxVQUFVLENBQUMsWUFBTTtBQUNiLElBQUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxNQUFkLGFBQTBCLE1BQTFCO0FBQ0gsR0FGUyxFQUVQLENBRk8sQ0FBVjtBQUlBLEVBQUEsTUFBTSxDQUFDLFVBQVAsQ0FBa0IsWUFBTTtBQUNwQixJQUFBLE9BQU8sQ0FBQyxLQUFS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cUI7QUFDakIsYUFBTyxLQUFLLFdBQUwsQ0FBaUIsa0JBQWpCLEVBQXFDLElBQXJDLE9BQWdELEVBQXZEO0FBQ0g7Ozs7RUF0RTZCLGdCQUFnQixDQUFDLFFBQWpCLENBQTBCLFFBQTFCLENBQW1DLEk7O0FBeUVyRSwyQkFBZSxtQkFBZixFQUFvQyxzQkFBcEMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJleHBvcnQgY29uc3Qgc2xpZGVEb3duID0gKGVsZW1lbnQsIGR1cmF0aW9uID0gMzAwKSA9PiB7XG4gICAgbGV0IGRpc3BsYXkgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5kaXNwbGF5O1xuXG4gICAgaWYgKGRpc3BsYXkgPT09IFwibm9uZVwiKSB7XG4gICAgICAgIGRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxuXG4gICAgZWxlbWVudC5zdHlsZS50cmFuc2l0aW9uUHJvcGVydHkgPSBcImhlaWdodFwiO1xuICAgIGVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gYCR7ZHVyYXRpb259bXNgO1xuXG4gICAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5O1xuICAgIGxldCBoZWlnaHQgPSBlbGVtZW50Lm9mZnNldEhlaWdodDtcblxuICAgIGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gMDtcbiAgICBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgIGVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0fXB4YDtcbiAgICB9LCA1KTtcblxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcImhlaWdodFwiKTtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcIm92ZXJmbG93XCIpO1xuICAgICAgICBlbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KFwidHJhbnNpdGlvbi1kdXJhdGlvblwiKTtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcInRyYW5zaXRpb24tcHJvcGVydHlcIik7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJvcGFjaXR5XCIpO1xuICAgIH0sIGR1cmF0aW9uICsgNTApO1xufTtcblxuZXhwb3J0IGNvbnN0IHNsaWRlVXAgPSAoZWxlbWVudCwgZHVyYXRpb24gPSAzMDApID0+IHtcbiAgICBlbGVtZW50LnN0eWxlLmJveFNpemluZyA9IFwiYm9yZGVyLWJveFwiO1xuICAgIGVsZW1lbnQuc3R5bGUudHJhbnNpdGlvblByb3BlcnR5ID0gXCJoZWlnaHQsIG1hcmdpblwiO1xuICAgIGVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gYCR7ZHVyYXRpb259bXNgO1xuICAgIGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gYCR7ZWxlbWVudC5vZmZzZXRIZWlnaHR9cHhgO1xuICAgIGVsZW1lbnQuc3R5bGUubWFyZ2luVG9wID0gMDtcbiAgICBlbGVtZW50LnN0eWxlLm1hcmdpbkJvdHRvbSA9IDA7XG4gICAgZWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5oZWlnaHQgPSAwO1xuICAgIH0sIDUpO1xuXG4gICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcImhlaWdodFwiKTtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcIm1hcmdpbi10b3BcIik7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJtYXJnaW4tYm90dG9tXCIpO1xuICAgICAgICBlbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KFwib3ZlcmZsb3dcIik7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJ0cmFuc2l0aW9uLWR1cmF0aW9uXCIpO1xuICAgICAgICBlbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KFwidHJhbnNpdGlvbi1wcm9wZXJ0eVwiKTtcbiAgICB9LCBkdXJhdGlvbiArIDUwKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzbGlkZVRvZ2dsZSA9IChlbGVtZW50LCBkdXJhdGlvbikgPT4ge1xuICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmRpc3BsYXkgPT09IFwibm9uZVwiID8gc2xpZGVEb3duKGVsZW1lbnQsIGR1cmF0aW9uKSA6IHNsaWRlVXAoZWxlbWVudCwgZHVyYXRpb24pO1xufTtcblxuZXhwb3J0IGNvbnN0IGZhZGVJbiA9IChlbGVtZW50LCBfb3B0aW9ucyA9IHt9KSA9PiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgZHVyYXRpb246IDMwMCxcbiAgICAgICAgZGlzcGxheTogbnVsbCxcbiAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgY2FsbGJhY2s6IG51bGwsXG4gICAgfTtcblxuICAgIE9iamVjdC5hc3NpZ24ob3B0aW9ucywgX29wdGlvbnMpO1xuXG4gICAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBvcHRpb25zLmRpc3BsYXkgfHwgXCJibG9ja1wiO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbiA9IGAke29wdGlvbnMuZHVyYXRpb259bXMgb3BhY2l0eSBlYXNlYDtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gb3B0aW9ucy5vcGFjaXR5O1xuICAgIH0sIDUpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJ0cmFuc2l0aW9uXCIpO1xuICAgICAgICAhIW9wdGlvbnMuY2FsbGJhY2sgJiYgb3B0aW9ucy5jYWxsYmFjaygpO1xuICAgIH0sIG9wdGlvbnMuZHVyYXRpb24gKyA1MCk7XG59O1xuXG5leHBvcnQgY29uc3QgZmFkZU91dCA9IChlbGVtZW50LCBfb3B0aW9ucyA9IHt9KSA9PiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgZHVyYXRpb246IDMwMCxcbiAgICAgICAgZGlzcGxheTogbnVsbCxcbiAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgY2FsbGJhY2s6IG51bGwsXG4gICAgfTtcblxuICAgIE9iamVjdC5hc3NpZ24ob3B0aW9ucywgX29wdGlvbnMpO1xuXG4gICAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBvcHRpb25zLmRpc3BsYXkgfHwgXCJibG9ja1wiO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbiA9IGAke29wdGlvbnMuZHVyYXRpb259bXMgb3BhY2l0eSBlYXNlYDtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gb3B0aW9ucy5vcGFjaXR5O1xuICAgIH0sIDUpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBlbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KFwidHJhbnNpdGlvblwiKTtcbiAgICAgICAgISFvcHRpb25zLmNhbGxiYWNrICYmIG9wdGlvbnMuY2FsbGJhY2soKTtcbiAgICB9LCBvcHRpb25zLmR1cmF0aW9uICsgNTApO1xufTtcblxuZXhwb3J0IGNvbnN0IGZhZGVUb2dnbGUgPSAoZWxlbWVudCwgb3B0aW9ucykgPT4ge1xuICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmRpc3BsYXkgPT09IFwibm9uZVwiID8gZmFkZUluKGVsZW1lbnQsIG9wdGlvbnMpIDogZmFkZU91dChlbGVtZW50LCBvcHRpb25zKTtcbn07XG5cbmV4cG9ydCBjb25zdCBvZmZzZXQgPSAoZWxlbWVudCkgPT4ge1xuICAgIGlmICghZWxlbWVudC5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4geyB0b3A6IDAsIGxlZnQ6IDAgfTtcbiAgICB9XG5cbiAgICAvLyBHZXQgZG9jdW1lbnQtcmVsYXRpdmUgcG9zaXRpb24gYnkgYWRkaW5nIHZpZXdwb3J0IHNjcm9sbCB0byB2aWV3cG9ydC1yZWxhdGl2ZSBnQkNSXG4gICAgY29uc3QgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3Qgd2luID0gZWxlbWVudC5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3O1xuICAgIHJldHVybiB7XG4gICAgICAgIHRvcDogcmVjdC50b3AgKyB3aW4ucGFnZVlPZmZzZXQsXG4gICAgICAgIGxlZnQ6IHJlY3QubGVmdCArIHdpbi5wYWdlWE9mZnNldCxcbiAgICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IHZpc2libGUgPSAoZWxlbWVudCkgPT4ge1xuICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuICEhKGVsZW1lbnQub2Zmc2V0V2lkdGggfHwgZWxlbWVudC5vZmZzZXRIZWlnaHQgfHwgZWxlbWVudC5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0U2libGluZ3MgPSAoZSkgPT4ge1xuICAgIC8vIGZvciBjb2xsZWN0aW5nIHNpYmxpbmdzXG4gICAgY29uc3Qgc2libGluZ3MgPSBbXTtcblxuICAgIC8vIGlmIG5vIHBhcmVudCwgcmV0dXJuIG5vIHNpYmxpbmdcbiAgICBpZiAoIWUucGFyZW50Tm9kZSkge1xuICAgICAgICByZXR1cm4gc2libGluZ3M7XG4gICAgfVxuXG4gICAgLy8gZmlyc3QgY2hpbGQgb2YgdGhlIHBhcmVudCBub2RlXG4gICAgbGV0IHNpYmxpbmcgPSBlLnBhcmVudE5vZGUuZmlyc3RDaGlsZDtcblxuICAgIC8vIGNvbGxlY3Rpbmcgc2libGluZ3NcbiAgICB3aGlsZSAoc2libGluZykge1xuICAgICAgICBpZiAoc2libGluZy5ub2RlVHlwZSA9PT0gMSAmJiBzaWJsaW5nICE9PSBlKSB7XG4gICAgICAgICAgICBzaWJsaW5ncy5wdXNoKHNpYmxpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2libGluZyA9IHNpYmxpbmcubmV4dFNpYmxpbmc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNpYmxpbmdzO1xufTtcblxuLy8gUmV0dXJucyB0cnVlIGlmIGl0IGlzIGEgRE9NIGVsZW1lbnRcbmV4cG9ydCBjb25zdCBpc0VsZW1lbnQgPSAobykgPT4ge1xuICAgIHJldHVybiB0eXBlb2YgSFRNTEVsZW1lbnQgPT09IFwib2JqZWN0XCJcbiAgICAgICAgPyBvIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgLy8gRE9NMlxuICAgICAgICA6IG8gJiYgdHlwZW9mIG8gPT09IFwib2JqZWN0XCIgJiYgbyAhPT0gbnVsbCAmJiBvLm5vZGVUeXBlID09PSAxICYmIHR5cGVvZiBvLm5vZGVOYW1lID09PSBcInN0cmluZ1wiO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyV2lkZ2V0ID0gKGNsYXNzTmFtZSwgd2lkZ2V0TmFtZSwgc2tpbiA9IFwiZGVmYXVsdFwiKSA9PiB7XG4gICAgaWYgKCEoY2xhc3NOYW1lIHx8IHdpZGdldE5hbWUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCZWNhdXNlIEVsZW1lbnRvciBwbHVnaW4gdXNlcyBqUXVlcnkgY3VzdG9tIGV2ZW50LFxuICAgICAqIFdlIGFsc28gaGF2ZSB0byB1c2UgalF1ZXJ5IHRvIHVzZSB0aGlzIGV2ZW50XG4gICAgICovXG4gICAgalF1ZXJ5KHdpbmRvdykub24oXCJlbGVtZW50b3IvZnJvbnRlbmQvaW5pdFwiLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFkZEhhbmRsZXIgPSAoJGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnRvckZyb250ZW5kLmVsZW1lbnRzSGFuZGxlci5hZGRIYW5kbGVyKGNsYXNzTmFtZSwge1xuICAgICAgICAgICAgICAgICRlbGVtZW50LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZWxlbWVudG9yRnJvbnRlbmQuaG9va3MuYWRkQWN0aW9uKGBmcm9udGVuZC9lbGVtZW50X3JlYWR5LyR7d2lkZ2V0TmFtZX0uJHtza2lufWAsIGFkZEhhbmRsZXIpO1xuICAgIH0pO1xufTtcbiIsImltcG9ydCB7IHJlZ2lzdGVyV2lkZ2V0IH0gZnJvbSBcIi4uL2xpYi91dGlsc1wiO1xuXG5jbGFzcyBPRVdfQW5pbWF0ZWRIZWFkaW5nIGV4dGVuZHMgZWxlbWVudG9yTW9kdWxlcy5mcm9udGVuZC5oYW5kbGVycy5CYXNlIHtcbiAgICBnZXREZWZhdWx0U2V0dGluZ3MoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzZWxlY3RvcnM6IHtcbiAgICAgICAgICAgICAgICBhbmltYXRlZEhlYWRpbmc6IFwiLm9ldy1hbmltYXRlZC1oZWFkaW5nXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdldERlZmF1bHRFbGVtZW50cygpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuJGVsZW1lbnQuZ2V0KDApO1xuICAgICAgICBjb25zdCBzZWxlY3RvcnMgPSB0aGlzLmdldFNldHRpbmdzKFwic2VsZWN0b3JzXCIpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhbmltYXRlZEhlYWRpbmc6IGVsZW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcnMuYW5pbWF0ZWRIZWFkaW5nKSxcbiAgICAgICAgICAgICRhbmltYXRlZEhlYWRpbmc6IHRoaXMuJGVsZW1lbnQuZmluZChzZWxlY3RvcnMuYW5pbWF0ZWRIZWFkaW5nKSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBvbkluaXQoLi4uYXJncykge1xuICAgICAgICBzdXBlci5vbkluaXQoLi4uYXJncyk7XG5cbiAgICAgICAgdGhpcy5zZXRVc2VyU2V0dGluZ3MoKTtcblxuICAgICAgICBpZiAodGhpcy5oYXNBbmltYXRlZEhlYWRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdEFuaW1hdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdEFuaW1hdGlvbigpIHtcbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSB0aGlzLmdldFNldHRpbmdzKCk7XG5cbiAgICAgICAgaWYgKHNldHRpbmdzLmhlYWRpbmdfbGF5b3V0ID09PSBcImFuaW1hdGVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdE1vcnBoZXh0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmluaXRUeXBlZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdE1vcnBoZXh0KCkge1xuICAgICAgICBjb25zdCBzZXR0aW5ncyA9IHRoaXMuZ2V0U2V0dGluZ3MoKTtcblxuICAgICAgICB0aGlzLmVsZW1lbnRzLiRhbmltYXRlZEhlYWRpbmcuTW9ycGhleHQoe1xuICAgICAgICAgICAgYW5pbWF0aW9uOiBzZXR0aW5ncy5oZWFkaW5nX2FuaW1hdGlvbixcbiAgICAgICAgICAgIHNwZWVkOiBzZXR0aW5ncy5oZWFkaW5nX2FuaW1hdGlvbl9kZWxheSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaW5pdFR5cGVkKCkge1xuICAgICAgICBjb25zdCBzZXR0aW5ncyA9IHRoaXMuZ2V0U2V0dGluZ3MoKTtcblxuICAgICAgICBuZXcgVHlwZWQoc2V0dGluZ3Muc2VsZWN0b3JzLmFuaW1hdGVkSGVhZGluZywge1xuICAgICAgICAgICAgc3RyaW5nczogc2V0dGluZ3MuYW5pbWF0ZWRfaGVhZGluZy5zcGxpdChcIixcIiksXG4gICAgICAgICAgICB0eXBlU3BlZWQ6IHNldHRpbmdzLnR5cGVfc3BlZWQsXG4gICAgICAgICAgICBzdGFydERlbGF5OiBzZXR0aW5ncy5zdGFydF9kZWxheSxcbiAgICAgICAgICAgIGJhY2tTcGVlZDogc2V0dGluZ3MuYmFja19zcGVlZCxcbiAgICAgICAgICAgIGJhY2tEZWxheTogc2V0dGluZ3MuYmFja19kZWxheSxcbiAgICAgICAgICAgIGxvb3A6IHNldHRpbmdzLmxvb3AgPT09IFwieWVzXCIgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgICAgICBsb29wQ291bnQ6IHNldHRpbmdzLmxvb3BfY291bnQgPyBzZXR0aW5ncy5sb29wX2NvdW50IDogMCxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0VXNlclNldHRpbmdzKCkge1xuICAgICAgICBjb25zdCBlbGVtZW50U2V0dGluZ3MgPSB0aGlzLmdldEVsZW1lbnRTZXR0aW5ncygpO1xuXG4gICAgICAgIHRoaXMuc2V0U2V0dGluZ3MoZWxlbWVudFNldHRpbmdzKTtcbiAgICB9XG5cbiAgICBoYXNBbmltYXRlZEhlYWRpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFNldHRpbmdzKFwiYW5pbWF0ZWRfaGVhZGluZ1wiKS50cmltKCkgIT09IFwiXCI7XG4gICAgfVxufVxuXG5yZWdpc3RlcldpZGdldChPRVdfQW5pbWF0ZWRIZWFkaW5nLCBcIm9ldy1hbmltYXRlZC1oZWFkaW5nXCIpO1xuIl19
