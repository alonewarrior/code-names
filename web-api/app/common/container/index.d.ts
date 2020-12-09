declare module 'kontainer-di' {
    type ModuleRegistryItem = {
        name: string;
        instance: any;
        deps: string[];
        factory: Function;
        started: boolean;
    };
    /**
     * @namespace Container
     */
    type Container = {
        modules: { [key: string]: ModuleRegistryItem };

        /**
         * @alias register
         */
        registerModule(moduleName: string, dependencies: string[], moduleDef: Function): void;
        register(moduleName: string, dependencies: string[], moduleDef: Function): void;

        /**
         * @alias get
         */
        getModule(moduleName: string): any;
        getModule<T>(moduleName: string): T;
        get(moduleName: string): any;
        get<T>(moduleName: string): T;

        isClass(func: Function): boolean;
        clearModule(moduleName: string): void;
        swapModule(moduleName: string, dependencies: string[], moduleDef: Function): void;
        getModuleDeps(moduleRegistry: ModuleRegistryItem): string[];
        reset(): void;

        /**
         * @alias start
         */
        startModule(moduleName: string, options?: {}): any;
        startModule<T>(moduleName: string, options?: {}): T;
        startModule(moduleName: string, options?: { async: true }): Promise<any>;
        startModule<T>(moduleName: string, options?: { async: true }): Promise<T>;
        start(moduleName: string, options?: {}): any;
        start<T>(moduleName: string, options?: {}): T;
        start(moduleName: string, options?: { async: true }): Promise<any>;
        start<T>(moduleName: string, options?: { async: true }): Promise<T>;

        /**
         * @alias stop
         */
        stopModule(moduleName: string): void;
        stop(moduleName: string): void;

        startAll(): void;
        stopAll(): void;
        debug(): void;
    };
    export = Container;
}

