export class EventUtils {
    public static createEvent(
        name: string,
        data?: any,
        bubbles: boolean = true
    ): Event {
        let event = null;
        if ((window as any).CustomEvent != null) {
            event = new CustomEvent(name, {
                detail: data,
                bubbles: bubbles
            });
        } else {
            event = document.createEvent('CustomEvent');
            event.initCustomEvent(name, bubbles, true, {
                detail: data
            });
        }

        return event;
    }

    public static fireEvent(eventName: string, element: Element, data?: any, bubbles: boolean = true) {
        const event = EventUtils.createEvent(eventName, data);
        element.dispatchEvent(event);
    }
}
