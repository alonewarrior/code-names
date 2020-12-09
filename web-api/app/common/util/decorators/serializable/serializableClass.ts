import 'reflect-metadata';

export function SerializableClass(target: new (...args: any[]) => any | ObjectConstructor) {
    console.log('serializableClass');
    return class extends target {
        constructor(input: any) {
            super(input);
            input = JSON.parse(JSON.stringify(input));
            const serializables = Reflect.getMetadata('serializables', this) as string[];
            for (const s in serializables) {
                if (!serializables.hasOwnProperty(s)) continue;
                const item = serializables[s];
                const temp = {...Object.getOwnPropertyDescriptor(this, item), enumerable: true, configurable: true, writable: true};
                Object.defineProperty(this, item, temp);
                if (!input.hasOwnProperty(item)) continue;
                this[item] = input[item];
            }
        }
    } as any;
}
