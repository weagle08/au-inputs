define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const MATCH_OPERATORS = /[|\\{}()[\]^$+*?.]/g;
    class RegExUtils {
        static getRegEx(input) {
            if (input != null && typeof input === 'string') {
                if (input.indexOf('/') == 0) {
                    input = input.substring(1);
                }
                let splitIndex = input.lastIndexOf('/');
                let parts = [input];
                if (splitIndex >= 0) {
                    parts = [
                        input.substring(0, splitIndex),
                        input.substring(splitIndex + 1)
                    ];
                }
                let regex = null;
                let options = '';
                if (parts.length > 1) {
                    regex = parts[0];
                    options = parts[1];
                }
                else {
                    regex = RegExUtils.escapeString(input);
                }
                try {
                    return new RegExp(regex, options);
                }
                catch (e) {
                    console.error(e);
                    return null;
                }
            }
            else {
                return null;
            }
        }
        static escapeString(input) {
            if (typeof input !== 'string') {
                throw new TypeError('Expected a string');
            }
            return input.replace(MATCH_OPERATORS, '\\$&');
        }
    }
    exports.RegExUtils = RegExUtils;
});

//# sourceMappingURL=RegExUtils.js.map
