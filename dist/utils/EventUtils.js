define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EventUtils {
        static fireEvent(eventName, element, data, bubbles = true) {
            let event = null;
            if (window.CustomEvent != null) {
                event = new CustomEvent(eventName, {
                    detail: data,
                    bubbles: bubbles
                });
            }
            else {
                event = document.createEvent('CustomEvent');
                event.initCustomEvent(eventName, bubbles, true, {
                    detail: data
                });
            }
            element.dispatchEvent(event);
        }
    }
    exports.EventUtils = EventUtils;
});

//# sourceMappingURL=EventUtils.js.map
