var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../constants/constants", "../utils/EventUtils"], function (require, exports, aurelia_framework_1, constants_1, EventUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let ValidatedNumber = class ValidatedNumber {
        constructor(element) {
            this.placeholder = '';
            this._element = element;
        }
        onChanged() {
            let v = this.value;
            try {
                let t = parseFloat(v);
                if (isNaN(t)) {
                    EventUtils_1.EventUtils.fireEvent(constants_1.VALIDATED_EVENT, this._element, false, false);
                }
                else {
                    if (this.min != null && this.max != null) {
                        if (t <= this.max && t >= this.min) {
                            EventUtils_1.EventUtils.fireEvent(constants_1.VALIDATED_EVENT, this._element, true, false);
                        }
                        else {
                            EventUtils_1.EventUtils.fireEvent(constants_1.VALIDATED_EVENT, this._element, false, false);
                        }
                    }
                    else if (this.min != null) {
                        if (t >= this.min) {
                            EventUtils_1.EventUtils.fireEvent(constants_1.VALIDATED_EVENT, this._element, true, false);
                        }
                        else {
                            EventUtils_1.EventUtils.fireEvent(constants_1.VALIDATED_EVENT, this._element, false, false);
                        }
                    }
                    else {
                        if (t <= this.max) {
                            EventUtils_1.EventUtils.fireEvent(constants_1.VALIDATED_EVENT, this._element, true, false);
                        }
                        else {
                            EventUtils_1.EventUtils.fireEvent(constants_1.VALIDATED_EVENT, this._element, false, false);
                        }
                    }
                }
            }
            catch (ex) {
                EventUtils_1.EventUtils.fireEvent(constants_1.VALIDATED_EVENT, this._element, false, false);
            }
        }
    };
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], ValidatedNumber.prototype, "class", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], ValidatedNumber.prototype, "placeholder", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Number)
    ], ValidatedNumber.prototype, "min", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Number)
    ], ValidatedNumber.prototype, "max", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Number)
    ], ValidatedNumber.prototype, "value", void 0);
    ValidatedNumber = __decorate([
        aurelia_framework_1.containerless,
        __metadata("design:paramtypes", [Element])
    ], ValidatedNumber);
    exports.ValidatedNumber = ValidatedNumber;
});

//# sourceMappingURL=validated-number.js.map
