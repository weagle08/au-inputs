import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export { ValidatedNumber } from './validated-number/validated-number';
export { ValidatedText } from './validated-text/validated-text';

export function configure(config: FrameworkConfiguration) {
    config.globalResources([
        PLATFORM.moduleName('./validated-number/validated-number'),
        PLATFORM.moduleName('./validated-text/validated-text')
    ]);
}