export class EventUtils {
    public static fireEvent(eventName: string, element: Element, data?: any, bubbles: boolean = true) {
        let event = null;
        if ((window as any).CustomEvent != null) {
            event = new CustomEvent(eventName, {
                detail: data,
                bubbles: bubbles
            });
        } else {
            event = document.createEvent('CustomEvent');
            event.initCustomEvent(eventName, bubbles, true, {
                detail: data
            });
        }
        element.dispatchEvent(event);
    }
}
