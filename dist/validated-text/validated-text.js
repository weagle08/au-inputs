var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../constants/constants", "../utils/EventUtils", "../utils/RegExUtils"], function (require, exports, aurelia_framework_1, constants_1, EventUtils_1, RegExUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ValidatedText {
        constructor(element) {
            this.type = 'text';
            this._element = element;
        }
        onChanged() {
            try {
                if (this.format != null && typeof this.format === 'function') {
                    this.value = this.format(this.value);
                }
                if (this.pattern == null || this.pattern.trim() === '') {
                    EventUtils_1.EventUtils.fireEvent(constants_1.VALIDATED_EVENT, this._element, true, false);
                }
                else {
                    let testExpression = RegExUtils_1.RegExUtils.getRegEx(this.pattern);
                    if (testExpression == null) {
                        console.log('unable to parse regex pattern');
                        EventUtils_1.EventUtils.fireEvent(constants_1.VALIDATED_EVENT, this._element, false, false);
                    }
                    else {
                        if (testExpression.test(this.value) === false) {
                            EventUtils_1.EventUtils.fireEvent(constants_1.VALIDATED_EVENT, this._element, false, false);
                        }
                        else {
                            EventUtils_1.EventUtils.fireEvent(constants_1.VALIDATED_EVENT, this._element, true, false);
                        }
                    }
                }
            }
            catch (ex) {
                EventUtils_1.EventUtils.fireEvent(constants_1.VALIDATED_EVENT, this._element, false, false);
            }
        }
    }
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], ValidatedText.prototype, "class", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], ValidatedText.prototype, "placeholder", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], ValidatedText.prototype, "pattern", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], ValidatedText.prototype, "value", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Function)
    ], ValidatedText.prototype, "format", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], ValidatedText.prototype, "type", void 0);
    exports.ValidatedText = ValidatedText;
});

//# sourceMappingURL=validated-text.js.map
