import { bindable, containerless } from 'aurelia-framework';
import { VALIDATED_EVENT } from '../constants/constants';
import { EventUtils } from '../utils/EventUtils';
import { RegExUtils } from '../utils/RegExUtils';

@containerless
export class ValidatedText {
    private _element: Element;

    @bindable public class: string;
    @bindable public placeholder: string = '';
    @bindable public pattern: string;
    @bindable public value: string;
    @bindable public format: (value: string) => string;
    @bindable public type: 'text' | 'email' | 'password' = 'text';

    public constructor(element: Element) {
        this._element = element;
    }

    private onChanged() {
        try {
            if (this.format != null && typeof this.format === 'function') {
                this.value = this.format(this.value);
            }

            if (this.pattern == null || this.pattern.trim() === '') {
                EventUtils.fireEvent(VALIDATED_EVENT, this._element, true, false);
            } else {
                let testExpression = RegExUtils.getRegEx(this.pattern);
                if (testExpression == null) {
                    console.log('unable to parse regex pattern');
                    EventUtils.fireEvent(VALIDATED_EVENT, this._element, false, false);
                } else {
                    if (testExpression.test(this.value) === false) {
                        EventUtils.fireEvent(VALIDATED_EVENT, this._element, false, false);
                    } else {
                        EventUtils.fireEvent(VALIDATED_EVENT, this._element, true, false);
                    }
                }
            }
        } catch (ex) {
            EventUtils.fireEvent(VALIDATED_EVENT, this._element, false, false);
        }
    }
}