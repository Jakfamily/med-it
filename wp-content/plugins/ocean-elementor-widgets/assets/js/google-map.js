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

var OEW_GoogleMap = /*#__PURE__*/function (_elementorModules$fro) {
  _inherits(OEW_GoogleMap, _elementorModules$fro);

  var _super = _createSuper(OEW_GoogleMap);

  function OEW_GoogleMap() {
    var _this;

    _classCallCheck(this, OEW_GoogleMap);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "googleMap", void 0);

    _defineProperty(_assertThisInitialized(_this), "infoWindow", void 0);

    return _this;
  }

  _createClass(OEW_GoogleMap, [{
    key: "getDefaultSettings",
    value: function getDefaultSettings() {
      return {
        selectors: {
          googleMap: ".oew-google-map"
        },
        addresses: [],
        zoom: 4,
        mapType: "roadmap",
        markerAnimation: null,
        streetViewControl: false,
        mapTypeControl: false,
        zoomControl: false,
        fullscreenControl: false,
        scrollToZoom: "none",
        styles: []
      };
    }
  }, {
    key: "getDefaultElements",
    value: function getDefaultElements() {
      var element = this.$element.get(0);
      var selectors = this.getSettings("selectors");
      return {
        googleMap: element.querySelector(selectors.googleMap)
      };
    }
  }, {
    key: "onInit",
    value: function onInit() {
      var _get2;

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      (_get2 = _get(_getPrototypeOf(OEW_GoogleMap.prototype), "onInit", this)).call.apply(_get2, [this].concat(args));

      this.setUserSettings();
      this.initGoogleMap();
    }
  }, {
    key: "initGoogleMap",
    value: function initGoogleMap() {
      var googleMapOptions = this.getGoogleMapOptions();
      this.googleMap = new google.maps.Map(this.elements.googleMap, googleMapOptions);
      this.setAddresses();
    }
  }, {
    key: "getGoogleMapOptions",
    value: function getGoogleMapOptions() {
      var settings = this.getSettings();
      var latitude = settings.addresses[0][0];
      var longitude = settings.addresses[0][1];
      return {
        center: new google.maps.LatLng(latitude, longitude),
        zoom: settings.zoom,
        mapTypeId: settings.mapType,
        streetViewControl: settings.streetViewControl,
        mapTypeControl: settings.mapTypeControl,
        zoomControl: settings.zoomControl,
        fullscreenControl: settings.fullscreenControl,
        gestureHandling: settings.scrollToZoom,
        styles: settings.styles
      };
    }
  }, {
    key: "setAddresses",
    value: function setAddresses() {
      var _this2 = this;

      var settings = this.getSettings();
      settings.addresses.forEach(function (address) {
        var addressLatitude = address[0];
        var addressLongitude = address[1];
        var addressTitle = address[3];

        if (!!addressLatitude && !!addressLongitude) {
          var markerIconType = address[5];
          var markerIconURL = address[6];
          var markerIconSize = address[7]; // Set address marker

          var marker = _this2.createMarker(addressLatitude, addressLongitude, addressTitle, markerIconType, markerIconURL, markerIconSize);

          var enableInfoWindow = address[2];
          var enableInfoWindowOnDocumentLoad = address[8];
          var infoWindowDescription = address[4];

          if (!!enableInfoWindow && addressTitle) {
            var infoWindow = _this2.createInfoWindow(marker, addressTitle, infoWindowDescription);

            if (!!enableInfoWindowOnDocumentLoad) {
              infoWindow.open(_this2.googleMap, marker);
            }

            google.maps.event.addListener(marker, "click", function () {
              infoWindow.open(_this2.googleMap, marker);
            });
            google.maps.event.addListener(_this2.googleMap, "click", function () {
              infoWindow.close();
            });
          }
        }
      });
    }
  }, {
    key: "createMarker",
    value: function createMarker(addressLatitude, addressLongitude, addressTitle, markerIconType, markerIconURL, markerIconSize) {
      var markerAnimation = this.getSettings("markerAnimation");
      var animation = null;

      switch (markerAnimation) {
        case "drop":
          animation = google.maps.Animation.DROP;
          break;

        case "bounce":
          animation = google.maps.Animation.BOUNCE;
          break;
      }

      return new google.maps.Marker({
        position: new google.maps.LatLng(addressLatitude, addressLongitude),
        map: this.googleMap,
        title: addressTitle,
        animation: animation,
        icon: markerIconType === "custom" ? {
          url: markerIconURL,
          scaledSize: new google.maps.Size(markerIconSize, markerIconSize),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(markerIconSize / 2, markerIconSize)
        } : ""
      });
    }
  }, {
    key: "createInfoWindow",
    value: function createInfoWindow(marker, addressTitle, infoWindowDescription) {
      var infoWindowOptinos = {};
      var datasetMaxWidth = this.elements.googleMap.dataset.iwMaxWidth;
      infoWindowOptinos.content = "\n        <div class=\"oew-infowindow-content\">\n            <div class=\"oew-infowindow-title\">".concat(addressTitle, "</div>\n            ").concat(!!infoWindowDescription ? "<div class=\"oew-infowindow-description\">".concat(infoWindowDescription, "</div>") : "", "\n        </div>");

      if (!!datasetMaxWidth) {
        infoWindowOptinos.maxWidth = datasetMaxWidth;
      }

      return new google.maps.InfoWindow(infoWindowOptinos);
    }
  }, {
    key: "setUserSettings",
    value: function setUserSettings() {
      var settings = this.getSettings();
      var datasetSettings = this.elements.googleMap.dataset;
      var elementSettings = this.getElementSettings();
      var addresses = !!datasetSettings.locations ? JSON.parse(datasetSettings.locations) : settings.addresses;
      var zoom = !Number.isNaN(Number(datasetSettings.zoom)) ? Number(datasetSettings.zoom) : settings.zoom;
      var mapType = !!elementSettings.map_type ? elementSettings.map_type : settings.mapType;
      var zoomControl = !!elementSettings.zoom_control ? elementSettings.zoom_control : settings.zoomControl;
      var styles = !!datasetSettings.customStyle ? JSON.parse(datasetSettings.customStyle) : settings.styles;
      var markerAnimation = !!elementSettings.marker_animation ? elementSettings.marker_animation : settings.markerAnimation;
      var streetViewControl = !!elementSettings.map_option_streetview ? elementSettings.map_option_streetview : settings.streetViewControl;
      var mapTypeControl = !!elementSettings.map_type_control ? elementSettings.map_type_control : settings.mapTypeControl;
      var fullscreenControl = !!elementSettings.fullscreen_control ? elementSettings.fullscreen_control : settings.fullscreenControl;
      var scrollToZoom = !!elementSettings.map_scroll_zoom ? elementSettings.map_scroll_zoom : settings.scrollToZoom;
      this.setSettings({
        addresses: addresses,
        zoom: zoom,
        mapType: mapType,
        markerAnimation: markerAnimation,
        streetViewControl: streetViewControl,
        mapTypeControl: mapTypeControl,
        zoomControl: zoomControl,
        fullscreenControl: fullscreenControl,
        scrollToZoom: scrollToZoom,
        styles: styles
      });
    }
  }]);

  return OEW_GoogleMap;
}(elementorModules.frontend.handlers.Base);

(0, _utils.registerWidget)(OEW_GoogleMap, "oew-google-map");

},{"../lib/utils":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvc3JjL2pzL2xpYi91dGlscy5qcyIsImFzc2V0cy9zcmMvanMvd2lkZ2V0cy9nb29nbGUtbWFwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FDQU8sSUFBTSxTQUFTLEdBQUcsU0FBWixTQUFZLENBQUMsT0FBRCxFQUE2QjtBQUFBLE1BQW5CLFFBQW1CLHVFQUFSLEdBQVE7QUFDbEQsTUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLE9BQS9DOztBQUVBLE1BQUksT0FBTyxLQUFLLE1BQWhCLEVBQXdCO0FBQ3BCLElBQUEsT0FBTyxHQUFHLE9BQVY7QUFDSDs7QUFFRCxFQUFBLE9BQU8sQ0FBQyxLQUFSLENBQWMsa0JBQWQsR0FBbUMsUUFBbkM7QUFDQSxFQUFBLE9BQU8sQ0FBQyxLQUFSLENBQWMsa0JBQWQsYUFBc0MsUUFBdEM7QUFFQSxFQUFBLE9BQU8sQ0FBQyxLQUFSLENBQWMsT0FBZCxHQUF3QixDQUF4QjtBQUNBLEVBQUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxPQUFkLEdBQXdCLE9BQXhCO0FBQ0EsTUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFlBQXJCO0FBRUEsRUFBQSxPQUFPLENBQUMsS0FBUixDQUFjLE1BQWQsR0FBdUIsQ0FBdkI7QUFDQSxFQUFBLE9BQU8sQ0FBQyxLQUFSLENBQWMsT0FBZCxHQUF3QixDQUF4QjtBQUNBLEVBQUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxRQUFkLEdBQXlCLFFBQXpCO0FBRUEsRUFBQSxVQUFVLENBQUMsWUFBTTtBQUNiLElBQUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxNQUFkLGFBQTBCLE1BQTFCO0FBQ0gsR0FGUyxFQUVQLENBRk8sQ0FBVjtBQUlBLEVBQUEsTUFBTSxDQUFDLFVBQVAsQ0FBa0IsWUFBTTtBQUNwQixJQUFBLE9BQU8sQ0FBQyxLQUFSLENBQWMsY0FBZCxDQUE2QixRQUE3QjtBQUNBLElBQUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxjQUFkLENBQTZCLFVBQTdCO0FBQ0EsSUFBQSxPQUFPLENBQUMsS0FBUixDQUFjLGNBQWQsQ0FBNkIscUJBQTdCO0FBQ0EsSUFBQSxPQUFPLENBQUMsS0FBUixDQUFjLGNBQWQsQ0FBNkIscUJBQTdCO0FBQ0EsSUFBQSxPQUFPLENBQUMsS0FBUixDQUFjLGNBQWQsQ0FBNkIsU0FBN0I7QUFDSCxHQU5ELEVBTUcsUUFBUSxHQUFHLEVBTmQ7QUFPSCxDQTdCTTs7OztBQStCQSxJQUFNLE9BQU8sR0FBRyxTQUFWLE9BQVUsQ0FBQyxPQUFELEVBQTZCO0FBQUEsTUFBbkIsUUFBbUIsdUVBQVIsR0FBUTtBQUNoRCxFQUFBLE9BQU8sQ0FBQyxLQUFSLENBQWMsU0FBZCxHQUEwQixZQUExQjtBQUNBLEVBQUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxrQkFBZCxHQUFtQyxnQkFBbkM7QUFDQSxFQUFBLE9BQU8sQ0FBQyxLQUFSLENBQWMsa0JBQWQsYUFBc0MsUUFBdEM7QUFDQSxFQUFBLE9BQU8sQ0FBQyxLQUFSLENBQWMsTUFBZCxhQUEwQixPQUFPLENBQUMsWUFBbEM7QUFDQSxFQUFBLE9BQU8sQ0FBQyxLQUFSLENBQWMsU0FBZCxHQUEwQixDQUExQjtBQUNBLEVBQUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxZQUFkLEdBQTZCLENBQTdCO0FBQ0EsRUFBQSxPQUFPLENBQUMsS0FBUixDQUFjLFFBQWQsR0FBeUIsUUFBekI7QUFFQSxFQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2IsSUFBQSxPQUFPLENBQUMsS0FBUixDQUFjLE1BQWQsR0FBdUIsQ0FBdkI7QUFDSCxHQUZTLEVBRVAsQ0FGTyxDQUFWO0FBSUEsRUFBQSxNQUFNLENBQUMsVUFBUCxDQUFrQixZQUFNO0FBQ3BCLElBQUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxPQUFkLEdBQXdCLE1BQXhCO0FBQ0EsSUFBQSxPQUFPLENBQUMsS0FBUixDQUFjLGNBQWQsQ0FBNkIsUUFBN0I7QUFDQSxJQUFBLE9BQU8sQ0FBQyxLQUFSLENBQWMsY0FBZCxDQUE2QixZQUE3QjtBQUNBLElBQUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxjQUFkLENBQTZCLGVBQTdCO0FBQ0EsSUFBQSxPQUFPLENBQUMsS0FBUixDQUFjLGNBQWQsQ0FBNkIsVUFBN0I7QUFDQSxJQUFBLE9BQU8sQ0FBQyxLQUFSLENBQWMsY0FBZCxDQUE2QixxQkFBN0I7QUFDQSxJQUFBLE9BQU8sQ0FBQyxLQUFSLENBQWMsY0FBZCxDQUE2QixxQkFBN0I7QUFDSCxHQVJELEVBUUcsUUFBUSxHQUFHLEVBUmQ7QUFTSCxDQXRCTTs7OztBQXdCQSxJQUFNLFdBQVcsR0FBRyxTQUFkLFdBQWMsQ0FBQyxPQUFELEVBQVUsUUFBVixFQUF1QjtBQUM5QyxFQUFBLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxPQUFqQyxLQUE2QyxNQUE3QyxHQUFzRCxTQUFTLENBQUMsT0FBRCxFQUFVLFFBQVYsQ0FBL0QsR0FBcUYsT0FBTyxDQUFDLE9BQUQsRUFBVSxRQUFWLENBQTVGO0FBQ0gsQ0FGTTs7OztBQUlBLElBQU0sTUFBTSxHQUFHLFNBQVQsTUFBUyxDQUFDLE9BQUQsRUFBNEI7QUFBQSxNQUFsQixRQUFrQix1RUFBUCxFQUFPOztBQUM5QyxNQUFNLE9BQU8sR0FBRztBQUNaLElBQUEsUUFBUSxFQUFFLEdBREU7QUFFWixJQUFBLE9BQU8sRUFBRSxJQUZHO0FBR1osSUFBQSxPQUFPLEVBQUUsQ0FIRztBQUlaLElBQUEsUUFBUSxFQUFFO0FBSkUsR0FBaEI7QUFPQSxFQUFBLE1BQU0sQ0FBQyxNQUFQLENBQWMsT0FBZCxFQUF1QixRQUF2QjtBQUVBLEVBQUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxPQUFkLEdBQXdCLENBQXhCO0FBQ0EsRUFBQSxPQUFPLENBQUMsS0FBUixDQUFjLE9BQWQsR0FBd0IsT0FBTyxDQUFDLE9BQVIsSUFBbUIsT0FBM0M7QUFFQSxFQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2IsSUFBQSxPQUFPLENBQUMsS0FBUixDQUFjLFVBQWQsYUFBOEIsT0FBTyxDQUFDLFFBQXRDO0FBQ0EsSUFBQSxPQUFPLENBQUMsS0FBUixDQUFjLE9BQWQsR0FBd0IsT0FBTyxDQUFDLE9BQWhDO0FBQ0gsR0FIUyxFQUdQLENBSE8sQ0FBVjtBQUtBLEVBQUEsVUFBVSxDQUFDLFlBQU07QUFDYixJQUFBLE9BQU8sQ0FBQyxLQUFSLENBQWMsY0FBZCxDQUE2QixZQUE3QjtBQUNBLEtBQUMsQ0FBQyxPQUFPLENBQUMsUUFBVixJQUFzQixPQUFPLENBQUMsUUFBUixFQUF0QjtBQUNILEdBSFMsRUFHUCxPQUFPLENBQUMsUUFBUixHQUFtQixFQUhaLENBQVY7QUFJSCxDQXRCTTs7OztBQXdCQSxJQUFNLE9BQU8sR0FBRyxTQUFWLE9BQVUsQ0FBQyxPQUFELEVBQTRCO0FBQUEsTUFBbEIsUUFBa0IsdUVBQVAsRUFBTzs7QUFDL0MsTUFBTSxPQUFPLEdBQUc7QUFDWixJQUFBLFFBQVEsRUFBRSxHQURFO0FBRVosSUFBQSxPQUFPLEVBQUUsSUFGRztBQUdaLElBQUEsT0FBTyxFQUFFLENBSEc7QUFJWixJQUFBLFFBQVEsRUFBRTtBQUpFLEdBQWhCO0FBT0EsRUFBQSxNQUFNLENBQUMsTUFBUCxDQUFjLE9BQWQsRUFBdUIsUUFBdkI7QUFFQSxFQUFBLE9BQU8sQ0FBQyxLQUFSLENBQWMsT0FBZCxHQUF3QixDQUF4QjtBQUNBLEVBQUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxPQUFkLEdBQXdCLE9BQU8sQ0FBQyxPQUFSLElBQW1CLE9BQTNDO0FBRUEsRUFBQSxVQUFVLENBQUMsWUFBTTtBQUNiLElBQUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxVQUFkLGFBQThCLE9BQU8sQ0FBQyxRQUF0QztBQUNBLElBQUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxPQUFkLEdBQXdCLE9BQU8sQ0FBQyxPQUFoQztBQUNILEdBSFMsRUFHUCxDQUhPLENBQVY7QUFLQSxFQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2IsSUFBQSxPQUFPLENBQUMsS0FBUixDQUFjLE9BQWQsR0FBd0IsTUFBeEI7QUFDQSxJQUFBLE9BQU8sQ0FBQyxLQUFSLENBQWMsY0FBZCxDQUE2QixZQUE3QjtBQUNBLEtBQUMsQ0FBQyxPQUFPLENBQUMsUUFBVixJQUFzQixPQUFPLENBQUMsUUFBUixFQUF0QjtBQUNILEdBSlMsRUFJUCxPQUFPLENBQUMsUUFBUixHQUFtQixFQUpaLENBQVY7QUFLSCxDQXZCTTs7OztBQXlCQSxJQUFNLFVBQVUsR0FBRyxTQUFiLFVBQWEsQ0FBQyxPQUFELEVBQVUsT0FBVixFQUFzQjtBQUM1QyxFQUFBLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxPQUFqQyxLQUE2QyxNQUE3QyxHQUFzRCxNQUFNLENBQUMsT0FBRCxFQUFVLE9BQVYsQ0FBNUQsR0FBaUYsT0FBTyxDQUFDLE9BQUQsRUFBVSxPQUFWLENBQXhGO0FBQ0gsQ0FGTTs7OztBQUlBLElBQU0sTUFBTSxHQUFHLFNBQVQsTUFBUyxDQUFDLE9BQUQsRUFBYTtBQUMvQixNQUFJLENBQUMsT0FBTyxDQUFDLGNBQVIsR0FBeUIsTUFBOUIsRUFBc0M7QUFDbEMsV0FBTztBQUFFLE1BQUEsR0FBRyxFQUFFLENBQVA7QUFBVSxNQUFBLElBQUksRUFBRTtBQUFoQixLQUFQO0FBQ0gsR0FIOEIsQ0FLL0I7OztBQUNBLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxxQkFBUixFQUFiO0FBQ0EsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLGFBQVIsQ0FBc0IsV0FBbEM7QUFDQSxTQUFPO0FBQ0gsSUFBQSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUwsR0FBVyxHQUFHLENBQUMsV0FEakI7QUFFSCxJQUFBLElBQUksRUFBRSxJQUFJLENBQUMsSUFBTCxHQUFZLEdBQUcsQ0FBQztBQUZuQixHQUFQO0FBSUgsQ0FaTTs7OztBQWNBLElBQU0sT0FBTyxHQUFHLFNBQVYsT0FBVSxDQUFDLE9BQUQsRUFBYTtBQUNoQyxNQUFJLENBQUMsT0FBTCxFQUFjO0FBQ1YsV0FBTyxLQUFQO0FBQ0g7O0FBRUQsU0FBTyxDQUFDLEVBQUUsT0FBTyxDQUFDLFdBQVIsSUFBdUIsT0FBTyxDQUFDLFlBQS9CLElBQStDLE9BQU8sQ0FBQyxjQUFSLEdBQXlCLE1BQTFFLENBQVI7QUFDSCxDQU5NOzs7O0FBUUEsSUFBTSxXQUFXLEdBQUcsU0FBZCxXQUFjLENBQUMsQ0FBRCxFQUFPO0FBQzlCO0FBQ0EsTUFBTSxRQUFRLEdBQUcsRUFBakIsQ0FGOEIsQ0FJOUI7O0FBQ0EsTUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFQLEVBQW1CO0FBQ2YsV0FBTyxRQUFQO0FBQ0gsR0FQNkIsQ0FTOUI7OztBQUNBLE1BQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxVQUFGLENBQWEsVUFBM0IsQ0FWOEIsQ0FZOUI7O0FBQ0EsU0FBTyxPQUFQLEVBQWdCO0FBQ1osUUFBSSxPQUFPLENBQUMsUUFBUixLQUFxQixDQUFyQixJQUEwQixPQUFPLEtBQUssQ0FBMUMsRUFBNkM7QUFDekMsTUFBQSxRQUFRLENBQUMsSUFBVCxDQUFjLE9BQWQ7QUFDSDs7QUFFRCxJQUFBLE9BQU8sR0FBRyxPQUFPLENBQUMsV0FBbEI7QUFDSDs7QUFFRCxTQUFPLFFBQVA7QUFDSCxDQXRCTSxDLENBd0JQOzs7OztBQUNPLElBQU0sU0FBUyxHQUFHLFNBQVosU0FBWSxDQUFDLENBQUQsRUFBTztBQUM1QixTQUFPLFFBQU8sV0FBUCx5Q0FBTyxXQUFQLE9BQXVCLFFBQXZCLEdBQ0QsQ0FBQyxZQUFZLFdBRFosQ0FDd0I7QUFEeEIsSUFFRCxDQUFDLElBQUksUUFBTyxDQUFQLE1BQWEsUUFBbEIsSUFBOEIsQ0FBQyxLQUFLLElBQXBDLElBQTRDLENBQUMsQ0FBQyxRQUFGLEtBQWUsQ0FBM0QsSUFBZ0UsT0FBTyxDQUFDLENBQUMsUUFBVCxLQUFzQixRQUY1RjtBQUdILENBSk07Ozs7QUFNQSxJQUFNLGNBQWMsR0FBRyxTQUFqQixjQUFpQixDQUFDLFNBQUQsRUFBWSxVQUFaLEVBQTZDO0FBQUEsTUFBckIsSUFBcUIsdUVBQWQsU0FBYzs7QUFDdkUsTUFBSSxFQUFFLFNBQVMsSUFBSSxVQUFmLENBQUosRUFBZ0M7QUFDNUI7QUFDSDtBQUVEO0FBQ0o7QUFDQTtBQUNBOzs7QUFDSSxFQUFBLE1BQU0sQ0FBQyxNQUFELENBQU4sQ0FBZSxFQUFmLENBQWtCLHlCQUFsQixFQUE2QyxZQUFNO0FBQy9DLFFBQU0sVUFBVSxHQUFHLFNBQWIsVUFBYSxDQUFDLFFBQUQsRUFBYztBQUM3QixNQUFBLGlCQUFpQixDQUFDLGVBQWxCLENBQWtDLFVBQWxDLENBQTZDLFNBQTdDLEVBQXdEO0FBQ3BELFFBQUEsUUFBUSxFQUFSO0FBRG9ELE9BQXhEO0FBR0gsS0FKRDs7QUFNQSxJQUFBLGlCQUFpQixDQUFDLEtBQWxCLENBQXdCLFNBQXhCLGtDQUE0RCxVQUE1RCxjQUEwRSxJQUExRSxHQUFrRixVQUFsRjtBQUNILEdBUkQ7QUFTSCxDQWxCTTs7Ozs7Ozs7O0FDcktQOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRU0sYTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQUlGLDhCQUFxQjtBQUNqQixhQUFPO0FBQ0gsUUFBQSxTQUFTLEVBQUU7QUFDUCxVQUFBLFNBQVMsRUFBRTtBQURKLFNBRFI7QUFJSCxRQUFBLFNBQVMsRUFBRSxFQUpSO0FBS0gsUUFBQSxJQUFJLEVBQUUsQ0FMSDtBQU1ILFFBQUEsT0FBTyxFQUFFLFNBTk47QUFPSCxRQUFBLGVBQWUsRUFBRSxJQVBkO0FBUUgsUUFBQSxpQkFBaUIsRUFBRSxLQVJoQjtBQVNILFFBQUEsY0FBYyxFQUFFLEtBVGI7QUFVSCxRQUFBLFdBQVcsRUFBRSxLQVZWO0FBV0gsUUFBQSxpQkFBaUIsRUFBRSxLQVhoQjtBQVlILFFBQUEsWUFBWSxFQUFFLE1BWlg7QUFhSCxRQUFBLE1BQU0sRUFBRTtBQWJMLE9BQVA7QUFlSDs7O1dBRUQsOEJBQXFCO0FBQ2pCLFVBQU0sT0FBTyxHQUFHLEtBQUssUUFBTCxDQUFjLEdBQWQsQ0FBa0IsQ0FBbEIsQ0FBaEI7QUFDQSxVQUFNLFNBQVMsR0FBRyxLQUFLLFdBQUwsQ0FBaUIsV0FBakIsQ0FBbEI7QUFFQSxhQUFPO0FBQ0gsUUFBQSxTQUFTLEVBQUUsT0FBTyxDQUFDLGFBQVIsQ0FBc0IsU0FBUyxDQUFDLFNBQWhDO0FBRFIsT0FBUDtBQUdIOzs7V0FFRCxrQkFBZ0I7QUFBQTs7QUFBQSx5Q0FBTixJQUFNO0FBQU4sUUFBQSxJQUFNO0FBQUE7O0FBQ1osK0dBQWdCLElBQWhCOztBQUVBLFdBQUssZUFBTDtBQUNBLFdBQUssYUFBTDtBQUNIOzs7V0FFRCx5QkFBZ0I7QUFDWixVQUFNLGdCQUFnQixHQUFHLEtBQUssbUJBQUwsRUFBekI7QUFDQSxXQUFLLFNBQUwsR0FBaUIsSUFBSSxNQUFNLENBQUMsSUFBUCxDQUFZLEdBQWhCLENBQW9CLEtBQUssUUFBTCxDQUFjLFNBQWxDLEVBQTZDLGdCQUE3QyxDQUFqQjtBQUVBLFdBQUssWUFBTDtBQUNIOzs7V0FFRCwrQkFBc0I7QUFDbEIsVUFBTSxRQUFRLEdBQUcsS0FBSyxXQUFMLEVBQWpCO0FBQ0EsVUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLFNBQVQsQ0FBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsQ0FBakI7QUFDQSxVQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsU0FBVCxDQUFtQixDQUFuQixFQUFzQixDQUF0QixDQUFsQjtBQUVBLGFBQU87QUFDSCxRQUFBLE1BQU0sRUFBRSxJQUFJLE1BQU0sQ0FBQyxJQUFQLENBQVksTUFBaEIsQ0FBdUIsUUFBdkIsRUFBaUMsU0FBakMsQ0FETDtBQUVILFFBQUEsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUZaO0FBR0gsUUFBQSxTQUFTLEVBQUUsUUFBUSxDQUFDLE9BSGpCO0FBSUgsUUFBQSxpQkFBaUIsRUFBRSxRQUFRLENBQUMsaUJBSnpCO0FBS0gsUUFBQSxjQUFjLEVBQUUsUUFBUSxDQUFDLGNBTHRCO0FBTUgsUUFBQSxXQUFXLEVBQUUsUUFBUSxDQUFDLFdBTm5CO0FBT0gsUUFBQSxpQkFBaUIsRUFBRSxRQUFRLENBQUMsaUJBUHpCO0FBUUgsUUFBQSxlQUFlLEVBQUUsUUFBUSxDQUFDLFlBUnZCO0FBU0gsUUFBQSxNQUFNLEVBQUUsUUFBUSxDQUFDO0FBVGQsT0FBUDtBQVdIOzs7V0FFRCx3QkFBZTtBQUFBOztBQUNYLFVBQU0sUUFBUSxHQUFHLEtBQUssV0FBTCxFQUFqQjtBQUVBLE1BQUEsUUFBUSxDQUFDLFNBQVQsQ0FBbUIsT0FBbkIsQ0FBMkIsVUFBQyxPQUFELEVBQWE7QUFDcEMsWUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLENBQUQsQ0FBL0I7QUFDQSxZQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxDQUFELENBQWhDO0FBQ0EsWUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLENBQUQsQ0FBNUI7O0FBRUEsWUFBSSxDQUFDLENBQUMsZUFBRixJQUFxQixDQUFDLENBQUMsZ0JBQTNCLEVBQTZDO0FBQ3pDLGNBQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxDQUFELENBQTlCO0FBQ0EsY0FBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLENBQUQsQ0FBN0I7QUFDQSxjQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsQ0FBRCxDQUE5QixDQUh5QyxDQUt6Qzs7QUFDQSxjQUFNLE1BQU0sR0FBRyxNQUFJLENBQUMsWUFBTCxDQUNYLGVBRFcsRUFFWCxnQkFGVyxFQUdYLFlBSFcsRUFJWCxjQUpXLEVBS1gsYUFMVyxFQU1YLGNBTlcsQ0FBZjs7QUFTQSxjQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxDQUFELENBQWhDO0FBQ0EsY0FBTSw4QkFBOEIsR0FBRyxPQUFPLENBQUMsQ0FBRCxDQUE5QztBQUNBLGNBQU0scUJBQXFCLEdBQUcsT0FBTyxDQUFDLENBQUQsQ0FBckM7O0FBRUEsY0FBSSxDQUFDLENBQUMsZ0JBQUYsSUFBc0IsWUFBMUIsRUFBd0M7QUFDcEMsZ0JBQU0sVUFBVSxHQUFHLE1BQUksQ0FBQyxnQkFBTCxDQUFzQixNQUF0QixFQUE4QixZQUE5QixFQUE0QyxxQkFBNUMsQ0FBbkI7O0FBRUEsZ0JBQUksQ0FBQyxDQUFDLDhCQUFOLEVBQXNDO0FBQ2xDLGNBQUEsVUFBVSxDQUFDLElBQVgsQ0FBZ0IsTUFBSSxDQUFDLFNBQXJCLEVBQWdDLE1BQWhDO0FBQ0g7O0FBRUQsWUFBQSxNQUFNLENBQUMsSUFBUCxDQUFZLEtBQVosQ0FBa0IsV0FBbEIsQ0FBOEIsTUFBOUIsRUFBc0MsT0FBdEMsRUFBK0MsWUFBTTtBQUNqRCxjQUFBLFVBQVUsQ0FBQyxJQUFYLENBQWdCLE1BQUksQ0FBQyxTQUFyQixFQUFnQyxNQUFoQztBQUNILGFBRkQ7QUFJQSxZQUFBLE1BQU0sQ0FBQyxJQUFQLENBQVksS0FBWixDQUFrQixXQUFsQixDQUE4QixNQUFJLENBQUMsU0FBbkMsRUFBOEMsT0FBOUMsRUFBdUQsWUFBTTtBQUN6RCxjQUFBLFVBQVUsQ0FBQyxLQUFYO0FBQ0gsYUFGRDtBQUdIO0FBQ0o7QUFDSixPQXhDRDtBQXlDSDs7O1dBRUQsc0JBQWEsZUFBYixFQUE4QixnQkFBOUIsRUFBZ0QsWUFBaEQsRUFBOEQsY0FBOUQsRUFBOEUsYUFBOUUsRUFBNkYsY0FBN0YsRUFBNkc7QUFDekcsVUFBTSxlQUFlLEdBQUcsS0FBSyxXQUFMLENBQWlCLGlCQUFqQixDQUF4QjtBQUNBLFVBQUksU0FBUyxHQUFHLElBQWhCOztBQUVBLGNBQVEsZUFBUjtBQUNJLGFBQUssTUFBTDtBQUNJLFVBQUEsU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFQLENBQVksU0FBWixDQUFzQixJQUFsQztBQUNBOztBQUVKLGFBQUssUUFBTDtBQUNJLFVBQUEsU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFQLENBQVksU0FBWixDQUFzQixNQUFsQztBQUNBO0FBUFI7O0FBVUEsYUFBTyxJQUFJLE1BQU0sQ0FBQyxJQUFQLENBQVksTUFBaEIsQ0FBdUI7QUFDMUIsUUFBQSxRQUFRLEVBQUUsSUFBSSxNQUFNLENBQUMsSUFBUCxDQUFZLE1BQWhCLENBQXVCLGVBQXZCLEVBQXdDLGdCQUF4QyxDQURnQjtBQUUxQixRQUFBLEdBQUcsRUFBRSxLQUFLLFNBRmdCO0FBRzFCLFFBQUEsS0FBSyxFQUFFLFlBSG1CO0FBSTFCLFFBQUEsU0FBUyxFQUFFLFNBSmU7QUFLMUIsUUFBQSxJQUFJLEVBQ0EsY0FBYyxLQUFLLFFBQW5CLEdBQ007QUFDSSxVQUFBLEdBQUcsRUFBRSxhQURUO0FBRUksVUFBQSxVQUFVLEVBQUUsSUFBSSxNQUFNLENBQUMsSUFBUCxDQUFZLElBQWhCLENBQXFCLGNBQXJCLEVBQXFDLGNBQXJDLENBRmhCO0FBR0ksVUFBQSxNQUFNLEVBQUUsSUFBSSxNQUFNLENBQUMsSUFBUCxDQUFZLEtBQWhCLENBQXNCLENBQXRCLEVBQXlCLENBQXpCLENBSFo7QUFJSSxVQUFBLE1BQU0sRUFBRSxJQUFJLE1BQU0sQ0FBQyxJQUFQLENBQVksS0FBaEIsQ0FBc0IsY0FBYyxHQUFHLENBQXZDLEVBQTBDLGNBQTFDO0FBSlosU0FETixHQU9NO0FBYmdCLE9BQXZCLENBQVA7QUFlSDs7O1dBRUQsMEJBQWlCLE1BQWpCLEVBQXlCLFlBQXpCLEVBQXVDLHFCQUF2QyxFQUE4RDtBQUMxRCxVQUFNLGlCQUFpQixHQUFHLEVBQTFCO0FBQ0EsVUFBTSxlQUFlLEdBQUcsS0FBSyxRQUFMLENBQWMsU0FBZCxDQUF3QixPQUF4QixDQUFnQyxVQUF4RDtBQUVBLE1BQUEsaUJBQWlCLENBQUMsT0FBbEIsK0dBRXdDLFlBRnhDLGlDQUdNLENBQUMsQ0FBQyxxQkFBRix1REFBcUUscUJBQXJFLGdCQUhOOztBQU1BLFVBQUksQ0FBQyxDQUFDLGVBQU4sRUFBdUI7QUFDbkIsUUFBQSxpQkFBaUIsQ0FBQyxRQUFsQixHQUE2QixlQUE3QjtBQUNIOztBQUVELGFBQU8sSUFBSSxNQUFNLENBQUMsSUFBUCxDQUFZLFVBQWhCLENBQTJCLGlCQUEzQixDQUFQO0FBQ0g7OztXQUVELDJCQUFrQjtBQUNkLFVBQU0sUUFBUSxHQUFHLEtBQUssV0FBTCxFQUFqQjtBQUNBLFVBQU0sZUFBZSxHQUFHLEtBQUssUUFBTCxDQUFjLFNBQWQsQ0FBd0IsT0FBaEQ7QUFDQSxVQUFNLGVBQWUsR0FBRyxLQUFLLGtCQUFMLEVBQXhCO0FBRUEsVUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxTQUFsQixHQUE4QixJQUFJLENBQUMsS0FBTCxDQUFXLGVBQWUsQ0FBQyxTQUEzQixDQUE5QixHQUFzRSxRQUFRLENBQUMsU0FBakc7QUFDQSxVQUFNLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFQLENBQWEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFqQixDQUFuQixDQUFELEdBQThDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBakIsQ0FBcEQsR0FBNkUsUUFBUSxDQUFDLElBQW5HO0FBQ0EsVUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxRQUFsQixHQUE2QixlQUFlLENBQUMsUUFBN0MsR0FBd0QsUUFBUSxDQUFDLE9BQWpGO0FBQ0EsVUFBTSxXQUFXLEdBQUcsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxZQUFsQixHQUFpQyxlQUFlLENBQUMsWUFBakQsR0FBZ0UsUUFBUSxDQUFDLFdBQTdGO0FBQ0EsVUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxXQUFsQixHQUFnQyxJQUFJLENBQUMsS0FBTCxDQUFXLGVBQWUsQ0FBQyxXQUEzQixDQUFoQyxHQUEwRSxRQUFRLENBQUMsTUFBbEc7QUFFQSxVQUFNLGVBQWUsR0FBRyxDQUFDLENBQUMsZUFBZSxDQUFDLGdCQUFsQixHQUNsQixlQUFlLENBQUMsZ0JBREUsR0FFbEIsUUFBUSxDQUFDLGVBRmY7QUFJQSxVQUFNLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxlQUFlLENBQUMscUJBQWxCLEdBQ3BCLGVBQWUsQ0FBQyxxQkFESSxHQUVwQixRQUFRLENBQUMsaUJBRmY7QUFJQSxVQUFNLGNBQWMsR0FBRyxDQUFDLENBQUMsZUFBZSxDQUFDLGdCQUFsQixHQUNqQixlQUFlLENBQUMsZ0JBREMsR0FFakIsUUFBUSxDQUFDLGNBRmY7QUFJQSxVQUFNLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxlQUFlLENBQUMsa0JBQWxCLEdBQ3BCLGVBQWUsQ0FBQyxrQkFESSxHQUVwQixRQUFRLENBQUMsaUJBRmY7QUFJQSxVQUFNLFlBQVksR0FBRyxDQUFDLENBQUMsZUFBZSxDQUFDLGVBQWxCLEdBQW9DLGVBQWUsQ0FBQyxlQUFwRCxHQUFzRSxRQUFRLENBQUMsWUFBcEc7QUFFQSxXQUFLLFdBQUwsQ0FBaUI7QUFDYixRQUFBLFNBQVMsRUFBRSxTQURFO0FBRWIsUUFBQSxJQUFJLEVBQUUsSUFGTztBQUdiLFFBQUEsT0FBTyxFQUFFLE9BSEk7QUFJYixRQUFBLGVBQWUsRUFBRSxlQUpKO0FBS2IsUUFBQSxpQkFBaUIsRUFBRSxpQkFMTjtBQU1iLFFBQUEsY0FBYyxFQUFFLGNBTkg7QUFPYixRQUFBLFdBQVcsRUFBRSxXQVBBO0FBUWIsUUFBQSxpQkFBaUIsRUFBRSxpQkFSTjtBQVNiLFFBQUEsWUFBWSxFQUFFLFlBVEQ7QUFVYixRQUFBLE1BQU0sRUFBRTtBQVZLLE9BQWpCO0FBWUg7Ozs7RUF0TXVCLGdCQUFnQixDQUFDLFFBQWpCLENBQTBCLFFBQTFCLENBQW1DLEk7O0FBeU0vRCwyQkFBZSxhQUFmLEVBQThCLGdCQUE5QiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImV4cG9ydCBjb25zdCBzbGlkZURvd24gPSAoZWxlbWVudCwgZHVyYXRpb24gPSAzMDApID0+IHtcbiAgICBsZXQgZGlzcGxheSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmRpc3BsYXk7XG5cbiAgICBpZiAoZGlzcGxheSA9PT0gXCJub25lXCIpIHtcbiAgICAgICAgZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG5cbiAgICBlbGVtZW50LnN0eWxlLnRyYW5zaXRpb25Qcm9wZXJ0eSA9IFwiaGVpZ2h0XCI7XG4gICAgZWxlbWVudC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBgJHtkdXJhdGlvbn1tc2A7XG5cbiAgICBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXk7XG4gICAgbGV0IGhlaWdodCA9IGVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuXG4gICAgZWxlbWVudC5zdHlsZS5oZWlnaHQgPSAwO1xuICAgIGVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgZWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHR9cHhgO1xuICAgIH0sIDUpO1xuXG4gICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBlbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KFwiaGVpZ2h0XCIpO1xuICAgICAgICBlbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KFwib3ZlcmZsb3dcIik7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJ0cmFuc2l0aW9uLWR1cmF0aW9uXCIpO1xuICAgICAgICBlbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KFwidHJhbnNpdGlvbi1wcm9wZXJ0eVwiKTtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcIm9wYWNpdHlcIik7XG4gICAgfSwgZHVyYXRpb24gKyA1MCk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2xpZGVVcCA9IChlbGVtZW50LCBkdXJhdGlvbiA9IDMwMCkgPT4ge1xuICAgIGVsZW1lbnQuc3R5bGUuYm94U2l6aW5nID0gXCJib3JkZXItYm94XCI7XG4gICAgZWxlbWVudC5zdHlsZS50cmFuc2l0aW9uUHJvcGVydHkgPSBcImhlaWdodCwgbWFyZ2luXCI7XG4gICAgZWxlbWVudC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBgJHtkdXJhdGlvbn1tc2A7XG4gICAgZWxlbWVudC5zdHlsZS5oZWlnaHQgPSBgJHtlbGVtZW50Lm9mZnNldEhlaWdodH1weGA7XG4gICAgZWxlbWVudC5zdHlsZS5tYXJnaW5Ub3AgPSAwO1xuICAgIGVsZW1lbnQuc3R5bGUubWFyZ2luQm90dG9tID0gMDtcbiAgICBlbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBlbGVtZW50LnN0eWxlLmhlaWdodCA9IDA7XG4gICAgfSwgNSk7XG5cbiAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBlbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KFwiaGVpZ2h0XCIpO1xuICAgICAgICBlbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KFwibWFyZ2luLXRvcFwiKTtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcIm1hcmdpbi1ib3R0b21cIik7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJvdmVyZmxvd1wiKTtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcInRyYW5zaXRpb24tZHVyYXRpb25cIik7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJ0cmFuc2l0aW9uLXByb3BlcnR5XCIpO1xuICAgIH0sIGR1cmF0aW9uICsgNTApO1xufTtcblxuZXhwb3J0IGNvbnN0IHNsaWRlVG9nZ2xlID0gKGVsZW1lbnQsIGR1cmF0aW9uKSA9PiB7XG4gICAgd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkuZGlzcGxheSA9PT0gXCJub25lXCIgPyBzbGlkZURvd24oZWxlbWVudCwgZHVyYXRpb24pIDogc2xpZGVVcChlbGVtZW50LCBkdXJhdGlvbik7XG59O1xuXG5leHBvcnQgY29uc3QgZmFkZUluID0gKGVsZW1lbnQsIF9vcHRpb25zID0ge30pID0+IHtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBkdXJhdGlvbjogMzAwLFxuICAgICAgICBkaXNwbGF5OiBudWxsLFxuICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICBjYWxsYmFjazogbnVsbCxcbiAgICB9O1xuXG4gICAgT2JqZWN0LmFzc2lnbihvcHRpb25zLCBfb3B0aW9ucyk7XG5cbiAgICBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IG9wdGlvbnMuZGlzcGxheSB8fCBcImJsb2NrXCI7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS50cmFuc2l0aW9uID0gYCR7b3B0aW9ucy5kdXJhdGlvbn1tcyBvcGFjaXR5IGVhc2VgO1xuICAgICAgICBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBvcHRpb25zLm9wYWNpdHk7XG4gICAgfSwgNSk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcInRyYW5zaXRpb25cIik7XG4gICAgICAgICEhb3B0aW9ucy5jYWxsYmFjayAmJiBvcHRpb25zLmNhbGxiYWNrKCk7XG4gICAgfSwgb3B0aW9ucy5kdXJhdGlvbiArIDUwKTtcbn07XG5cbmV4cG9ydCBjb25zdCBmYWRlT3V0ID0gKGVsZW1lbnQsIF9vcHRpb25zID0ge30pID0+IHtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBkdXJhdGlvbjogMzAwLFxuICAgICAgICBkaXNwbGF5OiBudWxsLFxuICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICBjYWxsYmFjazogbnVsbCxcbiAgICB9O1xuXG4gICAgT2JqZWN0LmFzc2lnbihvcHRpb25zLCBfb3B0aW9ucyk7XG5cbiAgICBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IG9wdGlvbnMuZGlzcGxheSB8fCBcImJsb2NrXCI7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS50cmFuc2l0aW9uID0gYCR7b3B0aW9ucy5kdXJhdGlvbn1tcyBvcGFjaXR5IGVhc2VgO1xuICAgICAgICBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBvcHRpb25zLm9wYWNpdHk7XG4gICAgfSwgNSk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJ0cmFuc2l0aW9uXCIpO1xuICAgICAgICAhIW9wdGlvbnMuY2FsbGJhY2sgJiYgb3B0aW9ucy5jYWxsYmFjaygpO1xuICAgIH0sIG9wdGlvbnMuZHVyYXRpb24gKyA1MCk7XG59O1xuXG5leHBvcnQgY29uc3QgZmFkZVRvZ2dsZSA9IChlbGVtZW50LCBvcHRpb25zKSA9PiB7XG4gICAgd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkuZGlzcGxheSA9PT0gXCJub25lXCIgPyBmYWRlSW4oZWxlbWVudCwgb3B0aW9ucykgOiBmYWRlT3V0KGVsZW1lbnQsIG9wdGlvbnMpO1xufTtcblxuZXhwb3J0IGNvbnN0IG9mZnNldCA9IChlbGVtZW50KSA9PiB7XG4gICAgaWYgKCFlbGVtZW50LmdldENsaWVudFJlY3RzKCkubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB7IHRvcDogMCwgbGVmdDogMCB9O1xuICAgIH1cblxuICAgIC8vIEdldCBkb2N1bWVudC1yZWxhdGl2ZSBwb3NpdGlvbiBieSBhZGRpbmcgdmlld3BvcnQgc2Nyb2xsIHRvIHZpZXdwb3J0LXJlbGF0aXZlIGdCQ1JcbiAgICBjb25zdCByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB3aW4gPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXc7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9wOiByZWN0LnRvcCArIHdpbi5wYWdlWU9mZnNldCxcbiAgICAgICAgbGVmdDogcmVjdC5sZWZ0ICsgd2luLnBhZ2VYT2Zmc2V0LFxuICAgIH07XG59O1xuXG5leHBvcnQgY29uc3QgdmlzaWJsZSA9IChlbGVtZW50KSA9PiB7XG4gICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gISEoZWxlbWVudC5vZmZzZXRXaWR0aCB8fCBlbGVtZW50Lm9mZnNldEhlaWdodCB8fCBlbGVtZW50LmdldENsaWVudFJlY3RzKCkubGVuZ3RoKTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRTaWJsaW5ncyA9IChlKSA9PiB7XG4gICAgLy8gZm9yIGNvbGxlY3Rpbmcgc2libGluZ3NcbiAgICBjb25zdCBzaWJsaW5ncyA9IFtdO1xuXG4gICAgLy8gaWYgbm8gcGFyZW50LCByZXR1cm4gbm8gc2libGluZ1xuICAgIGlmICghZS5wYXJlbnROb2RlKSB7XG4gICAgICAgIHJldHVybiBzaWJsaW5ncztcbiAgICB9XG5cbiAgICAvLyBmaXJzdCBjaGlsZCBvZiB0aGUgcGFyZW50IG5vZGVcbiAgICBsZXQgc2libGluZyA9IGUucGFyZW50Tm9kZS5maXJzdENoaWxkO1xuXG4gICAgLy8gY29sbGVjdGluZyBzaWJsaW5nc1xuICAgIHdoaWxlIChzaWJsaW5nKSB7XG4gICAgICAgIGlmIChzaWJsaW5nLm5vZGVUeXBlID09PSAxICYmIHNpYmxpbmcgIT09IGUpIHtcbiAgICAgICAgICAgIHNpYmxpbmdzLnB1c2goc2libGluZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzaWJsaW5nID0gc2libGluZy5uZXh0U2libGluZztcbiAgICB9XG5cbiAgICByZXR1cm4gc2libGluZ3M7XG59O1xuXG4vLyBSZXR1cm5zIHRydWUgaWYgaXQgaXMgYSBET00gZWxlbWVudFxuZXhwb3J0IGNvbnN0IGlzRWxlbWVudCA9IChvKSA9PiB7XG4gICAgcmV0dXJuIHR5cGVvZiBIVE1MRWxlbWVudCA9PT0gXCJvYmplY3RcIlxuICAgICAgICA/IG8gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAvLyBET00yXG4gICAgICAgIDogbyAmJiB0eXBlb2YgbyA9PT0gXCJvYmplY3RcIiAmJiBvICE9PSBudWxsICYmIG8ubm9kZVR5cGUgPT09IDEgJiYgdHlwZW9mIG8ubm9kZU5hbWUgPT09IFwic3RyaW5nXCI7XG59O1xuXG5leHBvcnQgY29uc3QgcmVnaXN0ZXJXaWRnZXQgPSAoY2xhc3NOYW1lLCB3aWRnZXROYW1lLCBza2luID0gXCJkZWZhdWx0XCIpID0+IHtcbiAgICBpZiAoIShjbGFzc05hbWUgfHwgd2lkZ2V0TmFtZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJlY2F1c2UgRWxlbWVudG9yIHBsdWdpbiB1c2VzIGpRdWVyeSBjdXN0b20gZXZlbnQsXG4gICAgICogV2UgYWxzbyBoYXZlIHRvIHVzZSBqUXVlcnkgdG8gdXNlIHRoaXMgZXZlbnRcbiAgICAgKi9cbiAgICBqUXVlcnkod2luZG93KS5vbihcImVsZW1lbnRvci9mcm9udGVuZC9pbml0XCIsICgpID0+IHtcbiAgICAgICAgY29uc3QgYWRkSGFuZGxlciA9ICgkZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgZWxlbWVudG9yRnJvbnRlbmQuZWxlbWVudHNIYW5kbGVyLmFkZEhhbmRsZXIoY2xhc3NOYW1lLCB7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBlbGVtZW50b3JGcm9udGVuZC5ob29rcy5hZGRBY3Rpb24oYGZyb250ZW5kL2VsZW1lbnRfcmVhZHkvJHt3aWRnZXROYW1lfS4ke3NraW59YCwgYWRkSGFuZGxlcik7XG4gICAgfSk7XG59O1xuIiwiaW1wb3J0IHsgcmVnaXN0ZXJXaWRnZXQgfSBmcm9tIFwiLi4vbGliL3V0aWxzXCI7XG5cbmNsYXNzIE9FV19Hb29nbGVNYXAgZXh0ZW5kcyBlbGVtZW50b3JNb2R1bGVzLmZyb250ZW5kLmhhbmRsZXJzLkJhc2Uge1xuICAgIGdvb2dsZU1hcDtcbiAgICBpbmZvV2luZG93O1xuXG4gICAgZ2V0RGVmYXVsdFNldHRpbmdzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2VsZWN0b3JzOiB7XG4gICAgICAgICAgICAgICAgZ29vZ2xlTWFwOiBcIi5vZXctZ29vZ2xlLW1hcFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFkZHJlc3NlczogW10sXG4gICAgICAgICAgICB6b29tOiA0LFxuICAgICAgICAgICAgbWFwVHlwZTogXCJyb2FkbWFwXCIsXG4gICAgICAgICAgICBtYXJrZXJBbmltYXRpb246IG51bGwsXG4gICAgICAgICAgICBzdHJlZXRWaWV3Q29udHJvbDogZmFsc2UsXG4gICAgICAgICAgICBtYXBUeXBlQ29udHJvbDogZmFsc2UsXG4gICAgICAgICAgICB6b29tQ29udHJvbDogZmFsc2UsXG4gICAgICAgICAgICBmdWxsc2NyZWVuQ29udHJvbDogZmFsc2UsXG4gICAgICAgICAgICBzY3JvbGxUb1pvb206IFwibm9uZVwiLFxuICAgICAgICAgICAgc3R5bGVzOiBbXSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXREZWZhdWx0RWxlbWVudHMoKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLiRlbGVtZW50LmdldCgwKTtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3JzID0gdGhpcy5nZXRTZXR0aW5ncyhcInNlbGVjdG9yc1wiKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ29vZ2xlTWFwOiBlbGVtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLmdvb2dsZU1hcCksXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgb25Jbml0KC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIub25Jbml0KC4uLmFyZ3MpO1xuXG4gICAgICAgIHRoaXMuc2V0VXNlclNldHRpbmdzKCk7XG4gICAgICAgIHRoaXMuaW5pdEdvb2dsZU1hcCgpO1xuICAgIH1cblxuICAgIGluaXRHb29nbGVNYXAoKSB7XG4gICAgICAgIGNvbnN0IGdvb2dsZU1hcE9wdGlvbnMgPSB0aGlzLmdldEdvb2dsZU1hcE9wdGlvbnMoKTtcbiAgICAgICAgdGhpcy5nb29nbGVNYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKHRoaXMuZWxlbWVudHMuZ29vZ2xlTWFwLCBnb29nbGVNYXBPcHRpb25zKTtcblxuICAgICAgICB0aGlzLnNldEFkZHJlc3NlcygpO1xuICAgIH1cblxuICAgIGdldEdvb2dsZU1hcE9wdGlvbnMoKSB7XG4gICAgICAgIGNvbnN0IHNldHRpbmdzID0gdGhpcy5nZXRTZXR0aW5ncygpO1xuICAgICAgICBjb25zdCBsYXRpdHVkZSA9IHNldHRpbmdzLmFkZHJlc3Nlc1swXVswXTtcbiAgICAgICAgY29uc3QgbG9uZ2l0dWRlID0gc2V0dGluZ3MuYWRkcmVzc2VzWzBdWzFdO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjZW50ZXI6IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobGF0aXR1ZGUsIGxvbmdpdHVkZSksXG4gICAgICAgICAgICB6b29tOiBzZXR0aW5ncy56b29tLFxuICAgICAgICAgICAgbWFwVHlwZUlkOiBzZXR0aW5ncy5tYXBUeXBlLFxuICAgICAgICAgICAgc3RyZWV0Vmlld0NvbnRyb2w6IHNldHRpbmdzLnN0cmVldFZpZXdDb250cm9sLFxuICAgICAgICAgICAgbWFwVHlwZUNvbnRyb2w6IHNldHRpbmdzLm1hcFR5cGVDb250cm9sLFxuICAgICAgICAgICAgem9vbUNvbnRyb2w6IHNldHRpbmdzLnpvb21Db250cm9sLFxuICAgICAgICAgICAgZnVsbHNjcmVlbkNvbnRyb2w6IHNldHRpbmdzLmZ1bGxzY3JlZW5Db250cm9sLFxuICAgICAgICAgICAgZ2VzdHVyZUhhbmRsaW5nOiBzZXR0aW5ncy5zY3JvbGxUb1pvb20sXG4gICAgICAgICAgICBzdHlsZXM6IHNldHRpbmdzLnN0eWxlcyxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBzZXRBZGRyZXNzZXMoKSB7XG4gICAgICAgIGNvbnN0IHNldHRpbmdzID0gdGhpcy5nZXRTZXR0aW5ncygpO1xuXG4gICAgICAgIHNldHRpbmdzLmFkZHJlc3Nlcy5mb3JFYWNoKChhZGRyZXNzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhZGRyZXNzTGF0aXR1ZGUgPSBhZGRyZXNzWzBdO1xuICAgICAgICAgICAgY29uc3QgYWRkcmVzc0xvbmdpdHVkZSA9IGFkZHJlc3NbMV07XG4gICAgICAgICAgICBjb25zdCBhZGRyZXNzVGl0bGUgPSBhZGRyZXNzWzNdO1xuXG4gICAgICAgICAgICBpZiAoISFhZGRyZXNzTGF0aXR1ZGUgJiYgISFhZGRyZXNzTG9uZ2l0dWRlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWFya2VySWNvblR5cGUgPSBhZGRyZXNzWzVdO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hcmtlckljb25VUkwgPSBhZGRyZXNzWzZdO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hcmtlckljb25TaXplID0gYWRkcmVzc1s3XTtcblxuICAgICAgICAgICAgICAgIC8vIFNldCBhZGRyZXNzIG1hcmtlclxuICAgICAgICAgICAgICAgIGNvbnN0IG1hcmtlciA9IHRoaXMuY3JlYXRlTWFya2VyKFxuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzTGF0aXR1ZGUsXG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3NMb25naXR1ZGUsXG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3NUaXRsZSxcbiAgICAgICAgICAgICAgICAgICAgbWFya2VySWNvblR5cGUsXG4gICAgICAgICAgICAgICAgICAgIG1hcmtlckljb25VUkwsXG4gICAgICAgICAgICAgICAgICAgIG1hcmtlckljb25TaXplXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGVuYWJsZUluZm9XaW5kb3cgPSBhZGRyZXNzWzJdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVuYWJsZUluZm9XaW5kb3dPbkRvY3VtZW50TG9hZCA9IGFkZHJlc3NbOF07XG4gICAgICAgICAgICAgICAgY29uc3QgaW5mb1dpbmRvd0Rlc2NyaXB0aW9uID0gYWRkcmVzc1s0XTtcblxuICAgICAgICAgICAgICAgIGlmICghIWVuYWJsZUluZm9XaW5kb3cgJiYgYWRkcmVzc1RpdGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluZm9XaW5kb3cgPSB0aGlzLmNyZWF0ZUluZm9XaW5kb3cobWFya2VyLCBhZGRyZXNzVGl0bGUsIGluZm9XaW5kb3dEZXNjcmlwdGlvbik7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCEhZW5hYmxlSW5mb1dpbmRvd09uRG9jdW1lbnRMb2FkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZvV2luZG93Lm9wZW4odGhpcy5nb29nbGVNYXAsIG1hcmtlcik7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsIFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5mb1dpbmRvdy5vcGVuKHRoaXMuZ29vZ2xlTWFwLCBtYXJrZXIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcih0aGlzLmdvb2dsZU1hcCwgXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZvV2luZG93LmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY3JlYXRlTWFya2VyKGFkZHJlc3NMYXRpdHVkZSwgYWRkcmVzc0xvbmdpdHVkZSwgYWRkcmVzc1RpdGxlLCBtYXJrZXJJY29uVHlwZSwgbWFya2VySWNvblVSTCwgbWFya2VySWNvblNpemUpIHtcbiAgICAgICAgY29uc3QgbWFya2VyQW5pbWF0aW9uID0gdGhpcy5nZXRTZXR0aW5ncyhcIm1hcmtlckFuaW1hdGlvblwiKTtcbiAgICAgICAgbGV0IGFuaW1hdGlvbiA9IG51bGw7XG5cbiAgICAgICAgc3dpdGNoIChtYXJrZXJBbmltYXRpb24pIHtcbiAgICAgICAgICAgIGNhc2UgXCJkcm9wXCI6XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uID0gZ29vZ2xlLm1hcHMuQW5pbWF0aW9uLkRST1A7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgXCJib3VuY2VcIjpcbiAgICAgICAgICAgICAgICBhbmltYXRpb24gPSBnb29nbGUubWFwcy5BbmltYXRpb24uQk9VTkNFO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgICAgICAgcG9zaXRpb246IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoYWRkcmVzc0xhdGl0dWRlLCBhZGRyZXNzTG9uZ2l0dWRlKSxcbiAgICAgICAgICAgIG1hcDogdGhpcy5nb29nbGVNYXAsXG4gICAgICAgICAgICB0aXRsZTogYWRkcmVzc1RpdGxlLFxuICAgICAgICAgICAgYW5pbWF0aW9uOiBhbmltYXRpb24sXG4gICAgICAgICAgICBpY29uOlxuICAgICAgICAgICAgICAgIG1hcmtlckljb25UeXBlID09PSBcImN1c3RvbVwiXG4gICAgICAgICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IG1hcmtlckljb25VUkwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlZFNpemU6IG5ldyBnb29nbGUubWFwcy5TaXplKG1hcmtlckljb25TaXplLCBtYXJrZXJJY29uU2l6ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbjogbmV3IGdvb2dsZS5tYXBzLlBvaW50KDAsIDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhbmNob3I6IG5ldyBnb29nbGUubWFwcy5Qb2ludChtYXJrZXJJY29uU2l6ZSAvIDIsIG1hcmtlckljb25TaXplKSxcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIDogXCJcIixcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY3JlYXRlSW5mb1dpbmRvdyhtYXJrZXIsIGFkZHJlc3NUaXRsZSwgaW5mb1dpbmRvd0Rlc2NyaXB0aW9uKSB7XG4gICAgICAgIGNvbnN0IGluZm9XaW5kb3dPcHRpbm9zID0ge307XG4gICAgICAgIGNvbnN0IGRhdGFzZXRNYXhXaWR0aCA9IHRoaXMuZWxlbWVudHMuZ29vZ2xlTWFwLmRhdGFzZXQuaXdNYXhXaWR0aDtcblxuICAgICAgICBpbmZvV2luZG93T3B0aW5vcy5jb250ZW50ID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwib2V3LWluZm93aW5kb3ctY29udGVudFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm9ldy1pbmZvd2luZG93LXRpdGxlXCI+JHthZGRyZXNzVGl0bGV9PC9kaXY+XG4gICAgICAgICAgICAkeyEhaW5mb1dpbmRvd0Rlc2NyaXB0aW9uID8gYDxkaXYgY2xhc3M9XCJvZXctaW5mb3dpbmRvdy1kZXNjcmlwdGlvblwiPiR7aW5mb1dpbmRvd0Rlc2NyaXB0aW9ufTwvZGl2PmAgOiBgYH1cbiAgICAgICAgPC9kaXY+YDtcblxuICAgICAgICBpZiAoISFkYXRhc2V0TWF4V2lkdGgpIHtcbiAgICAgICAgICAgIGluZm9XaW5kb3dPcHRpbm9zLm1heFdpZHRoID0gZGF0YXNldE1heFdpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KGluZm9XaW5kb3dPcHRpbm9zKTtcbiAgICB9XG5cbiAgICBzZXRVc2VyU2V0dGluZ3MoKSB7XG4gICAgICAgIGNvbnN0IHNldHRpbmdzID0gdGhpcy5nZXRTZXR0aW5ncygpO1xuICAgICAgICBjb25zdCBkYXRhc2V0U2V0dGluZ3MgPSB0aGlzLmVsZW1lbnRzLmdvb2dsZU1hcC5kYXRhc2V0O1xuICAgICAgICBjb25zdCBlbGVtZW50U2V0dGluZ3MgPSB0aGlzLmdldEVsZW1lbnRTZXR0aW5ncygpO1xuXG4gICAgICAgIGNvbnN0IGFkZHJlc3NlcyA9ICEhZGF0YXNldFNldHRpbmdzLmxvY2F0aW9ucyA/IEpTT04ucGFyc2UoZGF0YXNldFNldHRpbmdzLmxvY2F0aW9ucykgOiBzZXR0aW5ncy5hZGRyZXNzZXM7XG4gICAgICAgIGNvbnN0IHpvb20gPSAhTnVtYmVyLmlzTmFOKE51bWJlcihkYXRhc2V0U2V0dGluZ3Muem9vbSkpID8gTnVtYmVyKGRhdGFzZXRTZXR0aW5ncy56b29tKSA6IHNldHRpbmdzLnpvb207XG4gICAgICAgIGNvbnN0IG1hcFR5cGUgPSAhIWVsZW1lbnRTZXR0aW5ncy5tYXBfdHlwZSA/IGVsZW1lbnRTZXR0aW5ncy5tYXBfdHlwZSA6IHNldHRpbmdzLm1hcFR5cGU7XG4gICAgICAgIGNvbnN0IHpvb21Db250cm9sID0gISFlbGVtZW50U2V0dGluZ3Muem9vbV9jb250cm9sID8gZWxlbWVudFNldHRpbmdzLnpvb21fY29udHJvbCA6IHNldHRpbmdzLnpvb21Db250cm9sO1xuICAgICAgICBjb25zdCBzdHlsZXMgPSAhIWRhdGFzZXRTZXR0aW5ncy5jdXN0b21TdHlsZSA/IEpTT04ucGFyc2UoZGF0YXNldFNldHRpbmdzLmN1c3RvbVN0eWxlKSA6IHNldHRpbmdzLnN0eWxlcztcblxuICAgICAgICBjb25zdCBtYXJrZXJBbmltYXRpb24gPSAhIWVsZW1lbnRTZXR0aW5ncy5tYXJrZXJfYW5pbWF0aW9uXG4gICAgICAgICAgICA/IGVsZW1lbnRTZXR0aW5ncy5tYXJrZXJfYW5pbWF0aW9uXG4gICAgICAgICAgICA6IHNldHRpbmdzLm1hcmtlckFuaW1hdGlvbjtcblxuICAgICAgICBjb25zdCBzdHJlZXRWaWV3Q29udHJvbCA9ICEhZWxlbWVudFNldHRpbmdzLm1hcF9vcHRpb25fc3RyZWV0dmlld1xuICAgICAgICAgICAgPyBlbGVtZW50U2V0dGluZ3MubWFwX29wdGlvbl9zdHJlZXR2aWV3XG4gICAgICAgICAgICA6IHNldHRpbmdzLnN0cmVldFZpZXdDb250cm9sO1xuXG4gICAgICAgIGNvbnN0IG1hcFR5cGVDb250cm9sID0gISFlbGVtZW50U2V0dGluZ3MubWFwX3R5cGVfY29udHJvbFxuICAgICAgICAgICAgPyBlbGVtZW50U2V0dGluZ3MubWFwX3R5cGVfY29udHJvbFxuICAgICAgICAgICAgOiBzZXR0aW5ncy5tYXBUeXBlQ29udHJvbDtcblxuICAgICAgICBjb25zdCBmdWxsc2NyZWVuQ29udHJvbCA9ICEhZWxlbWVudFNldHRpbmdzLmZ1bGxzY3JlZW5fY29udHJvbFxuICAgICAgICAgICAgPyBlbGVtZW50U2V0dGluZ3MuZnVsbHNjcmVlbl9jb250cm9sXG4gICAgICAgICAgICA6IHNldHRpbmdzLmZ1bGxzY3JlZW5Db250cm9sO1xuXG4gICAgICAgIGNvbnN0IHNjcm9sbFRvWm9vbSA9ICEhZWxlbWVudFNldHRpbmdzLm1hcF9zY3JvbGxfem9vbSA/IGVsZW1lbnRTZXR0aW5ncy5tYXBfc2Nyb2xsX3pvb20gOiBzZXR0aW5ncy5zY3JvbGxUb1pvb207XG5cbiAgICAgICAgdGhpcy5zZXRTZXR0aW5ncyh7XG4gICAgICAgICAgICBhZGRyZXNzZXM6IGFkZHJlc3NlcyxcbiAgICAgICAgICAgIHpvb206IHpvb20sXG4gICAgICAgICAgICBtYXBUeXBlOiBtYXBUeXBlLFxuICAgICAgICAgICAgbWFya2VyQW5pbWF0aW9uOiBtYXJrZXJBbmltYXRpb24sXG4gICAgICAgICAgICBzdHJlZXRWaWV3Q29udHJvbDogc3RyZWV0Vmlld0NvbnRyb2wsXG4gICAgICAgICAgICBtYXBUeXBlQ29udHJvbDogbWFwVHlwZUNvbnRyb2wsXG4gICAgICAgICAgICB6b29tQ29udHJvbDogem9vbUNvbnRyb2wsXG4gICAgICAgICAgICBmdWxsc2NyZWVuQ29udHJvbDogZnVsbHNjcmVlbkNvbnRyb2wsXG4gICAgICAgICAgICBzY3JvbGxUb1pvb206IHNjcm9sbFRvWm9vbSxcbiAgICAgICAgICAgIHN0eWxlczogc3R5bGVzLFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbnJlZ2lzdGVyV2lkZ2V0KE9FV19Hb29nbGVNYXAsIFwib2V3LWdvb2dsZS1tYXBcIik7XG4iXX0=
