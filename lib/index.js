"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Taggier = /*#__PURE__*/function () {
  /**
   * 
   * @param {string | HTMLDivElement} div Div `id` or the div itself
   * @param {{gap: number, forbiddenPattern: false | RegExp, hashtag: boolean, border: boolean, focus: boolean }} options default values:  
   * * gap: `16`;  
   * * forbiddenPattern: `/[^\w]+/g`; (set to `false` to have none);  
   * * hashtag: `false`;
   * * border: `true`;  
   * * focus: `true`;  
   */
  function Taggier(div) {
    var _options$border,
        _options$focus,
        _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Taggier);

    var gap = options.gap || 16;
    var pattern = options.forbiddenPattern === false ? null : options.pattern || /[^\w]+/g;
    var hashtag = options.hashtag;
    var border = (_options$border = options.border) !== null && _options$border !== void 0 ? _options$border : true;
    var focus = (_options$focus = options.focus) !== null && _options$focus !== void 0 ? _options$focus : true;
    var errorMessagePrefix = 'The first paremeter (div) of the object Taggier';

    if (typeof div === 'string' || div instanceof String) {
      this.container = document.querySelector("#".concat(div));
      var errorMessage = "".concat(errorMessagePrefix, " was not found");
      if (this.container === null) throw Error(errorMessage);
    }

    if (div instanceof HTMLDivElement) this.container = div;

    if (this.container === undefined) {
      var _errorMessage = "".concat(errorMessagePrefix, " is not a HTMLDivElement");

      throw Error(_errorMessage);
    }

    if (border) {
      var borders = ['top', 'right', 'bottom', 'left'];
      var hasBorder = borders.some(function (side) {
        var style = getComputedStyle(_this.container, null);
        var width = style.getPropertyValue("border-".concat(side, "-width"));
        return width !== '0px';
      });

      if (!hasBorder) {
        this.container.style.border = '1px solid gray';
      }
    }

    this.container.style.cursor = 'text';
    this.container.style.padding = "".concat(gap / 2, "px");
    this.container.addEventListener('click', function (e) {
      if (e.target.tagName.toLowerCase() === 'span') {
        _this.container.removeChild(e.target);
      }

      _this.input.focus();
    });
    this.input = document.createElement('input');
    this.input.style.border = 'none';
    this.input.style.flex = 1;
    this.input.style.padding = '8px';
    this.container.appendChild(this.input);
    this.input.addEventListener('focus', function (e) {
      e.currentTarget.style.outline = 'none';
      if (focus) _this.container.style.outline = 'auto';
    });

    if (focus) {
      this.input.addEventListener('focusout', function (e) {
        _this.container.style.outline = 'none';
      });
    }

    this.input.addEventListener('input', function (e) {
      var value = _this.input.value.replace(',', '');

      _this.input.value = value.replace(pattern, '');
      var createTag = e.data === ',' && value.trim();

      if (createTag) {
        var prefix = hashtag ? '#' : '';
        var tagText = "".concat(prefix).concat(_this.input.value.trim());
        _this.input.value = '';

        var duplicate = _this.getTags().find(function (x) {
          return x.toLowerCase() === tagText.toLowerCase();
        });

        if (duplicate) return;
        var span = document.createElement('span');
        span.innerHTML = tagText;
        span.classList.add('tag');
        span.style.margin = "".concat(gap / 2, "px");

        _this.container.insertBefore(span, _this.input);
      }
    });
    this.input.addEventListener('keydown', function (e) {
      var remove = e.key === "Backspace" && _this.input.value === '';

      if (remove) {
        var spans = _this.container.querySelectorAll('span');

        if (!spans.length) return;
        var lastSpan = spans[spans.length - 1];

        _this.container.removeChild(lastSpan);
      }
    });
    this.container.style.display = 'flex';
    this.container.style.flexWrap = 'wrap';
  }
  /**
   * @returns {Array} Array of strings
   */


  _createClass(Taggier, [{
    key: "getTags",

    /**
     * @returns {Array} Array of strings
     */
    value: function getTags() {
      return this.tags;
    }
  }, {
    key: "tags",
    get: function get() {
      var spans = this.container.querySelectorAll('span');
      return Array.from(spans).map(function (x) {
        return x.textContent;
      });
    }
  }]);

  return Taggier;
}();

var _default = Taggier;
exports["default"] = _default;
