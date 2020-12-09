import 'reflect-metadata';

type ConstructorFunc = new (...args: any[]) => any;

export function Serializable(modelFunc?: () => ConstructorFunc) {
    return (target: any, key: string, third?)  => {
        console.log('serializable');
        const serializables: string[] = Reflect.getMetadata('serializables', target) || [];

        serializables.push(key);
        Reflect.defineMetadata('serializables', serializables, target);

        let _val = this[key];

        if (third) {
            let tempGet = third.get;
            let tempSet = third.set;
            // console.log(third);
            Object.defineProperty(target, key, {
                get: tempGet,
                set: tempSet,
                enumerable: true,
                configurable: true
            });
        } else {
            // Property getter.
            let setter;
            const getter = function () {
                return _val;
            };
            if (modelFunc) {
                // Property setter.
                setter = function (newVal) {
                    const paramType: string = Reflect.getOwnMetadata('design:type', target, key).toString();
                    const model = modelFunc();
                    if (paramType.includes('Array')) {
                        _val = newVal.map(v => {
                            return JSON.parse(JSON.stringify(new model(v)));
                        });
                    } else {
                        _val = JSON.parse(JSON.stringify(new model(newVal)));
                    }
                };
            } else {
                setter = function (newVal) {
                    _val = newVal;
                }
            }

            // DELETE property.
            if (delete this[key]) {
                // Create new property with getter and setter
                Object.defineProperty(target, key, {
                    get: getter,
                    set: setter,
                    enumerable: true,
                    configurable: true
                });
            }
        }

    };
}

