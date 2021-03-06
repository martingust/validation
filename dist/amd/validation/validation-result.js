define(["exports"], function (exports) {
  "use strict";

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ValidationResult = (function () {
    function ValidationResult() {
      _classCallCheck(this, ValidationResult);

      this.isValid = true;
      this.properties = {};
    }

    _createClass(ValidationResult, [{
      key: "addProperty",
      value: function addProperty(name) {
        if (!this.properties[name]) {
          this.properties[name] = new ValidationResultProperty(this);
        }
        return this.properties[name];
      }
    }, {
      key: "checkValidity",
      value: function checkValidity() {
        for (var propertyName in this.properties) {
          if (!this.properties[propertyName].isValid) {
            this.isValid = false;
            return;
          }
        }
        this.isValid = true;
      }
    }]);

    return ValidationResult;
  })();

  exports.ValidationResult = ValidationResult;

  var ValidationResultProperty = (function () {
    function ValidationResultProperty(group) {
      _classCallCheck(this, ValidationResultProperty);

      this.group = group;
      this.isValid = true;
      this.isDirty = false;
      this.message = null;
      this.failingRule = null;
      this.onValidateCallbacks = [];
    }

    _createClass(ValidationResultProperty, [{
      key: "onValidate",
      value: function onValidate(onValidateCallback) {
        this.onValidateCallbacks.push(onValidateCallback);
      }
    }, {
      key: "setValidity",
      value: function setValidity(validationResponse, shouldBeDirty) {
        var notifyObservers = !this.isDirty && shouldBeDirty || this.isValid !== validationResponse.isValid || this.message !== validationResponse.message;

        if (shouldBeDirty) this.isDirty = true;
        this.message = validationResponse.message;
        this.failingRule = validationResponse.failingRule;
        this.isValid = validationResponse.isValid;

        if (this.isValid !== this.group.isValid) this.group.checkValidity();

        if (notifyObservers) {
          for (var i = 0; i < this.onValidateCallbacks.length; i++) {
            var callback = this.onValidateCallbacks[i];
            callback(this);
          }
        }
      }
    }]);

    return ValidationResultProperty;
  })();

  exports.ValidationResultProperty = ValidationResultProperty;
});