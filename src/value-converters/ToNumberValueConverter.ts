export class ToNumberValueConverter {
    public fromView(val: string) {
        if (val != null && val.toString().trim() !== '') {
            let value: string = val.toString();
            if (value.indexOf('.') >= 0) {
                return parseFloat(val);
            } else {
                return parseInt(val, 10);
            }
        }

        return val;
    }
}