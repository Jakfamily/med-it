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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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

var OEW_Carousel = /*#__PURE__*/function (_elementorModules$fro) {
  _inherits(OEW_Carousel, _elementorModules$fro);

  var _super = _createSuper(OEW_Carousel);

  function OEW_Carousel() {
    _classCallCheck(this, OEW_Carousel);

    return _super.apply(this, arguments);
  }

  _createClass(OEW_Carousel, [{
    key: "getDefaultSettings",
    value: function getDefaultSettings() {
      return {
        selectors: {
          carousel: ".oew-carousel-container",
          carouselNextBtn: ".swiper-button-next-".concat(this.getID()),
          carouselPrevBtn: ".swiper-button-prev-".concat(this.getID()),
          carouselPagination: ".swiper-pagination-".concat(this.getID())
        },
        effect: "slide",
        loop: false,
        autoplay: 0,
        speed: 400,
        navigation: false,
        pagination: false,
        centeredSlides: false,
        pauseOnHover: false,
        slidesPerView: {
          widescreen: 3,
          desktop: 3,
          laptop: 3,
          tablet: 2,
          tablet_extra: 2,
          mobile: 1,
          mobile_extra: 1
        },
        slidesPerGroup: {
          widescreen: 3,
          desktop: 3,
          laptop: 3,
          tablet: 2,
          tablet_extra: 2,
          mobile: 1,
          mobile_extra: 1
        },
        spaceBetween: {
          widescreen: 10,
          desktop: 10,
          laptop: 10,
          tablet: 10,
          tablet_extra: 10,
          mobile: 10,
          mobile_extra: 10
        },
        swiperInstance: null
      };
    }
  }, {
    key: "getDefaultElements",
    value: function getDefaultElements() {
      var element = this.$element.get(0);
      var selectors = this.getSettings("selectors");
      return {
        carousel: element.querySelector(selectors.carousel),
        carouselNextBtn: element.querySelectorAll(selectors.carouselNextBtn),
        carouselPrevBtn: element.querySelectorAll(selectors.carouselPrevBtn),
        carouselPagination: element.querySelectorAll(selectors.carouselPagination)
      };
    }
  }, {
    key: "onInit",
    value: function onInit() {
      var _get2;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      (_get2 = _get(_getPrototypeOf(OEW_Carousel.prototype), "onInit", this)).call.apply(_get2, [this].concat(args));

      this.setUserSettings();
      this.initSwiper();
      this.setupEventListeners();
      this.updateCarouselStyles(this.getSettings());
    }
  }, {
    key: "setUserSettings",
    value: function setUserSettings() {
      var settings = this.getSettings();
      var userSettings = JSON.parse(this.elements.carousel.getAttribute("data-settings"));
      var currentSettings = {
        effect: !!userSettings.effect ? userSettings.effect : settings.effect,
        loop: !!userSettings.loop ? Boolean(Number(userSettings.loop)) : settings.loop,
        autoplay: !!userSettings.autoplay ? Number(userSettings.autoplay) : settings.autoplay,
        speed: !!userSettings.speed ? Number(userSettings.speed) : settings.speed,
        navigation: !!userSettings.arrows ? Boolean(Number(userSettings.arrows)) : settings.navigation,
        pagination: !!userSettings.dots ? Boolean(Number(userSettings.dots)) : settings.pagination,
        pauseOnHover: !!userSettings["pause-on-hover"] ? JSON.parse(userSettings["pause-on-hover"]) : settings.pauseOnHover,
        slidesPerView: {
          widescreen: userSettings['items-widescreen'] !== undefined ? Number(userSettings['items-widescreen']) : settings.slidesPerView['widescreen'],
          desktop: userSettings['items'] !== undefined ? Number(userSettings['items']) : settings.slidesPerView['desktop'],
          laptop: userSettings['items-laptop'] !== undefined ? Number(userSettings['items-laptop']) : settings.slidesPerView['laptop'],
          tablet: userSettings['items-tablet'] !== undefined ? Number(userSettings['items-tablet']) : settings.slidesPerView['tablet'],
          tablet_extra: userSettings['items-tablet_extra'] !== undefined ? Number(userSettings['items-tablet_extra']) : settings.slidesPerView['tablet_extra'],
          mobile: userSettings['items-mobile'] !== undefined ? Number(userSettings['items-mobile']) : settings.slidesPerView['mobile'],
          mobile_extra: userSettings['items-mobile_extra'] !== undefined ? Number(userSettings['items-mobile_extra']) : settings.slidesPerView['mobile_extra']
        },
        slidesPerGroup: {
          widescreen: !!userSettings['slides-widescreen'] ? Number(userSettings['slides-widescreen']) : settings.slidesPerGroup.widescreen,
          desktop: !!userSettings['slides'] ? Number(userSettings['slides']) : settings.slidesPerGroup.desktop,
          laptop: !!userSettings['slides-laptop'] ? Number(userSettings['slides-laptop']) : settings.slidesPerGroup.laptop,
          tablet: !!userSettings["slides-tablet"] ? Number(userSettings["slides-tablet"]) : settings.slidesPerGroup.tablet,
          tablet_extra: !!userSettings["slides-tablet_extra"] ? Number(userSettings["slides-tablet_extra"]) : settings.slidesPerGroup.tablet_extra,
          mobile: !!userSettings["slides-mobile"] ? Number(userSettings["slides-mobile"]) : settings.slidesPerGroup.mobile,
          mobile_extra: !!userSettings["slides-mobile_extra"] ? Number(userSettings["slides-mobile_extra"]) : settings.slidesPerGroup.mobile_extra
        },
        spaceBetween: {
          widescreen: userSettings['margin-widescreen'] !== undefined ? Number(userSettings['margin-widescreen']) : settings.spaceBetween.widescreen,
          desktop: userSettings['margin'] !== undefined ? Number(userSettings['margin']) : settings.spaceBetween.desktop,
          laptop: userSettings['margin-laptop'] !== undefined ? Number(userSettings['margin-laptop']) : settings.spaceBetween.laptop,
          tablet: userSettings["margin-tablet"] !== undefined ? Number(userSettings["margin-tablet"]) : settings.spaceBetween.tablet,
          tablet_extra: userSettings["margin-tablet_extra"] !== undefined ? Number(userSettings["margin-tablet_extra"]) : settings.spaceBetween.tablet_extra,
          mobile: userSettings["margin-mobile"] !== undefined ? Number(userSettings["margin-mobile"]) : settings.spaceBetween.mobile,
          mobile_extra: userSettings["margin-mobile_extra"] !== undefined ? Number(userSettings["margin-mobile_extra"]) : settings.spaceBetween.mobile_extra
        }
      };
      currentSettings.centeredSlides = currentSettings.effect === "coverflow" ? true : settings.centeredSlides;
      this.setSettings(currentSettings);
    }
  }, {
    key: "updateCarouselStyles",
    value: function updateCarouselStyles(settings) {
      var spaceBetween = settings.spaceBetween; // console.log("Updating Carousel Styles:", spaceBetween); // For debugging

      if (spaceBetween.desktop === 0) {
        // console.log("Setting margin-right for Desktop"); // For debugging
        this.elements.carousel.querySelectorAll('.oew-carousel-slide').forEach(function (slide) {
          slide.style.marginRight = "0px";
        });
      }

      if (spaceBetween.tablet === 0) {
        // console.log("Setting margin-right for Tablet"); // For debugging
        this.elements.carousel.querySelectorAll('.oew-carousel-slide').forEach(function (slide) {
          slide.style.marginRight = "0px";
        });
      }

      if (spaceBetween.mobile === 0) {
        // console.log("Setting margin-right for Mobile"); // For debugging
        this.elements.carousel.querySelectorAll('.oew-carousel-slide').forEach(function (slide) {
          slide.style.marginRight = "0px";
        });
      }
    }
  }, {
    key: "initSwiper",
    value: function initSwiper() {
      var swiper = new Swiper(this.elements.carousel, this.swiperOptions());
      this.setSettings({
        swiperInstance: swiper
      });
    }
  }, {
    key: "swiperOptions",
    value: function swiperOptions() {
      var settings = this.getSettings();
      var swiperOptions = {
        direction: "horizontal",
        effect: settings.effect,
        loop: settings.loop,
        speed: settings.speed,
        centeredSlides: settings.centeredSlides,
        autoHeight: true,
        autoplay: !settings.autoplay ? false : {
          delay: settings.autoplay
        },
        navigation: !settings.navigation ? false : {
          nextEl: settings.selectors.carouselNextBtn,
          prevEl: settings.selectors.carouselPrevBtn
        },
        pagination: !settings.pagination ? false : {
          el: settings.selectors.carouselPagination,
          clickable: true
        }
      }; // Fetch Elementor's responsive breakpoints

      var breakpoints = elementorFrontend.config.responsive.activeBreakpoints;
      var breakpointsBootstrap = elementorFrontend.config.breakpoints;

      if (settings.effect === "fade") {
        swiperOptions.items = 1;
      } else {
        swiperOptions.breakpoints = {};
        var devicesBreakPoints = [];

        for (var deviceName in breakpoints) {
          var max_width = breakpoints[deviceName]['default_value'];

          if (breakpoints[deviceName]['value'] !== undefined) {
            max_width = breakpoints[deviceName]['value'];
          }

          devicesBreakPoints.push({
            'label': deviceName,
            'max_width': max_width
          });
        }

        devicesBreakPoints.sort(function (a, b) {
          return a.max_width - b.max_width;
        });
        var tmpSlidesPerView = 0;
        var desktopWidth = breakpointsBootstrap.lg;

        for (var _i = 0, _devicesBreakPoints = devicesBreakPoints; _i < _devicesBreakPoints.length; _i++) {
          var devicesBreakPointItem = _devicesBreakPoints[_i];
          var responsivKeySetting = devicesBreakPointItem.label;

          if (settings.slidesPerView[responsivKeySetting] !== undefined) {
            swiperOptions.breakpoints[tmpSlidesPerView] = {
              slidesPerView: settings.slidesPerView[responsivKeySetting],
              slidesPerGroup: settings.slidesPerGroup[responsivKeySetting],
              spaceBetween: settings.spaceBetween[responsivKeySetting]
            };

            if (responsivKeySetting === 'widescreen') {
              desktopWidth = tmpSlidesPerView;
              tmpSlidesPerView = devicesBreakPointItem['max_width'];
              swiperOptions.breakpoints[tmpSlidesPerView] = {
                slidesPerView: settings.slidesPerView[responsivKeySetting],
                slidesPerGroup: settings.slidesPerGroup[responsivKeySetting],
                spaceBetween: settings.spaceBetween[responsivKeySetting]
              };
            } else {
              tmpSlidesPerView = parseInt(devicesBreakPointItem['max_width']) + 1;
              desktopWidth = tmpSlidesPerView;
            }
          }
        }

        swiperOptions.breakpoints[desktopWidth] = {
          slidesPerView: settings.slidesPerView['desktop'],
          slidesPerGroup: settings.slidesPerGroup['desktop'],
          spaceBetween: settings.spaceBetween['desktop']
        };
      }

      return swiperOptions;
    }
  }, {
    key: "setupEventListeners",
    value: function setupEventListeners() {
      if (this.getSettings("pauseOnHover")) {
        this.elements.carousel.addEventListener("mouseenter", this.pauseSwiper.bind(this));
        this.elements.carousel.addEventListener("mouseleave", this.resumeSwiper.bind(this));
      }
    }
  }, {
    key: "pauseSwiper",
    value: function pauseSwiper(event) {
      this.getSettings("swiperInstance").autoplay.stop();
    }
  }, {
    key: "resumeSwiper",
    value: function resumeSwiper(event) {
      this.getSettings("swiperInstance").autoplay.start();
    }
  }]);

  return OEW_Carousel;
}(elementorModules.frontend.handlers.Base);

var _default = OEW_Carousel;
exports["default"] = _default;

},{}],3:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _utils = require("../lib/utils");

var _carousel = _interopRequireDefault(require("./base/carousel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var OEW_TestimonialCarousel = /*#__PURE__*/function (_OEW_Carousel) {
  _inherits(OEW_TestimonialCarousel, _OEW_Carousel);

  var _super = _createSuper(OEW_TestimonialCarousel);

  function OEW_TestimonialCarousel() {
    _classCallCheck(this, OEW_TestimonialCarousel);

    return _super.apply(this, arguments);
  }

  return OEW_TestimonialCarousel;
}(_carousel["default"]);

(0, _utils.registerWidget)(OEW_TestimonialCarousel, "oew-testimonial-carousel");

},{"../lib/utils":1,"./base/carousel":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvc3JjL2pzL2xpYi91dGlscy5qcyIsImFzc2V0cy9zcmMvanMvd2lkZ2V0cy9iYXNlL2Nhcm91c2VsLmpzIiwiYXNzZXRzL3NyYy9qcy93aWRnZXRzL3Rlc3RpbW9uaWFsLWNhcm91c2VsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FDQU8sSUFBTSxTQUFTLEdBQUcsU0FBWixTQUFZLENBQUMsT0FBRCxFQUE2QjtBQUFBLE1BQW5CLFFBQW1CLHVFQUFSLEdBQVE7QUFDbEQsTUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLE9BQS9DOztBQUVBLE1BQUksT0FBTyxLQUFLLE1BQWhCLEVBQXdCO0FBQ3BCLElBQUEsT0FBTyxHQUFHLE9BQVY7QUFDSDs7QUFFRCxFQUFBLE9BQU8sQ0FBQyxLQUFSLENBQWMsa0JBQWQsR0FBbUMsUUFBbkM7QUFDQSxFQUFBLE9BQU8sQ0FBQyxLQUFSLENBQWMsa0JBQWQsYUFBc0MsUUFBdEM7QUFFQSxFQUFBLE9BQU8sQ0FBQyxLQUFSLENBQWMsT0FBZCxHQUF3QixDQUF4QjtBQUNBLEVBQUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxPQUFkLEdBQXdCLE9BQXhCO0FBQ0EsTUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFlBQXJCO0FBRUEsRUFBQSxPQUFPLENBQUMsS0FBUixDQUFjLE1BQWQsR0FBdUIsQ0FBdkI7QUFDQSxFQUFBLE9BQU8sQ0FBQyxLQUFSLENBQWMsT0FBZCxHQUF3QixDQUF4QjtBQUNBLEVBQUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxRQUFkLEdBQXlCLFFBQXpCO0FBRUEsRUFBQSxVQUFVLENBQUMsWUFBTTtBQUNiLElBQUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxNQUFkLGFBQTBCLE1BQTFCO0FBQ0gsR0FGUyxFQUVQLENBRk8sQ0FBVjtBQUlBLEVBQUEsTUFBTSxD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QUNGOztBQUVELFFBQUEsYUFBYSxDQUFDLFdBQWQsQ0FBMEIsWUFBMUIsSUFBMEM7QUFDeEMsVUFBQSxhQUFhLEVBQUUsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsU0FBdkIsQ0FEeUI7QUFFeEMsVUFBQSxjQUFjLEVBQUUsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsU0FBeEIsQ0FGd0I7QUFHeEMsVUFBQSxZQUFZLEVBQUUsUUFBUSxDQUFDLFlBQVQsQ0FBc0IsU0FBdEI7QUFIMEIsU0FBMUM7QUFNSDs7QUFFRCxhQUFPLGFBQVA7QUFDSDs7O1dBRUQsK0JBQXNCO0FBQ2xCLFVBQUksS0FBSyxXQUFMLENBQWlCLGNBQWpCLENBQUosRUFBc0M7QUFDbEMsYUFBSyxRQUFMLENBQWMsUUFBZCxDQUF1QixnQkFBdkIsQ0FBd0MsWUFBeEMsRUFBc0QsS0FBSyxXQUFMLENBQWlCLElBQWpCLENBQXNCLElBQXRCLENBQXREO0FBQ0EsYUFBSyxRQUFMLENBQWMsUUFBZCxDQUF1QixnQkFBdkIsQ0FBd0MsWUFBeEMsRUFBc0QsS0FBSyxZQUFMLENBQWtCLElBQWxCLENBQXVCLElBQXZCLENBQXREO0FBQ0g7QUFDSjs7O1dBRUQscUJBQVksS0FBWixFQUFtQjtBQUNmLFdBQUssV0FBTCxDQUFpQixnQkFBakIsRUFBbUMsUUFBbkMsQ0FBNEMsSUFBNUM7QUFDSDs7O1dBRUQsc0JBQWEsS0FBYixFQUFvQjtBQUNoQixXQUFLLFdBQUwsQ0FBaUIsZ0JBQWpCLEVBQW1DLFFBQW5DLENBQTRDLEtBQTVDO0FBQ0g7Ozs7RUEzUXNCLGdCQUFnQixDQUFDLFFBQWpCLENBQTBCLFFBQTFCLENBQW1DLEk7O2VBOFEvQyxZOzs7Ozs7OztBQzlRZjs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFTSx1Qjs7Ozs7Ozs7Ozs7O0VBQWdDLG9COztBQUV0QywyQkFBZSx1QkFBZixFQUF3QywwQkFBeEMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJleHBvcnQgY29uc3Qgc2xpZGVEb3duID0gKGVsZW1lbnQsIGR1cmF0aW9uID0gMzAwKSA9PiB7XG4gICAgbGV0IGRpc3BsYXkgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5kaXNwbGF5O1xuXG4gICAgaWYgKGRpc3BsYXkgPT09IFwibm9uZVwiKSB7XG4gICAgICAgIGRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxuXG4gICAgZWxlbWVudC5zdHlsZS50cmFuc2l0aW9uUHJvcGVydHkgPSBcImhlaWdodFwiO1xuICAgIGVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gYCR7ZHVyYXRpb259bXNgO1xuXG4gICAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5O1xuICAgIGxldCBoZWlnaHQgPSBlbGVtZW50Lm9mZnNldEhlaWdodDtcblxuICAgIGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gMDtcbiAgICBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgIGVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0fXB4YDtcbiAgICB9LCA1KTtcblxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcImhlaWdodFwiKTtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcIm92ZXJmbG93XCIpO1xuICAgICAgICBlbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KFwidHJhbnNpdGlvbi1kdXJhdGlvblwiKTtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcInRyYW5zaXRpb24tcHJvcGVydHlcIik7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJvcGFjaXR5XCIpO1xuICAgIH0sIGR1cmF0aW9uICsgNTApO1xufTtcblxuZXhwb3J0IGNvbnN0IHNsaWRlVXAgPSAoZWxlbWVudCwgZHVyYXRpb24gPSAzMDApID0+IHtcbiAgICBlbGVtZW50LnN0eWxlLmJveFNpemluZyA9IFwiYm9yZGVyLWJveFwiO1xuICAgIGVsZW1lbnQuc3R5bGUudHJhbnNpdGlvblByb3BlcnR5ID0gXCJoZWlnaHQsIG1hcmdpblwiO1xuICAgIGVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gYCR7ZHVyYXRpb259bXNgO1xuICAgIGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gYCR7ZWxlbWVudC5vZmZzZXRIZWlnaHR9cHhgO1xuICAgIGVsZW1lbnQuc3R5bGUubWFyZ2luVG9wID0gMDtcbiAgICBlbGVtZW50LnN0eWxlLm1hcmdpbkJvdHRvbSA9IDA7XG4gICAgZWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5oZWlnaHQgPSAwO1xuICAgIH0sIDUpO1xuXG4gICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcImhlaWdodFwiKTtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcIm1hcmdpbi10b3BcIik7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJtYXJnaW4tYm90dG9tXCIpO1xuICAgICAgICBlbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KFwib3ZlcmZsb3dcIik7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJ0cmFuc2l0aW9uLWR1cmF0aW9uXCIpO1xuICAgICAgICBlbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KFwidHJhbnNpdGlvbi1wcm9wZXJ0eVwiKTtcbiAgICB9LCBkdXJhdGlvbiArIDUwKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzbGlkZVRvZ2dsZSA9IChlbGVtZW50LCBkdXJhdGlvbikgPT4ge1xuICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmRpc3BsYXkgPT09IFwibm9uZVwiID8gc2xpZGVEb3duKGVsZW1lbnQsIGR1cmF0aW9uKSA6IHNsaWRlVXAoZWxlbWVudCwgZHVyYXRpb24pO1xufTtcblxuZXhwb3J0IGNvbnN0IGZhZGVJbiA9IChlbGVtZW50LCBfb3B0aW9ucyA9IHt9KSA9PiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgZHVyYXRpb246IDMwMCxcbiAgICAgICAgZGlzcGxheTogbnVsbCxcbiAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgY2FsbGJhY2s6IG51bGwsXG4gICAgfTtcblxuICAgIE9iamVjdC5hc3NpZ24ob3B0aW9ucywgX29wdGlvbnMpO1xuXG4gICAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBvcHRpb25zLmRpc3BsYXkgfHwgXCJibG9ja1wiO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbiA9IGAke29wdGlvbnMuZHVyYXRpb259bXMgb3BhY2l0eSBlYXNlYDtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gb3B0aW9ucy5vcGFjaXR5O1xuICAgIH0sIDUpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJ0cmFuc2l0aW9uXCIpO1xuICAgICAgICAhIW9wdGlvbnMuY2FsbGJhY2sgJiYgb3B0aW9ucy5jYWxsYmFjaygpO1xuICAgIH0sIG9wdGlvbnMuZHVyYXRpb24gKyA1MCk7XG59O1xuXG5leHBvcnQgY29uc3QgZmFkZU91dCA9IChlbGVtZW50LCBfb3B0aW9ucyA9IHt9KSA9PiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgZHVyYXRpb246IDMwMCxcbiAgICAgICAgZGlzcGxheTogbnVsbCxcbiAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgY2FsbGJhY2s6IG51bGwsXG4gICAgfTtcblxuICAgIE9iamVjdC5hc3NpZ24ob3B0aW9ucywgX29wdGlvbnMpO1xuXG4gICAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBvcHRpb25zLmRpc3BsYXkgfHwgXCJibG9ja1wiO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbiA9IGAke29wdGlvbnMuZHVyYXRpb259bXMgb3BhY2l0eSBlYXNlYDtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gb3B0aW9ucy5vcGFjaXR5O1xuICAgIH0sIDUpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBlbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KFwidHJhbnNpdGlvblwiKTtcbiAgICAgICAgISFvcHRpb25zLmNhbGxiYWNrICYmIG9wdGlvbnMuY2FsbGJhY2soKTtcbiAgICB9LCBvcHRpb25zLmR1cmF0aW9uICsgNTApO1xufTtcblxuZXhwb3J0IGNvbnN0IGZhZGVUb2dnbGUgPSAoZWxlbWVudCwgb3B0aW9ucykgPT4ge1xuICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmRpc3BsYXkgPT09IFwibm9uZVwiID8gZmFkZUluKGVsZW1lbnQsIG9wdGlvbnMpIDogZmFkZU91dChlbGVtZW50LCBvcHRpb25zKTtcbn07XG5cbmV4cG9ydCBjb25zdCBvZmZzZXQgPSAoZWxlbWVudCkgPT4ge1xuICAgIGlmICghZWxlbWVudC5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4geyB0b3A6IDAsIGxlZnQ6IDAgfTtcbiAgICB9XG5cbiAgICAvLyBHZXQgZG9jdW1lbnQtcmVsYXRpdmUgcG9zaXRpb24gYnkgYWRkaW5nIHZpZXdwb3J0IHNjcm9sbCB0byB2aWV3cG9ydC1yZWxhdGl2ZSBnQkNSXG4gICAgY29uc3QgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3Qgd2luID0gZWxlbWVudC5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3O1xuICAgIHJldHVybiB7XG4gICAgICAgIHRvcDogcmVjdC50b3AgKyB3aW4ucGFnZVlPZmZzZXQsXG4gICAgICAgIGxlZnQ6IHJlY3QubGVmdCArIHdpbi5wYWdlWE9mZnNldCxcbiAgICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IHZpc2libGUgPSAoZWxlbWVudCkgPT4ge1xuICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuICEhKGVsZW1lbnQub2Zmc2V0V2lkdGggfHwgZWxlbWVudC5vZmZzZXRIZWlnaHQgfHwgZWxlbWVudC5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0U2libGluZ3MgPSAoZSkgPT4ge1xuICAgIC8vIGZvciBjb2xsZWN0aW5nIHNpYmxpbmdzXG4gICAgY29uc3Qgc2libGluZ3MgPSBbXTtcblxuICAgIC8vIGlmIG5vIHBhcmVudCwgcmV0dXJuIG5vIHNpYmxpbmdcbiAgICBpZiAoIWUucGFyZW50Tm9kZSkge1xuICAgICAgICByZXR1cm4gc2libGluZ3M7XG4gICAgfVxuXG4gICAgLy8gZmlyc3QgY2hpbGQgb2YgdGhlIHBhcmVudCBub2RlXG4gICAgbGV0IHNpYmxpbmcgPSBlLnBhcmVudE5vZGUuZmlyc3RDaGlsZDtcblxuICAgIC8vIGNvbGxlY3Rpbmcgc2libGluZ3NcbiAgICB3aGlsZSAoc2libGluZykge1xuICAgICAgICBpZiAoc2libGluZy5ub2RlVHlwZSA9PT0gMSAmJiBzaWJsaW5nICE9PSBlKSB7XG4gICAgICAgICAgICBzaWJsaW5ncy5wdXNoKHNpYmxpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2libGluZyA9IHNpYmxpbmcubmV4dFNpYmxpbmc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNpYmxpbmdzO1xufTtcblxuLy8gUmV0dXJucyB0cnVlIGlmIGl0IGlzIGEgRE9NIGVsZW1lbnRcbmV4cG9ydCBjb25zdCBpc0VsZW1lbnQgPSAobykgPT4ge1xuICAgIHJldHVybiB0eXBlb2YgSFRNTEVsZW1lbnQgPT09IFwib2JqZWN0XCJcbiAgICAgICAgPyBvIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgLy8gRE9NMlxuICAgICAgICA6IG8gJiYgdHlwZW9mIG8gPT09IFwib2JqZWN0XCIgJiYgbyAhPT0gbnVsbCAmJiBvLm5vZGVUeXBlID09PSAxICYmIHR5cGVvZiBvLm5vZGVOYW1lID09PSBcInN0cmluZ1wiO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyV2lkZ2V0ID0gKGNsYXNzTmFtZSwgd2lkZ2V0TmFtZSwgc2tpbiA9IFwiZGVmYXVsdFwiKSA9PiB7XG4gICAgaWYgKCEoY2xhc3NOYW1lIHx8IHdpZGdldE5hbWUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCZWNhdXNlIEVsZW1lbnRvciBwbHVnaW4gdXNlcyBqUXVlcnkgY3VzdG9tIGV2ZW50LFxuICAgICAqIFdlIGFsc28gaGF2ZSB0byB1c2UgalF1ZXJ5IHRvIHVzZSB0aGlzIGV2ZW50XG4gICAgICovXG4gICAgalF1ZXJ5KHdpbmRvdykub24oXCJlbGVtZW50b3IvZnJvbnRlbmQvaW5pdFwiLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFkZEhhbmRsZXIgPSAoJGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnRvckZyb250ZW5kLmVsZW1lbnRzSGFuZGxlci5hZGRIYW5kbGVyKGNsYXNzTmFtZSwge1xuICAgICAgICAgICAgICAgICRlbGVtZW50LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZWxlbWVudG9yRnJvbnRlbmQuaG9va3MuYWRkQWN0aW9uKGBmcm9udGVuZC9lbGVtZW50X3JlYWR5LyR7d2lkZ2V0TmFtZX0uJHtza2lufWAsIGFkZEhhbmRsZXIpO1xuICAgIH0pO1xufTtcbiIsImNsYXNzIE9FV19DYXJvdXNlbCBleHRlbmRzIGVsZW1lbnRvck1vZHVsZXMuZnJvbnRlbmQuaGFuZGxlcnMuQmFzZSB7XG4gICAgZ2V0RGVmYXVsdFNldHRpbmdzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2VsZWN0b3JzOiB7XG4gICAgICAgICAgICAgICAgY2Fyb3VzZWw6IFwiLm9ldy1jYXJvdXNlbC1jb250YWluZXJcIixcbiAgICAgICAgICAgICAgICBjYXJvdXNlbE5leHRCdG46IGAuc3dpcGVyLWJ1dHRvbi1uZXh0LSR7dGhpcy5nZXRJRCgpfWAsXG4gICAgICAgICAgICAgICAgY2Fyb3VzZWxQcmV2QnRuOiBgLnN3aXBlci1idXR0b24tcHJldi0ke3RoaXMuZ2V0SUQoKX1gLFxuICAgICAgICAgICAgICAgIGNhcm91c2VsUGFnaW5hdGlvbjogYC5zd2lwZXItcGFnaW5hdGlvbi0ke3RoaXMuZ2V0SUQoKX1gLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVmZmVjdDogXCJzbGlkZVwiLFxuICAgICAgICAgICAgbG9vcDogZmFsc2UsXG4gICAgICAgICAgICBhdXRvcGxheTogMCxcbiAgICAgICAgICAgIHNwZWVkOiA0MDAsXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiBmYWxzZSxcbiAgICAgICAgICAgIHBhZ2luYXRpb246IGZhbHNlLFxuICAgICAgICAgICAgY2VudGVyZWRTbGlkZXM6IGZhbHNlLFxuICAgICAgICAgICAgcGF1c2VPbkhvdmVyOiBmYWxzZSxcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IHtcbiAgICAgICAgICAgICAgICB3aWRlc2NyZWVuOiAzLFxuICAgICAgICAgICAgICAgIGRlc2t0b3A6IDMsXG4gICAgICAgICAgICAgICAgbGFwdG9wOiAzLFxuICAgICAgICAgICAgICAgIHRhYmxldDogMixcbiAgICAgICAgICAgICAgICB0YWJsZXRfZXh0cmE6IDIsXG4gICAgICAgICAgICAgICAgbW9iaWxlOiAxLFxuICAgICAgICAgICAgICAgIG1vYmlsZV9leHRyYTogMSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzbGlkZXNQZXJHcm91cDoge1xuICAgICAgICAgICAgICAgIHdpZGVzY3JlZW46IDMsXG4gICAgICAgICAgICAgICAgZGVza3RvcDogMyxcbiAgICAgICAgICAgICAgICBsYXB0b3A6IDMsXG4gICAgICAgICAgICAgICAgdGFibGV0OiAyLFxuICAgICAgICAgICAgICAgIHRhYmxldF9leHRyYTogMixcbiAgICAgICAgICAgICAgICBtb2JpbGU6IDEsXG4gICAgICAgICAgICAgICAgbW9iaWxlX2V4dHJhOiAxLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNwYWNlQmV0d2Vlbjoge1xuICAgICAgICAgICAgICAgIHdpZGVzY3JlZW46IDEwLFxuICAgICAgICAgICAgICAgIGRlc2t0b3A6IDEwLFxuICAgICAgICAgICAgICAgIGxhcHRvcDogMTAsXG4gICAgICAgICAgICAgICAgdGFibGV0OiAxMCxcbiAgICAgICAgICAgICAgICB0YWJsZXRfZXh0cmE6IDEwLFxuICAgICAgICAgICAgICAgIG1vYmlsZTogMTAsXG4gICAgICAgICAgICAgICAgbW9iaWxlX2V4dHJhOiAxMCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzd2lwZXJJbnN0YW5jZTogbnVsbCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXREZWZhdWx0RWxlbWVudHMoKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLiRlbGVtZW50LmdldCgwKTtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3JzID0gdGhpcy5nZXRTZXR0aW5ncyhcInNlbGVjdG9yc1wiKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2Fyb3VzZWw6IGVsZW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcnMuY2Fyb3VzZWwpLFxuICAgICAgICAgICAgY2Fyb3VzZWxOZXh0QnRuOiBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3JzLmNhcm91c2VsTmV4dEJ0biksXG4gICAgICAgICAgICBjYXJvdXNlbFByZXZCdG46IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcnMuY2Fyb3VzZWxQcmV2QnRuKSxcbiAgICAgICAgICAgIGNhcm91c2VsUGFnaW5hdGlvbjogZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9ycy5jYXJvdXNlbFBhZ2luYXRpb24pLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIG9uSW5pdCguLi5hcmdzKSB7XG4gICAgICAgIHN1cGVyLm9uSW5pdCguLi5hcmdzKTtcblxuICAgICAgICB0aGlzLnNldFVzZXJTZXR0aW5ncygpO1xuICAgICAgICB0aGlzLmluaXRTd2lwZXIoKTtcbiAgICAgICAgdGhpcy5zZXR1cEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIHRoaXMudXBkYXRlQ2Fyb3VzZWxTdHlsZXModGhpcy5nZXRTZXR0aW5ncygpKTtcbiAgICB9XG5cbiAgICBzZXRVc2VyU2V0dGluZ3MoKSB7XG4gICAgICAgIGNvbnN0IHNldHRpbmdzID0gdGhpcy5nZXRTZXR0aW5ncygpO1xuICAgICAgICBjb25zdCB1c2VyU2V0dGluZ3MgPSBKU09OLnBhcnNlKHRoaXMuZWxlbWVudHMuY2Fyb3VzZWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1zZXR0aW5nc1wiKSk7XG5cbiAgICAgICAgY29uc3QgY3VycmVudFNldHRpbmdzID0ge1xuICAgICAgICAgICAgZWZmZWN0OiAhIXVzZXJTZXR0aW5ncy5lZmZlY3QgPyB1c2VyU2V0dGluZ3MuZWZmZWN0IDogc2V0dGluZ3MuZWZmZWN0LFxuICAgICAgICAgICAgbG9vcDogISF1c2VyU2V0dGluZ3MubG9vcCA/IEJvb2xlYW4oTnVtYmVyKHVzZXJTZXR0aW5ncy5sb29wKSkgOiBzZXR0aW5ncy5sb29wLFxuICAgICAgICAgICAgYXV0b3BsYXk6ICEhdXNlclNldHRpbmdzLmF1dG9wbGF5ID8gTnVtYmVyKHVzZXJTZXR0aW5ncy5hdXRvcGxheSkgOiBzZXR0aW5ncy5hdXRvcGxheSxcbiAgICAgICAgICAgIHNwZWVkOiAhIXVzZXJTZXR0aW5ncy5zcGVlZCA/IE51bWJlcih1c2VyU2V0dGluZ3Muc3BlZWQpIDogc2V0dGluZ3Muc3BlZWQsXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiAhIXVzZXJTZXR0aW5ncy5hcnJvd3MgPyBCb29sZWFuKE51bWJlcih1c2VyU2V0dGluZ3MuYXJyb3dzKSkgOiBzZXR0aW5ncy5uYXZpZ2F0aW9uLFxuICAgICAgICAgICAgcGFnaW5hdGlvbjogISF1c2VyU2V0dGluZ3MuZG90cyA/IEJvb2xlYW4oTnVtYmVyKHVzZXJTZXR0aW5ncy5kb3RzKSkgOiBzZXR0aW5ncy5wYWdpbmF0aW9uLFxuICAgICAgICAgICAgcGF1c2VPbkhvdmVyOiAhIXVzZXJTZXR0aW5nc1tcInBhdXNlLW9uLWhvdmVyXCJdXG4gICAgICAgICAgICAgICAgPyBKU09OLnBhcnNlKHVzZXJTZXR0aW5nc1tcInBhdXNlLW9uLWhvdmVyXCJdKVxuICAgICAgICAgICAgICAgIDogc2V0dGluZ3MucGF1c2VPbkhvdmVyLFxuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzoge1xuICAgICAgICAgICAgICAgIHdpZGVzY3JlZW46IHVzZXJTZXR0aW5nc1snaXRlbXMtd2lkZXNjcmVlbiddICE9PSB1bmRlZmluZWQgPyBOdW1iZXIodXNlclNldHRpbmdzWydpdGVtcy13aWRlc2NyZWVuJ10pIDogc2V0dGluZ3Muc2xpZGVzUGVyVmlld1snd2lkZXNjcmVlbiddLFxuICAgICAgICAgICAgICAgIGRlc2t0b3A6IHVzZXJTZXR0aW5nc1snaXRlbXMnXSAhPT0gdW5kZWZpbmVkID8gTnVtYmVyKHVzZXJTZXR0aW5nc1snaXRlbXMnXSkgOiBzZXR0aW5ncy5zbGlkZXNQZXJWaWV3WydkZXNrdG9wJ10sXG4gICAgICAgICAgICAgICAgbGFwdG9wOiB1c2VyU2V0dGluZ3NbJ2l0ZW1zLWxhcHRvcCddICE9PSB1bmRlZmluZWQgPyBOdW1iZXIodXNlclNldHRpbmdzWydpdGVtcy1sYXB0b3AnXSkgOiBzZXR0aW5ncy5zbGlkZXNQZXJWaWV3WydsYXB0b3AnXSxcbiAgICAgICAgICAgICAgICB0YWJsZXQ6IHVzZXJTZXR0aW5nc1snaXRlbXMtdGFibGV0J10gIT09IHVuZGVmaW5lZCA/IE51bWJlcih1c2VyU2V0dGluZ3NbJ2l0ZW1zLXRhYmxldCddKSA6IHNldHRpbmdzLnNsaWRlc1BlclZpZXdbJ3RhYmxldCddLFxuICAgICAgICAgICAgICAgIHRhYmxldF9leHRyYTogdXNlclNldHRpbmdzWydpdGVtcy10YWJsZXRfZXh0cmEnXSAhPT0gdW5kZWZpbmVkID8gTnVtYmVyKHVzZXJTZXR0aW5nc1snaXRlbXMtdGFibGV0X2V4dHJhJ10pIDogc2V0dGluZ3Muc2xpZGVzUGVyVmlld1sndGFibGV0X2V4dHJhJ10sXG4gICAgICAgICAgICAgICAgbW9iaWxlOiB1c2VyU2V0dGluZ3NbJ2l0ZW1zLW1vYmlsZSddICE9PSB1bmRlZmluZWQgPyBOdW1iZXIodXNlclNldHRpbmdzWydpdGVtcy1tb2JpbGUnXSkgOiBzZXR0aW5ncy5zbGlkZXNQZXJWaWV3Wydtb2JpbGUnXSxcbiAgICAgICAgICAgICAgICBtb2JpbGVfZXh0cmE6IHVzZXJTZXR0aW5nc1snaXRlbXMtbW9iaWxlX2V4dHJhJ10gIT09IHVuZGVmaW5lZCA/IE51bWJlcih1c2VyU2V0dGluZ3NbJ2l0ZW1zLW1vYmlsZV9leHRyYSddKSA6IHNldHRpbmdzLnNsaWRlc1BlclZpZXdbJ21vYmlsZV9leHRyYSddXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2xpZGVzUGVyR3JvdXA6IHtcbiAgICAgICAgICAgICAgICB3aWRlc2NyZWVuOiAhIXVzZXJTZXR0aW5nc1snc2xpZGVzLXdpZGVzY3JlZW4nXSA/IE51bWJlcih1c2VyU2V0dGluZ3NbJ3NsaWRlcy13aWRlc2NyZWVuJ10pIDogc2V0dGluZ3Muc2xpZGVzUGVyR3JvdXAud2lkZXNjcmVlbixcbiAgICAgICAgICAgICAgICBkZXNrdG9wOiAhIXVzZXJTZXR0aW5nc1snc2xpZGVzJ10gPyBOdW1iZXIodXNlclNldHRpbmdzWydzbGlkZXMnXSkgOiBzZXR0aW5ncy5zbGlkZXNQZXJHcm91cC5kZXNrdG9wLFxuICAgICAgICAgICAgICAgIGxhcHRvcDogISF1c2VyU2V0dGluZ3NbJ3NsaWRlcy1sYXB0b3AnXSA/IE51bWJlcih1c2VyU2V0dGluZ3NbJ3NsaWRlcy1sYXB0b3AnXSkgOiBzZXR0aW5ncy5zbGlkZXNQZXJHcm91cC5sYXB0b3AsXG4gICAgICAgICAgICAgICAgdGFibGV0OiAhIXVzZXJTZXR0aW5nc1tcInNsaWRlcy10YWJsZXRcIl1cbiAgICAgICAgICAgICAgICAgICAgPyBOdW1iZXIodXNlclNldHRpbmdzW1wic2xpZGVzLXRhYmxldFwiXSlcbiAgICAgICAgICAgICAgICAgICAgOiBzZXR0aW5ncy5zbGlkZXNQZXJHcm91cC50YWJsZXQsXG4gICAgICAgICAgICAgICAgdGFibGV0X2V4dHJhOiAhIXVzZXJTZXR0aW5nc1tcInNsaWRlcy10YWJsZXRfZXh0cmFcIl1cbiAgICAgICAgICAgICAgICAgICAgPyBOdW1iZXIodXNlclNldHRpbmdzW1wic2xpZGVzLXRhYmxldF9leHRyYVwiXSlcbiAgICAgICAgICAgICAgICAgICAgOiBzZXR0aW5ncy5zbGlkZXNQZXJHcm91cC50YWJsZXRfZXh0cmEsXG4gICAgICAgICAgICAgICAgbW9iaWxlOiAhIXVzZXJTZXR0aW5nc1tcInNsaWRlcy1tb2JpbGVcIl1cbiAgICAgICAgICAgICAgICAgICAgPyBOdW1iZXIodXNlclNldHRpbmdzW1wic2xpZGVzLW1vYmlsZVwiXSlcbiAgICAgICAgICAgICAgICAgICAgOiBzZXR0aW5ncy5zbGlkZXNQZXJHcm91cC5tb2JpbGUsXG4gICAgICAgICAgICAgICAgbW9iaWxlX2V4dHJhOiAhIXVzZXJTZXR0aW5nc1tcInNsaWRlcy1tb2JpbGVfZXh0cmFcIl1cbiAgICAgICAgICAgICAgICAgICAgPyBOdW1iZXIodXNlclNldHRpbmdzW1wic2xpZGVzLW1vYmlsZV9leHRyYVwiXSlcbiAgICAgICAgICAgICAgICAgICAgOiBzZXR0aW5ncy5zbGlkZXNQZXJHcm91cC5tb2JpbGVfZXh0cmEsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiB7XG4gICAgICAgICAgICAgICAgd2lkZXNjcmVlbjogdXNlclNldHRpbmdzWydtYXJnaW4td2lkZXNjcmVlbiddICE9PSB1bmRlZmluZWQgPyBOdW1iZXIodXNlclNldHRpbmdzWydtYXJnaW4td2lkZXNjcmVlbiddKSA6IHNldHRpbmdzLnNwYWNlQmV0d2Vlbi53aWRlc2NyZWVuLFxuICAgICAgICAgICAgICAgIGRlc2t0b3A6IHVzZXJTZXR0aW5nc1snbWFyZ2luJ10gIT09IHVuZGVmaW5lZCA/IE51bWJlcih1c2VyU2V0dGluZ3NbJ21hcmdpbiddKSA6IHNldHRpbmdzLnNwYWNlQmV0d2Vlbi5kZXNrdG9wLFxuICAgICAgICAgICAgICAgIGxhcHRvcDogdXNlclNldHRpbmdzWydtYXJnaW4tbGFwdG9wJ10gIT09IHVuZGVmaW5lZCA/IE51bWJlcih1c2VyU2V0dGluZ3NbJ21hcmdpbi1sYXB0b3AnXSkgOiBzZXR0aW5ncy5zcGFjZUJldHdlZW4ubGFwdG9wLFxuICAgICAgICAgICAgICAgIHRhYmxldDogdXNlclNldHRpbmdzW1wibWFyZ2luLXRhYmxldFwiXSAhPT0gdW5kZWZpbmVkID8gTnVtYmVyKHVzZXJTZXR0aW5nc1tcIm1hcmdpbi10YWJsZXRcIl0pIDogc2V0dGluZ3Muc3BhY2VCZXR3ZWVuLnRhYmxldCxcbiAgICAgICAgICAgICAgICB0YWJsZXRfZXh0cmE6IHVzZXJTZXR0aW5nc1tcIm1hcmdpbi10YWJsZXRfZXh0cmFcIl0gIT09IHVuZGVmaW5lZCA/IE51bWJlcih1c2VyU2V0dGluZ3NbXCJtYXJnaW4tdGFibGV0X2V4dHJhXCJdKSA6IHNldHRpbmdzLnNwYWNlQmV0d2Vlbi50YWJsZXRfZXh0cmEsXG4gICAgICAgICAgICAgICAgbW9iaWxlOiB1c2VyU2V0dGluZ3NbXCJtYXJnaW4tbW9iaWxlXCJdICE9PSB1bmRlZmluZWQgPyBOdW1iZXIodXNlclNldHRpbmdzW1wibWFyZ2luLW1vYmlsZVwiXSkgOiBzZXR0aW5ncy5zcGFjZUJldHdlZW4ubW9iaWxlLFxuICAgICAgICAgICAgICAgIG1vYmlsZV9leHRyYTogdXNlclNldHRpbmdzW1wibWFyZ2luLW1vYmlsZV9leHRyYVwiXSAhPT0gdW5kZWZpbmVkID8gTnVtYmVyKHVzZXJTZXR0aW5nc1tcIm1hcmdpbi1tb2JpbGVfZXh0cmFcIl0pIDogc2V0dGluZ3Muc3BhY2VCZXR3ZWVuLm1vYmlsZV9leHRyYSxcblxuICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgY3VycmVudFNldHRpbmdzLmNlbnRlcmVkU2xpZGVzID0gY3VycmVudFNldHRpbmdzLmVmZmVjdCA9PT0gXCJjb3ZlcmZsb3dcIiA/IHRydWUgOiBzZXR0aW5ncy5jZW50ZXJlZFNsaWRlcztcblxuICAgICAgICB0aGlzLnNldFNldHRpbmdzKGN1cnJlbnRTZXR0aW5ncyk7XG5cbiAgICB9XG5cbiAgICB1cGRhdGVDYXJvdXNlbFN0eWxlcyhzZXR0aW5ncykge1xuICAgICAgY29uc3QgeyBzcGFjZUJldHdlZW4gfSA9IHNldHRpbmdzO1xuXG4gICAgICAvLyBjb25zb2xlLmxvZyhcIlVwZGF0aW5nIENhcm91c2VsIFN0eWxlczpcIiwgc3BhY2VCZXR3ZWVuKTsgLy8gRm9yIGRlYnVnZ2luZ1xuXG4gICAgICBpZiAoc3BhY2VCZXR3ZWVuLmRlc2t0b3AgPT09IDApIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlNldHRpbmcgbWFyZ2luLXJpZ2h0IGZvciBEZXNrdG9wXCIpOyAvLyBGb3IgZGVidWdnaW5nXG4gICAgICAgICAgdGhpcy5lbGVtZW50cy5jYXJvdXNlbC5xdWVyeVNlbGVjdG9yQWxsKCcub2V3LWNhcm91c2VsLXNsaWRlJykuZm9yRWFjaChzbGlkZSA9PiB7XG4gICAgICAgICAgICAgIHNsaWRlLnN0eWxlLm1hcmdpblJpZ2h0ID0gXCIwcHhcIjtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChzcGFjZUJldHdlZW4udGFibGV0ID09PSAwKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coXCJTZXR0aW5nIG1hcmdpbi1yaWdodCBmb3IgVGFibGV0XCIpOyAvLyBGb3IgZGVidWdnaW5nXG4gICAgICAgICAgdGhpcy5lbGVtZW50cy5jYXJvdXNlbC5xdWVyeVNlbGVjdG9yQWxsKCcub2V3LWNhcm91c2VsLXNsaWRlJykuZm9yRWFjaChzbGlkZSA9PiB7XG4gICAgICAgICAgICAgIHNsaWRlLnN0eWxlLm1hcmdpblJpZ2h0ID0gXCIwcHhcIjtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChzcGFjZUJldHdlZW4ubW9iaWxlID09PSAwKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coXCJTZXR0aW5nIG1hcmdpbi1yaWdodCBmb3IgTW9iaWxlXCIpOyAvLyBGb3IgZGVidWdnaW5nXG4gICAgICAgICAgdGhpcy5lbGVtZW50cy5jYXJvdXNlbC5xdWVyeVNlbGVjdG9yQWxsKCcub2V3LWNhcm91c2VsLXNsaWRlJykuZm9yRWFjaChzbGlkZSA9PiB7XG4gICAgICAgICAgICAgIHNsaWRlLnN0eWxlLm1hcmdpblJpZ2h0ID0gXCIwcHhcIjtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgfVxuXG5cbiAgICBpbml0U3dpcGVyKCkge1xuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHRoaXMuZWxlbWVudHMuY2Fyb3VzZWwsIHRoaXMuc3dpcGVyT3B0aW9ucygpKTtcblxuICAgICAgICB0aGlzLnNldFNldHRpbmdzKHtcbiAgICAgICAgICAgIHN3aXBlckluc3RhbmNlOiBzd2lwZXIsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN3aXBlck9wdGlvbnMoKSB7XG4gICAgICAgIGNvbnN0IHNldHRpbmdzID0gdGhpcy5nZXRTZXR0aW5ncygpO1xuXG4gICAgICAgIGNvbnN0IHN3aXBlck9wdGlvbnMgPSB7XG4gICAgICAgICAgICBkaXJlY3Rpb246IFwiaG9yaXpvbnRhbFwiLFxuICAgICAgICAgICAgZWZmZWN0OiBzZXR0aW5ncy5lZmZlY3QsXG4gICAgICAgICAgICBsb29wOiBzZXR0aW5ncy5sb29wLFxuICAgICAgICAgICAgc3BlZWQ6IHNldHRpbmdzLnNwZWVkLFxuICAgICAgICAgICAgY2VudGVyZWRTbGlkZXM6IHNldHRpbmdzLmNlbnRlcmVkU2xpZGVzLFxuICAgICAgICAgICAgYXV0b0hlaWdodDogdHJ1ZSxcbiAgICAgICAgICAgIGF1dG9wbGF5OiAhc2V0dGluZ3MuYXV0b3BsYXlcbiAgICAgICAgICAgICAgICA/IGZhbHNlXG4gICAgICAgICAgICAgICAgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgZGVsYXk6IHNldHRpbmdzLmF1dG9wbGF5LFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5hdmlnYXRpb246ICFzZXR0aW5ncy5uYXZpZ2F0aW9uXG4gICAgICAgICAgICAgICAgPyBmYWxzZVxuICAgICAgICAgICAgICAgIDoge1xuICAgICAgICAgICAgICAgICAgICAgIG5leHRFbDogc2V0dGluZ3Muc2VsZWN0b3JzLmNhcm91c2VsTmV4dEJ0bixcbiAgICAgICAgICAgICAgICAgICAgICBwcmV2RWw6IHNldHRpbmdzLnNlbGVjdG9ycy5jYXJvdXNlbFByZXZCdG4sXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGFnaW5hdGlvbjogIXNldHRpbmdzLnBhZ2luYXRpb25cbiAgICAgICAgICAgICAgICA/IGZhbHNlXG4gICAgICAgICAgICAgICAgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgZWw6IHNldHRpbmdzLnNlbGVjdG9ycy5jYXJvdXNlbFBhZ2luYXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBGZXRjaCBFbGVtZW50b3IncyByZXNwb25zaXZlIGJyZWFrcG9pbnRzXG4gICAgICAgIHZhciBicmVha3BvaW50cyA9IGVsZW1lbnRvckZyb250ZW5kLmNvbmZpZy5yZXNwb25zaXZlLmFjdGl2ZUJyZWFrcG9pbnRzO1xuICAgICAgICB2YXIgYnJlYWtwb2ludHNCb290c3RyYXAgPSBlbGVtZW50b3JGcm9udGVuZC5jb25maWcuYnJlYWtwb2ludHM7XG5cbiAgICAgICAgaWYgKHNldHRpbmdzLmVmZmVjdCA9PT0gXCJmYWRlXCIpIHtcbiAgICAgICAgICAgIHN3aXBlck9wdGlvbnMuaXRlbXMgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN3aXBlck9wdGlvbnMuYnJlYWtwb2ludHMgPSB7fTtcbiAgICBcbiAgICAgICAgICAgIGxldCBkZXZpY2VzQnJlYWtQb2ludHMgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGRldmljZU5hbWUgaW4gYnJlYWtwb2ludHMpIHtcbiAgICAgICAgICAgICAgbGV0IG1heF93aWR0aCA9IGJyZWFrcG9pbnRzW2RldmljZU5hbWVdWydkZWZhdWx0X3ZhbHVlJ107XG4gICAgICAgICAgICAgIGlmKCBicmVha3BvaW50c1tkZXZpY2VOYW1lXVsndmFsdWUnXSAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgICAgICAgIG1heF93aWR0aCA9IGJyZWFrcG9pbnRzW2RldmljZU5hbWVdWyd2YWx1ZSddO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGRldmljZXNCcmVha1BvaW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAnbGFiZWwnIDogZGV2aWNlTmFtZSxcbiAgICAgICAgICAgICAgICAnbWF4X3dpZHRoJyA6IG1heF93aWR0aFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRldmljZXNCcmVha1BvaW50cy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBhLm1heF93aWR0aCAtIGIubWF4X3dpZHRoXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IHRtcFNsaWRlc1BlclZpZXcgPSAwO1xuICAgIFxuICAgICAgICAgICAgbGV0IGRlc2t0b3BXaWR0aCA9IGJyZWFrcG9pbnRzQm9vdHN0cmFwLmxnO1xuICAgICAgICAgICAgZm9yIChsZXQgZGV2aWNlc0JyZWFrUG9pbnRJdGVtIG9mIGRldmljZXNCcmVha1BvaW50cykge1xuICAgIFxuICAgICAgICAgICAgICBsZXQgcmVzcG9uc2l2S2V5U2V0dGluZyA9IGRldmljZXNCcmVha1BvaW50SXRlbS5sYWJlbDtcbiAgICBcbiAgICAgICAgICAgICAgaWYoIHNldHRpbmdzLnNsaWRlc1BlclZpZXdbcmVzcG9uc2l2S2V5U2V0dGluZ10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHN3aXBlck9wdGlvbnMuYnJlYWtwb2ludHNbdG1wU2xpZGVzUGVyVmlld10gPSB7XG4gICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiBzZXR0aW5ncy5zbGlkZXNQZXJWaWV3W3Jlc3BvbnNpdktleVNldHRpbmddLFxuICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyR3JvdXA6IHNldHRpbmdzLnNsaWRlc1Blckdyb3VwW3Jlc3BvbnNpdktleVNldHRpbmddLFxuICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiBzZXR0aW5ncy5zcGFjZUJldHdlZW5bcmVzcG9uc2l2S2V5U2V0dGluZ10sXG4gICAgICAgICAgICAgICAgfTtcbiAgICBcbiAgICAgICAgICAgICAgICBpZiggcmVzcG9uc2l2S2V5U2V0dGluZyA9PT0gJ3dpZGVzY3JlZW4nICkge1xuICAgICAgICAgICAgICAgICAgZGVza3RvcFdpZHRoID0gdG1wU2xpZGVzUGVyVmlldztcbiAgICAgICAgICAgICAgICAgIHRtcFNsaWRlc1BlclZpZXcgPSBkZXZpY2VzQnJlYWtQb2ludEl0ZW1bJ21heF93aWR0aCddO1xuICAgICAgICAgICAgICAgICAgc3dpcGVyT3B0aW9ucy5icmVha3BvaW50c1t0bXBTbGlkZXNQZXJWaWV3XSA9IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogc2V0dGluZ3Muc2xpZGVzUGVyVmlld1tyZXNwb25zaXZLZXlTZXR0aW5nXSxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyR3JvdXA6IHNldHRpbmdzLnNsaWRlc1Blckdyb3VwW3Jlc3BvbnNpdktleVNldHRpbmddLFxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IHNldHRpbmdzLnNwYWNlQmV0d2VlbltyZXNwb25zaXZLZXlTZXR0aW5nXSxcbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHRtcFNsaWRlc1BlclZpZXcgPSBwYXJzZUludChkZXZpY2VzQnJlYWtQb2ludEl0ZW1bJ21heF93aWR0aCddKSArIDE7XG4gICAgICAgICAgICAgICAgICBkZXNrdG9wV2lkdGggPSB0bXBTbGlkZXNQZXJWaWV3O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzd2lwZXJPcHRpb25zLmJyZWFrcG9pbnRzW2Rlc2t0b3BXaWR0aF0gPSB7XG4gICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IHNldHRpbmdzLnNsaWRlc1BlclZpZXdbJ2Rlc2t0b3AnXSxcbiAgICAgICAgICAgICAgc2xpZGVzUGVyR3JvdXA6IHNldHRpbmdzLnNsaWRlc1Blckdyb3VwWydkZXNrdG9wJ10sXG4gICAgICAgICAgICAgIHNwYWNlQmV0d2Vlbjogc2V0dGluZ3Muc3BhY2VCZXR3ZWVuWydkZXNrdG9wJ10sXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3dpcGVyT3B0aW9ucztcbiAgICB9XG5cbiAgICBzZXR1cEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICBpZiAodGhpcy5nZXRTZXR0aW5ncyhcInBhdXNlT25Ib3ZlclwiKSkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5jYXJvdXNlbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCB0aGlzLnBhdXNlU3dpcGVyLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5jYXJvdXNlbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCB0aGlzLnJlc3VtZVN3aXBlci5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBhdXNlU3dpcGVyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZ2V0U2V0dGluZ3MoXCJzd2lwZXJJbnN0YW5jZVwiKS5hdXRvcGxheS5zdG9wKCk7XG4gICAgfVxuXG4gICAgcmVzdW1lU3dpcGVyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZ2V0U2V0dGluZ3MoXCJzd2lwZXJJbnN0YW5jZVwiKS5hdXRvcGxheS5zdGFydCgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgT0VXX0Nhcm91c2VsO1xuIiwiaW1wb3J0IHsgcmVnaXN0ZXJXaWRnZXQgfSBmcm9tIFwiLi4vbGliL3V0aWxzXCI7XG5pbXBvcnQgT0VXX0Nhcm91c2VsIGZyb20gXCIuL2Jhc2UvY2Fyb3VzZWxcIjtcblxuY2xhc3MgT0VXX1Rlc3RpbW9uaWFsQ2Fyb3VzZWwgZXh0ZW5kcyBPRVdfQ2Fyb3VzZWwge31cblxucmVnaXN0ZXJXaWRnZXQoT0VXX1Rlc3RpbW9uaWFsQ2Fyb3VzZWwsIFwib2V3LXRlc3RpbW9uaWFsLWNhcm91c2VsXCIpO1xuIl19
