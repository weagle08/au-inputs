import { FrameworkConfiguration } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';

export * from './constants/Events';

export function configure(config: FrameworkConfiguration) {
    config.globalResources([
        PLATFORM.moduleName('./elements/validated-text-input/validated-text-input'),
        PLATFORM.moduleName('./elements/validated-password-input/validated-password-input'),
        PLATFORM.moduleName('./elements/validated-number-input/validated-number-input'),
        PLATFORM.moduleName('./value-converters/ToNumberValueConverter')
    ]);
}
