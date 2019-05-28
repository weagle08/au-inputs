define(["require", "exports", "aurelia-framework", "./validated-number/validated-number", "./validated-text/validated-text"], function (require, exports, aurelia_framework_1, validated_number_1, validated_text_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ValidatedNumber = validated_number_1.ValidatedNumber;
    exports.ValidatedText = validated_text_1.ValidatedText;
    function configure(config) {
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('./validated-number/validated-number'),
            aurelia_framework_1.PLATFORM.moduleName('./validated-text/validated-text')
        ]);
    }
    exports.configure = configure;
});

//# sourceMappingURL=index.js.map
