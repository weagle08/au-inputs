import { autoinject, bindable, containerless } from 'aurelia-framework';
import { VALIDATED_EVENT } from '../constants/constants';
import { EventUtils } from '../utils/EventUtils';

@containerless
@autoinject
export class ValidatedNumber {
    private _element: Element;

    @bindable public class: string;
    @bindable public placeholder: string = '';
    @bindable public min: number;
    @bindable public max: number;
    @bindable public value: number;

    public constructor(element: Element) {
        this._element = element;
    }

    private onChanged() {
        let v = this.value as any;
        try {
            let t = parseFloat(v);
            if (isNaN(t)) {
                EventUtils.fireEvent(VALIDATED_EVENT, this._element, false, false);
            } else {
                if (this.min != null && this.max != null) {
                    if (t <= this.max && t >= this.min) {
                        EventUtils.fireEvent(VALIDATED_EVENT, this._element, true, false);
                    } else {
                        EventUtils.fireEvent(VALIDATED_EVENT, this._element, false, false);
                    }
                } else if (this.min != null) {
                    if (t >= this.min) {
                        EventUtils.fireEvent(VALIDATED_EVENT, this._element, true, false);
                    } else {
                        EventUtils.fireEvent(VALIDATED_EVENT, this._element, false, false);
                    }
                } else {
                    if (t <= this.max) {
                        EventUtils.fireEvent(VALIDATED_EVENT, this._element, true, false);
                    } else {
                        EventUtils.fireEvent(VALIDATED_EVENT, this._element, false, false);
                    }
                }

            }
        } catch (ex) {
            EventUtils.fireEvent(VALIDATED_EVENT, this._element, false, false);
        }
    }
}