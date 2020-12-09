import 'reflect-metadata';
import {Constants} from '../../../../../Contracts/constants';

export function Injectable(name: string) {
    return (target) => {
        const currentTargets = Reflect.getMetadata(Constants.InjectableNamespace.INJECTABLE_CLASS, Reflect) || {};
        if (!currentTargets[name]) {
            currentTargets[name] = target;
        }
        Reflect.defineMetadata(Constants.InjectableNamespace.INJECTABLE_CLASS, currentTargets, Reflect);
        return target;
    };
}

