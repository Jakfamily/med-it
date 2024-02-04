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

var OEW_MemberCarousel = /*#__PURE__*/function (_OEW_Carousel) {
  _inherits(OEW_MemberCarousel, _OEW_Carousel);

  var _super = _createSuper(OEW_MemberCarousel);

  function OEW_MemberCarousel() {
    _classCallCheck(this, OEW_MemberCarousel);

    return _super.apply(this, arguments);
  }

  return OEW_MemberCarousel;
}(_carousel["default"]);

(0, _utils.registerWidget)(OEW_MemberCarousel, "oew-member-carousel");

},{"../lib/utils":1,"./base/carousel":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvc3JjL2pzL2xpYi91dGlscy5qcyIsImFzc2V0cy9zcmMvanMvd2lkZ2V0cy9iYXNlL2Nhcm91c2VsLmpzIiwiYXNzZXRzL3NyYy9qcy93aWRnZXRzL21lbWJlci1jYXJvdXNlbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQ0FPLElBQU0sU0FBUyxHQUFHLFNBQVosU0FBWSxDQUFDLE9BQUQsRUFBNkI7QUFBQSxNQUFuQixRQUFtQix1RUFBUixHQUFRO0FBQ2xELE1BQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxPQUEvQzs7QUFFQSxNQUFJLE9BQU8sS0FBSyxNQUFoQixFQUF3QjtBQUNwQixJQUFBLE9BQU8sR0FBRyxPQUFWO0FBQ0g7O0FBRUQsRUFBQSxPQUFPLENBQUMsS0FBUixDQUFjLGtCQUFkLEdBQW1DLFFBQW5DO0FBQ0EsRUFBQSxPQUFPLENBQUMsS0FBUixDQUFjLGtCQUFkLGFBQXNDLFFBQXRDO0FBRUEsRUFBQSxPQUFPLENBQUMsS0FBUixDQUFjLE9BQWQsR0FBd0IsQ0FBeEI7QUFDQSxFQUFBLE9BQU8sQ0FBQyxLQUFSLENBQWMsT0FBZCxHQUF3QixPQUF4QjtBQUNBLE1BQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxZQUFyQjtBQUVBLEVBQUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxNQUFkLEdBQXVCLENBQXZCO0FBQ0EsRUFBQSxPQUFPLENBQUMsS0FBUixDQUFjLE9BQWQsR0FBd0IsQ0FBeEI7QUFDQSxFQUFBLE9BQU8sQ0FBQyxLQUFSLENBQWMsUUFBZCxHQUF5QixRQUF6QjtBQUVBLEVBQUEsVUFBVSxDQUFDLFlBQU07QUFDYixJQUFBLE9BQU8sQ0FBQyxLQUFSLENBQWMsTUFBZCxhQUEwQixNQUExQjtBQUNILEdBRlMsRUFFUCxDQUZPLENBQVY7QUFJQSxFQUFBLE1BQU0sQ0FBQyxV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QUFFRCxRQUFBLGFBQWEsQ0FBQyxXQUFkLENBQTBCLFlBQTFCLElBQTBDO0FBQ3hDLFVBQUEsYUFBYSxFQUFFLFFBQVEsQ0FBQyxhQUFULENBQXVCLFNBQXZCLENBRHlCO0FBRXhDLFVBQUEsY0FBYyxFQUFFLFFBQVEsQ0FBQyxjQUFULENBQXdCLFNBQXhCLENBRndCO0FBR3hDLFVBQUEsWUFBWSxFQUFFLFFBQVEsQ0FBQyxZQUFULENBQXNCLFNBQXRCO0FBSDBCLFNBQTFDO0FBTUg7O0FBRUQsYUFBTyxhQUFQO0FBQ0g7OztXQUVELCtCQUFzQjtBQUNsQixVQUFJLEtBQUssV0FBTCxDQUFpQixjQUFqQixDQUFKLEVBQXNDO0FBQ2xDLGFBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsZ0JBQXZCLENBQXdDLFlBQXhDLEVBQXNELEtBQUssV0FBTCxDQUFpQixJQUFqQixDQUFzQixJQUF0QixDQUF0RDtBQUNBLGFBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsZ0JBQXZCLENBQXdDLFlBQXhDLEVBQXNELEtBQUssWUFBTCxDQUFrQixJQUFsQixDQUF1QixJQUF2QixDQUF0RDtBQUNIO0FBQ0o7OztXQUVELHFCQUFZLEtBQVosRUFBbUI7QUFDZixXQUFLLFdBQUwsQ0FBaUIsZ0JBQWpCLEVBQW1DLFFBQW5DLENBQTRDLElBQTVDO0FBQ0g7OztXQUVELHNCQUFhLEtBQWIsRUFBb0I7QUFDaEIsV0FBSyxXQUFMLENBQWlCLGdCQUFqQixFQUFtQyxRQUFuQyxDQUE0QyxLQUE1QztBQUNIOzs7O0VBM1FzQixnQkFBZ0IsQ0FBQyxRQUFqQixDQUEwQixRQUExQixDQUFtQyxJOztlQThRL0MsWTs7Ozs7Ozs7QUM5UWY7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRU0sa0I7Ozs7Ozs7Ozs7OztFQUEyQixvQjs7QUFFakMsMkJBQWUsa0JBQWYsRUFBbUMscUJBQW5DIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiZXhwb3J0IGNvbnN0IHNsaWRlRG93biA9IChlbGVtZW50LCBkdXJhdGlvbiA9IDMwMCkgPT4ge1xuICAgIGxldCBkaXNwbGF5ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkuZGlzcGxheTtcblxuICAgIGlmIChkaXNwbGF5ID09PSBcIm5vbmVcIikge1xuICAgICAgICBkaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cblxuICAgIGVsZW1lbnQuc3R5bGUudHJhbnNpdGlvblByb3BlcnR5ID0gXCJoZWlnaHRcIjtcbiAgICBlbGVtZW50LnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IGAke2R1cmF0aW9ufW1zYDtcblxuICAgIGVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheTtcbiAgICBsZXQgaGVpZ2h0ID0gZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG5cbiAgICBlbGVtZW50LnN0eWxlLmhlaWdodCA9IDA7XG4gICAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICBlbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBlbGVtZW50LnN0eWxlLmhlaWdodCA9IGAke2hlaWdodH1weGA7XG4gICAgfSwgNSk7XG5cbiAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJoZWlnaHRcIik7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJvdmVyZmxvd1wiKTtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcInRyYW5zaXRpb24tZHVyYXRpb25cIik7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJ0cmFuc2l0aW9uLXByb3BlcnR5XCIpO1xuICAgICAgICBlbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KFwib3BhY2l0eVwiKTtcbiAgICB9LCBkdXJhdGlvbiArIDUwKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzbGlkZVVwID0gKGVsZW1lbnQsIGR1cmF0aW9uID0gMzAwKSA9PiB7XG4gICAgZWxlbWVudC5zdHlsZS5ib3hTaXppbmcgPSBcImJvcmRlci1ib3hcIjtcbiAgICBlbGVtZW50LnN0eWxlLnRyYW5zaXRpb25Qcm9wZXJ0eSA9IFwiaGVpZ2h0LCBtYXJnaW5cIjtcbiAgICBlbGVtZW50LnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IGAke2R1cmF0aW9ufW1zYDtcbiAgICBlbGVtZW50LnN0eWxlLmhlaWdodCA9IGAke2VsZW1lbnQub2Zmc2V0SGVpZ2h0fXB4YDtcbiAgICBlbGVtZW50LnN0eWxlLm1hcmdpblRvcCA9IDA7XG4gICAgZWxlbWVudC5zdHlsZS5tYXJnaW5Cb3R0b20gPSAwO1xuICAgIGVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gMDtcbiAgICB9LCA1KTtcblxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJoZWlnaHRcIik7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJtYXJnaW4tdG9wXCIpO1xuICAgICAgICBlbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KFwibWFyZ2luLWJvdHRvbVwiKTtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcIm92ZXJmbG93XCIpO1xuICAgICAgICBlbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KFwidHJhbnNpdGlvbi1kdXJhdGlvblwiKTtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcInRyYW5zaXRpb24tcHJvcGVydHlcIik7XG4gICAgfSwgZHVyYXRpb24gKyA1MCk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2xpZGVUb2dnbGUgPSAoZWxlbWVudCwgZHVyYXRpb24pID0+IHtcbiAgICB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5kaXNwbGF5ID09PSBcIm5vbmVcIiA/IHNsaWRlRG93bihlbGVtZW50LCBkdXJhdGlvbikgOiBzbGlkZVVwKGVsZW1lbnQsIGR1cmF0aW9uKTtcbn07XG5cbmV4cG9ydCBjb25zdCBmYWRlSW4gPSAoZWxlbWVudCwgX29wdGlvbnMgPSB7fSkgPT4ge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIGR1cmF0aW9uOiAzMDAsXG4gICAgICAgIGRpc3BsYXk6IG51bGwsXG4gICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgIGNhbGxiYWNrOiBudWxsLFxuICAgIH07XG5cbiAgICBPYmplY3QuYXNzaWduKG9wdGlvbnMsIF9vcHRpb25zKTtcblxuICAgIGVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gb3B0aW9ucy5kaXNwbGF5IHx8IFwiYmxvY2tcIjtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBlbGVtZW50LnN0eWxlLnRyYW5zaXRpb24gPSBgJHtvcHRpb25zLmR1cmF0aW9ufW1zIG9wYWNpdHkgZWFzZWA7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IG9wdGlvbnMub3BhY2l0eTtcbiAgICB9LCA1KTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBlbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KFwidHJhbnNpdGlvblwiKTtcbiAgICAgICAgISFvcHRpb25zLmNhbGxiYWNrICYmIG9wdGlvbnMuY2FsbGJhY2soKTtcbiAgICB9LCBvcHRpb25zLmR1cmF0aW9uICsgNTApO1xufTtcblxuZXhwb3J0IGNvbnN0IGZhZGVPdXQgPSAoZWxlbWVudCwgX29wdGlvbnMgPSB7fSkgPT4ge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIGR1cmF0aW9uOiAzMDAsXG4gICAgICAgIGRpc3BsYXk6IG51bGwsXG4gICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgIGNhbGxiYWNrOiBudWxsLFxuICAgIH07XG5cbiAgICBPYmplY3QuYXNzaWduKG9wdGlvbnMsIF9vcHRpb25zKTtcblxuICAgIGVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gb3B0aW9ucy5kaXNwbGF5IHx8IFwiYmxvY2tcIjtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBlbGVtZW50LnN0eWxlLnRyYW5zaXRpb24gPSBgJHtvcHRpb25zLmR1cmF0aW9ufW1zIG9wYWNpdHkgZWFzZWA7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IG9wdGlvbnMub3BhY2l0eTtcbiAgICB9LCA1KTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcInRyYW5zaXRpb25cIik7XG4gICAgICAgICEhb3B0aW9ucy5jYWxsYmFjayAmJiBvcHRpb25zLmNhbGxiYWNrKCk7XG4gICAgfSwgb3B0aW9ucy5kdXJhdGlvbiArIDUwKTtcbn07XG5cbmV4cG9ydCBjb25zdCBmYWRlVG9nZ2xlID0gKGVsZW1lbnQsIG9wdGlvbnMpID0+IHtcbiAgICB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5kaXNwbGF5ID09PSBcIm5vbmVcIiA/IGZhZGVJbihlbGVtZW50LCBvcHRpb25zKSA6IGZhZGVPdXQoZWxlbWVudCwgb3B0aW9ucyk7XG59O1xuXG5leHBvcnQgY29uc3Qgb2Zmc2V0ID0gKGVsZW1lbnQpID0+IHtcbiAgICBpZiAoIWVsZW1lbnQuZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHsgdG9wOiAwLCBsZWZ0OiAwIH07XG4gICAgfVxuXG4gICAgLy8gR2V0IGRvY3VtZW50LXJlbGF0aXZlIHBvc2l0aW9uIGJ5IGFkZGluZyB2aWV3cG9ydCBzY3JvbGwgdG8gdmlld3BvcnQtcmVsYXRpdmUgZ0JDUlxuICAgIGNvbnN0IHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHdpbiA9IGVsZW1lbnQub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldztcbiAgICByZXR1cm4ge1xuICAgICAgICB0b3A6IHJlY3QudG9wICsgd2luLnBhZ2VZT2Zmc2V0LFxuICAgICAgICBsZWZ0OiByZWN0LmxlZnQgKyB3aW4ucGFnZVhPZmZzZXQsXG4gICAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCB2aXNpYmxlID0gKGVsZW1lbnQpID0+IHtcbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiAhIShlbGVtZW50Lm9mZnNldFdpZHRoIHx8IGVsZW1lbnQub2Zmc2V0SGVpZ2h0IHx8IGVsZW1lbnQuZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGgpO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldFNpYmxpbmdzID0gKGUpID0+IHtcbiAgICAvLyBmb3IgY29sbGVjdGluZyBzaWJsaW5nc1xuICAgIGNvbnN0IHNpYmxpbmdzID0gW107XG5cbiAgICAvLyBpZiBubyBwYXJlbnQsIHJldHVybiBubyBzaWJsaW5nXG4gICAgaWYgKCFlLnBhcmVudE5vZGUpIHtcbiAgICAgICAgcmV0dXJuIHNpYmxpbmdzO1xuICAgIH1cblxuICAgIC8vIGZpcnN0IGNoaWxkIG9mIHRoZSBwYXJlbnQgbm9kZVxuICAgIGxldCBzaWJsaW5nID0gZS5wYXJlbnROb2RlLmZpcnN0Q2hpbGQ7XG5cbiAgICAvLyBjb2xsZWN0aW5nIHNpYmxpbmdzXG4gICAgd2hpbGUgKHNpYmxpbmcpIHtcbiAgICAgICAgaWYgKHNpYmxpbmcubm9kZVR5cGUgPT09IDEgJiYgc2libGluZyAhPT0gZSkge1xuICAgICAgICAgICAgc2libGluZ3MucHVzaChzaWJsaW5nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNpYmxpbmcgPSBzaWJsaW5nLm5leHRTaWJsaW5nO1xuICAgIH1cblxuICAgIHJldHVybiBzaWJsaW5ncztcbn07XG5cbi8vIFJldHVybnMgdHJ1ZSBpZiBpdCBpcyBhIERPTSBlbGVtZW50XG5leHBvcnQgY29uc3QgaXNFbGVtZW50ID0gKG8pID0+IHtcbiAgICByZXR1cm4gdHlwZW9mIEhUTUxFbGVtZW50ID09PSBcIm9iamVjdFwiXG4gICAgICAgID8gbyBpbnN0YW5jZW9mIEhUTUxFbGVtZW50IC8vIERPTTJcbiAgICAgICAgOiBvICYmIHR5cGVvZiBvID09PSBcIm9iamVjdFwiICYmIG8gIT09IG51bGwgJiYgby5ub2RlVHlwZSA9PT0gMSAmJiB0eXBlb2Ygby5ub2RlTmFtZSA9PT0gXCJzdHJpbmdcIjtcbn07XG5cbmV4cG9ydCBjb25zdCByZWdpc3RlcldpZGdldCA9IChjbGFzc05hbWUsIHdpZGdldE5hbWUsIHNraW4gPSBcImRlZmF1bHRcIikgPT4ge1xuICAgIGlmICghKGNsYXNzTmFtZSB8fCB3aWRnZXROYW1lKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQmVjYXVzZSBFbGVtZW50b3IgcGx1Z2luIHVzZXMgalF1ZXJ5IGN1c3RvbSBldmVudCxcbiAgICAgKiBXZSBhbHNvIGhhdmUgdG8gdXNlIGpRdWVyeSB0byB1c2UgdGhpcyBldmVudFxuICAgICAqL1xuICAgIGpRdWVyeSh3aW5kb3cpLm9uKFwiZWxlbWVudG9yL2Zyb250ZW5kL2luaXRcIiwgKCkgPT4ge1xuICAgICAgICBjb25zdCBhZGRIYW5kbGVyID0gKCRlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50b3JGcm9udGVuZC5lbGVtZW50c0hhbmRsZXIuYWRkSGFuZGxlcihjbGFzc05hbWUsIHtcbiAgICAgICAgICAgICAgICAkZWxlbWVudCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIGVsZW1lbnRvckZyb250ZW5kLmhvb2tzLmFkZEFjdGlvbihgZnJvbnRlbmQvZWxlbWVudF9yZWFkeS8ke3dpZGdldE5hbWV9LiR7c2tpbn1gLCBhZGRIYW5kbGVyKTtcbiAgICB9KTtcbn07XG4iLCJjbGFzcyBPRVdfQ2Fyb3VzZWwgZXh0ZW5kcyBlbGVtZW50b3JNb2R1bGVzLmZyb250ZW5kLmhhbmRsZXJzLkJhc2Uge1xuICAgIGdldERlZmF1bHRTZXR0aW5ncygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNlbGVjdG9yczoge1xuICAgICAgICAgICAgICAgIGNhcm91c2VsOiBcIi5vZXctY2Fyb3VzZWwtY29udGFpbmVyXCIsXG4gICAgICAgICAgICAgICAgY2Fyb3VzZWxOZXh0QnRuOiBgLnN3aXBlci1idXR0b24tbmV4dC0ke3RoaXMuZ2V0SUQoKX1gLFxuICAgICAgICAgICAgICAgIGNhcm91c2VsUHJldkJ0bjogYC5zd2lwZXItYnV0dG9uLXByZXYtJHt0aGlzLmdldElEKCl9YCxcbiAgICAgICAgICAgICAgICBjYXJvdXNlbFBhZ2luYXRpb246IGAuc3dpcGVyLXBhZ2luYXRpb24tJHt0aGlzLmdldElEKCl9YCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlZmZlY3Q6IFwic2xpZGVcIixcbiAgICAgICAgICAgIGxvb3A6IGZhbHNlLFxuICAgICAgICAgICAgYXV0b3BsYXk6IDAsXG4gICAgICAgICAgICBzcGVlZDogNDAwLFxuICAgICAgICAgICAgbmF2aWdhdGlvbjogZmFsc2UsXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiBmYWxzZSxcbiAgICAgICAgICAgIGNlbnRlcmVkU2xpZGVzOiBmYWxzZSxcbiAgICAgICAgICAgIHBhdXNlT25Ib3ZlcjogZmFsc2UsXG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiB7XG4gICAgICAgICAgICAgICAgd2lkZXNjcmVlbjogMyxcbiAgICAgICAgICAgICAgICBkZXNrdG9wOiAzLFxuICAgICAgICAgICAgICAgIGxhcHRvcDogMyxcbiAgICAgICAgICAgICAgICB0YWJsZXQ6IDIsXG4gICAgICAgICAgICAgICAgdGFibGV0X2V4dHJhOiAyLFxuICAgICAgICAgICAgICAgIG1vYmlsZTogMSxcbiAgICAgICAgICAgICAgICBtb2JpbGVfZXh0cmE6IDEsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2xpZGVzUGVyR3JvdXA6IHtcbiAgICAgICAgICAgICAgICB3aWRlc2NyZWVuOiAzLFxuICAgICAgICAgICAgICAgIGRlc2t0b3A6IDMsXG4gICAgICAgICAgICAgICAgbGFwdG9wOiAzLFxuICAgICAgICAgICAgICAgIHRhYmxldDogMixcbiAgICAgICAgICAgICAgICB0YWJsZXRfZXh0cmE6IDIsXG4gICAgICAgICAgICAgICAgbW9iaWxlOiAxLFxuICAgICAgICAgICAgICAgIG1vYmlsZV9leHRyYTogMSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IHtcbiAgICAgICAgICAgICAgICB3aWRlc2NyZWVuOiAxMCxcbiAgICAgICAgICAgICAgICBkZXNrdG9wOiAxMCxcbiAgICAgICAgICAgICAgICBsYXB0b3A6IDEwLFxuICAgICAgICAgICAgICAgIHRhYmxldDogMTAsXG4gICAgICAgICAgICAgICAgdGFibGV0X2V4dHJhOiAxMCxcbiAgICAgICAgICAgICAgICBtb2JpbGU6IDEwLFxuICAgICAgICAgICAgICAgIG1vYmlsZV9leHRyYTogMTAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3dpcGVySW5zdGFuY2U6IG51bGwsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0RGVmYXVsdEVsZW1lbnRzKCkge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy4kZWxlbWVudC5nZXQoMCk7XG4gICAgICAgIGNvbnN0IHNlbGVjdG9ycyA9IHRoaXMuZ2V0U2V0dGluZ3MoXCJzZWxlY3RvcnNcIik7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNhcm91c2VsOiBlbGVtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLmNhcm91c2VsKSxcbiAgICAgICAgICAgIGNhcm91c2VsTmV4dEJ0bjogZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9ycy5jYXJvdXNlbE5leHRCdG4pLFxuICAgICAgICAgICAgY2Fyb3VzZWxQcmV2QnRuOiBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3JzLmNhcm91c2VsUHJldkJ0biksXG4gICAgICAgICAgICBjYXJvdXNlbFBhZ2luYXRpb246IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcnMuY2Fyb3VzZWxQYWdpbmF0aW9uKSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBvbkluaXQoLi4uYXJncykge1xuICAgICAgICBzdXBlci5vbkluaXQoLi4uYXJncyk7XG5cbiAgICAgICAgdGhpcy5zZXRVc2VyU2V0dGluZ3MoKTtcbiAgICAgICAgdGhpcy5pbml0U3dpcGVyKCk7XG4gICAgICAgIHRoaXMuc2V0dXBFdmVudExpc3RlbmVycygpO1xuICAgICAgICB0aGlzLnVwZGF0ZUNhcm91c2VsU3R5bGVzKHRoaXMuZ2V0U2V0dGluZ3MoKSk7XG4gICAgfVxuXG4gICAgc2V0VXNlclNldHRpbmdzKCkge1xuICAgICAgICBjb25zdCBzZXR0aW5ncyA9IHRoaXMuZ2V0U2V0dGluZ3MoKTtcbiAgICAgICAgY29uc3QgdXNlclNldHRpbmdzID0gSlNPTi5wYXJzZSh0aGlzLmVsZW1lbnRzLmNhcm91c2VsLmdldEF0dHJpYnV0ZShcImRhdGEtc2V0dGluZ3NcIikpO1xuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRTZXR0aW5ncyA9IHtcbiAgICAgICAgICAgIGVmZmVjdDogISF1c2VyU2V0dGluZ3MuZWZmZWN0ID8gdXNlclNldHRpbmdzLmVmZmVjdCA6IHNldHRpbmdzLmVmZmVjdCxcbiAgICAgICAgICAgIGxvb3A6ICEhdXNlclNldHRpbmdzLmxvb3AgPyBCb29sZWFuKE51bWJlcih1c2VyU2V0dGluZ3MubG9vcCkpIDogc2V0dGluZ3MubG9vcCxcbiAgICAgICAgICAgIGF1dG9wbGF5OiAhIXVzZXJTZXR0aW5ncy5hdXRvcGxheSA/IE51bWJlcih1c2VyU2V0dGluZ3MuYXV0b3BsYXkpIDogc2V0dGluZ3MuYXV0b3BsYXksXG4gICAgICAgICAgICBzcGVlZDogISF1c2VyU2V0dGluZ3Muc3BlZWQgPyBOdW1iZXIodXNlclNldHRpbmdzLnNwZWVkKSA6IHNldHRpbmdzLnNwZWVkLFxuICAgICAgICAgICAgbmF2aWdhdGlvbjogISF1c2VyU2V0dGluZ3MuYXJyb3dzID8gQm9vbGVhbihOdW1iZXIodXNlclNldHRpbmdzLmFycm93cykpIDogc2V0dGluZ3MubmF2aWdhdGlvbixcbiAgICAgICAgICAgIHBhZ2luYXRpb246ICEhdXNlclNldHRpbmdzLmRvdHMgPyBCb29sZWFuKE51bWJlcih1c2VyU2V0dGluZ3MuZG90cykpIDogc2V0dGluZ3MucGFnaW5hdGlvbixcbiAgICAgICAgICAgIHBhdXNlT25Ib3ZlcjogISF1c2VyU2V0dGluZ3NbXCJwYXVzZS1vbi1ob3ZlclwiXVxuICAgICAgICAgICAgICAgID8gSlNPTi5wYXJzZSh1c2VyU2V0dGluZ3NbXCJwYXVzZS1vbi1ob3ZlclwiXSlcbiAgICAgICAgICAgICAgICA6IHNldHRpbmdzLnBhdXNlT25Ib3ZlcixcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IHtcbiAgICAgICAgICAgICAgICB3aWRlc2NyZWVuOiB1c2VyU2V0dGluZ3NbJ2l0ZW1zLXdpZGVzY3JlZW4nXSAhPT0gdW5kZWZpbmVkID8gTnVtYmVyKHVzZXJTZXR0aW5nc1snaXRlbXMtd2lkZXNjcmVlbiddKSA6IHNldHRpbmdzLnNsaWRlc1BlclZpZXdbJ3dpZGVzY3JlZW4nXSxcbiAgICAgICAgICAgICAgICBkZXNrdG9wOiB1c2VyU2V0dGluZ3NbJ2l0ZW1zJ10gIT09IHVuZGVmaW5lZCA/IE51bWJlcih1c2VyU2V0dGluZ3NbJ2l0ZW1zJ10pIDogc2V0dGluZ3Muc2xpZGVzUGVyVmlld1snZGVza3RvcCddLFxuICAgICAgICAgICAgICAgIGxhcHRvcDogdXNlclNldHRpbmdzWydpdGVtcy1sYXB0b3AnXSAhPT0gdW5kZWZpbmVkID8gTnVtYmVyKHVzZXJTZXR0aW5nc1snaXRlbXMtbGFwdG9wJ10pIDogc2V0dGluZ3Muc2xpZGVzUGVyVmlld1snbGFwdG9wJ10sXG4gICAgICAgICAgICAgICAgdGFibGV0OiB1c2VyU2V0dGluZ3NbJ2l0ZW1zLXRhYmxldCddICE9PSB1bmRlZmluZWQgPyBOdW1iZXIodXNlclNldHRpbmdzWydpdGVtcy10YWJsZXQnXSkgOiBzZXR0aW5ncy5zbGlkZXNQZXJWaWV3Wyd0YWJsZXQnXSxcbiAgICAgICAgICAgICAgICB0YWJsZXRfZXh0cmE6IHVzZXJTZXR0aW5nc1snaXRlbXMtdGFibGV0X2V4dHJhJ10gIT09IHVuZGVmaW5lZCA/IE51bWJlcih1c2VyU2V0dGluZ3NbJ2l0ZW1zLXRhYmxldF9leHRyYSddKSA6IHNldHRpbmdzLnNsaWRlc1BlclZpZXdbJ3RhYmxldF9leHRyYSddLFxuICAgICAgICAgICAgICAgIG1vYmlsZTogdXNlclNldHRpbmdzWydpdGVtcy1tb2JpbGUnXSAhPT0gdW5kZWZpbmVkID8gTnVtYmVyKHVzZXJTZXR0aW5nc1snaXRlbXMtbW9iaWxlJ10pIDogc2V0dGluZ3Muc2xpZGVzUGVyVmlld1snbW9iaWxlJ10sXG4gICAgICAgICAgICAgICAgbW9iaWxlX2V4dHJhOiB1c2VyU2V0dGluZ3NbJ2l0ZW1zLW1vYmlsZV9leHRyYSddICE9PSB1bmRlZmluZWQgPyBOdW1iZXIodXNlclNldHRpbmdzWydpdGVtcy1tb2JpbGVfZXh0cmEnXSkgOiBzZXR0aW5ncy5zbGlkZXNQZXJWaWV3Wydtb2JpbGVfZXh0cmEnXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNsaWRlc1Blckdyb3VwOiB7XG4gICAgICAgICAgICAgICAgd2lkZXNjcmVlbjogISF1c2VyU2V0dGluZ3NbJ3NsaWRlcy13aWRlc2NyZWVuJ10gPyBOdW1iZXIodXNlclNldHRpbmdzWydzbGlkZXMtd2lkZXNjcmVlbiddKSA6IHNldHRpbmdzLnNsaWRlc1Blckdyb3VwLndpZGVzY3JlZW4sXG4gICAgICAgICAgICAgICAgZGVza3RvcDogISF1c2VyU2V0dGluZ3NbJ3NsaWRlcyddID8gTnVtYmVyKHVzZXJTZXR0aW5nc1snc2xpZGVzJ10pIDogc2V0dGluZ3Muc2xpZGVzUGVyR3JvdXAuZGVza3RvcCxcbiAgICAgICAgICAgICAgICBsYXB0b3A6ICEhdXNlclNldHRpbmdzWydzbGlkZXMtbGFwdG9wJ10gPyBOdW1iZXIodXNlclNldHRpbmdzWydzbGlkZXMtbGFwdG9wJ10pIDogc2V0dGluZ3Muc2xpZGVzUGVyR3JvdXAubGFwdG9wLFxuICAgICAgICAgICAgICAgIHRhYmxldDogISF1c2VyU2V0dGluZ3NbXCJzbGlkZXMtdGFibGV0XCJdXG4gICAgICAgICAgICAgICAgICAgID8gTnVtYmVyKHVzZXJTZXR0aW5nc1tcInNsaWRlcy10YWJsZXRcIl0pXG4gICAgICAgICAgICAgICAgICAgIDogc2V0dGluZ3Muc2xpZGVzUGVyR3JvdXAudGFibGV0LFxuICAgICAgICAgICAgICAgIHRhYmxldF9leHRyYTogISF1c2VyU2V0dGluZ3NbXCJzbGlkZXMtdGFibGV0X2V4dHJhXCJdXG4gICAgICAgICAgICAgICAgICAgID8gTnVtYmVyKHVzZXJTZXR0aW5nc1tcInNsaWRlcy10YWJsZXRfZXh0cmFcIl0pXG4gICAgICAgICAgICAgICAgICAgIDogc2V0dGluZ3Muc2xpZGVzUGVyR3JvdXAudGFibGV0X2V4dHJhLFxuICAgICAgICAgICAgICAgIG1vYmlsZTogISF1c2VyU2V0dGluZ3NbXCJzbGlkZXMtbW9iaWxlXCJdXG4gICAgICAgICAgICAgICAgICAgID8gTnVtYmVyKHVzZXJTZXR0aW5nc1tcInNsaWRlcy1tb2JpbGVcIl0pXG4gICAgICAgICAgICAgICAgICAgIDogc2V0dGluZ3Muc2xpZGVzUGVyR3JvdXAubW9iaWxlLFxuICAgICAgICAgICAgICAgIG1vYmlsZV9leHRyYTogISF1c2VyU2V0dGluZ3NbXCJzbGlkZXMtbW9iaWxlX2V4dHJhXCJdXG4gICAgICAgICAgICAgICAgICAgID8gTnVtYmVyKHVzZXJTZXR0aW5nc1tcInNsaWRlcy1tb2JpbGVfZXh0cmFcIl0pXG4gICAgICAgICAgICAgICAgICAgIDogc2V0dGluZ3Muc2xpZGVzUGVyR3JvdXAubW9iaWxlX2V4dHJhLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNwYWNlQmV0d2Vlbjoge1xuICAgICAgICAgICAgICAgIHdpZGVzY3JlZW46IHVzZXJTZXR0aW5nc1snbWFyZ2luLXdpZGVzY3JlZW4nXSAhPT0gdW5kZWZpbmVkID8gTnVtYmVyKHVzZXJTZXR0aW5nc1snbWFyZ2luLXdpZGVzY3JlZW4nXSkgOiBzZXR0aW5ncy5zcGFjZUJldHdlZW4ud2lkZXNjcmVlbixcbiAgICAgICAgICAgICAgICBkZXNrdG9wOiB1c2VyU2V0dGluZ3NbJ21hcmdpbiddICE9PSB1bmRlZmluZWQgPyBOdW1iZXIodXNlclNldHRpbmdzWydtYXJnaW4nXSkgOiBzZXR0aW5ncy5zcGFjZUJldHdlZW4uZGVza3RvcCxcbiAgICAgICAgICAgICAgICBsYXB0b3A6IHVzZXJTZXR0aW5nc1snbWFyZ2luLWxhcHRvcCddICE9PSB1bmRlZmluZWQgPyBOdW1iZXIodXNlclNldHRpbmdzWydtYXJnaW4tbGFwdG9wJ10pIDogc2V0dGluZ3Muc3BhY2VCZXR3ZWVuLmxhcHRvcCxcbiAgICAgICAgICAgICAgICB0YWJsZXQ6IHVzZXJTZXR0aW5nc1tcIm1hcmdpbi10YWJsZXRcIl0gIT09IHVuZGVmaW5lZCA/IE51bWJlcih1c2VyU2V0dGluZ3NbXCJtYXJnaW4tdGFibGV0XCJdKSA6IHNldHRpbmdzLnNwYWNlQmV0d2Vlbi50YWJsZXQsXG4gICAgICAgICAgICAgICAgdGFibGV0X2V4dHJhOiB1c2VyU2V0dGluZ3NbXCJtYXJnaW4tdGFibGV0X2V4dHJhXCJdICE9PSB1bmRlZmluZWQgPyBOdW1iZXIodXNlclNldHRpbmdzW1wibWFyZ2luLXRhYmxldF9leHRyYVwiXSkgOiBzZXR0aW5ncy5zcGFjZUJldHdlZW4udGFibGV0X2V4dHJhLFxuICAgICAgICAgICAgICAgIG1vYmlsZTogdXNlclNldHRpbmdzW1wibWFyZ2luLW1vYmlsZVwiXSAhPT0gdW5kZWZpbmVkID8gTnVtYmVyKHVzZXJTZXR0aW5nc1tcIm1hcmdpbi1tb2JpbGVcIl0pIDogc2V0dGluZ3Muc3BhY2VCZXR3ZWVuLm1vYmlsZSxcbiAgICAgICAgICAgICAgICBtb2JpbGVfZXh0cmE6IHVzZXJTZXR0aW5nc1tcIm1hcmdpbi1tb2JpbGVfZXh0cmFcIl0gIT09IHVuZGVmaW5lZCA/IE51bWJlcih1c2VyU2V0dGluZ3NbXCJtYXJnaW4tbW9iaWxlX2V4dHJhXCJdKSA6IHNldHRpbmdzLnNwYWNlQmV0d2Vlbi5tb2JpbGVfZXh0cmEsXG5cbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIGN1cnJlbnRTZXR0aW5ncy5jZW50ZXJlZFNsaWRlcyA9IGN1cnJlbnRTZXR0aW5ncy5lZmZlY3QgPT09IFwiY292ZXJmbG93XCIgPyB0cnVlIDogc2V0dGluZ3MuY2VudGVyZWRTbGlkZXM7XG5cbiAgICAgICAgdGhpcy5zZXRTZXR0aW5ncyhjdXJyZW50U2V0dGluZ3MpO1xuXG4gICAgfVxuXG4gICAgdXBkYXRlQ2Fyb3VzZWxTdHlsZXMoc2V0dGluZ3MpIHtcbiAgICAgIGNvbnN0IHsgc3BhY2VCZXR3ZWVuIH0gPSBzZXR0aW5ncztcblxuICAgICAgLy8gY29uc29sZS5sb2coXCJVcGRhdGluZyBDYXJvdXNlbCBTdHlsZXM6XCIsIHNwYWNlQmV0d2Vlbik7IC8vIEZvciBkZWJ1Z2dpbmdcblxuICAgICAgaWYgKHNwYWNlQmV0d2Vlbi5kZXNrdG9wID09PSAwKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coXCJTZXR0aW5nIG1hcmdpbi1yaWdodCBmb3IgRGVza3RvcFwiKTsgLy8gRm9yIGRlYnVnZ2luZ1xuICAgICAgICAgIHRoaXMuZWxlbWVudHMuY2Fyb3VzZWwucXVlcnlTZWxlY3RvckFsbCgnLm9ldy1jYXJvdXNlbC1zbGlkZScpLmZvckVhY2goc2xpZGUgPT4ge1xuICAgICAgICAgICAgICBzbGlkZS5zdHlsZS5tYXJnaW5SaWdodCA9IFwiMHB4XCI7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoc3BhY2VCZXR3ZWVuLnRhYmxldCA9PT0gMCkge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiU2V0dGluZyBtYXJnaW4tcmlnaHQgZm9yIFRhYmxldFwiKTsgLy8gRm9yIGRlYnVnZ2luZ1xuICAgICAgICAgIHRoaXMuZWxlbWVudHMuY2Fyb3VzZWwucXVlcnlTZWxlY3RvckFsbCgnLm9ldy1jYXJvdXNlbC1zbGlkZScpLmZvckVhY2goc2xpZGUgPT4ge1xuICAgICAgICAgICAgICBzbGlkZS5zdHlsZS5tYXJnaW5SaWdodCA9IFwiMHB4XCI7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoc3BhY2VCZXR3ZWVuLm1vYmlsZSA9PT0gMCkge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiU2V0dGluZyBtYXJnaW4tcmlnaHQgZm9yIE1vYmlsZVwiKTsgLy8gRm9yIGRlYnVnZ2luZ1xuICAgICAgICAgIHRoaXMuZWxlbWVudHMuY2Fyb3VzZWwucXVlcnlTZWxlY3RvckFsbCgnLm9ldy1jYXJvdXNlbC1zbGlkZScpLmZvckVhY2goc2xpZGUgPT4ge1xuICAgICAgICAgICAgICBzbGlkZS5zdHlsZS5tYXJnaW5SaWdodCA9IFwiMHB4XCI7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gIH1cblxuXG4gICAgaW5pdFN3aXBlcigpIHtcbiAgICAgICAgY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcih0aGlzLmVsZW1lbnRzLmNhcm91c2VsLCB0aGlzLnN3aXBlck9wdGlvbnMoKSk7XG5cbiAgICAgICAgdGhpcy5zZXRTZXR0aW5ncyh7XG4gICAgICAgICAgICBzd2lwZXJJbnN0YW5jZTogc3dpcGVyLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzd2lwZXJPcHRpb25zKCkge1xuICAgICAgICBjb25zdCBzZXR0aW5ncyA9IHRoaXMuZ2V0U2V0dGluZ3MoKTtcblxuICAgICAgICBjb25zdCBzd2lwZXJPcHRpb25zID0ge1xuICAgICAgICAgICAgZGlyZWN0aW9uOiBcImhvcml6b250YWxcIixcbiAgICAgICAgICAgIGVmZmVjdDogc2V0dGluZ3MuZWZmZWN0LFxuICAgICAgICAgICAgbG9vcDogc2V0dGluZ3MubG9vcCxcbiAgICAgICAgICAgIHNwZWVkOiBzZXR0aW5ncy5zcGVlZCxcbiAgICAgICAgICAgIGNlbnRlcmVkU2xpZGVzOiBzZXR0aW5ncy5jZW50ZXJlZFNsaWRlcyxcbiAgICAgICAgICAgIGF1dG9IZWlnaHQ6IHRydWUsXG4gICAgICAgICAgICBhdXRvcGxheTogIXNldHRpbmdzLmF1dG9wbGF5XG4gICAgICAgICAgICAgICAgPyBmYWxzZVxuICAgICAgICAgICAgICAgIDoge1xuICAgICAgICAgICAgICAgICAgICAgIGRlbGF5OiBzZXR0aW5ncy5hdXRvcGxheSxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiAhc2V0dGluZ3MubmF2aWdhdGlvblxuICAgICAgICAgICAgICAgID8gZmFsc2VcbiAgICAgICAgICAgICAgICA6IHtcbiAgICAgICAgICAgICAgICAgICAgICBuZXh0RWw6IHNldHRpbmdzLnNlbGVjdG9ycy5jYXJvdXNlbE5leHRCdG4sXG4gICAgICAgICAgICAgICAgICAgICAgcHJldkVsOiBzZXR0aW5ncy5zZWxlY3RvcnMuY2Fyb3VzZWxQcmV2QnRuLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBhZ2luYXRpb246ICFzZXR0aW5ncy5wYWdpbmF0aW9uXG4gICAgICAgICAgICAgICAgPyBmYWxzZVxuICAgICAgICAgICAgICAgIDoge1xuICAgICAgICAgICAgICAgICAgICAgIGVsOiBzZXR0aW5ncy5zZWxlY3RvcnMuY2Fyb3VzZWxQYWdpbmF0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gRmV0Y2ggRWxlbWVudG9yJ3MgcmVzcG9uc2l2ZSBicmVha3BvaW50c1xuICAgICAgICB2YXIgYnJlYWtwb2ludHMgPSBlbGVtZW50b3JGcm9udGVuZC5jb25maWcucmVzcG9uc2l2ZS5hY3RpdmVCcmVha3BvaW50cztcbiAgICAgICAgdmFyIGJyZWFrcG9pbnRzQm9vdHN0cmFwID0gZWxlbWVudG9yRnJvbnRlbmQuY29uZmlnLmJyZWFrcG9pbnRzO1xuXG4gICAgICAgIGlmIChzZXR0aW5ncy5lZmZlY3QgPT09IFwiZmFkZVwiKSB7XG4gICAgICAgICAgICBzd2lwZXJPcHRpb25zLml0ZW1zID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzd2lwZXJPcHRpb25zLmJyZWFrcG9pbnRzID0ge307XG4gICAgXG4gICAgICAgICAgICBsZXQgZGV2aWNlc0JyZWFrUG9pbnRzID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBkZXZpY2VOYW1lIGluIGJyZWFrcG9pbnRzKSB7XG4gICAgICAgICAgICAgIGxldCBtYXhfd2lkdGggPSBicmVha3BvaW50c1tkZXZpY2VOYW1lXVsnZGVmYXVsdF92YWx1ZSddO1xuICAgICAgICAgICAgICBpZiggYnJlYWtwb2ludHNbZGV2aWNlTmFtZV1bJ3ZhbHVlJ10gIT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgICAgICAgICBtYXhfd2lkdGggPSBicmVha3BvaW50c1tkZXZpY2VOYW1lXVsndmFsdWUnXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBkZXZpY2VzQnJlYWtQb2ludHMucHVzaCh7XG4gICAgICAgICAgICAgICAgJ2xhYmVsJyA6IGRldmljZU5hbWUsXG4gICAgICAgICAgICAgICAgJ21heF93aWR0aCcgOiBtYXhfd2lkdGhcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZXZpY2VzQnJlYWtQb2ludHMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gYS5tYXhfd2lkdGggLSBiLm1heF93aWR0aFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCB0bXBTbGlkZXNQZXJWaWV3ID0gMDtcbiAgICBcbiAgICAgICAgICAgIGxldCBkZXNrdG9wV2lkdGggPSBicmVha3BvaW50c0Jvb3RzdHJhcC5sZztcbiAgICAgICAgICAgIGZvciAobGV0IGRldmljZXNCcmVha1BvaW50SXRlbSBvZiBkZXZpY2VzQnJlYWtQb2ludHMpIHtcbiAgICBcbiAgICAgICAgICAgICAgbGV0IHJlc3BvbnNpdktleVNldHRpbmcgPSBkZXZpY2VzQnJlYWtQb2ludEl0ZW0ubGFiZWw7XG4gICAgXG4gICAgICAgICAgICAgIGlmKCBzZXR0aW5ncy5zbGlkZXNQZXJWaWV3W3Jlc3BvbnNpdktleVNldHRpbmddICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzd2lwZXJPcHRpb25zLmJyZWFrcG9pbnRzW3RtcFNsaWRlc1BlclZpZXddID0ge1xuICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogc2V0dGluZ3Muc2xpZGVzUGVyVmlld1tyZXNwb25zaXZLZXlTZXR0aW5nXSxcbiAgICAgICAgICAgICAgICAgIHNsaWRlc1Blckdyb3VwOiBzZXR0aW5ncy5zbGlkZXNQZXJHcm91cFtyZXNwb25zaXZLZXlTZXR0aW5nXSxcbiAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2Vlbjogc2V0dGluZ3Muc3BhY2VCZXR3ZWVuW3Jlc3BvbnNpdktleVNldHRpbmddLFxuICAgICAgICAgICAgICAgIH07XG4gICAgXG4gICAgICAgICAgICAgICAgaWYoIHJlc3BvbnNpdktleVNldHRpbmcgPT09ICd3aWRlc2NyZWVuJyApIHtcbiAgICAgICAgICAgICAgICAgIGRlc2t0b3BXaWR0aCA9IHRtcFNsaWRlc1BlclZpZXc7XG4gICAgICAgICAgICAgICAgICB0bXBTbGlkZXNQZXJWaWV3ID0gZGV2aWNlc0JyZWFrUG9pbnRJdGVtWydtYXhfd2lkdGgnXTtcbiAgICAgICAgICAgICAgICAgIHN3aXBlck9wdGlvbnMuYnJlYWtwb2ludHNbdG1wU2xpZGVzUGVyVmlld10gPSB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IHNldHRpbmdzLnNsaWRlc1BlclZpZXdbcmVzcG9uc2l2S2V5U2V0dGluZ10sXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1Blckdyb3VwOiBzZXR0aW5ncy5zbGlkZXNQZXJHcm91cFtyZXNwb25zaXZLZXlTZXR0aW5nXSxcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiBzZXR0aW5ncy5zcGFjZUJldHdlZW5bcmVzcG9uc2l2S2V5U2V0dGluZ10sXG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICB0bXBTbGlkZXNQZXJWaWV3ID0gcGFyc2VJbnQoZGV2aWNlc0JyZWFrUG9pbnRJdGVtWydtYXhfd2lkdGgnXSkgKyAxO1xuICAgICAgICAgICAgICAgICAgZGVza3RvcFdpZHRoID0gdG1wU2xpZGVzUGVyVmlldztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3dpcGVyT3B0aW9ucy5icmVha3BvaW50c1tkZXNrdG9wV2lkdGhdID0ge1xuICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiBzZXR0aW5ncy5zbGlkZXNQZXJWaWV3WydkZXNrdG9wJ10sXG4gICAgICAgICAgICAgIHNsaWRlc1Blckdyb3VwOiBzZXR0aW5ncy5zbGlkZXNQZXJHcm91cFsnZGVza3RvcCddLFxuICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IHNldHRpbmdzLnNwYWNlQmV0d2VlblsnZGVza3RvcCddLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN3aXBlck9wdGlvbnM7XG4gICAgfVxuXG4gICAgc2V0dXBFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0U2V0dGluZ3MoXCJwYXVzZU9uSG92ZXJcIikpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudHMuY2Fyb3VzZWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgdGhpcy5wYXVzZVN3aXBlci5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudHMuY2Fyb3VzZWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgdGhpcy5yZXN1bWVTd2lwZXIuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwYXVzZVN3aXBlcihldmVudCkge1xuICAgICAgICB0aGlzLmdldFNldHRpbmdzKFwic3dpcGVySW5zdGFuY2VcIikuYXV0b3BsYXkuc3RvcCgpO1xuICAgIH1cblxuICAgIHJlc3VtZVN3aXBlcihldmVudCkge1xuICAgICAgICB0aGlzLmdldFNldHRpbmdzKFwic3dpcGVySW5zdGFuY2VcIikuYXV0b3BsYXkuc3RhcnQoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE9FV19DYXJvdXNlbDtcbiIsImltcG9ydCB7IHJlZ2lzdGVyV2lkZ2V0IH0gZnJvbSBcIi4uL2xpYi91dGlsc1wiO1xuaW1wb3J0IE9FV19DYXJvdXNlbCBmcm9tIFwiLi9iYXNlL2Nhcm91c2VsXCI7XG5cbmNsYXNzIE9FV19NZW1iZXJDYXJvdXNlbCBleHRlbmRzIE9FV19DYXJvdXNlbCB7fVxuXG5yZWdpc3RlcldpZGdldChPRVdfTWVtYmVyQ2Fyb3VzZWwsIFwib2V3LW1lbWJlci1jYXJvdXNlbFwiKTtcbiJdfQ==
