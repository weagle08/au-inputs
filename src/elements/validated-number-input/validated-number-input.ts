import { autoinject, bindable, bindingMode, containerless } from 'aurelia-framework';
import { CSS_CLASSES } from '../../constants/CssClasses';
import { EventUtils } from '../../utils/EventUtils';
import { Events } from '../../constants/Events';
import { RegExUtils } from '../../utils/RegExUtils';

@containerless
@autoinject
export class ValidatedNumberInput {
    private _isValid: boolean = true;
    private _element: Element;
    @bindable private _validationState: string;

    @bindable({ defaultBindingMode: bindingMode.twoWay }) public value: number;
    @bindable public min: number;
    @bindable public max: number;
    @bindable public required: boolean = false;
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
        if (this.required === true && (this.value == null || this.value.toString() == '')) {
            return false;
        }

        if (this.min != null) {
            if (this.value < this.min) {
                return false;
            }
        }

        if (this.max != null) {
            if (this.value > this.max) {
                return false;
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

        EventUtils.fireEvent(Events.VALIDATED, this._element, this._isValid);
    }
}