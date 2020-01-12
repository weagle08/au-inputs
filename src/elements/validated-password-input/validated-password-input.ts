import { autoinject, bindable, bindingMode, containerless } from 'aurelia-framework';
import { CSS_CLASSES } from '../../constants/CssClasses';
import { EventUtils } from '../../utils/EventUtils';
import { RegExUtils } from '../../utils/RegExUtils';

const VALIDATED_EVENT = 'validated';

@containerless
@autoinject
export class ValidatedPasswordInput {
    private _isValid: boolean = true;
    private _element: Element;
    @bindable private _validationState: string;

    @bindable({ defaultBindingMode: bindingMode.twoWay }) public value: string;
    @bindable public pattern: string | RegExp; // regex string
    @bindable public placeholder: string;
    @bindable public class: string;

    public constructor(element: Element) {
        this._element = element;
    }

    public get isValid() {
        return this._isValid;
    }

    public revalidate() {
        this.onValueChanged();
    }

    private attached() {
        this._isValid = this.runValidation();
    }

    private runValidation(): boolean {
        if (this.pattern != null) {
            if (this.pattern instanceof RegExp) {
                return this.pattern.test(this.value);
            } else {
                let regEx = RegExUtils.getRegEx(this.pattern);
                return regEx.test(this.value);
            }
        }
        return true;
    }

    private onValueChanged() {
        this._isValid = this.runValidation();
        if (this._isValid) {
            this._validationState = CSS_CLASSES.IS_VALID;
        } else {
            this._validationState = CSS_CLASSES.IS_INVALID;
        }

        EventUtils.fireEvent(VALIDATED_EVENT, this._element, this._isValid);
    }
}