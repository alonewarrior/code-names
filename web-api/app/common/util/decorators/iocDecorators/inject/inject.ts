import 'reflect-metadata';
import {Constants} from '../../../../../Contracts/constants';

export function Inject(name: string) {
    return function (target: any, key: string, index: number) {
        const currentInjectData = Reflect.getMetadata(Constants.InjectableNamespace.INJECT_NAME, target) || [];
        currentInjectData[index] = name;

        Reflect.defineMetadata(Constants.InjectableNamespace.INJECT_NAME, currentInjectData, target);

        return target;
    };
}
