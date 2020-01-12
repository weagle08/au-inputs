const MATCH_OPERATORS = /[|\\{}()[\]^$+*?.]/g;

export class RegExUtils {
    public static getRegEx(pattern: string, options?: string): RegExp {
        if (pattern != null && typeof pattern == 'string') {
            if (pattern.indexOf('/') == 0) {
                pattern = pattern.substring(1);
            }
            let splitIndex = pattern.lastIndexOf('/');
            let parts = [pattern];
            if (splitIndex >= 0) {
                parts = [
                    pattern.substring(0, splitIndex),
                    pattern.substring(splitIndex + 1)
                ];
            }

            let regex = null;

            if (parts.length > 1) {
                regex = parts[0];
                options = parts[1];
            } else {
                regex = RegExUtils.escapeString(pattern);
            }

            try {
                return new RegExp(regex, options);
            } catch (e) {
                console.error(e);
                return null;
            }
        } else {
            return null;
        }
    }

    public static escapeString(input: string) {
        if (typeof input !== 'string') {
            return;
        }

        return input.replace(MATCH_OPERATORS, '\\$&');
    }
}