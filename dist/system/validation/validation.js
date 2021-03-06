System.register(['aurelia-binding', '../validation/validation-rules', '../validation/validation-rules-collection', '../validation/validation-group', '../validation/validation-locale-repository', 'aurelia-dependency-injection'], function (_export) {
  var ObserverLocator, AllRules, AllCollections, ValidationGroup, ValidationLocaleRepository, inject, _classCallCheck, _createClass, Validation;

  return {
    setters: [function (_aureliaBinding) {
      ObserverLocator = _aureliaBinding.ObserverLocator;
    }, function (_validationValidationRules) {
      AllRules = _validationValidationRules;
    }, function (_validationValidationRulesCollection) {
      AllCollections = _validationValidationRulesCollection;
    }, function (_validationValidationGroup) {
      ValidationGroup = _validationValidationGroup.ValidationGroup;
    }, function (_validationValidationLocaleRepository) {
      ValidationLocaleRepository = _validationValidationLocaleRepository.ValidationLocaleRepository;
    }, function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
    }],
    execute: function () {
      'use strict';

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

      _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

      Validation = (function () {
        function Validation(observerLocator) {
          _classCallCheck(this, _Validation);

          this.observerLocator = observerLocator;
        }

        _createClass(Validation, [{
          key: 'on',
          value: function on(subject) {
            return new ValidationGroup(subject, this.observerLocator);
          }
        }]);

        var _Validation = Validation;
        Validation = inject(ObserverLocator)(Validation) || Validation;
        return Validation;
      })();

      _export('Validation', Validation);

      Validation.Utilities = {
        isEmptyValue: function isEmptyValue(val) {
          if (typeof val === 'function') {
            return this.isEmptyValue(val());
          }
          if (val === undefined) {
            return true;
          }
          if (val === null) {
            return true;
          }
          if (val === '') {
            return true;
          }
          if (typeof val === 'string') {
            if (String.prototype.trim) {
              val = val.trim();
            } else {
              val = val.replace(/^\s+|\s+$/g, '');
            }
          }

          if (val.length !== undefined) {
            return 0 === val.length;
          }
          return false;
        }
      };
      Validation.Locale = new ValidationLocaleRepository();

      Validation.debounceTime = 150;
    }
  };
});